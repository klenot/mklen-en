"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDatabaseWithOr } from "app/libs/notionServices";
import SkillSkeleton from "./skillSkeleton";

export default function SkillRepeater() {
  const [filterA, setFilterA] = useState("Showcase");
  const [filterB, setFilterB] = useState("Showcase");
  const [categoryA, setCategoryA] = useState("Showcase");
  const [categoryB, setCategoryB] = useState("Showcase");
  const [skills, setSkills] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function fetchData(){
      const skills = await getDatabaseWithOr(process.env.SKILLS_DATABASE_ID, filterA, categoryA, filterB, categoryB)
      setSkills(skills)
      setLoading(false)
    }
    fetchData();
  }, [categoryA, categoryB]);

  function showAll(){
    setFilterA("Showcase")
    setCategoryA("Showcase")
    setFilterB("Showcase")
    setCategoryB("Showcase")
  }

  function showAi(){
    setFilterA("Category")
    setCategoryA("AI")
    setFilterB("Category")
    setCategoryB("AI")
  }

  function showCoding(){
    setFilterA("Category")
    setCategoryA("Coding")
    setFilterB("Category")
    setCategoryB("Programming")
  }

  return (
    <>
      <section id='skill-section' className="pt-10 pb-10">
        <div className='skill-section-container'>
          <div className='skill-section pb-2'>
            <h2>Skills</h2>
          </div>
          <div className='skill-section'>
            <p>
            I try to suck a bit less every day. Continuous growth is a culture to me.
            </p>
          </div>
          <div className='skill-section pt-2'>
            <div className='skill-section pt-2'>
              <div className='skill-filter pb-1'>
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
              <div className='skill-filter'>
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
            </div>

            <div className='skill-list-container'>
              {isLoading === true ? <SkillSkeleton/> :
              skills.map((skill) => (
                <div key={skill.id} className='skill-list-item shw man'>
                  <div className='skill-title'>
                    <h3>
                      {skill.properties.SkillName.title[0].plain_text}{" "}
                      {skill.properties.ImageSrcGenerator.formula.string ===
                      "none" ? (
                        ""
                      ) : (
                        <Image
                          src={skill.properties.Icon.files[0].file.url}
                          alt='Icon'
                          width={16.5}
                          height={16.5}
                          style={{
                            position: "relative",
                            top: "4px",
                          }}
                        />
                      )}
                    </h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>
                        {skill.properties.Description.rich_text[0].plain_text}
                      </p>
                    </div>
                    <div className='skill-tag-wrapper'>
                      <div
                        className={
                          skill.properties.CategoryClassGenerator.formula.string
                        }>
                        <div>
                          <span>{skill.properties.Category.select.name}</span>
                        </div>
                      </div>
                      <div
                        className={
                          skill.properties.LevelClassGenerator.formula.string
                        }>
                        <div>
                          {skill.properties.Level.select.name === "None" ? (
                            ""
                          ) : (
                            <span>{skill.properties.Level.select.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
