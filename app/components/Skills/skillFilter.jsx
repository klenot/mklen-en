"use client";

import { useEffect, useState } from "react";

export default function SkillFilter() {
  const [category, setCategory] = useState(["Showcase"]);

  useEffect(() => {
    console.log(category)
  }, [category]);

  function showAll(){
    setCategory(["Showcase"])
  }

  function showAi(){
    setCategory(["AI"])
  }

  return (
    <>
      <div className='skill-filter mt-1'>
        <div className='skill-category filter-item'>
          <div onClick={showAll} className='pill'>
            <span>Showcase</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div onClick={showAi} className='pill'>
            <span>AI tools</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Coding &amp; Programming</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Digital marketing</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Management</span>
          </div>
        </div>
      </div>
      <div className='skill-filter mb-2'>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Graphics &amp; Design</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Analytic tools</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Languages</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>Performance marketing</span>
          </div>
        </div>
        <div className='skill-category filter-item'>
          <div className='pill'>
            <span>General &amp; Administrative</span>
          </div>
        </div>
      </div>
    </>
  );
}
