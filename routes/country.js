const router = require('express').Router();
const countryController = require('../controller/country');
const validation = require('../middlewares/validation');

router.post("/", countryController.postCountry);

// Retrive Regions
router.route('/list-region').get(validation.validateRegions, countryController.getRegions);

// Retrive Departments
router.route('/list-department').get(validation.validateDepartment, countryController.getDepartments);

// Retrive Circos
router.route('/list-circo').get(validation.validateCustomCountry, countryController.getCircos);

// Retrive County`s
router.route('/list-county').get(validation.validateCustomCountry, countryController.getCountys);

// Retrieve Cities 
router.route('/list-cities').get(validation.validateCustomCountry, countryController.getCities);


module.exports = router;