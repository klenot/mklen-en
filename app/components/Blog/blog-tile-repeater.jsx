"use client";

import { getDatabaseWithAnd } from "app/libs/notion-client-side-fetching.jsx";
import { useEffect, useState } from "react";
import TileSkeleton from "app/components/Shared/tile-skeleton";
import BlogTile from "app/components/Blog/blog-tile.jsx";
import Pagination from "../Shared/tile-rep-pagination.jsx";

export default function BlogTileRepeater() {
  const [filterA, setFilterA] = useState("Publish");
  const [filterB, setFilterB] = useState("Publish");
  const [categoryA, setCategoryA] = useState("Published");
  const [categoryB, setCategoryB] = useState("Published");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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
      console.log(posts);
    }
    fetchData();
  }, [categoryA, categoryB]);

  // Calculate indexes for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function showPosts(category) {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Category");
    setCategoryB(category);
    setCurrentPage(1);
  }

  function showAll() {
    setFilterA("Publish");
    setCategoryA("Published");
    setFilterB("Publish");
    setCategoryB("Published");
    setCurrentPage(1);
  }

  function showProjectManagementPosts() {
    showPosts("Project management");
  }

  function showProductivityPosts() {
    showPosts("Productivity");
  }

  function showThoughtsPosts() {
    showPosts("Thoughts");
  }

  function showManagementPosts() {
    showPosts("Management");
  }

  return (
    <>
      <div className='tile-filter pt-2 pb-2'>
        <div>
          <button onClick={showAll} className='filter-button'>
            <span>All</span>
          </button>
        </div>

        <div>
          <button
            onClick={showProjectManagementPosts}
            className='filter-button'>
            <span>Project management</span>
          </button>
        </div>

        <div>
          <button onClick={showProductivityPosts} className='filter-button'>
            <span>Productivity</span>
          </button>
        </div>

        <div>
          <button onClick={showThoughtsPosts} className='filter-button'>
            <span>Thoughts</span>
          </button>
        </div>
        <div>
          <button onClick={showManagementPosts} className='filter-button'>
            <span>Management</span>
          </button>
        </div>
      </div>
      <div className='tile-container'>
        {isLoading ? (
          <TileSkeleton />
        ) : (
          currentPosts?.map((post) => (
            <BlogTile
              key={post.id}
              props={{
                href: `/blog/${post.properties.Slug.formula.string}`,
                class: `${post.properties.AutoClassGenerator.formula.string}`,
                imageSrc: `${
                  post.properties.Thumbnail.files[0] === undefined
                    ? "/images/cv/podpis_mk_grey1.png"
                    : post.properties.Thumbnail.files[0].file.url
                }`,
                imageAlt: `${
                  post.properties.AltText.rich_text[0] === undefined
                    ? "A signature of good fortuner to your projects."
                    : post.properties.AltText.rich_text[0].plain_text
                }`,
                date: `${new Date(
                  post.properties.PostDate.date === null
                    ? Date()
                    : post.properties.PostDate.date.start
                ).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}`,
                title: `${post.properties.PostTitle.title[0].plain_text}`,
                perex: `${
                  post.properties.PostPerex.rich_text[0] === undefined
                    ? ""
                    : post.properties.PostPerex.rich_text[0].plain_text
                }`,
              }}
            />
          ))
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}
