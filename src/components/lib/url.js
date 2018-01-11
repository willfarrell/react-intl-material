import uts46 from "idna-uts46";

// 0: protocol, 1: hostanme, 2: querystring
const parse = (str) => {
    const urlParts = /^(\w+:\/\/)?([^/]+)(.*)$/.exec(str);
    urlParts.shift();
    return urlParts;
};

export const urlEncode = (value) => {
    const urlParts = parse(value);
    if (urlParts[1] !== '') {
        urlParts[1] = uts46.toAscii(urlParts[1], {transitional: false});
    }
    return encodeURI(urlParts.join(''));
};

export const urlDecode = (value) => {
    if (value) {
        const urlParts = parse(value);
        if (urlParts[1] !== '') {
            urlParts[1] = uts46.toUnicode(urlParts[1]);
        }
        value = decodeURI(urlParts.join(''));
    }
    return value;
};
