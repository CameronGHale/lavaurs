import { Fraction, Fractions, Chord, Chords } from 'laminations-lib'

export const boundCreate = (lBound: Fraction, uBound: Fraction, chords: Chord[]): Fraction[] => {
    let bounds = []
    bounds.push(lBound)
    for (let i = 0; i < chords.length; i++) {
        bounds.push(chords[i].lower)
        bounds.push(chords[i].upper)
    }
    bounds.push(uBound)
    return bounds
}

export const chordConnector = (maxPeriod: number, base: number, lBound: Fraction, uBound: Fraction): Chord[] => {
    const points = enumerateBetween(lBound, uBound)(base, maxPeriod)
    if (points.length % base != 0) {
        throw 'Bad Dr. Mayer'
    }
    let chords = []
    for (let cursor = 0; cursor < points.length; cursor += base) {
        const a = points[cursor]
        // b will always exist due to the len of points being a multiple of base.
        const b = points[cursor + base - 1]
        chords.push(Chords.create(a, b))
    }
    return chords
}

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
export const parseChord = (pair: [string, string], base: number): Chord => {
    const parseFrac = Fractions.parseFactory(base)
    const lower = parseFrac(pair[0])
    const upper = parseFrac(pair[1])
    return Chords.create(lower, upper)
}

export const Lavaurs = (currentPeriod:number, maxPeriod: number, base: number, lBound: Fraction, uBound: Fraction): JSON => {
    const chords = chordConnector(maxPeriod,base,lBound,uBound)
    const bounds = boundCreate(lBound,uBound,chords) 
    if (currentPeriod<=maxPeriod){
        for(let i =0; i<bounds.length;i++){
            Lavaurs(currentPeriod+1,maxPeriod,base,bounds[i],bounds[i+1])}
        }
    return
}

