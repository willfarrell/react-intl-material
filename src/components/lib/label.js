const makeStr = (type, intl, name, str, values = {}) => {
    return (str === true && intl.formatMessage({id: `field.${name}.${type}`}, values))  // use default
        || (!!str && intl.formatMessage({id: str}, values))                         // use custom id
        || str;                                                                     // use fallback
};


export const makeHasError = (props) => {
    return props.touched && !!(props.error || props.errorIntl);
};

export const makeLabel = (props, values = {}) => {
    return props.labelIntl
        || makeStr('label', props.intl, props.name, props.label, values);
};


export const makePlaceholder = (props, values = {}) => {
    return props.placeholderIntl
        || makeStr('placeholder', props.intl, props.name, props.placeholder, values);
};


export const makeHelperText = (props, values = {}) => {
    const hasError = makeHasError(props);
    return (hasError && props.error && props.intl.formatMessage({id: props.error}, values)) // override with error
        || hasError && props.errorIntl
        || props.helperTextIntl
        || makeStr('helperText', props.intl, props.name, props.helperText, values);
};
