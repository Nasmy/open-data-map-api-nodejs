const toolKit = require("../utils/toolkit");
const Election = require("../model/election");
const Country = require("../model/country");
const countryData = require("../data/area.json");
const { validationResult, check } = require('express-validator');



/**
 * Get Elections
 * @description List all of elections
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */

exports.getAllElections = async (req, res, next) => {

    try {

        const modelElection = new Election({});

        await modelElection.getElections().then(
            list => res.status(200).send(toolKit.response(true, 200, list, "Success", ""))
        )

    } catch (e) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}


/**
 * Get rounds by election id
 * @description List all of elections rounds
 * @param {*} req  electionId
 * @param {*} res 
 * @param {*} next 
 * @method get
 */

exports.getAllRoundsById = async (req, res, next) => {

    try {

        const modelElection = new Election({});

        await modelElection.getElectionRounds(
            req.query.electionId,
        ).then(
            list => res.status(200).send(toolKit.response(true, 200, list, "Success", ""))
        )

    } catch (e) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}


/**
 * Get Results
 * @description List electionId,areaId,rounds, department and circo,county,city
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @method get
 */

exports.getResults = async (req, res, next) => {
    try { 
        /** Modification */
        /*if (req.query.cityId instanceof Array) {
            CityIds = toolKit.convertStrArrayToNumberArray(req.query.cityId);
        } else {
            CityIds = [];
        }*/
       
        
        const modelElection = new Election({});
        const CityIds = modelElection.cityIdConvertion(req.query.cityId);
        await modelElection.getResults(
            req.query.electionId,
            parseInt(req.query.round),
            parseInt(req.query.departmentId),
            parseInt(req.query.circoId),
            CityIds,
            parseInt(req.query.pollingStationNumber),
            parseInt(req.query.countyCode),
            req.query.candidateName,
            req.query.gpsPollingStation,
        ).then(
            list => {
                console.log(CityIds);
                return res.status(200).send(toolKit.response(true, 200, list, "Success", ""))
            }
        )

    } catch (e) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", e.message));
    }
}
