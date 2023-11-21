"use client"

import { useEffect, useState } from "react";

export default function HeroBlogPost({ title, perex, ToC, category }) {
  const [readingTime, setReadngTime] = useState();
  useEffect(() => {
    function ReadingTime() {
      const wpm = 225;
      const articleContainer = document.querySelector(".article-section-container");
      if (articleContainer) {
        const blogText = articleContainer.innerText;
        const words = blogText.trim().split(/\s+/).length;
        setReadngTime(Math.ceil(words / wpm));
      }
    }
    ReadingTime();
  }, []);

  return (
    <section id='hero-section'>
      <div className='hero-container blog-hero-container'>
        <div>
          <div className='hero-section'>
            <h1>
              <span className='hero-claim'>
                <span className='hero-claim'>{title}</span>
              </span>
            </h1>
          </div>

          <div className='hero-section'>
            <div>
              <p className='hero-perex'>{perex}</p>
            </div>
          </div>
        </div>

        <div>
          {ToC}</div>

        <div className='hero-section'>
          <hr></hr>
          <div className='hero-info pt-2'>
            <div className='column'>
              <p className='blog-hero-text'>
                <span>⏱ {readingTime} minutes of reading</span>
              </p>
            </div>
            <div className='column'>
              <p className='blog-hero-text'>
                <span>📚 {category}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
