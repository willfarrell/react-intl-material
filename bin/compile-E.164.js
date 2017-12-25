const util = require('util');
const path = require('path');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const data = require('country-telephone-data').allCountries;

const phoneSchema = {
    "id":"phone-number",
    "definitions":{
        "phoneNumber":{
            "type":"string",
            "pattern":"^\+[1-9][0-9]{1,14}$"
        }
    }
};

const phoneMask = {};

let missingCount = 0;
let nanpCount = 0;

data.forEach((country) => {
    const id = country.iso2.toUpperCase();

    if (!country.format) {
        /*
        PR = US
        */
        console.error(id, 'Phone number format missing', country);
        missingCount++;
        country.format = country.dialCode;
        country.format = '+' + country.format + (new Array(15 - country.format.toString().length)).join('.');
    }

    if (id==='CA') console.log(country);

    // Make str
    let str = country.format;

    country.dialCode.split('').forEach((numChar) => {
        str = str.replace(/\./, numChar);
    });

    str = str.replace(/\./g, '#');

    // make mask
    let arr = [];
    str.split('').forEach((char) => {
        if (country.hasAreaCodes && char === '#') {
            // only apply to first char - NANP
            char = '/[2-9]/';
            country.hasAreaCodes = false;
            nanpCount++;
        } else if (char === '#') char = '/[0-9]/';
        arr.push(char);
    });

    console.log(id, str);

    phoneMask[id] = { arr, str };
});

console.log('Countries missing phone formats', missingCount);
console.log('Countries with area codes', nanpCount);

const arr = [];

arr.push(writeFile(`src/components/PhoneNumber/schema.json`, JSON.stringify(phoneSchema, null, 2), {encoding: 'utf8'}));
arr.push(writeFile(`src/components/PhoneNumber/masks.json`, JSON.stringify(phoneMask, null, 2), {encoding: 'utf8'}));

Promise.all(arr).then(() => {
    console.log('Done!');
}).catch((err) => {
    console.error('Error:', err);
});

