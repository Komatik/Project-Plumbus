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
            {       //Grootste van deze rij-1 en 0          //Kleinste van lengte v.d row en deze rij + 1
               for (var i = Math.max(this.row-1, 0); i <= Math.min(this.row+1, rij.length); i++)//Rij doorlopen
                    {
                        for (var p= Math.max(this.column-1, 0); p <= Math.min(this.column, kolom.length); p++)
                            {
                                if (field[i][p].bomb)
                                    {
                                        this.count++
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
        for(var i = 0; i < this.rows; i++)
            {
                this.field[i] = new Array(this.rows);
            }
        console.log(this.field);
    }
}

var b = new Board(10, 10, 10);
b.create();