let cols, rows;
let w = 20;
let grid = [];
let current ;

function index(i,j)
{
    if(i<0 || j < 0 || i > cols-1 || j > rows-1)
    {
        return -1;
    }
    return i + j *cols;
}

function setup() {
  createCanvas(720, 560);
  //frameRate(5);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (let i = 0; i<grid.length;i++){
    grid[i].show();
    }
    current.visited  = true;
    current.highlight();
    // STEP 1
    let next = current.checkNeighbors();
    if (next)
    {
        next.visited = true;
        // STEP 3
        removeWalls(current,next);

    }
    // STEP 4
    console.log(current);
    current = next;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true,true,true,true];

  this.highlight = function()
  {
    x = this.i*w;
    y = this.j *w;
    noStroke();
    fill(0,255,0,100);
    rect(x,y,w,w);
  }

  this.checkNeighbors = function()
  {
    let neightbors = [];

    let top    = grid[index(i,j-1)];
    let right  = grid[index(i+1,j)];
    let bottom = grid[index(i,j+1)];
    let left   = grid[index(i-1,j)];

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
        r = floor(random(0,neightbors.length));
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
    stroke(255);
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
        noStroke();
        fill(255,0,255,100);
        rect(x,y,w,w);
    }

  }

}


function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
