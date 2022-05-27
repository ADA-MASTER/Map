/* import { datas } from 'a .js file'; OR  a database table*/ //get coordinates of parcels

const side = document.getElementById("clicked")
const closenav = document.querySelector(".closebtn");

var x;
var y;

var svg = document.getElementById("mySvg");


// => for zoom events. "start"

let zoom = 1; // starting zoom level
const ZOOM_SPEED = 0.1; 

svg.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
        svg.style.transform = ` scale(${zoom += ZOOM_SPEED})`; //zoom in
    } else {
        svg.style.transform = `  scale(${zoom -= ZOOM_SPEED})`; //zoom out
    }
});

svg.addEventListener("mouseover", () => {
    document.querySelector(".body").style.overflow = "hidden"
})

svg.addEventListener("mouseout", () => {
    document.querySelector(".body").style.overflow = "auto"
})
// => for zoom events. "end"


// => for sidebar events. "start"
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

closenav.addEventListener("click", closeNav)
// => for sidebar events. "end"


// => for drag events. "start"
let signal = true;
function onDrag({ movementX, movementY }) {
    let getStyle = window.getComputedStyle(svg);
    let leftVal = parseInt(getStyle.left);
    let topVal = parseInt(getStyle.top);
    svg.style.left = `${leftVal + movementX}px`;
    svg.style.top = `${topVal + movementY}px`;
    signal = false;
}

svg.addEventListener("mousedown", () => {
    svg.addEventListener("mousemove", onDrag);
});

document.addEventListener("mouseup", () => {
    svg.removeEventListener("mousemove", onDrag);
});
// => for drag events. "end"


// => to create a parcel. "start"
for (let i = 0; i < datas.length; i++) {
    let parcelsSize = 3; //Increase to enlarge parcel size
    let parcelsDistance = 4; //Increase to move parcels away from each other. Decrease to move parcels closer together.
    x = datas[i].x * parcelsDistance; 
    y = datas[i].y * parcelsDistance;
    var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute("x", x); //X-axis of a parcel
    rect.setAttribute("y", y); //Y-axis of a parcel
    rect.setAttribute("stroke", "#ead1ad"); //frame color of a parcel
    rect.setAttribute("fill", datas[i].color); //color of a parcel
    rect.onmouseup = () => {  //To open the sidebar and for the information that will be in it
        if (signal) {
            openNav()
            //Add the information you want to appear on the sidebar inside "side.innerHTML" as a tag
            side.innerHTML = ` 
        <a href="#">X: ${datas[i].x}</a>
        <a href="#">Y: ${datas[i].y}</a>
        <a href="#">****</a>
        <a href="#">****</a>`
        }
    }
    rect.setAttribute("height", parcelsSize);
    rect.setAttribute("width", parcelsSize);
    svg.appendChild(rect);
}

// => to create a parcel. "end"


//To prevent the sidebar from opening while the map is being dragged
document.addEventListener("mouseup", () => {
    signal = true
});




