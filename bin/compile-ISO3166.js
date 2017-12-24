const util = require('util');
const path = require('path');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const langs = ['en', 'ar', 'de', 'es', 'fr', 'it', 'ru', 'zh']; // Use to limit to subset of languages
const countries = [];   // Use to limit to subset of countries
const data = require('iso3166-2-db').getDataSet();

const i18nJSON = {
    country: {},
    region: {}
};
langs.forEach((lang) => {
    i18nJSON.country[lang] = {};
    i18nJSON.region[lang] = {};
});

const countrySchemaJSON = {
    "id": "country",
    "definitions": {
        "country": {
            "type": "string",
            "enum": []
        }
    }
};

const regionSchemaJSON = {
    "id": "region",
    "definitions": {}
};

let regionLength = 2;

Object.keys(data)
    .forEach((key) => {
        const country = data[key];
        if (countries.length && countries.indexOf(country) === -1) return false;    // country filter

        console.log(country.iso, '==', country.names.geonames);
        countrySchemaJSON.definitions.country.enum.push(country.iso);


        langs.forEach((lang) => {
            i18nJSON.region[lang][country.iso] = {};
            const countryName = country.names[lang] || country.names.geonames;
            i18nJSON.country[lang][`field.country.option.${country.iso}`] = countryName;
        });

        regionSchemaJSON.definitions[country.iso] = {
            "type": "string",
            "enum": []
        };

        country.regions.forEach((region) => {
            const regionKey = region.iso || region.names.geonames.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
            console.log(country.iso, regionKey, '==', region.names.geonames);
            regionSchemaJSON.definitions[country.iso].enum.push(regionKey);

            langs.forEach((lang) => {
                const regionName = region.names[lang] || region.names.geonames;
                regionLength = Math.max(regionLength, regionName.length);
                i18nJSON.region[lang][country.iso][`field.region${country.iso}.option.${regionKey}`] = regionName;
            });

            regionSchemaJSON.definitions[country.iso].enum.sort();
        });
    });

console.log('Longest region code is:', regionLength);

const arr = [];

Object.keys(i18nJSON.country).forEach((lang) => {
    arr.push(writeFile(`src/modules/Country/lang/${lang}.country.json`, JSON.stringify(i18nJSON.country[lang], null, 2), {encoding: 'utf8'}));
});

Object.keys(i18nJSON.region).forEach((lang) => {
    let json = {};
    Object.keys(i18nJSON.region[lang]).forEach((country) => {
        Object.assign(json, i18nJSON.region[lang][country]);
    });
    arr.push(writeFile(`src/modules/Region/lang/${lang}.region.json`, JSON.stringify(json, null, 2), {encoding: 'utf8'}));
});

arr.push(writeFile(`src/modules/Country/schema.json`, JSON.stringify(countrySchemaJSON, null, 2), {encoding: 'utf8'}));
arr.push(writeFile(`src/modules/Region/schema.json`, JSON.stringify(regionSchemaJSON, null, 2), {encoding: 'utf8'}));

Promise.all(arr).then(() => {
    console.log('Done!');
}).catch((err) => {
    console.error('Error:', err);
});
