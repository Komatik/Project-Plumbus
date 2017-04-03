'use strict';

var ds_html = document.getElementById( 'twee' );          // container div
var ds_labels = ds_html.getElementsByTagName( 'label' );  // array of labels 
var ds_label_x = window.innerWidth / 2;

var ds_ObjList = [];

/*
    ============ functions ============
*/
function ds_Label( x ){
    this.x = x;
    this.interval = '';
}

function ds_createLabel(){
    for (var i = 0; i < ds_labels.length; i++){
        ds_ObjList.push(new ds_Label(ds_label_x));
    }
}



function ds_motion( element, obj ){
    obj.x+10;
    element.style.left = obj.x+'px'
}

// UPDATE
function ds_update(){
    for(var i = 0; i < ds_labels.length; i++){
        ds_motion( ds_labels[ i ], ds_ObjList[ i ] )
    }
    console.log( ds_ObjList[ 0 ], ds_ObjList[ i ] );
}

// set timer
var ds_time = setInterval( ds_update, 1000 )



// ============ TEST ============

