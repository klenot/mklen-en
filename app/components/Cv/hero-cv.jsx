"use client";

import styles from "styles/cv.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { BentoAnimation } from "../../../public/scripts/bento-animation";

export default function HeroCV() {
  useEffect(() => {
    BentoAnimation();
  }, []);

  const [rotate, setRotate] = useState(false)

  return (
    <>
      <section>
        <div id='bentoContainer' className={styles.bentoContainer}>
          <div onClick={() => setRotate((prevRotate) => !prevRotate)} className={`${styles.bentoBox} ${styles.bento1} ${rotate === false ? null : styles.rotate}`}>
            <div className={`${styles.bentoInnerImageFront}`}>
              <Image
                className={styles.portraitImage}
                src={"/images/cv/portrait.png"}
                width={400}
                height={400}
                alt='Portrait of me that I took in my room.'
              />
            </div>
            <div className={`${styles.bentoInnerImageBack}`}>
              <Image
                className={styles.portraitImage}
                src={"/images/cv/portrait-color-square.jpg"}
                width={400}
                height={400}
                alt='Portrait of me that I took in my room.'
              />
            </div>
          </div>
          <div onClick={() => document.getElementById('skills').scrollIntoView()} className={`${styles.bentoBox} ${styles.bento2}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContentSkills}>
                <div className={styles.digitalMarketing}>
                  <p>
                    Take a look at
                    <br />
                    <strong>my abilities</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => document.getElementById('bio').scrollIntoView()} className={`${styles.bentoBox} ${styles.bento3}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContentButton}>
                <button className={styles.bentoButton}>
                  <a href='/about/cv#bio'>About me</a>
                </button>
              </div>
            </div>
          </div>
          <div onClick={() => document.getElementById('bio').scrollIntoView()} className={`${styles.bentoBox} ${styles.bento4}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContentBio}>
                <div className={styles.bio}>
                  <p>
                    A short version<br />of
                    <strong> my story</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => document.getElementById('career').scrollIntoView()} className={`${styles.bentoBox} ${styles.bento5}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContentCareer}>
                <div className={styles.careerPath}>
                  <p>
                    Here is an insight into
                    <br />
                    <strong>my career path</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => document.getElementById('certification').scrollIntoView()} className={`${styles.bentoBox} ${styles.bento6}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContentCertification}>
                <div className={styles.certification}>
                  <p>
                    Obtained
                    <br />
                    <strong>Certifications</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
