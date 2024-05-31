var coll = document.getElementsByClassName("collapsible"); //Grabs all elements with the "collasible" class
var navBut = document.getElementById("bar-but"); // Grabs the button in the top left
var barList = document.getElementById("bar-list") // Grabs the list of links on the nav bar
var bar = document.getElementById("bar"); //Grabs the too bar
var i; //Counter Variable
var countClicks = [0,0,0,0,0]; //Counts clicks for sepereate buttons (sometimes if you click to fast it breaks buttons, so this is my way around it )
var disWidth = 1350; // Width that the nav bar will be changed at
var dropDownMenu = false; //Used to stop the dropdown menu disapearing during resizing

window.addEventListener('resize', topBarChange);  //Runs the top bar change function when the window is resized
if (window.innerWidth < disWidth){ // Checks what mode the bar should intially be in
  topBarChange()
}
for (i = 0; i < coll.length; i++) { //Current Progress Collapsibles (smooth)
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } 
    else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
function navDropDown(){ //Changes all of the elements that have to do with the nav bar dropping down
  if (countClicks[0] % 2 == 0){ //Activates Dropdown
    bar.style.height = 100 + "vh";
    document.getElementById("tda-logo").style.display = "none";
    document.getElementById("copyright").style.display = "none";
    document.getElementById("bar-but-cont").innerHTML = "X";
    document.getElementById("bar-drop-links").style.display = "block";
    document.getElementById("sub-list-1").style.display = "none";
    document.getElementById("sub-list-2").style.display = "none";
    document.getElementById("sub-list-3").style.display = "none";
    document.getElementById("sub-list-4").style.display = "none";
    dropDownMenu = true;
  }
  else if (countClicks[0] % 2 == 1){//Deactivates Dropdown
    bar.style.height = 100 + "px";
    document.getElementById("tda-logo").style.display = "";
    document.getElementById("copyright").style.display = "";
    document.getElementById("bar-but-cont").innerHTML = "&#8801;";
    document.getElementById("bar-drop-links").style.display = "none";
    dropDownMenu = false;
  }
     
  countClicks[0] +=1;
}
function subNavDropDown(spec){ //Activates the sub menus on the dropdown nav bar
  if(countClicks[spec] % 2 == 0){ // Activates submenu
    document.getElementById("sub-list" + "-" + spec).style.display = "";
  }
  else if(countClicks[spec] % 2 == 1){ // Deactivates submenu
    document.getElementById("sub-list" + "-" + spec).style.display = "none";
  }
  countClicks[spec] +=1;
}
function topBarChange(){ //Changes the nav bar mode depending on what size the window is
  if(window.innerWidth < disWidth && !dropDownMenu ){ // Hides if to small
    barList.style.display = "none";
    navBut.style.display = "block";
}
  else if(window.innerWidth >= disWidth && !dropDownMenu ){ //Reveals if large enough
    barList.style.display = "block";
    navBut.style.display = "none";
  }

}