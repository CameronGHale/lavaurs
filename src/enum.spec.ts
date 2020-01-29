import { enumerate, enumerateBetween, boundCreate, parseChord } from './enum'
import {chordConnector} from './enum'
import { Fractions } from 'laminations-lib'

const stringify = x => `${x}`

const binary = Fractions.parseFactory(2)
const ternary = Fractions.parseFactory(3)

describe('Lavaurs',() =>{
    it ('correctly presents chords ')
})

describe('boundCreate',() => {

    it('correctly lists bounds for basic base 3 case', () =>{
        const bound = boundCreate(ternary('_01'),ternary('_10'),[['_011', '_020'],['_021','_100']].map(parseChord))
        expect(bound.map(String)).toEqual([
            "_01",
            "_011",
            "_020",
            "_021",
            "_100",
            "_10",
        ])
    })
})

describe('chordConnector',() => {
    it('connects chords in binary',() =>{
        const connect = chordConnector(2,2,binary('_01'),binary('_10'))
        expect(connect.map(String)).toEqual([
            "_01, _10",
        ].map(String))

    })

    it('works for ternary', () => {
        const connect = chordConnector(2, 3, ternary('_0'),ternary('_21'))
        expect(connect.map(String)).toEqual([
            "_01, _10",
            "_12, _21",
        ].map(String))
    })
})

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

    it('keeps out dups for binary', () =>{
        const enumerate = enumerateBetween(binary('_00'), binary("1_0"))
        expect(enumerate(2,4).map(stringify)).toEqual([
            binary('_0001'),
            binary('_0010'),
            binary('_0011'),
            binary('_0100'),
            //binary('_0101'),
            binary('_0110'),
            binary('_0111'),
        ].map(stringify))
    })

    it('works for ternary', () => {
        const enumerate = enumerateBetween(ternary('_01'), ternary('_20'))
        expect(enumerate(3, 2).map(stringify)).toEqual([
            ternary('_01'),
            ternary('_02'),
            ternary('_10'),
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
