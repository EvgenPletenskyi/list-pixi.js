export class ReelModel {
    texts: string[];
    symbolsNumber: number;
    selectedSymbolIndex: number;
    spins: number;

    constructor(symbolsNumber: number, selectedSymbolIndex: number, spins: number) {
        this.symbolsNumber = symbolsNumber;
        this.selectedSymbolIndex = selectedSymbolIndex;
        this.texts = [];
        this.spins = spins
        for (let i = 0; i < symbolsNumber; i++) {
            this.texts.push('row_' + i);
        }
    }

    getTexts() {
        return this.texts;
    }

    getSymbolsNumber(): number {
        return this.symbolsNumber;
    }

    getSelectedSymbolIndex(): number {
        return this.selectedSymbolIndex;
    }

    getSpins(): number {
        return this.spins;
    }
}