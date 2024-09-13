import {Application, Container, Graphics, Text, TextStyle} from "pixi.js";
import {ReelModel} from "../models/ReelModel";

export class ReelView {
    app: Application;
    reel: Container;
    reelContainer1: Container;
    reelContainer2: Container;
    SYMBOL_SIZE: number;
    style: TextStyle;
    model: ReelModel;

    constructor(app: Application, SYMBOL_SIZE: number, model: ReelModel) {
        this.app = app;
        this.SYMBOL_SIZE = SYMBOL_SIZE;
        this.model = model;
        this.reel = new Container();
        this.reelContainer1 = new Container();
        this.reelContainer2 = new Container();
        this.reelContainer2.y = this.reelContainer1.y - SYMBOL_SIZE * this.model.getSymbolsNumber();
        this.reel.addChild(this.reelContainer1);
        this.reel.addChild(this.reelContainer2);
        this.style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });

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
            const symbol = new Text(texts[i], this.style);
            symbol.x = (this.SYMBOL_SIZE - symbol.width) / 2;
            symbol.y = i * this.SYMBOL_SIZE;
            container.addChild(symbol);
        }
    }

    getReelPosition() {
        return this.reel.y;
    }
}