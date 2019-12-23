var cols, rows;
var w = 40;
var grid = [];
var current ;

function index(i,j)
{
    if(i<0 || j < 0 || i > cols-1 || j > rows-1)
    {
        return -1;
    }
    return i + j *cols;
}

function setup() {
  createCanvas(400, 400);
  frameRate(5);
  cols = floor(width / w);
  rows = floor(height / w);

  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      cell = new Cell(x, y);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i<grid.length;i++){
    grid[i].show();
    }
    current.visited  = true;
    var next = current.checkNeighbors();
    if (next)
    {
        next.visited = true;
        current = next;
    }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true,true,true,true];

  this.checkNeighbors = function()
  {
    var neightbors = [];

    var top    = grid[index(i,j-1)];
    var right  = grid[index(i+1,j)];
    var bottom = grid[index(i,j+1)];
    var left   = grid[index(i-1,j)];

    if(top && !top.visited)
    {
        neightbors.push(top);
    }
    if(right && !right.visited)
    {
        neightbors.push(right);
    }
    if(bottom && !bottom.visited)
    {
        neightbors.push(bottom);
    }
    if(left && !left.visited)
    {
        neightbors.push(left);
    }

    if (neightbors.length > 0 )
    {
        r = floor(random(1,neightbors.length));
        return neightbors[r];
    }
    else
    {
        return undefined;
    }
  }

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
    if (this.visited)
    {
        fill(255,0,255,100);
        rect(x,y,w,w);
    }

  }

}
