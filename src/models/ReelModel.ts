export class ReelModel {
    texts: string[];
    symbolsNumber: number;
    selectedSymbolIndex: number;

    constructor(symbolsNumber: number, selectedSymbolIndex: number) {
        this.symbolsNumber = symbolsNumber;
        this.selectedSymbolIndex = selectedSymbolIndex;
        this.texts = [];
        for (let i = 0; i < symbolsNumber; i++) {
            this.texts.push('row_' + i);
        }
    }

    getTexts() {
        return this.texts;
    }

    getSymbolsNumber() {
        return this.symbolsNumber;
    }

    getSelectedSymbolIndex() {
        return this.selectedSymbolIndex;
    }
}