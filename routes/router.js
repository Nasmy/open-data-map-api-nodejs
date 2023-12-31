const express = require("express");
const router = express.Router();

// log requests
router.use("*", (req, res, next) => {
    console.log(`\x1b[32m${req.method}\x1b[35m ${req.baseUrl}`);
    next();
});

// add single router files
const routeFiles = ["country", "election"];
routeFiles.forEach((route) => {
    let routeFile = require(`./${route}.js`);
    try {
        router.use(`/${route}`, routeFile);
    } catch (err) {
        console.log(`\u001b[31m[ERR] Router file ${routeFile} does not exists.`);
    }
});

module.exports = router;