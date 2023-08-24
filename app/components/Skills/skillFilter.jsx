"use client"

let items = document.querySelectorAll(".shw")

export default function SkillFilter() {

    function showcaseSkills(){

      var items = document.querySelectorAll(".shw")
    
      for (let item of items) {
        item.style.display = "";
        item.style.borderBottom = "";
      }
    
    };
    function showDigitalSkills(){
    
      var items = document.querySelectorAll(".shw.dig")
    
      for (let item of items) {
        item.style.display = "";
    
        var lastItem = items.length - 1
        items[lastItem].style.borderBottom = "0px";
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

    return(
        <>
          <div className='skill-filter mt-1'>
              <div
                className='skill-category filter-item'
                onClick={showcaseSkills}>
                <div className="pill">
                  <span>Showcase</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onConClicklick={showAiSkills}>
                <div className="pill">
                  <span>AI tools</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showCodeSkills}>
                <div className="pill">
                  <span>Coding &amp; Programming</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showDigitalSkills}>
                <div className='pill'>
                  <span>Digital marketing</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showManagementSkills}>
                <div className='pill'>
                  <span>Management</span>
                </div>
              </div>
            </div>
            <div className='skill-filter mb-2'>
              <div
                className='skill-category filter-item'
                onClick={showGraphicSkills}>
                <div className='pill'>
                  <span>Graphics &amp; Design</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showAnalyticSkills}>
                <div className='pill'>
                  <span>Analytic tools</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showLanguages}>
                <div className='pill'>
                  <span>Languages</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showPerformSkills}>
                <div className='pill'>
                  <span>Performance marketing</span>
                </div>
              </div>
              <div
                className='skill-category filter-item'
                onClick={showGeneralSkills}>
                <div className='pill'>
                  <span>General &amp; Administrative</span>
                </div>
              </div>
            </div>
        </>
    );
}   