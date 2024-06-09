export default class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");

    this.clearButton = document.getElementById("clear");
    this.exportButton = document.getElementById("export");

    this.ctx = this.canvas.getContext("2d");
    this.clickedCoords = [];
    this.mouseDown = false;

    // Event Listeners
    // =====================
    this.clearButton.addEventListener("click", () => {
      this.clearCanvas();
    });

    this.exportButton.addEventListener("click", () => {
      this.exportData();
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.onClick(x, y);
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.mouseDown = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.mouseDown) return;

      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.onClick(x, y, true);
    });

    // Setup
    // =====================
    this.drawGrid();
    this.drawSquares();
  }

  onClick(x, y, dragging = false) {
    const trueCoords = [Math.floor(x / 20), Math.floor(y / 20)];

    if (
      this.clickedCoords.some(
        (coords) => coords[0] === trueCoords[0] && coords[1] === trueCoords[1]
      )
    ) {
      if (dragging) {
        return;
      }
      this.clickedCoords = this.clickedCoords.filter(
        (coords) => coords[0] !== trueCoords[0] || coords[1] !== trueCoords[1]
      );
    } else {
      this.clickedCoords.push(trueCoords);
    }

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawSquares();
  }

  drawSquares() {
    this.clickedCoords.forEach((coords) => {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(coords[0] * 20, coords[1] * 20, 20, 20);
    });
  }

  drawGrid() {
    for (let x = 0; x < this.canvas.width; x += 20) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
    }

    for (let y = 0; y < this.canvas.height; y += 20) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
    }

    this.ctx.strokeStyle = "#ddd";
    this.ctx.stroke();
  }

  clearCanvas() {
    this.clickedCoords = [];
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
  }

  exportData() {
    const baseArray = new Array(64).fill(0);

    const data = baseArray.map((_, i) => {
      const x = i % 8;
      const y = Math.floor(i / 8);

      return this.clickedCoords.some(
        (coords) => coords[0] === x && coords[1] === y
      )
        ? 1
        : 0;
    });

    console.log(JSON.stringify(data));
  }
}
