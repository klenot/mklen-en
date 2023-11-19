"use client";

import { useEffect, useState } from "react";
import { getDatabase } from "app/libs/notion-services.jsx";

export default function SkillFilter() {
  const [filter, setFilter] = useState("Showcase");
  const [category, setCategory] = useState("Showcase");

  useEffect(() => {
    async function fetchData(){
      const skills = await getDatabase(process.env.SKILLS_DATABASE_ID, filter, category)
      console.log(filter, category)
      console.log(skills)
    }
    fetchData()
  }, [category]);

  function showAll(){
    setFilter("Showcase")
    setCategory("Showcase")
  }

  function showAi(){
    setFilter("Category")
    setCategory("AI")
  }

  function showCoding(){
    setFilter("Category")
    setCategory("Coding")
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
          <div onClick={showCoding} className='pill'>
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
