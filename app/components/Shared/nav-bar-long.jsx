"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const { theme, setTheme } = useTheme("dark");
  const [isOpen, setOpen] = useState(false);
  let pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const openMenu = () => {
    !isOpen ? setOpen(true) : setOpen(false);
    const menuButton = document.getElementById("burger-icon");
    const menu = document.getElementById("menu");
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        setOpen(false);
      }
    });
  };

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <>
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
                <Image
                  id='burger-icon'
                  onClick={openMenu}
                  src={"/icons/navbar/burger-menu-icon.svg"}
                  width={30}
                  height={30}
                  alt='Icon for toggling navigation menu.'
                />

                {theme === "light" ? (
                  <Image
                    id='dark-mode'
                    onClick={toggleTheme}
                    src={"/icons/navbar/dark-mode-icon.svg"}
                    width={33}
                    height={33}
                    alt='Dark mode icon.'
                  />
                ) : (
                  <Image
                    id='light-mode'
                    onClick={toggleTheme}
                    src={"/icons/navbar/light-mode-icon.svg"}
                    width={33}
                    height={33}
                    alt='Light mode icon.'
                  />
                )}
              </div>
            </div>
            <div id='mobile-menu'
              className={
                isOpen === false
                  ? "mobile-menu-container mobile-menu-hide"
                  : "mobile-menu-container mobile-menu-display"
              }>
              <div id='menu' className='mobile-menu'>
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
                </ul>
                <div>
                  <Image
                    id='close-menu-icon'
                    src={"/icons/navbar/close-menu-icon.svg"}
                    onClick={openMenu}
                    width={30}
                    height={30}
                    alt='Close the menu icon.'
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
