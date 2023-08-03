"use client"

import { useTheme } from "next-themes"
import React, { useState } from 'react'

export default function NavBar() {

    const {resolvedTheme, setTheme} = useTheme()

    const [isOpen, setOpen] = useState(false)
    
    const openMenu = (e) => {
      !isOpen ? setOpen(true) : setOpen(false)
    }


    return (
      <>
        <div>
          <header id="nav-bar">
            <nav>
              <div className="nav-container">
                <div className="nav-section logo-section">
                  <a href="/">
                    <span id="logo" className="logo">
                      mklenotic
                    </span>
                  </a>
                </div>
                <div className="nav-right-wrapper">
                  <div className="nav-section">
                    <ul className="nav-list">
                      <li className="nav-item">
                        <a id="home" href="/">
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a id="about" href="/about">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a id="services" href="/services">
                          Services
                        </a>
                      </li>
                      <li className="nav-item">
                        <a id="blog" href="/blog">
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div id="burger-icon" className="nav-section mobile-menu-icons">
                    <span
                      style={{ fontSize: 27 }}
                      className="material-symbols-sharp burger-icon"
                      onClick={openMenu}
                    >
                      lunch_dining
                    </span>
                    <span
                      style={{ fontSize: 30 }}
                      id="light-mode"
                      className="material-symbols-sharp"
                      onClick={() => setTheme(resolvedTheme === "dark-theme" ? "light-theme" : "dark-theme")}
                    >
                      {resolvedTheme === "dark-theme" ? "light_mode" : "dark_mode"}
                    </span>
                  </div>
                </div>
                <div id="mobile-menu" className={isOpen === false ? "mobile-menu-container mobile-menu-hide" : "mobile-menu-container mobile-menu-display"}>
                  <div className="mobile-menu">
                    <ul className="nav-list">
                      <li className="nav-item-mobile">
                        <a href="/">Home</a>
                      </li>
                      <li className="nav-item-mobile">
                        <a href="/about">About</a>
                      </li>
                      <li className="nav-item-mobile">
                        <a href="/services">Services</a>
                      </li>
                      <li className="nav-item-mobile">
                        <a href="/blog">Blog</a>
                      </li>
                      <li className="nav-item-mobile">
                        <a href="#">
                          <img
                            className="nav-mobile-lang-icon"
                            src="media/icons/czech-flag-icon.png"
                            alt="Czech Repuplic flag standing for the translation into Czech."
                          />
                        </a>
                      </li>
                    </ul>
                    <div>
                      <span
                        style={{ fontSize: 30 }}
                        className="material-symbols-sharp"
                        onClick={openMenu}
                      >
                        close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </>
    )
  }