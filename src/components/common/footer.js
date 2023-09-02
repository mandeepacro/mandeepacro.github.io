import React from 'react'
import SocialMediaPanel from "./socialMediaPanel";

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <section className='bg-white p-0 z-[45] relative' id='contact'> 
        <div className="flex flex-col min-h-screen pt-16 xl:pt-0 justify-between">
        <div className="container mt-16">
        <div className="text-center">
        <h2 className='section-heading section-heading-dark text-center max-w-3xl normal-case mx-auto text-2xl md:text-3xl md:leading-normal'>
        Thanks for stopping by, I’m currently looking to join a new team of creative designers and developers. If you think we might be a good fit for one another, please contact me.
        </h2>
        </div>
        <div className="text-center">
        <button className="btn btn-primary">
        <span>
        connect with me
                  </span>
        </button>
        </div>
        </div>
        <div className="container mt-28">
        <p className="text-darkgrey text-center font-medium text-sm">
            you can also find me on these platforms
        </p>

        <SocialMediaPanel />

        <div className="border-t border-lightgray py-6 mt-8">
            <p className="text-darkgrey font-medium text-center text-md">
                {
                    `Copyright  ${currentYear}. Mandeep Baghel`
                }
            </p>
        </div>
         
            </div>
        </div> 
    </section>
  )
}

export default Footer