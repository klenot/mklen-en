"use client";

import Link from "next/link";
import Image from "next/image";
import {
  getDatabaseWithAnd,
  GenerateKey,
} from "app/libs/notion-client-side-fetching.jsx";
import { useEffect, useState } from "react";
import TileSkeleton from "app/components/Shared/tile-skeleton";

export default function ProjectRepeater() {
  const [filterA, setFilterA] = useState("Publish");
  const [filterB, setFilterB] = useState("Publish");
  const [categoryA, setCategoryA] = useState("Published");
  const [categoryB, setCategoryB] = useState("Published");
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const projects = await getDatabaseWithAnd(
        process.env.PROJECTS_DATABASE_ID,
        filterA,
        categoryA,
        filterB,
        categoryB
      );
      setProjects(projects);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <div className='tile-filter pt-2 pb-2'>
        <div>
          <button onClick={showAll} className='post-category-filter-button'>
            <span>All</span>
          </button>
        </div>

        <div>
          <button
            onClick={showProjectManagementPosts}
            className='post-category-pm-filter-button'>
            <span>Project management</span>
          </button>
        </div>

        <div>
          <button
            onClick={showProductivityPosts}
            className='post-category-prod-filter-button'>
            <span>Productivity</span>
          </button>
        </div>

        <div>
          <button
            onClick={showThoughtsPosts}
            className='post-category-thg-filter-button'>
            <span>Thoughts</span>
          </button>
        </div>
      </div> */}

      <div className='tile-container'>
        {isLoading ? (
          <TileSkeleton />
        ) : (
          projects?.map((project) => (
            <Link
              key={GenerateKey()}
              className='tile-wrapper'
              href={`/projects/${project.properties.Slug.formula.string}`}>
              <div key={project.id} className='tile-card'>
                <div className='tile-more-info'>
                  <div
                    className={
                      project.properties.AutoClassGenerator.formula.string
                    }>
                    <div className='pill'>
                      <span className='tile-category-text'>
                        {project.properties.Category.select.name}
                      </span>
                    </div>
                  </div>

                  {/* <div className='tile-date'>
                    <div className='pill'>
                      <span className='tile-date-text'>
                        {new Date(
                          post.properties.PostDate.date.start
                        ).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div> */}
                </div>

                <div className='tile-image-wrapper'>
                  <Image
                    src={
                      project.properties.Thumbnail.files[0] === undefined
                        ? "/images/cv/podpis_mk_grey1.png"
                        : project.properties.Thumbnail.files[0].file.url
                    }
                    width={300}
                    height={200}
                    alt={
                      project.properties.AltText.rich_text[0] === undefined
                        ? "A signature of good fortune to your projects."
                        : project.properties.AltText.rich_text[0].plain_text
                    }
                    /* placeholder="blur" */
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>

                <div className='tile-info-wrapper'>
                  <div className='tile-info'>
                    <div>
                      <h3>
                        {project.properties.ProjectName.title[0].plain_text}
                      </h3>
                      <p className='pt-1 pb-1'>
                        {project.properties.Description.rich_text[0].plain_text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
