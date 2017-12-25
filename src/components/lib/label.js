export const makeLabel = (type, intl, name, str, values = {}) => {
    return (str === true && intl.formatMessage({id: `field.${name}.${type}`}, values))  // use default
        || (!!str && intl.formatMessage({id: str}, values))                         // use custom id
        || str;                                                                     // use fallback
};
