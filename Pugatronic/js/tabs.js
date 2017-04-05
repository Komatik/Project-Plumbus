'use strict';

var tabContainer = document.getElementById( 'menu' );

function clickAdjust( e ){
    switch ( e.path[ 1 ].className.split(' ')[ 0 ] ){
        case 'newGame': 
            setTabs( 'menuNewGame' );
        break;
        case 'continue': 
            setTabs( 'menuContinue' );
        break;
        case 'highscores': 
            setTabs( 'menuHighscores' );
        break;
    }
}

function setTabs( id ){
    var tabs = document.getElementById( 'menuContent' ).children;
    for( var i = 0; i < tabs.length; i++ ){

        if( tabs[ i ].id != id ){
            tabs[ i ].style.display = 'none'
        } else {
            tabs[ i ].style.display = 'flex'
        }   

    }
}

addEventListener('click', clickAdjust );