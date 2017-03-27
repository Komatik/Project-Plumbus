function Dinge(column, row, bomb){
    this.flipped = false
    this.column = column,
    this.row = row,
    this.bomb = bomb || false,
    this.flagged = false,
    this.count = 0;
}

Dinge.prototype.clicked = function(field)
    {
        if (this.bomb)
            {
                this.flipped = true;
                return "💣";
            }
        else
            {
                if(this.row==field[0].length-1){var isMaxR=this.row}else{var isMaxR=this.row+1}
                if(this.column==field.length-1){var isMaxC=this.column}else{var isMaxC=this.column+1}

                for (var i = Math.max(this.row-1, 0);i <= isMaxR; i++)//Rij doorlopen
                    { 
                        for (var p= Math.max(this.column-1, 0); p <= isMaxC; p++)
                            {
                                if (field[i][p].bomb)
                                    {
                                        this.count = this.count+1;
                                    }
                            }
                    }
                if(this.count==0)
                    {
                        
                    } 
                else 
                {
                    this.flipped = true
                    return this.count;
                }
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
        for(var i = 0; i < this.rows; i++)
            {
                this.field[i] = new Array(this.rows);
                for (var j = 0; j < this.cols; j++)
                        {
                            this.field[i][j] = new Dinge(j, i);
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