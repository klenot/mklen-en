"use client";

import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "styles/globals.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { getDatabaseWithOr } from "../../libs/notionServices";

export default function Slider() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const books = await getDatabaseWithOr(
        process.env.BOOKS_DATABASE_ID,
        "Publish",
        "Published",
        "Publish",
        "Published"
      );
      setBooks(books);
    }
    fetchData();
  }, []);

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={"3"}
        style={{
          padding: "0.5rem",
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: -40,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className='mySwiper'>
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <img src={book.properties.BookCover.files[0].file.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
