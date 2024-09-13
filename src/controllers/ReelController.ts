import { ReelModel } from '../models/ReelModel';
import { ReelView } from '../views/ReelView';
import { gsap } from 'gsap';
import {Text, TextStyle} from "pixi.js";
export class ReelController {
    model: ReelModel;
    view: ReelView;
    running: boolean;

    constructor(model: ReelModel, view: ReelView) {
        this.model = model;
        this.view = view;
        this.running = false;
        this.initReel();
    }

    initReel() {
        this.view.addSymbolsToReel(this.view.reelContainer1, this.model.getTexts());
        this.view.addSymbolsToReel(this.view.reelContainer2, this.model.getTexts());
        this.startGame();
    }

    startGame() {
        const playTextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'yellow',
        });

        const playText = new Text('Click to Spin!', playTextStyle);
        playText.x = (this.view.app.screen.width - playText.width) / 2;
        playText.y = this.view.app.screen.height - playText.height - this.model.symbolsNumber;
        playText.interactive = true;
        playText.buttonMode = true;
        playText.on('pointerdown', () => this.startPlay());
        this.view.app.stage.addChild(playText);
    }

    startPlay() {
        if (this.running) return;
        this.running = true;

        const spins = 4;
        const totalDistance = this.view.SYMBOL_SIZE * this.model.symbolsNumber * spins;
        const targetY = totalDistance + this.view.getReelPosition() + this.view.SYMBOL_SIZE * (this.model.symbolsNumber - this.model.getSelectedSymbolIndex()) + this.view.SYMBOL_SIZE;

        gsap.to(this.view.reel, {
            duration: 10,
            y: targetY,
            ease: "back.out(0.5)",
            onUpdate: () => this.updateContainersPosition(),
            onComplete: () => {
                this.running = false;
            },
        });
    }

    updateContainersPosition() {
        if (this.view.reelContainer1.y + this.view.getReelPosition() >= this.view.app.screen.height) {
            this.view.reelContainer1.y = this.view.reelContainer2.y - this.view.SYMBOL_SIZE * this.model.symbolsNumber;
        }

        if (this.view.reelContainer2.y + this.view.getReelPosition() >= this.view.app.screen.height) {
            this.view.reelContainer2.y = this.view.reelContainer1.y - this.view.SYMBOL_SIZE * this.model.symbolsNumber;
        }
    }
}