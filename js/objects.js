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
                if(this.count==0){ testRond(this, field) }
                if(this.count==0)
                    {
                        var empties = [this]
                        for(var i = 0;i < empties.length;i++)
                            {
                                testLeeg(empties[i], empties, field)
                            }
                            return empties
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

function testRond(self, field){
    if(self.row==field[0].length-1){var isMaxR=self.row}else{var isMaxR=self.row+1}
    if(self.column==field.length-1){var isMaxC=self.column}else{var isMaxC=self.column+1}

    for (var i = Math.max(self.row-1, 0);i <= isMaxR; i++)//Rij doorlopen
        { 
            for (var p= Math.max(self.column-1, 0); p <= isMaxC; p++)
                {
                    if (field[i][p].bomb && self.flipped == false){ self.count = self.count+1 }
                }
        }
        self.flipped=true
}

function testLeeg(self, array, field){
    if(self.row==field[0].length-1){var isMaxR=self.row}else{var isMaxR=self.row+1}
    if(self.column==field.length-1){var isMaxC=self.column}else{var isMaxC=self.column+1}

    for (var i = Math.max(self.row-1, 0);i <= isMaxR; i++)//Rij doorlopen
        { 
            for (var p= Math.max(self.column-1, 0); p <= isMaxC; p++)
                {
                    testRond(field[i][p],field)
                    if (field[i][p].count==0 && objectTest(field[i][p], array)){ array.push(field[i][p]) }
                }
        }
}

function objectTest(test, arr){
    for(var i = 0;i < arr.length;i++){
        if(arr[i].row == test.row && arr[i].column == test.column){ return false }
    }
    return true
}