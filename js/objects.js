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

        }
    }
Dinge.prototype.rightclicked = function()
    {
        this.flagged = !this.flagged
    }