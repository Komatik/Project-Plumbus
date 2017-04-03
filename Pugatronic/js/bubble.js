'use strict';
/*
    * GUIDE 
    *   Scene Obj
    *   Bubble obj 
    * 
    ====  Scene ====

     1) first create a new screen and set the 'id' of your canavs as parameter
        for your scene. You can also define a width and height but is not necessary.

            examp: var foo = new Scene( 'myCanvas', width, height );

     2) To create a scene use createScene() if you leave the function parameter empty, 
        the scene will use your default values for hight and width if you set it to 'true' the scene will be fullScreen.

            examp: foo.createScene() // default values for hight and width 
               or: foo.createScene( true ) // fullScreen and set to absolute
     


      ====  Bubble ====
*/

var windowView = document.getElementById( 'background' )
var canvas = new Scene( null, windowView.offsetWidth, windowView.offsetHeight  )

// ========== Setup  ==========



window.onload = function (){
    canvas.createScene();

    // Xpos, Ypos, Straal, Widthstroke, Color
    var bube = new Bubble ( canvas.ctx , 100, 100 );
    bube.drawBubble()

};

// ========== Function ==========
    var bubbleCollection = [];
    
    function update(){
        canvas.ctx.clearRect( 0, 0, canvas.width, canvas.height );

        var bub = new Bubble ( canvas.ctx , 100, 100 );
        bub.drawBubble()

    };

    var bubbleTimer = setInterval( update,  100 )


// ========== Event's ==========




// ========== Scene Obj ==========

function Scene( id, w, h ){
    if( typeof id !== 'string' ){
        let canvas =  document.getElementById('background').insertBefore( document.createElement( 'canvas' ), document.getElementById('background').firstChild )
        this.screen = canvas;
    } else {
        this.screen = document.getElementById( id ) || document.getElementsByTagName( 'canvas' )[ 0 ];
    }
    this.ctx = this.screen.getContext( '2d' );
    this.width = w || this.screen.width;
    this.height = h || this.screen.height;
    this.position = 'absolute';
 }

Scene.prototype.createScene = function ( fullScreen ){

    if( fullScreen == true ){

        this.screen.style.position = this.position;
        this.screen.width = window.innerWidth;
        this.screen.height = window.innerHeight;
        // change defaults to new data
        this.width = window.innerWidth;
        this.height = window.innerHeight;

    } else{

        this.screen.width = this.width;
        this.screen.height = this.height;

    }
}

// ========== Bubble Obj ==========

function Bubble( ctx, x, y, s, w, c ){

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.s = s || window.innerWidth / 30;
    this.w = w || 3; 
    this.c = c || '#fff';

}

Bubble.prototype.drawBubble = function(){

    this.ctx.beginPath();
    this.ctx.arc( this.x, this.y, this.s, 0, 2 * Math.PI );
    this.ctx.strokeStyle = this.c
    this.ctx.lineWidth = this.w;
    this.ctx.stroke();
    this.ctx.closePath();
    console.log('bubble')
}

Bubble.prototype.behaviour = function(){

}

Bubble.prototype.move = function(){
    
}