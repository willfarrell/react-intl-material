import math from 'mathjs';

// TODO bug where you're unable to type a number that meets -.1 < x < 0.1
// due to the parsing / conversion between / update cycle

export const qtyEncode = (unit, base) => (value) =>{
    console.log('qtyEncode', value);
    //value = Number.parseFloat(value);
    if (value !== 0 && !value) return null;
    //console.log('qtyEncode(unit=>base)', value, unit, '=>', math.unit(value, unit).toNumber(base), base);
    return math.unit(value, unit).toNumber(base);
};

export const qtyDecode = (unit, base) => (value) => {
    console.log('qtyDecode', value);
    //value = Number.parseFloat(value);
    if (value !== 0 && !value) return null;
    //console.log('qtyDecode(base=>unit)', value, base, '=>', Number.parseFloat(math.unit(value, base).toNumber(unit).toFixed(10)), unit);
    // JS BUG: parseFloat(value.toFixed(n)) to fix floating point error
    return Number.parseFloat(math.unit(value, base).toNumber(unit).toFixed(14));
};
