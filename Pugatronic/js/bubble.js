'use strict';

var canvas = document.getElementById('boil');
var ctx = canvas.getContext('2d');


// temporary settings
canvas.style.position = 'absolute';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 3;

// js obj

function Bubble( x, y, s ) {
    this.x = x;
    this.y = y;
    this.s = s;
    var self = this;
    
    setInterval( function(){
        if (self.y > 0){
            self.y--;
        }
        else{
            self.s = Math.floor( Math.random() * 50 );
            self.y = canvas.offsetHeight + 500;
            self.x = Math.floor( Math.random() * canvas.offsetWidth + 1 )
        }
        update();
    }, Math.floor(Math.random() * ( self.s > 100 ? 1000  : 50  ) ));
    
}

Bubble.prototype.drawBubble = function () {

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
    //ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.strokeStyle = '#fff'
    ctx.stroke();
    ctx.closePath();

} // end drawBubble

var bubbles = []

for( var i = 0; i < 15; i++ ){
    var rx = Math.floor( Math.random() * canvas.offsetWidth + 1 );
    var ry =  Math.floor( canvas.offsetHeight + (Math.random()* 900) );
    var rs = Math.floor( Math.random() * 50 )
    bubbles.push(
        new Bubble( rx, ry, rs )
    )
}

// update function 
function update() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height); // clears canvas

    for (var i = 0; i < bubbles.length; i++) {   
        bubbles[i].drawBubble();
    }
}
