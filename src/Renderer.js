export default class Renderer {
  constructor(nn) {
    this.nn = nn;
    this.HEIGHT = 1000;
    this.WIDTH = 1000;
    this.LAYERS = 3;
    this.NODE_SIZE = 5;

    this.canvas = document.getElementById("canvas");
    this.canvas.height = this.HEIGHT;
    this.canvas.width = this.WIDTH;
    this.ctx = this.canvas.getContext("2d");
    this.render();
  }

  render() {
    console.log("RENDERING NEURAL NETWORK", this.nn);

    Array(this.nn.inputs)
      .fill(0)
      .forEach((input, i, inputs) => {
        const x = (this.WIDTH / this.LAYERS) * 1 - this.WIDTH / this.LAYERS / 2;
        const y = (this.HEIGHT / (inputs.length + 1)) * (i + 1);

        this.drawConnections(x, y, this.nn.hiddenLayerNeurons, 2, i);
        this.drawNode(x, y);
      });

    this.nn.hiddenLayerNeurons.forEach((neuron, i, neurons) => {
      const x = (this.WIDTH / this.LAYERS) * 2 - this.WIDTH / this.LAYERS / 2;
      const y = (this.HEIGHT / (neurons.length + 1)) * (i + 1);

      this.drawConnections(x, y, this.nn.outputLayerNeurons, 3, i);
      this.drawNode(x, y, neuron.bias);
    });

    this.nn.outputLayerNeurons.forEach((neuron, i, neurons) => {
      const x = (this.WIDTH / this.LAYERS) * 3 - this.WIDTH / this.LAYERS / 2;
      const y = (this.HEIGHT / (neurons.length + 1)) * (i + 1);

      this.drawNode(x, y, neuron.bias);
    });

    this.drawResults();
    this.drawInputs();
  }

  drawResults() {
    this.nn.result.map((result, i) => {
      this.ctx.fillText(
        `Result ${i + 1}: ${result.toFixed(2)}`,
        (this.WIDTH / this.LAYERS) * 3 -
          this.WIDTH / this.LAYERS / 2 +
          this.NODE_SIZE +
          10,
        (this.HEIGHT / (this.nn.outputs + 1)) * (i + 1)
      );
    });
  }

  drawInputs() {
    this.nn.inputsData.map((input, i) => {
      this.ctx.fillText(
        input.toFixed(2),
        (this.WIDTH / this.LAYERS) * 1 -
          this.WIDTH / this.LAYERS / 2 -
          this.NODE_SIZE / 3,
        (this.HEIGHT / (this.nn.inputs + 1)) * (i + 1) + 4
      );
    });
  }

  drawNode(x, y, bias) {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";

    this.ctx.beginPath();

    if (!isNaN(bias)) {
      this.ctx.fillText(`b${bias.toFixed(2)}`, x - 15, y + 3);
    }
    this.ctx.arc(x, y, this.NODE_SIZE, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawLine(x1, y1, x2, y2, weight) {
    this.ctx.beginPath();

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = weight * 0.5;
    this.ctx.strokeStyle = weight > 0 ? "green" : "red";
    this.ctx.lineCap = "round";

    this.ctx.fillText(weight.toFixed(2), (x1 + x2) / 2, (y1 + y2) / 2);
    this.ctx.stroke();
  }

  drawConnections(
    initialX,
    initialY,
    nextLayerNeurons,
    toLayer,
    currentNodeIndex
  ) {
    nextLayerNeurons.forEach((neuron, i, neurons) => {
      const x =
        (this.WIDTH / this.LAYERS) * toLayer - this.WIDTH / this.LAYERS / 2;
      const y = (this.HEIGHT / (neurons.length + 1)) * (i + 1);

      this.drawLine(
        initialX + this.NODE_SIZE,
        initialY,
        x - this.NODE_SIZE,
        y,
        neuron.weights[currentNodeIndex]
      );
    });
  }
}
