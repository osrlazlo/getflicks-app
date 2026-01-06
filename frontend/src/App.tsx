import { createContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//COMPONENST
import DiscoverPage from './components/pages/discover/DiscoverPage.jsx';
import ProgressPage from './ProgressPage.js';
import favicon from './assets/favicon.svg';
import HomePage from './components/pages/home/HomePage.js';
import Head from 'next/head';
import LoginPage from './components/user_features/login/LoginPage.js';
import SignUpPage from './components/user_features/login/SingUpPage.js';

//STYLES
import './App.css';

import { loadGenres, type Genre } from '../../functions/loadGenres.js'; 

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

interface GenresContext {
  genres:Genre[]
}

export const ActiveDisplayContext = createContext<DisplayContext>({activeDisplay:'', toggleActiveDisplay:() => {}});
export const OpenDropdownContext = createContext<DropdownContext>({openDropdown:'', toggleOpenDropdown:() => {}});
export const NavOriginContext = createContext<NavOriginContext>({navOrigin:'', toggleNavOrigin:() => {}});
export const GenresContext = createContext<GenresContext>({genres:[]})

const router = createBrowserRouter([
  {path:"/", element: <HomePage/>},
  {path:"/home", element: <HomePage/>},
  {path:"/discover", element: <DiscoverPage/>},
  {path:"/latest", element: <ProgressPage/>},
  {path:"/about", element: <ProgressPage/>},
  {path:"/login", element: <LoginPage/>},
  {path:"/signup", element: <SignUpPage/>}
]);

export default function App() {

  //keep track of which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string>("");
  function toggleOpenDropdown(dropdown:string) {
      setOpenDropdown(openDropdown === dropdown? "":dropdown);
  };

  const [activeDisplay, setActiveDisplay] = useState<string>("");
  function toggleActiveDisplay(display:string) {
    setActiveDisplay(display);
  };

  const [navOrigin, setNavOrigin] = useState("");
   function toggleNavOrigin(origin:string) {
    setNavOrigin(origin);
  };
  
  const [genres, setGenres] = useState<Genre[]>([])
  useEffect(() => {
    async function getGenres() {
      const genres = await loadGenres()
      setGenres(genres)
    }
    getGenres()
  },[])

  return (
    <>
    <Head>
      <title>{`${activeDisplay} | getflicks`}</title>
      <link rel="icon" type="image/svg+xml" href={favicon}/>
    </Head>
    <NavOriginContext.Provider value={{navOrigin, toggleNavOrigin}}>
    <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
    <ActiveDisplayContext.Provider value={{activeDisplay, toggleActiveDisplay}}>
    <GenresContext.Provider value={{genres}}>
      <div className='page-container'>

            <RouterProvider router={router}/>
         
      </div>
    </GenresContext.Provider>
    </ActiveDisplayContext.Provider>
    </OpenDropdownContext.Provider>
    </NavOriginContext.Provider>
    </>
  );
}
