import { Shape } from "./shape";

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    isClick: boolean,
    width: number,
    height: number
  ) {
    super(x, y, isClick);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
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
}

export class Triangle extends Shape {
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    isClick: boolean,
    width: number,
    height: number
  ) {
    super(x, y, isClick);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.stroke();
  }
  isPointInside(x: number, y: number): boolean {
    const aPoint = { x: this.x, y: this.y };
    const bPoint = { x: this.x - this.width, y: this.y + this.height };
    const cPoint = { x: this.x + this.width, y: this.y + this.height };

    const areaOrig =
      (-bPoint.y * cPoint.x +
        aPoint.y * (-bPoint.x + cPoint.x) +
        aPoint.x * (bPoint.y - cPoint.y) +
        bPoint.x * cPoint.y) /
      2;
    const sign = areaOrig < 0 ? -1 : 1;
    const area1 =
      (aPoint.y * cPoint.x -
        aPoint.x * cPoint.y +
        (cPoint.y - aPoint.y) * x +
        (aPoint.x - cPoint.x) * y) *
      sign;
    const area2 =
      (aPoint.x * bPoint.y -
        aPoint.y * bPoint.x +
        (aPoint.y - bPoint.y) * x +
        (bPoint.x - aPoint.x) * y) *
      sign;
    return area1 > 0 && area2 > 0 && area1 + area2 < 2 * areaOrig * sign;
  }
}

export class Circle extends Shape {
  radius: number;

  constructor(x: number, y: number, isClick: boolean, radius: number) {
    super(x, y, isClick);
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  isPointInside(x: number, y: number): boolean {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
  }
}
