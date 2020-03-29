function sectiune1(){
    document.getElementById("url").innerHTML=location.href;
    document.getElementById("brow").innerHTML=""+navigator.appName+" "+navigator.appVersion;
    document.getElementById("os").innerHTML=navigator.platform;
    navigator.geolocation.getCurrentPosition(showCoords,geoError);

}

function showCoords(position){
    document.getElementById("loc").innerHTML="Latitudine: "+position.coords.latitude+
    "<br>Longitudine: "+position.coords.longitude;
}

function geoError(error){
    document.getElementById("loc").innerHTML="Unable to find location";
}

function ceas(){
    var data=new Date();
    var ora=data.getHours();
    var minute=data.getMinutes();
    var secunde=data.getSeconds();

    minute=(minute<10 ? "0" : "" ) + minute;
    secunde=(secunde<10 ?"0" : "") + secunde;

    var timpulZilei=(ora<12)?"AM":"PM";
    ora=(ora>12)?ora-12:ora;
    ora=(ora==0)?12:ora;

    var sirData=ora+":"+minute+":"+secunde+" "+timpulZilei;

    document.getElementById("ora").innerHTML=sirData;

    var zi=data.getUTCDate();
    var luna=data.getUTCMonth()+1;
    var an=data.getUTCFullYear();

    var day=zi+"/"+luna+"/"+an;

    document.getElementById("data").innerHTML=day;
}

function generareNr(){
    var i,x,r,offs;
    var nr=[];
    var contor=0;
    offs="A".charCodeAt(0);
    for(i=0;i<8;i++){
        x=document.getElementById(i).value;
        nr[i]=x.toString();
    }
    
    for(i=0;i<8;i++){
        x=parseInt((Math.random()*255));
        c=parseInt(x/16);

        c=(c>9)?String.fromCharCode(offs+(c-10)):""+c;
        r=x%16;
        r=(r>9)?String.fromCharCode(offs+(r-10)):""+r;
        var sir=c+""+r;
        document.getElementById(i+8).setAttribute("value",x.toString()+"="+sir);

        if(nr.includes(sir))
        {
            contor++;
        }
    }

    alert("Ati introdus "+contor+" numere corecte!!!");
}
var rectangle=0;
function plot_rect(){
    
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var c1=document.getElementById("c1").value;
    var c2=document.getElementById("c2").value;
    if(rectangle==0){
        clx=event.clientX-c.offsetLeft;
        cly=event.clientY-c.offsetTop+window.scrollY;
        ctx.moveTo(clx,cly);
        rectangle++;
    }
    else{
        ulx=event.clientX-c.offsetLeft;
        uly=event.clientY-c.offsetTop+window.scrollY;
        ctx.beginPath();
        ctx.moveTo(ulx,uly);
        ctx.rect(clx,cly,ulx-clx,uly-cly);
        ctx.lineWidth="4"
        ctx.strokeStyle=c1;
        ctx.stroke();
        ctx.fillStyle=c2;
        ctx.fill();
        rectangle=0;
        
    }
}

function addCol(){
    val=parseInt(document.getElementById("txt").value);
    table=document.getElementById("myTable");
    
    head=document.getElementById("myTable").getElementsByTagName("thead")[0];
    body=document.getElementById("myTable").getElementsByTagName("tbody")[0];
    culoare=document.getElementById("tabc").value;
    if(val==head.firstElementChild.children.length){
    var th=document.createElement("th");
    
    th.innerHTML="coloana";

    th.style.background=culoare;

    head.firstElementChild.appendChild(th);

    var c=body.children;
    for(var i=0;i<c.length;i++){
        var td=document.createElement("td");
    
        
        td.style.background=culoare;
        c[i].appendChild(td);
    }
}
    else if(val>=1 && val <head.firstElementChild.children.length){
        var th=document.createElement("th");
    
    th.innerHTML="coloana";
    th.style.background=culoare;
    
    var childh=head.firstElementChild.children[val];
    head.firstElementChild.insertBefore(th,childh);

    var c=body.children;
    for(var i=0;i<c.length;i++){
        var td=document.createElement("td");
        
        td.style.background=culoare;
        var childb=c[i].children[val];
        c[i].insertBefore(td,childb);
    }
    }
    else{
        alert("Numarul introdus nu este bun! Numerotarea coloanelor incepe de la 1!");
    }

}


function addRow(){
    val=parseInt(document.getElementById("txt").value);
    table=document.getElementById("myTable");
    
    head=document.getElementById("myTable").getElementsByTagName("thead")[0];
    body=document.getElementById("myTable").getElementsByTagName("tbody")[0];
    culoare=document.getElementById("tabc").value;
    
        var tr=document.createElement("tr");
        var th=document.createElement("th");
        th.innerHTML="rand";
        th.style.background=culoare;
        tr.appendChild(th);
        var nrCol=head.firstElementChild.children.length-1;
        for(var i=0;i<nrCol;i++){
            var td=document.createElement("td");
            
            td.style.background=culoare;
            tr.appendChild(td);
        }
        var childtr=body.children[val-1];
        if(val>=1 && val<=body.children.length){
        body.insertBefore(tr,childtr);
        }
    else if(val==body.children.length+1){
        body.appendChild(tr);
    }
    else{
        alert("Numarul introdus nu este bun! Numerotarea coloanelor incepe de la 1!");
    }
}


