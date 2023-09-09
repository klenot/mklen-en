import { getDatabase } from "@/app/libs/notionServices";
import SkillFilter from "app/components/Skills/skillFilter.jsx"
import Image from "next/image"

export default async function SkillRepeater() {

  const skills = await getDatabase(process.env.SKILLS_DATABASE_ID)

  console.log(skills[0].properties.Description)

  return (
    <>
      <section id='skill-section'>
        <div className='skill-section-container'>
          <div className='skill-section section-title-h2'>
            <h2>I am trying to suck a bit less every day.</h2>
          </div>
          <div className='skill-section'>
            <p>
              I'm developing my skills on a daily basis. Continuous growth is a
              lifelong journey &amp; culture.
            </p>
          </div>
          <div className='skill-section'>

            <div className='skill-list-container'>

            {skills.map((skill) => (
              <div className='skill-list-item shw man'>
              <div className='skill-title'>
                <h3>{skill.properties.SkillName.title[0].plain_text}{" "}
                    <Image
                      src={'/icons/html5.png'}
                      alt={'The HTML5 logo.'}
                      width={16.5}
                      height={16.5}
                      style={{
                        position: "relative",
                        top: "4px"
                      }}
                    /></h3>
              </div>
              <div className='skill-list-item-wrapper'>
                <div className='skill-perex'>
                  <p>{skill.properties.Description.rich_text[0].plain_text}</p>
                </div>
                <div className='skill-tag-wrapper'>
                  <div className={skill.properties.AutoClassGenerator.formula.string}>
                    <div className=''>
                      <span>{skill.properties.Category.select.name}</span>
                    </div>
                  </div>
                  <div className='skill-level'>
                    <div className=''>
                      <span>{skill.properties.Level.select.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
            
            </div>
            <div className='skill-section'>
              <p className='skill-page-link'>
                You can find a structured skillset list on this{" "}
                <a href='/' className='hover-underline-animation'>
                  page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
