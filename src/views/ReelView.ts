import {Application, Container, Graphics, Text, TextStyle} from "pixi.js";
import {gsap} from "gsap";

export class ReelView {
    app: Application;
    reel: Container;
    reelContainer1: Container;
    reelContainer2: Container;
    SYMBOL_SIZE: number;
    symbolsStyle: TextStyle;
    playButtonStyle: TextStyle;
    running: boolean;
    spins: number;

    constructor(app: Application, SYMBOL_SIZE: number) {
        this.app = app;
        this.running = false;
        this.SYMBOL_SIZE = SYMBOL_SIZE;
        this.reel = new Container();
        this.reelContainer1 = new Container();
        this.reelContainer2 = new Container();
        this.reel.addChild(this.reelContainer1);
        this.reel.addChild(this.reelContainer2);
        this.symbolsStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });
        this.playButtonStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'yellow',
        })

        this.createReel();
    }

    createReel() {
        this.reel.x = (this.app.screen.width - this.SYMBOL_SIZE) / 2;
        this.reel.y = (this.app.screen.height - this.SYMBOL_SIZE * 3) / 2;

        const mask = new Graphics();
        mask.beginFill(0xFF3300);
        mask.drawRect(this.reel.x, this.reel.y, this.SYMBOL_SIZE, this.SYMBOL_SIZE * 3);
        mask.endFill();
        this.reel.mask = mask;
        this.app.stage.addChild(this.reel);
        this.app.stage.addChild(mask);
    }

    addSymbolsToReel(container: Container, texts: string[]) {
        for (let i = 0; i < texts.length; i++) {
            const symbol = new Text(texts[i], this.symbolsStyle);
            symbol.x = (this.SYMBOL_SIZE - symbol.width) / 2;
            symbol.y = i * this.SYMBOL_SIZE;
            container.addChild(symbol);
        }
    }

    setReelY(reelContainer: Container, symbolsNumber) {
        reelContainer.y = this.reelContainer1.y - this.SYMBOL_SIZE * symbolsNumber;
    }

    addPlayButton(symbolsNumber, onClick: () => void) {
        const playText = new Text('Click to Spin!', this.playButtonStyle);
        playText.x = (this.app.screen.width - playText.width) / 2;
        playText.y = this.app.screen.height - playText.height - symbolsNumber;
        playText.interactive = true;
        playText.buttonMode = true;
        playText.on('pointerdown', onClick);
        this.app.stage.addChild(playText);
    }

    animateReel(targetY: number, onUpdate: () => void, onComplete: () => void) {
        gsap.to(this.reel, {
            duration: 10,
            y: targetY,
            ease: "back.out(0.5)",
            onUpdate: onUpdate,
            onComplete: onComplete,
        });
    }

    updateContainersPosition(symbolsNumber: number) {
        if (this.reelContainer1.y + this.getReelPosition() >= this.app.screen.height) {
            this.reelContainer1.y = this.reelContainer2.y - this.SYMBOL_SIZE * symbolsNumber;
        }

        if (this.reelContainer2.y + this.getReelPosition() >= this.app.screen.height) {
            this.reelContainer2.y = this.reelContainer1.y - this.SYMBOL_SIZE * symbolsNumber;
        }
    }

    getReelPosition() {
        return this.reel.y;
    }

    setSpins(spins) {
        this.spins = spins;
    }
}