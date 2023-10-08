
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({ // Define country schema
    countryName: String,
    countryCode: String,
    area: [{}]
});

const Model = mongoose.model('Country', countrySchema);

module.exports = class Country {


    constructor(queryParams) {
        this.model = new Model(queryParams);
    }

    /**
     * Add country data
     */
    addCountry() {
        return this.model.save();
    }

    /**
     * Region list by a country
     * @description Need to pass country code
     * @param {*} countryCode 
     * @returns 
     */
    getRegionListByCountry(countryCode) {
        const query = Model.aggregate([
            { $match: { countryCode: countryCode } },
            { $unwind: '$area' },
            { $group: { _id: { code: '$area.regionCode', name: '$area.regionName' }, region: { $addToSet: { code: '$area.regionCode', name: '$area.regionName' } } } },
            { $project: { _id: 0 } },
            { $sort: { region: 1 } },
        ]);
        return query;
    }

    /**
     * @description Need to pass country and region in a request
     * @param {*} countryCode 
     * @param {*} regionCode 
     * @param {*} circoCode 
     */
    getDepartmentByRegion(countryCode, regionCode) {
 
        const query = Model.aggregate([
            { $match: { countryCode: countryCode } },
            { $unwind: '$area' },
            { $match: { "area.regionCode": regionCode } },
            { $group: { _id: { code: '$area.departmentCode', name: '$area.departmentName' }, department: { $addToSet: { code: '$area.departmentCode', name: '$area.departmentName' } } } },
            { $project: { _id: 0 } },
            { $sort: { departmentCode: 1 } },
        ]);
        return query;
    }

    /**
     * @description Need to pass country region and department in a request
     * @param {*} countryCode 
     * @param {*} regionCode 
     * @param {*} departmentCode 
     * @returns 
     */
    getCircoByDepartment(countryCode, regionCode, departmentCode) {
        const query = Model.aggregate([
            { $match: { countryCode: countryCode } },
            { $unwind: '$area' },
            { $match: { "area.regionCode": regionCode } },
            { $match: { "area.departmentCode": departmentCode } },
            { $group: { _id: { code: '$area.circoCode' }, circo: { $addToSet: { code: '$area.circoCode' } } } },
            { $project: { _id: 0 } },
            { $sort: { circo: 1 } },
        ]);
        return query;
    }

    /**
     * @description Need to pass country region department and circo in a request
     * @param {*} countryCode 
     * @param {*} regionCode 
     * @param {*} departmentCode 
     * @returns 
     */
    getCountyByCirco(countryCode, regionCode, departmentCode, circoCode) {
        const query = Model.aggregate([
            { $match: { countryCode: countryCode } },
            { $unwind: '$area' },
            { $match: { "area.regionCode": regionCode } },
            { $match: { "area.departmentCode": departmentCode } },
            { $match: { "area.circoCode": circoCode } },
            { $group: { _id: { code: '$area.countyCode' }, county: { $addToSet: { code: '$area.countyCode', name: '$area.countyName' } } } },
            { $project: { _id: 0 } },
            { $sort: { county: 1 } },
        ]);
        return query;
    }

      /**
     * @description Need to pass region,department,county and circo in a request
     * @param {*} regionCode 
     * @param {*} departmentCode 
     * @param {*} countyCode 
     * @param {*} circoCode 
     * @returns 
     */
       getCities(regionCode, departmentCode, circoCode,countyCode) {
  
        var SearchQueryObj = Object.create({});

        if (!isNaN(regionCode)) {
            SearchQueryObj = Object.assign({ "area.regionCode": regionCode });
        }

        if (!isNaN(departmentCode)) {
            SearchQueryObj = Object.assign({ "area.departmentCode": departmentCode }, SearchQueryObj);
        }

        if (!isNaN(circoCode)) {
            SearchQueryObj = Object.assign({ "area.circoCode": circoCode }, SearchQueryObj);
        }

        if (!isNaN(countyCode)) {
            SearchQueryObj = Object.assign({ "area.countyCode": countyCode }, SearchQueryObj);
        }
  

            const aggregation = [

                //extracting array
               { $unwind: '$area' },
   
               //required  fields
               { $match: SearchQueryObj }, 
                               
               //return data
               { 
                   $group: {
                       _id: '$area.cityCode' ,
                       list: { $addToSet: { cityName: '$area.cityName', cityCodeLong: '$area.cityCodeLong', cityCode: '$area.cityCode' } }, 
                   } 
               },
   
               { $project: { _id: 0 }},
   
               { $sort: { city: 1 } },
               
           ];
 
           //optional fields 
           if(!isNaN(countyCode)){
             aggregation.splice(2 , 0 , { $match: {"area.countyCode": countyCode}});
           } 
           
           if(!isNaN(circoCode)){
             aggregation.splice(2 , 0 , { $match: {"area.circoCode": circoCode}});
           }
 
         const query = Model.aggregate(aggregation); 

        return query;
    }
}