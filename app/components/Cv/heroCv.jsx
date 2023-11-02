"use client";

import styles from "styles/cv.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { BentoAnimation } from "../../../public/scripts/bentoAnimation";

export default function HeroCV() {
  useEffect(() => {
    BentoAnimation();
  }, []);

  return (
    <>
      <section>
        <div id='bentoContainer' className={styles.bentoContainer}>
          <div className={`${styles.bentoBox} ${styles.bento1}`}>
            <div className={styles.bentoInnerContent}>
              <Image
                className={styles.portraitImage}
                src={"/images/cv/portrait-color-square.jpg"}
                width={400}
                height={400}
                alt='Portrait of me that I took in my room.'
              />
            </div>
          </div>
          <div className={`${styles.bentoBox} ${styles.bento2}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContent}>
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
          <div className={`${styles.bentoBox} ${styles.bento3}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContent}>
                <button className={styles.bentoButton}>
                  <a href='/about/cv#bio'>Keep reading</a>
                </button>
              </div>
            </div>
          </div>
          <div className={`${styles.bentoBox} ${styles.bento4}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContent}>
                <div className={styles.bio}>
                  <p>
                    A short version of
                    <br />
                    <strong>my story</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.bentoBox} ${styles.bento5}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContent}>
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
          <div className={`${styles.bentoBox} ${styles.bento6}`}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoInnerContent}>
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
