import React, { useEffect } from 'react';
import Layout from '../components/common/layout';
import HeaderSection from '../components/headerSection';
import ProjectsSection from '../components/projectsSection';
import SkillsSection from '../components/skillsSection';
import TestimonialSection from '../components/testimonialSection';
import AboutSection from '../components/aboutSection';
import { scroller } from 'react-scroll'

const navMenuDesktopWidth = 1280;

// Step 2: Define your component
const IndexPage = () => {
  useEffect(()=>{
   
    console.log("enter homepage");

    //if(typeof localStorage !== 'undefined'){
      const scrollEasingFunction = "easeInOutCubic";
      const scrollDuration = 750;
      let sectionId = localStorage.getItem("mPortfolio_HomePageSectionId");
      let offset = parseInt(localStorage.getItem("mPortfolio_HomePageSectionOffset"));
    //}
    
    if(sectionId){
      let scrollOptions = {
        duration: scrollDuration,
        smooth: scrollEasingFunction,
        //spyThrottle: 500, // Throttle scroll spy events (milliseconds)
        offset: window.innerWidth < navMenuDesktopWidth ? offset - 20 : offset, // Offset for scroll position (pixels)
        //hashSpy: true, // Scroll to element with matching hash in URL,
      };
      console.log("scroll to section - ",sectionId,  scrollOptions)
      scroller.scrollTo(sectionId, scrollOptions);
      localStorage.removeItem("mPortfolio_HomePageSectionId");
      localStorage.removeItem("mPortfolio_HomePageSectionOffset");
    };
  
  },[]);

  return (
    <main id='mainWrapper'>
      <Layout>
      <HeaderSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialSection />
      <AboutSection />
      </Layout>
    </main>
  )
}

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Mandeep Baghel</title>

// Step 3: Export your component
export default IndexPage