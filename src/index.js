import Canvas from "./Canvas";
import NeuralNetwork from "./NeuralNetwork";
import Renderer from "./Renderer";
import { Trainer } from "./Trainer";
import a from "./training-data/a.json";

const canvas = new Canvas();

const nn = new NeuralNetwork(
  64,
  5,
  26,
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]
);
const trainer = new Trainer(nn);

trainer.train(a.inputs[0], a.output);

new Renderer(trainer.getNeuralNetwork());
