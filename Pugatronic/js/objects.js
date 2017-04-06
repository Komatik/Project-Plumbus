function Dinge(column, row, parent, bomb){
    this.parent = parent,
    this.flipped = false,
    this.column = column,
    this.row = row,
    this.bomb = bomb || false,
    this.flagged = ""
    this.count = 0;
}

Dinge.prototype.clicked = function(field)
    {   
        save(this)
        if(this.flagged===""){
            if(this.parent.time==0){ this.parent.start() }
            if (this.bomb)
                {
                    for(var i=0;i<field.length;i++){
                        for(var j=0;j<field[i].length;j++){
                            field[i][j].flipped=true; 
                            field[i][j].flagged="lost";
                        }
                    } 
                    this.parent.stop()
                    this.count = "💣";
                }
            if(this.count==0){ testRond(this, field) }
            if(this.count==0)
                {
                    var empties = [this]
                    for(var i = 0;i < empties.length;i++)
                        {
                            testRond(empties[i], field, true, empties)
                            empties[i].flipped=true
                        }
                        testWin(field)
                        return empties
                } else{ this.flipped=true }
                testWin(field)
            return [this];    
        } else { return [] }
    }

Dinge.prototype.rightclicked = function()
    {
        if(!this.flipped){
            this.flagged=="" ? (this.flagged="f",this.parent.bombCount-= this.parent.bombCount!=0?1:0) : this.flagged=="f" ? this.flagged="q" : (this.flagged="",this.parent.bombCount+= this.parent.bombCount!=this.parent.bombs?1:0) ; 
        } else { this.flagged=false } 
    }

function Board(rows, cols, bombs){
    this.cols = cols,
    this.rows = rows,
    this.bombs = bombs,
    this.time = 0,
    this.start = ()=>{this.interval = setInterval(()=>{this.time+=0.1},100)},
    this.interval,
    this.stop = ()=>{clearInterval(this.interval)},
    this.bombCount = bombs,
    this.field = new Array(this.cols);
    this.won = false,
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
                var hor = Math.floor( Math.random() * this.cols);
                var col = Math.floor( Math.random() * this.rows);
                
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
    if(self.row==field.length-1){var isMaxR=self.row}else{var isMaxR=self.row+1}
    if(self.column==field[0].length-1){var isMaxC=self.column}else{var isMaxC=self.column+1}
    
    for (var i = Math.max(self.row-1, 0);i <= isMaxR; i++)//Rij doorlopen
        { 
            for (var p= Math.max(self.column-1, 0); p <= isMaxC; p++)
                {
                    if(fromLeeg){
                        if(field[i][p].count==0){ testRond(field[i][p],field) }
                        if (self.count==0 && objectTest(field[i][p], array)){ array.push(field[i][p]); self.flipped=true;
                        } else { self.flipped=true }
                    } else {
                        if (field[i][p].bomb && self.flipped == false){ self.count = self.count+1; }
                    }
                }
        }
}

function objectTest(test, arr){
    for(var i = 0;i < arr.length;i++){
        if(arr[i].row == test.row && arr[i].column == test.column){ return false }
    }
    return true
}

function testWin(f){
    var teller = 0
    for (var i=0;i<f.length;i++){
        for(var j=0;j<f[0].length;j++){
            if(f[i][j].flipped==true){ teller++ }
        }
    }

    if(teller==(f[0][0].parent.rows*f[0][0].parent.cols)-f[0][0].parent.bombs){
        f[0][0].parent.won=true
        for(var i=0;i<f.length;i++){
            for(var j=0;j<f[i].length;j++){
                f[i][j].flipped=true; 
                f[i][j].flagged="lost";
            }
        }
    }
}

function save(obj){
    var board = {
        cols: obj.parent.cols,
        rows: obj.parent.rows,
        bombs: obj.parent.bombs,
        time: parseInt(obj.parent.time*10)/10,
        bombCount: obj.parent.bombCount
    }
    
    var field = new Array(parseInt(board.rows))
    for(var i=0;i<field.length;i++){ field[i] = new Array(parseInt(board.cols)) }
    console.log(field)
    if (localStorage) {
        localStorage.setItem('board', JSON.stringify(board));
    } else {
        alert('Your browser does not support local storage.')
    }
}