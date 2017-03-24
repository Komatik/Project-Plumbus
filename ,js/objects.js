function Dinge(column, row, bomb, flagged, src){
    //this.type
    this.column = column,
    this.row = row,
    this.bomb = bomb || false,
    this.flagged = false,
    this.src = src
}

Dinge.prototype.clicked = function()
    {
        if (this.bomb){
                return false;
            }
        else{
            
        }
    }
Dinge.prototype.rightclicked = function()
    {
        this.flagged = !this.flagged
    }