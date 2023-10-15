"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDatabaseWithAnd } from "app/libs/notionServices";

export default function BlogTileRepeater() {
  const [filterA, setFilterA] = useState("Publish");
  const [filterB, setFilterB] = useState("Publish");
  const [categoryA, setCategoryA] = useState("Published");
  const [categoryB, setCategoryB] = useState("Published");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const posts = await getDatabaseWithAnd(
        process.env.BLOG_DATABASE_ID,
        filterA,
        categoryA,
        filterB,
        categoryB
      );
      setPosts(posts);
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
      </div>

      <div className='tile-container'>
        {posts.map((post) => (
          <Link
            className='tile-wrapper'
            key={post.id}
            href={`/blog/${post.properties.Slug.formula.string}`}>
            <div className='tile-card'>
            <div className='tile-more-info'>
                  <div
                    className={
                      post.properties.AutoClassGenerator.formula.string
                    }>
                    <div>
                      <span className='tile-category-text'>
                        {post.properties.Category.select.name}
                      </span>
                    </div>
                  </div>
                </div>
              <div className='tile-image-wrapper'>
                <Image
                  src={"/images/blog/doge-computer.webp"}
                  width={300}
                  height={200}
                  alt={"Alt text."}
                />
              </div>

              <div className='tile-info-wrapper'>
                
                <div className='tile-info'>
                  <div>
                  <div className='tile-date'>
                    <div>
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
                  </div>
                    <h3>{post.properties.PostTitle.title[0].plain_text}</h3>
                    <p className='pt-1 pb-1'>
                      {post.properties.PostPerex.rich_text[0].plain_text}
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
