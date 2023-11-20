"use client";

import { getDatabaseWithAnd } from "app/libs/notion-services";
import { useEffect, useState } from "react";
import TileSkeleton from "app/components/Shared/tile-skeleton";
import BlogTile from "app/components/Blog/blog-tile.jsx"

export default function BlogTileRepeater() {
  const [filterA, setFilterA] = useState("Publish");
  const [filterB, setFilterB] = useState("Publish");
  const [categoryA, setCategoryA] = useState("Published");
  const [categoryB, setCategoryB] = useState("Published");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const posts = await getDatabaseWithAnd(
        process.env.BLOG_DATABASE_ID,
        filterA,
        categoryA,
        filterB,
        categoryB
      );
      setPosts(posts);
      setLoading(false);
    }
    fetchData();
  }, [categoryA, categoryB]);

  function showAll() {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Publish");
    setCategoryB("Published");
  }

  function showProjectManagementPosts() {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Category");
    setCategoryB("Project management");
  }

  function showProductivityPosts() {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Category");
    setCategoryB("Productivity");
  }

  function showThoughtsPosts() {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Category");
    setCategoryB("Thoughts");
  }

  function showManagementPosts() {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Category");
    setCategoryB("Management");
  }

  return (
    <>
      <div className='tile-filter pt-2 pb-2'>
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
        <div>
          <button
            onClick={showManagementPosts}
            className='post-category-thg-filter-button'>
            <span>Management</span>
          </button>
        </div>
      </div>
      <div className='tile-container'>
        {isLoading ? <TileSkeleton/> :
        posts?.map((post) => (
          <BlogTile
            key={post.id} 
            props={{
              href:`/blog/${post.properties.Slug.formula.string}`,
              class:`${post.properties.AutoClassGenerator.formula.string}`,
              category:`${post.properties.Category.select.name}`,
              imageSrc: `${post.properties.Thumbnail.files[0] === undefined ? "/images/cv/podpis_mk_grey1.png" : post.properties.Thumbnail.files[0].file.url}`,
              imageAlt: `${post.properties.AltText.rich_text[0] === undefined ? "A signature of good fortuner to your projects." : post.properties.AltText.rich_text[0].plain_text}`,
              date: `${new Date(
                post.properties.PostDate.date.start
              ).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}`,
              title: `${post.properties.PostTitle.title[0].plain_text}`,
              perex:`${post.properties.PostPerex.rich_text[0].plain_text}`,
            }}
          />
        ))}
      </div>
    </>
  );
}
