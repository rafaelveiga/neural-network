import NeuralNetwork from "./NeuralNetwork";
import Renderer from "./Renderer";
import { Trainer } from "./Trainer";

const nn = new NeuralNetwork(64, 64, 10, [0.9, 0.5]);
const trainer = new Trainer(nn, [0.9, 0.5], [0.1, 0.9]);

new Renderer(trainer);
