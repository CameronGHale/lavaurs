import { Chord, Chords, Fractions } from 'laminations-lib';

export class ChordTree {
    public children: ChordTree[] = []
    constructor(public chord: Chord) { }


    public addChild(newChild: ChordTree) {
        //check if needs to be handed down 

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i]
            if (child.contains(newChild)) {
                return child.addChild(newChild)
            }
            if (newChild.contains(child)) {
                this.children[i] = newChild
                return newChild.addChild(child)
            }
        }
        return this.children.push(newChild)
    }


    contains(node: ChordTree): boolean {
        return Chords.contains(this.chord, node.chord.lower)
            && Chords.contains(this.chord, node.chord.upper)
    }
}

const zeroChord = Chords.create(Fractions.parse(2, "_"), Fractions.parse(2, "_"))
export class ChordTreeRoot extends ChordTree {
    constructor() {
        super(zeroChord)
    }

    contains(node: ChordTree): boolean {
        return true
    }
}
