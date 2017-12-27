import math from 'mathjs';
import numeral from 'numeral';

export const qtyEncode = (unit, base) => (value) =>{
    if (value === '') return null;
    value = numeral(value).value();
    //console.log('qtyEncode(unit=>base)', value, unit, '=>', math.unit(value, unit).toNumber(base), base);
    return math.unit(value, unit).toNumber(base);
};

export const qtyDecode = (unit, base) => (value) => {
    if (!value) return null;
    value = numeral(value).value();
    //console.log('qtyDecode(base=>unit)', value, base, '=>', math.unit(value, base).toNumber(unit), unit);
    // JS BUG: parseFloat(value.toFixed(n)) to fix floating point error
    return Number.parseFloat(math.unit(value, base).toNumber(unit).toFixed(10));
};
