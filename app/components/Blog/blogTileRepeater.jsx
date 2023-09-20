"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDatabaseWithAnd } from "app/libs/notionServices";
import BlogFilter from "./blogFilter";
import getBlogPosts from "app/libs/getBlogPosts.jsx";

export default function BlogTileRepeater() {
  const [filterA, setFilterA] = useState("Publish");
  const [filterB, setFilterB] = useState("Publish");
  const [categoryA, setCategoryA] = useState("Published");
  const [categoryB, setCategoryB] = useState("Published");
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData(){
      const posts = await getDatabaseWithAnd(process.env.BLOG_DATABASE_ID, filterA, categoryA, filterB, categoryB)
      setPosts(posts)
    }
    fetchData()
  }, [categoryA, categoryB]);

  function showAll(){
    setFilterA("Publish")
    setCategoryA("Published")
    setFilterB("Publish")
    setCategoryB("Published")
  }

  function showProjectManagementPosts(){
    setFilterA("Publish")
    setCategoryA("Published")
    setFilterB("Category")
    setCategoryB("Project management")
  }

  function showProductivityPosts(){
    setFilterA("Publish")
    setCategoryA("Published")
    setFilterB("Category")
    setCategoryB("Productivity")
  }

  function showThoughtsPosts(){
    setFilterA("Publish")
    setCategoryA("Published")
    setFilterB("Category")
    setCategoryB("Thoughts")
  }

  return (
    <>
      <div className='blog-section blog-filter pt-2 pb-2'>
        <div>
          <button onClick={showAll} className='post-category-filter-button'>
            <span>All</span>
          </button>
        </div>

        <div>
          <button onClick={showProjectManagementPosts} className='post-category-pm-filter-button'>
            <span>Project management</span>
          </button>
        </div>

        <div>
          <button onClick={showProductivityPosts} className='post-category-prod-filter-button'>
            <span>Productivity</span>
          </button>
        </div>

        <div>
          <button onClick={showThoughtsPosts} className='post-category-thg-filter-button'>
            <span>Thoughts</span>
          </button>
        </div>
      </div>
      <div className='blog-container'>
        <div className='cards-container'>
          <div className='cards'>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.properties.Slug.formula.string}`}>
                <div className='post-card'>
                  <div>
                    <h3>{post.properties.PostTitle.title[0].plain_text}</h3>
                    <p className='service-description'>
                      {post.properties.PostPerex.rich_text[0].plain_text}
                    </p>
                  </div>

                  <div className='post-card-info'>
                    <div
                      className={
                        post.properties.AutoClassGenerator.formula.string
                      }>
                      <div className='pill'>
                        <span className='service-category-text'>
                          {post.properties.Category.select.name}
                        </span>
                      </div>
                    </div>
                    <div className='post-card-info-date'>
                      <div className='pill'>
                        <span className='post-card-info-date-text'>
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
