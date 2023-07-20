let getIcon = document.getElementById("light-mode").innerHTML;
let getTheme = document.getElementById("main").className; /* getTheme == "dark-theme" */
var mobileMenu = document.getElementById("mobile-menu")

getTheme = localStorage.getItem("currentTheme");
getIcon = localStorage.getItem("currentIcon");
document.getElementById("light-mode").innerHTML = getIcon;
document.getElementById("main").className = getTheme;

function toggleIcon(){
  let initialText = localStorage.setItem("currentIcon", getIcon);

  if (document.getElementById("light-mode").innerHTML == "light_mode") {
    document.getElementById("light-mode").innerHTML = getIcon = 'dark_mode';

    initialText = localStorage.setItem("currentIcon", getIcon);

  } else {
    document.getElementById("light-mode").innerHTML = getIcon = "light_mode";
    initialText = localStorage.setItem("currentIcon", getIcon);
  }

}


function toggleDark() { /* onclick */
  let initialTheme = localStorage.setItem("currentTheme", getTheme); /* currentTheme: dark-theme */


  if (getTheme == "dark-theme"){
    document.getElementById("main").className = getTheme = "light-theme";

    initialTheme = localStorage.setItem("currentTheme", getTheme);
  }

  else {
    document.getElementById("main").className = getTheme = "dark-theme";
    initialTheme = localStorage.setItem("currentTheme", getTheme);
  }

};

function toggleMenu(){
  mobileMenu.classList.remove("mobile-menu-hide");
  mobileMenu.classList.add("mobile-menu-display");
}

function closeMenu(){
  mobileMenu.classList.remove("mobile-menu-display");
  mobileMenu.classList.add("mobile-menu-hide");
}

window.onload = function(){ 
  document.getElementById("cards").onmousemove = e => { /* this function is on the cards container */
      for(const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
    
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
    }
};

var getProjectsPosts = document.getElementsByClassName("pm");
var getProductivityPosts = document.getElementsByClassName("prod");
var getThoughtsPosts = document.getElementsByClassName("thg");


function showProjectManagementPosts(){

  for (let item of getProductivityPosts) {
    item.style.display = 'none';
  }

  for (let item of getThoughtsPosts) {
    item.style.display = 'none';
  }

  for (let item of getProjectsPosts) {
    item.style.display = 'flex';
  }

  if (getProjectsPosts.length === 1){
    item.style.borderBottom = '0px';
  }

};

function showProductivityPosts(){

  for (let item of getProjectsPosts) {
    item.style.display = 'none';
  }

  for (let item of getThoughtsPosts) {
    item.style.display = 'none';
  }

  for (let item of getProductivityPosts) {
    item.style.display = 'flex';

    if (getProductivityPosts.length === 1){
      item.style.borderBottom = '0px';
    }

  }

}

function showThoughtsPosts(){

  for (let item of getProjectsPosts) {
    item.style.display = 'none';
  }

  for (let item of getProductivityPosts) {
    item.style.display = 'none';
  }

  for (let item of getThoughtsPosts) {
    item.style.display = 'flex';
  }

  if (getThoughtsPosts.length === 1){
    item.style.borderBottom = '0px';
  }

};

function showAllPosts(){

  for (let item of getProjectsPosts) {
    item.style.display = 'flex';
    item.style.borderBottom = "";
  }

  for (let item of getProductivityPosts) {
    item.style.display = 'flex';
    item.style.borderBottom = "";
  }

  for (let item of getThoughtsPosts) {
    item.style.display = 'flex';
    item.style.borderBottom = "";
  }

}


function showcaseSkills(){

  var items = document.querySelectorAll(".shw")

  for (let item of items) {
    item.style.display = "";
    item.style.borderBottom = "";

  }

};

function showDigitalSkills(){

  var showItems = document.querySelectorAll(".shw.dig")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.man, .shw.ai, .shw.cod, .shw.ana, .shw.per, .shw.gen, .shw.gra, .shw.lan")

  for (let item of hideItems) {
    item.style.display = "none";
  }

};

function showManagementSkills(){

  var showItems = document.querySelectorAll(".shw.man")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.ai, .shw.cod, .shw.ana, .shw.per, .shw.gen, .shw.gra, .shw.lan")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showAiSkills(){

  var showItems = document.querySelectorAll(".shw.ai")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.cod, .shw.ana, .shw.per, .shw.gen, .shw.gra, .shw.lan")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showCodeSkills(){

  var showItems = document.querySelectorAll(".shw.cod")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";

  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.ai, .shw.ana, .shw.per, .shw.gen, .shw.gra, .shw.lan")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showAnalyticSkills(){

  var showItems = document.querySelectorAll(".shw.ana")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";

  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.ai, .shw.cod, .shw.per, .shw.gen, .shw.gra, .shw.lan")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showLanguages(){

  var showItems = document.querySelectorAll(".shw.lan")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.ai, .shw.cod, .shw.per, .shw.gen, .shw.gra, .shw.ana")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showPerformSkills(){

  var showItems = document.querySelectorAll(".shw.per")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.ai, .shw.cod, .shw.lan, .shw.gen, .shw.gra, .shw.ana")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showGeneralSkills(){

  var showItems = document.querySelectorAll(".shw.gen")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.ai, .shw.cod, .shw.lan, .shw.per, .shw.gra, .shw.ana")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};
function showGraphicSkills(){

  var showItems = document.querySelectorAll(".shw.gra")

  for (let item of showItems) {
    item.style.display = "";

    var lastItem = showItems.length - 1
    showItems[lastItem].style.borderBottom = "0px";
  }

  var hideItems = document.querySelectorAll(".shw.dig, .shw.man, .shw.ai, .shw.cod, .shw.lan, .shw.per, .shw.gen, .shw.ana")

  for (let item of hideItems) {
    item.style.display = "none";
  }
  
};