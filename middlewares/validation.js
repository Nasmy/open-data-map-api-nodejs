// middlewares/validation.js
const req = require("express/lib/request");
const toolKit = require("../utils/toolkit");
const { validationResult, check } = require('express-validator');


/**
 * @description Validate the list of regions
 * @param {countryId} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateRegions = async (req, res, next) => {
    await check('countryId').notEmpty().withMessage('countryId is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", errors.array()));
    }

    next();
}

/**
 * @description Validate the list of department
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateDepartment = async (req, res, next) => {
    await check('countryId').notEmpty().withMessage('countryId is required').run(req);
    await check('regionId').notEmpty().withMessage('regionId is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", errors.array()));
    }

    next();
}

/**
 * @description Validate the custom country related api
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateCustomCountry = async (req, res, next) => {
    await check('countryId').notEmpty().withMessage('countryId is required').run(req);
    await check('regionId').notEmpty().withMessage('regionId is required').run(req);
    await check('departmentId').notEmpty().withMessage('departmentId is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", errors.array()));
    }

    next();
}

/**
 * @description Validate the circo
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateCustomElection = async (req, res, next) => {
    await check('electionId').notEmpty().withMessage('electionId is required').run(req);
    await check('round').notEmpty().withMessage('round is required').run(req);
    await check('departmentId').notEmpty().withMessage('departmentId is required').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", errors.array()));
    }

    next();
}

/**
 * @description Validate the circo
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateCustomElectionRound = async (req, res, next) => {
    await check('electionId').notEmpty().withMessage('electionId is required').run(req);
 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(toolKit.response(false, 400, {}, "Failed", errors.array()));
    }

    next();
}





module.exports = { validateRegions, validateDepartment, validateCustomCountry, validateCustomElection,validateCustomElectionRound }