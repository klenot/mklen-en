"use client";

import {
  getDatabaseWithAnd,
  GenerateKey,
} from "app/libs/notion-client-side-fetching.jsx";
import { useEffect, useState } from "react";
import BlogTile from "app/components/Blog/blog-tile.jsx"
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
            <BlogTile
            key={GenerateKey()} 
            props={{
              href:`/projects/${project.properties.Slug.formula.string}`,
              class:`${project.properties.AutoClassGenerator.formula.string}`,
              imageSrc: `${project.properties.Thumbnail.files[0] === undefined ? "/images/cv/podpis_mk_grey1.png" : project.properties.Thumbnail.files[0].file.url}`,
              imageAlt: `${project.properties.AltText.rich_text[0] === undefined ? "A signature of good fortuner to your projects." : project.properties.AltText.rich_text[0].plain_text}`,
              date: `${new Date(
                project.properties.PublishDate.date === null ? Date() : project.properties.PublishDate.date.start
              ).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}`,
              title: `${project.properties.ProjectName.title[0].plain_text}`,
              perex:`${project.properties.Description.rich_text[0] === undefined ? "" : project.properties.Description.rich_text[0].plain_text}`,
            }}
          />
          ))
        )}
      </div>
    </>
  );
}
