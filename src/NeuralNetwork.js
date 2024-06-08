import Neuron from "./Neuron";

export default class NeuralNetwork {
  constructor(inputs, hidden, outputs, inputsData) {
    this.inputs = inputs;
    this.hidden = hidden;
    this.outputs = outputs;

    this.setupHiddenLayer();
    this.setupOutputLayer();

    this.result = this.feedForward(inputsData);
    this.inputsData = inputsData;
  }

  setupHiddenLayer() {
    const weightsInputToHidden = Array(this.hidden)
      .fill(0)
      .map(() => {
        return Array(this.inputs)
          .fill(0)
          .map(() => Math.random());
      });

    const biasHidden = Array(this.hidden)
      .fill(0)
      .map(() => Math.random());

    this.hiddenLayerNeurons = weightsInputToHidden.map((weights, i) => {
      return new Neuron(weights, biasHidden[i]);
    });
  }

  setupOutputLayer() {
    const weightsHiddenToOutput = Array(this.outputs)
      .fill(0)
      .map(() => {
        return Array(this.hidden)
          .fill(0)
          .map(() => Math.random());
      });

    const biasOutput = Array(this.outputs)
      .fill(0)
      .map(() => Math.random());

    this.outputLayerNeurons = weightsHiddenToOutput.map((weights, i) => {
      return new Neuron(weights, biasOutput[i]);
    });
  }

  feedForward(inputs) {
    const hiddenLayerOutputs = this.hiddenLayerNeurons.map((neuron) =>
      neuron.feedForward(inputs)
    );

    return this.outputLayerNeurons.map((neuron) =>
      neuron.feedForward(hiddenLayerOutputs)
    );
  }
}
