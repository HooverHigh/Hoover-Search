import { MenuAlt1Icon, MoonIcon, SearchIcon, SparklesIcon, SunIcon, UserCircleIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Apps from '../components/Apps';
import Sidebar from '../components/Sidebar';
import ScriptTag from 'react-script-tag';

const Demo = props => (
<ScriptTag type="text/javascript" src="/theme.js" />
)

export default function Home() {
  const router = useRouter();
  const toggleSwitch = useRef(null);
  const appDiv = useRef(null);
  const sidebarRef = useRef(null);
  const searchInput = useRef(null);
  const searchBox = useRef(null);

  if (localStorage.getItem("theme") && localStorage.getItem("theme") == "dark") {
    appDiv.current.classList.add('dark');
    toggleSwitch.current.classList.add('dark');
  };
  
  const toggleTheme = (e: any) => {
    e.preventDefault();
    if (localStorage.getItem("theme") && localStorage.getItem("theme") == "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    };
    appDiv.current.classList.toggle('dark');
    toggleSwitch.current.classList.toggle('dark');
  };

  const openSidebar = (e: any) => {
    e.preventDefault();
    sidebarRef.current.classList.add('open');
  };

  const search = (e: any) => {
    e.preventDefault();
    const query = searchInput.current.value;
    if (!query) {
      searchInput.current.focus();
    } else {
      router.push(`/search?q=${query}`);
    }
  };
  
  /* Sidebar: <Sidebar ref={sidebarRef} /> */
  
  const hiddenStyle = { display: "none" };

  return (
    <div className="app" ref={appDiv}>
      <Head>
        <title>Hoover Search</title>
        <link
          rel="icon"
          href="/GUSD_Logo.png"
        />
      </Head>

      <header>
        <span>
          <button className="sidebarToggle icon" onClick={openSidebar} style={hiddenStyle}>
            <MenuAlt1Icon />
          </button>
          <ul className="nav" style={hiddenStyle}>
            <li>Images</li>
            <li>Videos</li>
            <li>News</li>
            <li>Explore</li>
          </ul>
        </span>
        <span>
          <div className="themeToggle icon" ref={toggleSwitch} onClick={toggleTheme}>
            <SunIcon className="sun" />
            <MoonIcon className="moon" />
          </div>
          <Apps />
          <div className="user" style={hiddenStyle}>
            <UserCircleIcon />
            <span className="uid">
              <span className="top">My Account</span>
            </span>
          </div>
        </span>
      </header>

      <main>
        <div className="logo">
          <img src="/GUSD_Logo.png" alt="gusd logo" />
          <img className="shadow" src="/GUSD_Logo.png" alt="gusd logo" />
        </div>
        <div className="searchContainer">
          <form onSubmit={search} className="search" ref={searchBox}>
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Type your query..."
              ref={searchInput}
              onFocus={() => searchBox.current.classList.add('focus')}
              onBlur={() => searchBox.current.classList.remove('focus')}
            />
            <button type="submit">
              <span>Search</span>
              <SearchIcon className="searchIcon" />
            </button>
          </form>
          <button className="lucky" style={hiddenStyle}>
            <SparklesIcon />
            Feeling Lucky?
          </button>
        </div>
      </main>
    </div>
  );
}
