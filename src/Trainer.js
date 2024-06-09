export class Trainer {
  constructor(nn) {
    this.nn = nn;
  }

  getNeuralNetwork() {
    return this.nn;
  }

  train(input, expectedOutput) {
    const result = this.nn.feedForward(input);

    const errors = expectedOutput.map((expectedOutput, i) => {
      return expectedOutput - result[i];
    });

    console.log(errors);
  }
}
