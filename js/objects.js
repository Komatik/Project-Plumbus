function Dinge(column, row, bomb){
    //this.type
    this.column = column,
    this.row = row,
    this.bomb = bomb || false,
    this.flagged = false,
    this.count = 0;
}

Dinge.prototype.clicked = function(rij, kolom, field)
    {
        if (this.bomb)
            {
                return false;
            }
        else
            {
             //Grootste van deze rij-1 en 0          //Kleinste van lengte v.d row en deze rij + 1
               for (var i = Math.max(this.row-1, 0); i <= Math.min(this.row+1, rij); i++)//Rij doorlopen
                    {  
                        for (var p= Math.max(this.column-1, 0); p <= Math.min(this.column+1, kolom); p++)
                            {
                                if (field[i][p].bomb)
                                    {
                                        this.count = this.count+1;
                                    }
                            }
                    }
                return this.count;
            }
    }
Dinge.prototype.rightclicked = function()
    {
        this.flagged = !this.flagged
    }

function Board(cols, rows, bombs){
    this.cols = cols,
    this.rows = rows,
    this.bombs = bombs,
    this.field = new Array(this.cols);
    this.create = function(){
        var tempBombs = [];
        for(var i = 0; i < this.rows; i++)
            {
                this.field[i] = new Array(this.rows);
                for (var j = 0; j < this.cols; j++)
                        {
                            this.field[i][j] = new Dinge(i, j);
                        }

            }
        for(var b = 0; b < this.bombs; b++)
            {
                var col = Math.floor( Math.random() * this.cols);
                var hor = Math.floor( Math.random() * this.rows);
                if (!this.field[col][hor].bomb)
                    {
                       this.field[col][hor].bomb = true;
                    
                    }
                else{
                    b--;
                }
            }
    }
}

var board = new Board(10, 10, 10);
board.create();

console.log(board.field[0][0].clicked(board.cols, board.rows, board.field));
console.log(board.field[1][1].clicked(board.cols, board.rows, board.field));
console.log(board.field[2][2].clicked(board.cols, board.rows, board.field));
console.log(board.field[3][3].clicked(board.cols, board.rows, board.field));
console.log(board.field[4][4].clicked(board.cols, board.rows, board.field));
console.log(board.field[5][5].clicked(board.cols, board.rows, board.field));
console.log(board.field[6][6].clicked(board.cols, board.rows, board.field));
console.log(board.field);