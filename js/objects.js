function Dinge(column, row, parent, bomb){
    this.parent = parent,
    this.flipped = false,
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
                this.parent.bombCount--
                this.flipped = true;
                this.count = "💣";
            }
        if(this.count==0){ testRond(this, field) }
        if(this.count==0)
            {
                var empties = [this]
                for(var i = 0;i < empties.length;i++)
                    {
                        testRond(empties[i], field, true, empties)
                    }
                    return empties
            } 
        return [this];    
            
    }

Dinge.prototype.rightclicked = function()
    {
        this.flagged = !this.flagged
    }

function Board(cols, rows, bombs){
    this.cols = cols,
    this.rows = rows,
    this.bombs = bombs,
    this.bombCount = bombs,
    this.field = new Array(this.cols);
    this.create = function(){
        for(var i = 0; i < this.rows; i++)
            {
                this.field[i] = new Array(this.rows);
                for (var j = 0; j < this.cols; j++)
                        {
                            this.field[i][j] = new Dinge(j, i, this);
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

function testRond(self, field, fromLeeg = false, array){
    if(self.row==field[0].length-1){var isMaxR=self.row}else{var isMaxR=self.row+1}
    if(self.column==field.length-1){var isMaxC=self.column}else{var isMaxC=self.column+1}

    for (var i = Math.max(self.row-1, 0);i <= isMaxR; i++)//Rij doorlopen
        { 
            for (var p= Math.max(self.column-1, 0); p <= isMaxC; p++)
                {
                    if(fromLeeg){
                        testRond(field[i][p],field)
                        if (self.count==0 && objectTest(field[i][p], array)){ array.push(field[i][p]) }
                    } else {
                        if (field[i][p].bomb && self.flipped == false){ self.count = self.count+1 }
                    }
                }
        }
        self.flipped=true
}

function objectTest(test, arr){
    for(var i = 0;i < arr.length;i++){
        if(arr[i].row == test.row && arr[i].column == test.column){ return false }
    }
    return true
}