function FilterButton({ buttonText, filterCategory, className }) {
  return (
    <>
      <div>
        <button className={className}><span>{buttonText}</span></button>
      </div>
    </>
  );
}

export default function BlogFilter() {
  return (
    <>
      <div className='blog-section blog-filter  '>

        <FilterButton
        buttonText={"All"}
        filterCategory={"AllPost"}
        className={"post-category-filter-button"} 
        />
        
        <FilterButton
        buttonText={"Project management"}
        filterCategory={"Project management"}
        className={"post-category-pm-filter-button"}
        />
        
        <FilterButton
        buttonText={"Productivity"}
        filterCategory={"Productivity"}
        className={"post-category-prod-filter-button"}
        />
        
        <FilterButton
        buttonText={"Thoughts"}
        filterCategory={"Thoughts"}
        className={"post-category-thg-filter-button"}
        />

      </div>
    </>
  );
}