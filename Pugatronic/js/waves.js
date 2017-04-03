window.addEventListener("load",()=>
    {
        var ocean = document.getElementById("een"),
            waveWidth = 10,
            waveCount = Math.ceil(window.outerWidth/waveWidth)-1,
            docFrag = document.createDocumentFragment();

        for(var i = 0; i < waveCount; i++)
            {
                var wave = document.createElement("div");
                wave.className += " wave";
                docFrag.appendChild(wave);
                wave.style.left = i * waveWidth + "px";
                wave.style.webkitAnimationDelay = (i/100) + "s";
            }

        for(var p = 0; p < waveCount; p++)
            {
                var wave2 = document.createElement("div");
                wave2.className += " wavetwee";
                docFrag.appendChild(wave2);
                wave2.style.left = p * waveWidth + "px";
                wave2.style.webkitAnimationDelay = (p/100) + "s";
            }

        ocean.appendChild(docFrag);
    })