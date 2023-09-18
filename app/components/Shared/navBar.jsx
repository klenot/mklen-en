"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setOpen] = useState(false);
  let pathname = usePathname();
  
  useEffect(() => {
    setOpen(false);
    setTheme(theme)
  }, [ pathname ]);

  const openMenu = () => {
    !isOpen ? setOpen(true) : setOpen(false);
    const menuButton = document.getElementById('burger-icon');
    const menu = document.getElementById('menu');
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        setOpen(false);
      }
    });
  };

  function toggleTheme() {
    setTheme(theme === "dark-theme" ? "light-theme" : "dark-theme");
  }

  return (
    <>
      <div>
        <header id='nav-bar'>
          <nav>
            <div className='nav-container'>
              <div className='nav-section logo-section'>
                <Link href='/'>
                  <p className='logo'>mklenotic</p>
                </Link>
              </div>
              <div className='nav-right-wrapper'>
                <div className='nav-section'>
                  <ul className='nav-list'>
                    <li className='nav-item'>
                      <Link id='home' href='/'>
                        Home
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link id='about' href='/about'>
                        About
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link id='services' href='/services'>
                        Services
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link id='blog' href='/blog'>
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='nav-section mobile-menu-icons'>
                  <span
                    id='burger-icon'
                    style={{ fontSize: 27 }}
                    className='material-symbols-sharp burger-icon'
                    onClick={openMenu}>
                    lunch_dining
                  </span>
                  <span
                    style={{ fontSize: 30 }}
                    id='light-mode'
                    className='material-symbols-sharp'
                    onClick={toggleTheme}>
                    {theme === "loght-theme"
                      ? "dark_mode"
                      : "light_mode"}
                  </span>
                </div>
              </div>
              <div
                id='mobile-menu'
                className={
                  isOpen === false
                    ? "mobile-menu-container mobile-menu-hide"
                    : "mobile-menu-container mobile-menu-display"
                }>
                <div id="menu" className='mobile-menu'>
                  <ul className='nav-list'>
                    <li className='nav-item-mobile'>
                      <Link href='/'>Home</Link>
                    </li>
                    <li className='nav-item-mobile'>
                      <Link href='/about'>About</Link>
                    </li>
                    <li className='nav-item-mobile'>
                      <Link href='/services'>Services</Link>
                    </li>
                    <li className='nav-item-mobile'>
                      <Link href='/blog'>Blog</Link>
                    </li>
                    <li className='nav-item-mobile'>
                      <Link href='#'>
                        <Image
                          src={"/icons/czech-flag-icon.png"}
                          alt={
                            "Czech Repuplic flag standing for the translation into Czech."
                          }
                          width={20}
                          height={20}
                        />
                      </Link>
                    </li>
                  </ul>
                  <div>
                    <span
                      style={{ fontSize: 30 }}
                      className='material-symbols-sharp'
                      onClick={openMenu}>
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
  );
}
