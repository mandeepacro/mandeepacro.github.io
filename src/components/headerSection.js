import React from 'react'
import PersiLogo from "../images/companies/persistent.png";
import CodexLogo from "../images/companies/codex.png";
import ZeitLogo from "../images/companies/zeit.png";
import FALogo from "../images/companies/foreignadmits.png";
import OneWaterLogo from "../images/companies/onewater.png";

const HeaderSection = () => {
  return (
    <section className='pt-36 lg:pt-60' id='home'>
        <div className="container">
        <div class="w-max-3xl lg:w-max-5xl">
        <div className='border-b border-bordergrey'>
        <p className='font-code text-sm sm:text-md md:text-lg text-lightgray'>Hello, I’m</p>
        <h1 className='text-gradient bg-gradient-to-r from-green to-yellow mb-2'>Mandeep Baghel</h1>
        <p className='text-lightgray max-w-2xl text-sm sm:text-md md:text-[18px] font-code mt-4 leading-6 md:leading-9 lg:leading-10 mb-16'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>
        <div className='m-div'>
           <h6 className='mb-head text-white'>I love to do...</h6>
           <div className="grid md:grid-cols-2 gap-8">
                <div className='max-w-xs'>
                    <h2 className='text-gradient bg-gradient-to-r from-orange to-lightred mb-4'>Design</h2>
                    <p className='text-lightgray'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                    </p>
                </div>
                <div className='max-w-xs'>
                    <h2 className='text-gradient bg-gradient-to-r from-purple to-purplelight mb-4'>Engineering</h2>
                    <p className='text-lightgray'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                    </p>
                </div>
           </div>
           </div>
        </div>
       
           <div className='m-div mb-0'>
           <h3 className='text-gradient bg-gradient-to-r from-green to-yellow mb-head'>Awesome organisations I’ve worked with</h3>

           <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 justify-center align-center gap-6 gap-y-12 mt-4 md:mt-8">
            <div className="org-logo flex justify-center">
                <img src={PersiLogo} className="h-8" alt="persistent" />
            </div>
            <div className="org-logo flex justify-center">
                <img src={ZeitLogo} className="h-8" alt="persistent" />
            </div>
            <div className="org-logo flex justify-center">
                <img src={FALogo} className="h-8" alt="persistent" />
            </div>
            <div className="org-logo flex justify-center">
                <img src={OneWaterLogo} className="h-10" alt="persistent" />
            </div>
            <div className="org-logo flex justify-center">
                <img src={CodexLogo} className="h-12" alt="persistent" />
            </div>
          </div>

           </div>
        </div>
       
    </section>
  )
}

export default HeaderSection;