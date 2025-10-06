import { createContext, useContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//VARS & FCTS
import { homeLabel, latestLabel, discoverLabel, aboutLabel } from './components/header/Navigator';

//COMPONENST
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DiscoverPage from './components/pages/discover/DiscoverPage';
import ProgressPage from './ProgressPage.js';
import favicon from './assets/favicon.svg';
import HomePage from './components/pages/home/HomePage';
import Head from 'next/head';
import LoginPage from './components/user_features/login/LoginPage';

//STYLES
import './App.css';
import SignUpPage from './components/user_features/login/SingUpPage';

interface DisplayContext {
  activeDisplay:string,
  toggleActiveDisplay: (display:string)=>void
};

interface DropdownContext {
  openDropdown:string,
  toggleOpenDropdown: (dropdown:string)=>void
};

interface NavOriginContext {
  navOrigin:string,
  toggleNavOrigin: (origin:string)=>void
};

export const ActiveDisplayContext = createContext<DisplayContext|null>(null);
export const OpenDropdownContext = createContext<DropdownContext|null>(null);
export const NavOriginContext = createContext<NavOriginContext|null>(null);

const router = createBrowserRouter([
  {path:"/", element: <HomePage/>},
  {path:"/home", element: <HomePage/>},
  {path:"/discover", element: <DiscoverPage/>},
  {path:"/latest", element: <ProgressPage/>},
  {path:"/about", element: <ProgressPage/>},
  {path:"/login", element: <LoginPage/>},
  {path:"/sign-up", element: <SignUpPage/>}
]);

export default function App() {

  //keep track of which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string>("");
  function toggleOpenDropdown(dropdown:string) {
      setOpenDropdown(o => openDropdown === dropdown? "":dropdown);
  };

  const [activeDisplay, setActiveDisplay] = useState<string>("");
  function toggleActiveDisplay(display:string) {
    setActiveDisplay(p => display);
  };

  const [navOrigin, setNavOrigin] = useState("");
   function toggleNavOrigin(origin:string) {
    setNavOrigin(o => origin);
  };

  return (
    <>
    <Head>
      <title>{`${activeDisplay} | getflicks`}</title>
      <link rel="icon" type="image/svg+xml" href={favicon}/>
    </Head>
    <NavOriginContext.Provider value={{navOrigin, toggleNavOrigin}}>
    <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
    <ActiveDisplayContext.Provider value={{activeDisplay, toggleActiveDisplay}}>
      <div className='page-container'>

            <RouterProvider router={router}/>
         
      </div>
    </ActiveDisplayContext.Provider>
    </OpenDropdownContext.Provider>
    </NavOriginContext.Provider>
    </>
  );
}
