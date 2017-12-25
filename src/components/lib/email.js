import uts46 from "idna-uts46";

export const encode = (value) => {
    return uts46.toAscii(value, {transitional: false});
};

export const decode = (value) => {
    if (value) {
        const parts = value.split('@');
        if (parts.length === 2) {
            parts[1] = uts46.toUnicode(parts[1]);
        }
        value = parts.join('@');
    }
    return value;
};
