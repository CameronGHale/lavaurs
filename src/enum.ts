import { Fraction, Fractions, Chord } from 'laminations-lib';

// const chordConnector = (maxPeriod: number, base: number, lBound: Fraction, uBound: Fraction): Chord[] => {
//     return enumerateBetween(lBound, uBound) (base, maxPeriod)
// }

export const enumerateBetween = (lBound: Fraction, uBound: Fraction) => (base: number, period: number): Fraction[] => {
    return enumerate(base, period)
        .filter(item => Fractions.compare(lBound, item) <= 0)
        .filter(item => Fractions.compare(item, uBound) <= 0)
        .filter(item => Fractions.repeatingLength(item) >= period)

}

export const enumerate = (base: number, period: number): Fraction[] => {
    let digits = (new Array(period)).fill(0)
    let masterList = []
    for (let i = 0; i < integer_pow(base, period) - 1; i++) {
        let fract = Fractions.fromArrays(base, [], digits)
        masterList.push(fract)
        digits = incrementDigitSequence(base, digits)

    }
    return masterList
}

const incrementDigitSequence = (base: number, digits: number[]): number[] => {
    const copy = [...digits]
    let carry = 1
    let idx = digits.length - 1

    while (idx >= 0 && carry !== 0) {
        copy[idx]++
        carry--
        if (copy[idx] === base) {
            copy[idx] = 0
            carry++
        }
        idx--
    }
    return copy
}
const integer_pow = (base: number, exponent: number): number => {
    let result = 1
    if (exponent === 0) {
        return result
    }

    let exp = exponent
    let pow_i = base

    while (exp > 0) {
        if ((exp & 1) !== 0) {
            result *= pow_i
        }
        pow_i *= pow_i
        exp >>= 1
    }

    return result | 0
}
