function Dinge(column, row, bomb){
    //this.type
    this.column = column,
    this.row = row,
    this.bomb = bomb || false,
    this.flagged = false
}

Dinge.prototype.clicked = function()
    {
        if (this.bomb){
                return false;
            }
        else{
            {
                var count = 0;
                for (var i = -1; i < 3; i++)
                    {
                         for (var p = -1; p < 3; p++)
                            {
                                    console.log(i+''+p);             
                            }
                    }
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
    this.create = function(){   
    }
}