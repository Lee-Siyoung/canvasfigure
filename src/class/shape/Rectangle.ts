import { State } from "../utils/State";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    state: State,
    width: number,
    height: number
  ) {
    super(id, x, y, isClick, color, state);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.isClick) {
      this.drawHandle(ctx);
    }
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    this.state.selectionHandles = [];

    // top left, middle, right
    this.state.selectionHandles.push({ x: this.x - 4, y: this.y - 4 });
    this.state.selectionHandles.push({
      x: this.x + this.width / 2 - 2,
      y: this.y - 4,
    });
    this.state.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y - 4,
    });

    // middle left
    this.state.selectionHandles.push({
      x: this.x - 4,
      y: this.y + this.height / 2 - 4,
    });

    // middle right
    this.state.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y + this.height / 2 - 4,
    });

    // bottom left, middle, right
    this.state.selectionHandles.push({
      x: this.x - 4,
      y: this.y + this.height - 4,
    });
    this.state.selectionHandles.push({
      x: this.x + this.width / 2 - 4,
      y: this.y + this.height - 4,
    });
    this.state.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y + this.height - 4,
    });

    ctx.strokeStyle = "#778899";
    ctx.lineWidth = 3;
    this.state.selectionHandles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, 8, 8);
    });
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  isPointInside(x: number, y: number): boolean {
    const shape_left = this.x;
    const shape_right = this.x + this.width;
    const shape_top = this.y;
    const shape_bottom = this.y + this.height;
    return (
      x > shape_left && x < shape_right && y > shape_top && y < shape_bottom
    );
  }
  clone(): Shape {
    return new Rectangle(
      this.id,
      this.x,
      this.y,
      this.isClick,
      this.color,
      this.state,
      this.width,
      this.height
    );
  }
}
