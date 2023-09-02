import React, { useEffect, useState } from 'react'
import Logo from "../../images/mandeep.svg";
import "./navbar.css";
import SocialMediaPanel from './socialMediaPanel';
import { Link , scroller } from 'react-scroll'
import { navigate } from "gatsby";
import { withPrefix } from "gatsby"

const Navbar = ({ isWhite }) => {
  const linkStyle = `
     ${isWhite ? "text-darkgrey hover:text-dark" : "text-gray hover:text-white"} navLink cursor-pointer text-xl xl:text-lg font-dm font-bold block transition duration-300  border-b border-b-gray border-opacity-25 pb-4 xl:border-opacity-0 xl:pb-0`;

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const threshold = 20; // set your desired threshold value here
  const scrollEasingFunction = "easeInOutCubic";
  const scrollDuration = 750;
  const navMenuDesktopWidth = 1280;

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navLink');
    const toggleMenu = () => {
      setMenuOpened(!menuOpened);
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    }

    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      setIsScrolled(scrollHeight > threshold);
    };
    

    window.addEventListener('scroll', handleScroll);
    hamburger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
      if (window.innerWidth < navMenuDesktopWidth && navMenu.classList.contains('active')) toggleMenu();
    }))

    return () => {
      window.removeEventListener('scroll', handleScroll);
      hamburger.removeEventListener('click', toggleMenu);
    };
  }
  }, []);

  const links = [
    { name: "work", id: "work", offset: -40 },
    { name: "skills", id: "skills", offset: -30 },
    { name: "testimonial", id: "testimonial", offset: -40 },
    { name: "about me (more)", id: "about", offset: -50 },
    { name: "contact", id: "contact", offset: 0 },
  ]

  const scrollToSection = (id, offset) => {
    const currentPath = typeof window !== 'undefined'? window.location.pathname : "";
    if (currentPath === withPrefix("/")) {
      // If on the homepage, scroll to the section directly
      let scrollOptions = {
        duration: scrollDuration,
        smooth: scrollEasingFunction,
        //spyThrottle: 500, // Throttle scroll spy events (milliseconds)
        offset: window.innerWidth < navMenuDesktopWidth ? offset - 20 : offset, // Offset for scroll position (pixels)
        //hashSpy: true, // Scroll to element with matching hash in URL,
      };
      if(typeof window !== 'undefined') scroller.scrollTo(id, scrollOptions);
    }
    else if(typeof window !== 'undefined') {
      // If on a different page, redirect to the homepage and scroll to the section after redirection
      localStorage.setItem("mPortfolio_HomePageSectionId",id);
      localStorage.setItem("mPortfolio_HomePageSectionOffset",String(offset));
      //console.log("in other page", localStorage);
      navigate(`/`);
    }
}

return (
  <div className={`fixed w-full ${isWhite ? isScrolled ? "bg-white" : "bg-transparent" : "bg-dark"} z-[50] xl:z-40 transition-all ease-in-out-circ`}>
    <div className="container">
      <nav className={`flex flex-row justify-between items-center transition-all ease-in duration-200 delay-300 py-3 xl:py-4 border-b border-b-gray ${isScrolled ? 'border-opacity-25' : 'border-opacity-0'}`}>
        <Link className='z-[49] cursor-pointer navLink' onClick={() => scrollToSection("home", 0)} offset={0}>
          <img src={Logo} className={`h-10 xl:h-12`} alt="Mandeep Logo" id='websiteLogo' />
        </Link>

        <div className="z-[49] cursor-pointer py-1 px-3 w-16 h-12 flex flex-col xl:hidden items-center" id='hamburgerBtn'>
          <div className={`inline-block h-1 mb-2 w-full rounded-md bg-gradient-to-r ${isWhite ? "from-purple" : "from-purplelight"}  to-purplelight2`}></div>
          <div className={`inline-block h-1 mb-1 w-full rounded-md bg-gradient-to-r ${isWhite ? "from-purple" : "from-purplelight"}  to-purplelight2`}></div>
          <span className={`text-xs ${isWhite ? "text-darkgrey" : "text-lightgray"} font-syne font-bold`}>menu</span>
        </div>
        <div className='transition-all ease-out-cubic duration-300 h-screen fixed top-0 left-0 w-full opacity-0 invisible xl:visible xl:relative xl:opacity-100 xl:h-auto flex flex-col xl:flex-row xl:justify-end justify-between pb-8 pt-32 xl:pt-3 xl:pb-3 px-8 xl:px-6 bg-dark xl:bg-transparent' id='navMenu'>
          <ul className={`transition-all ease-out-cubic duration-300 list-none gap-12 xl:gap-28 flex flex-col xl:flex-row 
        ${!isScrolled ? 'lg:mt-16' : ''}`}>
            {
              links.map(link =>
                <li>
                  <Link className={linkStyle} to={link.id} onClick={() => scrollToSection(link.id, link.offset)}>
                    {link.name}
                  </Link>
                </li>
              )
            }
          </ul>

          <div className='xl:hidden'>
            <SocialMediaPanel isWhite={true} />
          </div>
        </div>
      </nav>
    </div>
  </div>
)
}

export default Navbar;