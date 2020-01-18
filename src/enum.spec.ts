import { enumerate, enumerateBetween } from './enum'
import { Fractions } from 'laminations-lib'

const stringify = x => `${x}`

const binary = Fractions.parseFactory(2)
const ternary = Fractions.parseFactory(3)

describe('enumerateBetween', ()=>{
    it('works for binary', () => {
        const enumerate = enumerateBetween(binary('_01'), binary('_10'))
        expect(enumerate(2, 2).map(stringify)).toEqual([
            binary('_01'),
            binary('_10'),
        ].map(stringify))

        expect(enumerate(2, 3).map(stringify)).toEqual([
            binary('_011'),
            binary('_100'),
        ].map(stringify))
    })
    it('works for ternary', () => {
        const enumerate = enumerateBetween(ternary('_01'), ternary('_20'))
        expect(enumerate(3, 2).map(stringify)).toEqual([
            ternary('_01'),
            ternary('_02'),
            ternary('_10'),
            ternary('_11'),
            ternary('_12'),
            ternary('_20'),
        ].map(stringify))
    })
})

describe('enumerate', () => {
    

    it('works for binary', () => {
        expect(enumerate(2, 2).map(stringify)).toEqual([
            binary('_00'),
            binary('_01'),
            binary('_10'),
        ].map(stringify))

        expect(enumerate(2, 3).map(stringify)).toEqual([
            binary('_000'),
            binary('_001'),
            binary('_010'),
            binary('_011'),
            binary('_100'),
            binary('_101'),
            binary('_110'),
        ].map(stringify))
    })
    it('works for ternary', () => {
        expect(enumerate(3, 2).map(stringify)).toEqual([
            ternary('_00'),
            ternary('_01'),
            ternary('_02'),
            ternary('_10'),
            ternary('_11'),
            ternary('_12'),
            ternary('_20'),
            ternary('_21'),
        ].map(stringify))
    })
})
