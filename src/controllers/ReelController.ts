import {ReelModel} from '../models/ReelModel';
import {ReelView} from '../views/ReelView';

export class ReelController {
    model: ReelModel;
    view: ReelView;
    running: boolean;

    constructor(model: ReelModel, view: ReelView) {
        this.model = model;
        this.view = view;
        this.running = false;
        this.initReel();
        this.initPlayButton();
        this.setSpins();
    }

    initReel() {
        this.view.addSymbolsToReel(this.view.reelContainer1, this.model.getTexts());
        this.view.addSymbolsToReel(this.view.reelContainer2, this.model.getTexts());
        this.view.setReelY(this.view.reelContainer2, this.model.getSymbolsNumber());
    }

    initPlayButton() {
        this.view.addPlayButton(this.model.getSymbolsNumber(), () => this.startPlay());
    }

    setSpins() {
        this.view.setSpins(this.model.getSpins())
    }

    startPlay() {
        if (this.running) return;
        this.running = true;

        const spins = this.model.getSpins();
        const totalDistance = this.view.SYMBOL_SIZE * this.model.symbolsNumber * spins;
        const targetY = totalDistance + this.view.getReelPosition() + this.view.SYMBOL_SIZE * (this.model.symbolsNumber - this.model.getSelectedSymbolIndex()) + this.view.SYMBOL_SIZE;

        this.view.animateReel(targetY, () => this.updateContainersPosition(), () => {
            this.running = false;
        });
    }

    updateContainersPosition() {
        this.view.updateContainersPosition(this.model.getSymbolsNumber());
    }
}