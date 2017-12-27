const makeStr = (type, intl, name, str, values = {}) => {
    return (str === true && intl.formatMessage({id: `field.${name}.${type}`}, values))  // use default
        || (!!str && intl.formatMessage({id: str}, values))                         // use custom id
        || str;                                                                     // use fallback
};


export const makeHasError = (props) => {
    return props.touched && !!(props.error || props.errorIntl);
};

export const makeLabel = (props) => {
    return props.labelIntl
        || makeStr('label', props.intl, props.name, props.label);
};


export const makePlaceholder = (props) => {
    return props.placeholderIntl
        || makeStr('placeholder', props.intl, props.name, props.placeholder);
};


export const makeHelperText = (props, values) => {
    const hasError = makeHasError(props);
    return (hasError && props.error && props.intl.formatMessage({id: props.error}, values)) // override with error
        || hasError && props.errorIntl
        || props.helperTextIntl
        || makeStr('helperText', props.intl, props.name, props.helperText, values);
};
