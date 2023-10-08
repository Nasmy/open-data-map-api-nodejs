const toolKit = require("../utils/toolkit");
const Country = require("../model/country");
const countryData = require("../data/area.json");

/**
 * Post Country
 * @description Post country data from json file
 * @description each country has differnt data set
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postCountry = async (req, res, next) => {
    try {
        let modelCountry = new Country(countryData);
        await modelCountry.addCountry().then(
            con => res.status(200).send(toolKit.response(true, 201, "", "Success", ""))
        );
    } catch (e) {
        res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }

};

/**
 * Get Regions
 * @description List regions accourding to country
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */
exports.getRegions = async (req, res, next) => {
    try {
        const modelCountry = new Country({});
        await modelCountry.getRegionListByCountry(req.query.countryId).then(
            list => res.status(200).send(toolKit.response(true, 201, list, "Success", ""))
        )
    } catch (e) {
        res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}

/**
 * Get Department
 * @description List department accourding to country and regions
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */
exports.getDepartments = async (req, res, next) => {
    try {
        const modelCountry = new Country({});
        await modelCountry.getDepartmentByRegion(
            req.query.countryId, 
            parseInt(req.query.regionId)
        ).then(
            list => res.status(200).send(toolKit.response(true, 201, list, "Success", ""))
        )
    } catch (e) {
        res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}

/**
 * Get Department
 * @description List circo accourding to country, regions and department
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */
exports.getCircos = async (req, res, next) => {
    try {
        const modelCountry = new Country({});
        await modelCountry.getCircoByDepartment(req.query.countryId, parseInt(req.query.regionId), parseInt(req.query.departmentId)).then(
            list => res.status(200).send(toolKit.response(true, 201, list, "Success", ""))
        )
    } catch (e) {
        res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}

/**
 * Get Department
 * @description List circo accourding to country, regions and department
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */
exports.getCountys = async (req, res, next) => {
    try {
        const modelCountry = new Country({});
        await modelCountry.getCountyByCirco(req.query.countryId, parseInt(req.query.regionId), parseInt(req.query.departmentId), parseInt(req.query.circoId)).then(
            list => res.status(200).send(toolKit.response(true, 201, list, "Success", ""))
        )
    } catch (e) {
        res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}




/**
 * Get Cities
 * @description List circo accourding to country, regions and department
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */

exports.getCities = async (req, res, next) => {

    try {
        const modelCountry = new Country({});
        await modelCountry.getCities(
            parseInt(req.query.regionId),
             parseInt(req.query.departmentId), 
            parseInt(req.query.circoId),
            parseInt(req.query.countyId)).then(
            list => res.status(200).send(toolKit.response(true, 201, list, "Success", ""))
        )

    } catch (e) {
        res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}

