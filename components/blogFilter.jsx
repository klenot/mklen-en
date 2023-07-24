"use client"

var getProjectsPosts = document.getElementsByClassName("pm");
var getProductivityPosts = document.getElementsByClassName("prod");
var getThoughtsPosts = document.getElementsByClassName("thg");

function ButtonAll() {
    
    function showAllPosts() {
        
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
  
    return (
      <div className="post-category filter-item" onClick={showAllPosts}>
        <div className="pill">
            <span>All</span>
        </div>
      </div>
    );
  };

function ButtonProjectManagement() {
    
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
  
    return (
      <div className="post-category-pm filter-item" onClick={showProjectManagementPosts}>
        <div className="pill">
            <span>Project management</span>
        </div>
      </div>
    );
  };

function ButtonProductivity() {
    
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
  
    return (
      <div className="post-category-prod filter-item" onClick={showProductivityPosts}>
        <div className="pill">
            <span>Productivity</span>
        </div>
      </div>
    );
  };

function ButtonThoughts() {
    
    function showThoughtsPosts() {
        
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
    }
  
    return (
      <div className="post-category-thg filter-item" onClick={showThoughtsPosts}>
        <div className="pill">
            <span>Thoughts</span>
        </div>
      </div>
    );
  };

  export default function BlogFilter() {
    return(
        <div className="blog-section-filter blog-filter">
            <ButtonAll />
            <ButtonProjectManagement />
            <ButtonProductivity />
            <ButtonThoughts />
        </div>
    );
}   