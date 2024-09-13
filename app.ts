import {Application} from "pixi.js";
import {ReelModel} from "./src/models/ReelModel";
import {ReelView} from "./src/views/ReelView";
import {ReelController} from "./src/controllers/ReelController";

const app = new Application({ width: 600, height: 400 });
document.body.appendChild(app.view);
globalThis.__PIXI_APP__ = app;

const model = new ReelModel(10, 9);
const view = new ReelView(app, 100, model);
const controller = new ReelController(model, view);
