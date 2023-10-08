/**
 * Api Response Format
 * @param {*} success 
 * @param {*} code 
 * @param {*} data 
 * @param {*} message 
 * @param {*} error 
 * @returns {object}
 */

const commonResponse = (success = false, code, data = {}, message = '', error = '') => {
    return {
        success: success,
        code: code,
        data: data,
        message: message,
        error: error
    };
}

/**
 * @description convert Json Obj to array
 * @param {*} reqJson 
 */
const convertJsonToArr = (reqJson) => {
    return Object.keys(reqJson).map(function (k) { return reqJson[k] });
}

/**
 * @description convert String array to int Array
 */

const convertStingArrToIntArr = (strArray) => { // modification
    return strArray.map(i => Number(i));
}

exports.response = commonResponse;
exports.convertToArray = convertJsonToArr;
exports.convertStrArrayToNumberArray = convertStingArrToIntArr; // Modification