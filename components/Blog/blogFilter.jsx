"use client"

function ButtonAll() { 
    return (
      <div className="post-category filter-item">
        <div className="pill">
            <span>All</span>
        </div>
      </div>
    );
  };

function ButtonProjectManagement() {
    return (
      <div className="post-category-pm filter-item">
        <div className="pill">
            <span>Project management</span>
        </div>
      </div>
    );
  };

function ButtonProductivity() {
    return (
      <div className="post-category-prod filter-item">
        <div className="pill">
            <span>Productivity</span>
        </div>
      </div>
    );
  };

function ButtonThoughts() {
    return (
      <div className="post-category-thg filter-item">
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