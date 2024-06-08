export default class Neuron {
  constructor(weights, bias) {
    this.weights = weights;
    this.bias = bias;
  }

  feedForward(inputs) {
    const sum = this.weights.reduce((acc, weight, i) => {
      return acc + weight * inputs[i];
    }, this.bias);

    return this.sigmoid(sum);
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
}
