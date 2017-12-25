import uts46 from "idna-uts46";

export const emailEncode = (value) => {
    return uts46.toAscii(value, {transitional: false});
};

export const emailDecode = (value) => {
    if (value) {
        const parts = value.split('@');
        if (parts.length === 2) {
            parts[1] = uts46.toUnicode(parts[1]);
        }
        value = parts.join('@');
    }
    return value;
};
