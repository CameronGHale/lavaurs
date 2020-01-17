import { enumerate } from './enum'
import { Fractions } from 'laminations-lib'

const stringify = x => `${x}`

describe('enumerate', () => {
    const binary = Fractions.parseFactory(2)
    const ternary = Fractions.parseFactory(3)

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
