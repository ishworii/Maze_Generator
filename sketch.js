var cols, rows;
var w = 40;
var grid = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);

  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      cell = new Cell(x, y);
      grid.push(cell);
    }
  }
}

function draw() {
  background(51);
  for (var i = 0; i<grid.length;i++){
    grid[i].show();
    }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true,true,true,true];

  this.show = function()
  {
    x = this.i*w;
    y = this.j *w;
    if (this.walls[0])
    {
      line(x,y,x+w,y);
    }
    if (this.walls[1])
    {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2])
    {
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3])
    {
       line(x,y+w,x,y);
    }

  }

}
