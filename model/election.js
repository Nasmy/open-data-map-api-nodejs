const mongoose = require('mongoose');
const toolKit = require("../utils/toolkit");

const electionSchema = new mongoose.Schema({ // Define country schema
    electionName: String,
    countryId: String,
    partyCollection: String,
    year: String,
    round: [{}]
});

const Model = mongoose.model('Election', electionSchema);

module.exports = class Election {


    /**
     * @description retrieving all of election object 
     * @returns 
     */

    getElections() {

        const aggregation = [

            //extracting array

            { $project: { _id: 0 } },
            { $sort: { city: 1 } },

        ];

        const query = Model.aggregate(aggregation);

        return query;
    }


    /**
     * @description retrieving all of election object 
     * @returns 
     */

    getElectionRounds(electionId) {

        const aggregation = [

            //extracting array
            { $match: { "electionId": electionId } },
            { $unwind: '$round' },

            // return data
            {
                $group: {
                    _id: '$_id',
                    round: {
                        $addToSet: {
                            id: '$round.roundId',
                            collectionName: '$round.collectionName',
                        }
                    }
                }

            },
            {
                $unwind: {
                    path: "$round",
                }
            },
            { $project: { _id: 0 } },
            { $sort: { roundId: 1 } },

        ];

        const query = Model.aggregate(aggregation);

        return query;
    }

    /** 2022-05-27 */
    cityIdConvertion(cityId) {
        let CityIds = [];

        if (cityId instanceof Array) {
            CityIds = toolKit.convertStrArrayToNumberArray(cityId);
        } else if (cityId != undefined) {
            CityIds.push(cityId)
            CityIds = toolKit.convertStrArrayToNumberArray(CityIds);
        }

        return CityIds;
    }

    /**
     * @description Need to pass region,department,county and circo in a request
     * @param {*} regionCode 
     * @param {*} departmentCode 
     * @param {*} countyCode 
     * @param {*} circoCode 
     * @returns 
     */
    getResults(electionId, rounds, departmentId, circoId, cityCode = [], pollingStationNumber, countyCode, candidateName, gpsPollingStation /** 2022-05-27 */) {

        // optional fields
        // @todo : need to refactor this

        var SearchQueryObj = Object.create({});

        if (!isNaN(departmentId)) {
            SearchQueryObj = Object.assign({ "departmentCode": departmentId });
        }
        /** Modification */
        if (cityCode.length > 0) {
            SearchQueryObj = Object.assign({ "cityCode": {$in: cityCode}}, SearchQueryObj);
        }

        if (!isNaN(circoId)) {
            SearchQueryObj = Object.assign({ "circoCode": circoId }, SearchQueryObj);
        }

        if (!isNaN(pollingStationNumber)) {
            SearchQueryObj = Object.assign({ "pollingStationNumber": pollingStationNumber }, SearchQueryObj);
        }

        if (!isNaN(countyCode)) {
            SearchQueryObj = Object.assign({ "countyCode": countyCode }, SearchQueryObj);
        }

        if (candidateName != undefined) {
            SearchQueryObj = Object.assign({ "candidateName": candidateName }, SearchQueryObj);
        }

        if (gpsPollingStation != undefined) { /** 2022-05-27 */
            SearchQueryObj = Object.assign({ "gpsPollingStation": gpsPollingStation }, SearchQueryObj);
        }

        const aggregation = [

            // extracting array
            { $unwind: '$round' },

            // required  fields checking
            { $match: { "electionId": electionId, "round.roundId": rounds} },

            { // Election results filter Round 1: presidential_election_2017_round_1 , Round 2: presidential_election_2017_round_2
                $lookup: {
                    from: 'presidential_election_2017_round_' + rounds,
                    pipeline: [{
                        $match: SearchQueryObj
                    }],
                    as: 'electionResults'
                },
            },

            {
                $unwind: {
                    path: "$electionResults",
                }
            },

            { // Party info filter
                $lookup: {
                    from: 'presidential_election_2017_party',
                    localField: "electionResults.candidateName",
                    foreignField: "lastName",
                    as: 'partyInfo'
                },
            },

            // return data
            {
                $group: {
                    _id: '$_id',
                    election: {
                        $addToSet: {
                            electionName: '$electionName',
                            year: '$year',
                            roundCollectionName: '$round.collectionName',
                            roundCode: '$round.roundId',
                            partyCollectionName: '$partyCollection',
                            electionResults: '$electionResults',
                            partyInfo: '$partyInfo'
                        }
                    }
                },
            },

            // { $project: { _id: 0 } },

            { $sort: { city: 1 } },

        ];

        const query = Model.aggregate(aggregation);

        return query;
    }
   
} 