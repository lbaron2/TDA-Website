var coll = document.getElementsByClassName("collapsible"); //Grabs all elements with the "collapsible" class
var navBut = document.getElementById("bar-but"); // Grabs the button in the top left
var barList = document.getElementById("bar-list") // Grabs the list of links on the nav bar
var bar = document.getElementById("bar"); //Grabs the too bar

var countClicks = [0,0,0,0,0]; //Counts clicks for separate buttons (sometimes if you click to fast it breaks buttons, so this is my way around it )
var disWidth = 1350; // Width that the nav bar will be changed at
var dropDownMenu = false, logoTran = true, bigger = false, smaller = false; //Used to stop the dropdown menu disappearing during resizing

document.getElementById("sub-list-1").style.display = "none"; //Makes sure none of the menus are initially open;
document.getElementById("sub-list-2").style.display = "none";
document.getElementById("sub-list-3").style.display = "none";
document.getElementById("sub-list-4").style.display = "none";

function fireFoxAdjuster(){
  if(navigator.userAgent.includes("Firefox")){ // Checks if the browser is Firefox (not entirely reliable as people can get around it if they want)
    var elements = document.querySelectorAll('.cur-prog-title'); //Changes position of the words "current progress"
    elements.forEach(element => {
      element.classList.add("fox-shifted-1")
    });
    elements = document.querySelectorAll('.cur-act-title'); // Changes position of the current step in the goals
    elements.forEach(element => {
      element.classList.add("fox-shifted-2")
    });
  }
}
fireFoxAdjuster();

window.addEventListener('resize', topBarChange);  //Runs the top bar change function when the window is resized
if (window.innerWidth < disWidth){ // Checks what mode the bar should initially be in
  topBarChange();
}

for (var i = 0; i < coll.length; i++) { //Current Progress Collapsibles (smooth)
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    
    if (content.classList.contains("active")){
      content.style.maxHeight = "0px";
    } 
    else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
    let parentDropDown = this.parentNode.parentNode.parentNode;
    let parentClassList = Array.from(parentDropDown.classList);
    if(parentClassList.includes("col-cont")){
      parentDropDown.style.maxHeight = parentDropDown.scrollHeight +  content.scrollHeight + "px";
    }
    this.classList.toggle("active");
    content.classList.toggle("active");

  });
}

function subNavScroll(){//If the drop down menu is too big for the screen it can now be scrolled
  if(window.innerHeight < document.getElementById("drop-down-links").offsetHeight){ 
    bar.style.overflowY = "scroll";
  }
  else{
    bar.style.overflowY = "hidden";
  }
}

function navDropDown(){ //Changes all of the elements that have to do with the nav bar dropping down
  if (countClicks[0] % 2 == 0){ //Activates Dropdown
    bar.style.height = window.innerHeight + 10 + "px";
    barList.style.marginBottom = 20 + "px";
    document.getElementById("tda-logo-img-1").style.opacity = "0";
    document.getElementById("tda-logo-img-2").style.opacity = "0";
    document.getElementById("copyright").style.display = "none";
    document.getElementById("bar-but-cont").innerHTML = "X";
    document.getElementById("bar-drop-links").style.display = "block";
    navBut.style.left= window.innerWidth -60 + "px";
    dropDownMenu = true;
    subNavScroll();
  }
  else if (countClicks[0] % 2 == 1){//Deactivates Dropdown
    bar.style.height =  100 + "px";
    barList.style.marginBottom = 0 + "px";
    document.getElementById("copyright").style.display = "block";
    document.getElementById("bar-but-cont").innerHTML = "&#8801;";
    document.getElementById("bar-drop-links").style.display = "none";
    dropDownMenu = false;
    shrinkNav();
  }
     
  countClicks[0] +=1;//There to make sure if you click it a bunch it doesn't break (main website does)
}

function subNavDropDown(spec){ //Activates the sub menus on the dropdown nav bar
  if(countClicks[spec] % 2 == 0){ // Activates submenu
    document.getElementById("sub-list" + "-" + spec).style.display = "";
  }
  else if(countClicks[spec] % 2 == 1){ // Deactivates submenu
    document.getElementById("sub-list" + "-" + spec).style.display = "none";
  }
  countClicks[spec] +=1; //There to make sure if you click it a bunch it doesn't break (main website does)
  subNavScroll(); //Changes scroll behavior to fit situation 
}

function topBarChange(){ //Changes the nav bar mode depending on what size the window is
  navBut.style.left= window.innerWidth -60 + "px";
  if(window.innerWidth < disWidth && !dropDownMenu ){ // Hides if to small
    barList.style.display = "none";
    navBut.style.display = "block";
}
  else if(window.innerWidth >= disWidth && !dropDownMenu ){ //Reveals if large enough
    barList.style.display = "block";
    navBut.style.display = "none";
  }
}
function logoChange(){
 var smLogo = document.getElementById("tda-logo-img-2");
 var bgLogo = document.getElementById("tda-logo-img-1");

 if(smaller){//Changes from small to big logo
    smLogo.style.opacity =  "0";
    bgLogo.style.opacity = "1"
    smaller = false;
  }
  else if(bigger){//Changes from big to small logo
    bgLogo.style.opacity = "0";
    smLogo.style.opacity = "1"
    bigger = false;
  }
}

window.addEventListener("scroll", shrinkNav);
function shrinkNav(){ // Shrinks the nav bar to 
  if(window.scrollY > 170 && !dropDownMenu){ //Shrunken State
    bar.style.height = 60 + "px";
    barList.style.bottom = 35 + "px";
    navBut.style.top = 0 + "px";
    bigger = true;
    
    var elements = document.querySelectorAll('.hover-sub-menu'); //Moves the hover menus with the bar
    elements.forEach(element => { 
      element.classList.add("hover-taller")
    });
  }
  else if (window.scrollY <= 130 && !dropDownMenu){ // Normal Size
    bar.style.height = 100 + "px";
    navBut.style.top = 10 + "px";
    barList.style.bottom = 15 + "px";
    smaller = true;

    var elements = document.querySelectorAll('.hover-sub-menu');
    elements.forEach(element => { //Moves the hover menus with the bar
      element.classList.remove("hover-taller")
    });
  }
    logoChange()
}

