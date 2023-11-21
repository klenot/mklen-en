"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDatabaseWithOr } from "app/libs/notion-client-side-fetching.jsx";
import SkillSkeleton from "app/components/Skills/skill-skeleton.jsx";

export default function SkillRepeater() {
  const [filterA, setFilterA] = useState("Showcase");
  const [categoryA, setCategoryA] = useState("Showcase");
  const [filterB, setFilterB] = useState("Showcase");
  const [categoryB, setCategoryB] = useState("Showcase");
  const [skills, setSkills] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const skills = await getDatabaseWithOr(
        process.env.SKILLS_DATABASE_ID,
        filterA,
        categoryA,
        filterB,
        categoryB
      );
      setSkills(skills);
      setLoading(false);
    }
    fetchData();
  }, [categoryA, categoryB]);

  function showShowcase() {
    setFilterA("Showcase");
    setCategoryA("Showcase");
    setFilterB("Showcase");
    setCategoryB("Showcase");
  }
  function showCoding() {
    setFilterA("Category");
    setCategoryA("Coding");
    setFilterB("Category");
    setCategoryB("Programming");
  }
  function showManagement() {
    setFilterA("Category");
    setCategoryA("Management");
    setFilterB("Category");
    setCategoryB("Management");
  }
  function showAi() {
    setFilterA("Category");
    setCategoryA("AI");
    setFilterB("Category");
    setCategoryB("AI");
  }
  function showWebAnalytics() {
    setFilterA("Category");
    setCategoryA("Web Analytics");
    setFilterB("Category");
    setCategoryB("Web Analytics");
  }
  function showCreative() {
    setFilterA("Category");
    setCategoryA("Creative");
    setFilterB("Category");
    setCategoryB("Creative");
  }
  function showDigitalMarketing() {
    setFilterA("Category");
    setCategoryA("Digital Marketing");
    setFilterB("Category");
    setCategoryB("Digital Marketing");
  }
  function showAdministration() {
    setFilterA("Category");
    setCategoryA("Administration");
    setFilterB("Category");
    setCategoryB("Administration");
  }
  function showLanguages() {
    setFilterA("Category");
    setCategoryA("Languages");
    setFilterB("Category");
    setCategoryB("Languages");
  }

  return (
    <>
      {/* {props === undefined ? (
        <section id='skill-section' className='pt-10 pb-10'>
          <div className='skill-section-container'>
            <div className='skill-section pb-2'>
              <h2>Skills</h2>
            </div>
            <div className='skill-section'>
              <p>
                I try to suck a bit less every day. Continuous growth is a
                culture to me.
              </p>
            </div>
            <div className='skill-section pt-2'>
              <div className='skill-section pt-2'>
                <div className='skill-filter pb-1'>
                  <div className='skill-category filter-item'>
                    <div onClick={showShowcase} className='pill'>
                      <span>Showcase</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showAi} className='pill'>
                      <span>AI</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showCoding} className='pill'>
                      <span>Coding &amp; Programming</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showDigitalMarketing} className='pill'>
                      <span>Digital marketing</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showManagement} className='pill'>
                      <span>Management</span>
                    </div>
                  </div>
                </div>
                <div className='skill-filter'>
                  <div className='skill-category filter-item'>
                    <div onClick={showCreative} className='pill'>
                      <span>Creative</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showWebAnalytics} className='pill'>
                      <span>Web Analytics</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showLanguages} className='pill'>
                      <span>Languages</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showAdministration} className='pill'>
                      <span>Administration</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='skill-list-container'>
                {isLoading === true ? (
                  <SkillSkeleton />
                ) : (
                  skills?.map((skill) => (
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
                                borderRadius: "8px",
                              }}
                            />
                          )}
                        </h3>
                      </div>
                      <div className='skill-list-item-wrapper'>
                        <div className='skill-perex'>
                          <p>
                            {
                              skill.properties.Description.rich_text[0]
                                .plain_text
                            }
                          </p>
                        </div>
                        <div className='skill-tag-wrapper'>
                          <div
                            className={
                              skill.properties.CategoryClassGenerator.formula
                                .string
                            }>
                            <div>
                              <span>
                                {skill.properties.Category.select.name}
                              </span>
                            </div>
                          </div>
                          <div
                            className={
                              skill.properties.LevelClassGenerator.formula
                                .string
                            }>
                            <div>
                              {skill.properties.Level.select.name === "None" ? (
                                ""
                              ) : (
                                <span>
                                  {skill.properties.Level.select.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      ) : ( */}
      <section id='skill-section' className='pt-5 pb-5'>
        <div className='skill-section-container'>
          <div>
            <div className='skill-section pb-2'>
              <h2>Skills</h2>
            </div>
            <div className='skill-section'>
              <p>
                I try to suck a bit less every day. Continuous growth is a
                culture to me.
              </p>
            </div>
            <div className='skill-section pt-2'>
              <div className='skill-section pt-2'>
                <div className='skill-filter pb-1'>
                  <div className='skill-category filter-item'>
                    <div onClick={showShowcase} className='pill'>
                      <span>Showcase</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showAi} className='pill'>
                      <span>AI</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showCoding} className='pill'>
                      <span>Coding &amp; Programming</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showDigitalMarketing} className='pill'>
                      <span>Digital marketing</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showManagement} className='pill'>
                      <span>Management</span>
                    </div>
                  </div>
                </div>
                <div className='skill-filter'>
                  <div className='skill-category filter-item'>
                    <div onClick={showCreative} className='pill'>
                      <span>Creative</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showWebAnalytics} className='pill'>
                      <span>Web Analytics</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showLanguages} className='pill'>
                      <span>Languages</span>
                    </div>
                  </div>
                  <div className='skill-category filter-item'>
                    <div onClick={showAdministration} className='pill'>
                      <span>Administration</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='skill-list-container'>
                {isLoading === true ? (
                  <SkillSkeleton />
                ) : (
                  skills?.map((skill) => (
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
                                borderRadius: "8px",
                              }}
                            />
                          )}
                        </h3>
                      </div>
                      <div className='skill-list-item-wrapper'>
                        <div className='skill-perex'>
                          <p>
                            {
                              skill.properties.Description.rich_text[0]
                                .plain_text
                            }
                          </p>
                        </div>
                        <div className='skill-tag-wrapper'>
                          <div
                            className={
                              skill.properties.CategoryClassGenerator.formula
                                .string
                            }>
                            <div>
                              <span>
                                {skill.properties.Category.select.name}
                              </span>
                            </div>
                          </div>
                          <div
                            className={
                              skill.properties.LevelClassGenerator.formula
                                .string
                            }>
                            <div>
                              {skill.properties.Level.select.name === "None" ? (
                                ""
                              ) : (
                                <span>
                                  {skill.properties.Level.select.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* )} */}
    </>
  );
}
