import React from 'react'
import { useState } from 'react';
import * as styles from "./projectCard.module.css";
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"
import { Link } from "gatsby";
import ExternalLinkIcon from "../images/icons/external-link.svg"
import GithubLinkIcon from "../images/icons/github.svg"
import UpArrow from "../images/icons/chevron-up.svg"

function ProjectCard({ project }) {
  //let thumbnailImage = getImage(project?.image?.childImageSharp?.fluid)

  const [showContent, SetShowContent] = useState(false);
  const images = withArtDirection(getImage(project?.image?.childImageSharp?.gatsbyImageData), [
    {
      media: "(max-width: 576px)",
      image: getImage(project?.image_mobile?.childImageSharp?.gatsbyImageData),
    },
  ])

  
  //console.log("project", project);
  return (
      <div className={`${styles.projectCard} ${showContent ? styles.showcontent:""}`} id="projectCard">
        <GatsbyImage image={images} className={styles.projectImg} alt={`thumb-${project?.title}`} />
        {/* <img src={project?.image} className={styles.projectImg} alt={project?.title} /> */}
        <div className={`${styles.projectCardContent} h-[54rem] w-[54rem]`}>
          <p className={styles.heading} style={{ color: project?.color }}>
            {project?.title}
          </p>

          <div className="text-center lg:hidden mb-3">
            <button className={`btn btn-primary btn-border btn-icon ml-0 -mt-2 lg:mt-6 inline-flex ${styles.uparrow}`} onClick={() => SetShowContent(!showContent)}>
               <img src={UpArrow} alt="go to website" className='opacity-75' />
            </button>
          </div>

          <div className='flex flex-col-reverse lg:flex-col gap-4 mt-4 lg:mt-0'>
          <p className={styles.description}>
            {project?.desc}
          </p>
          <div className="flex justify-center gap-8">
          {
            project?.link ? 
            <a className="btn btn-primary btn-icon -mt-1 lg:mt-6 inline-flex" href={project?.link} target='_blank' rel="noreferrer">
               <span>See Live</span>
               <img src={ExternalLinkIcon} alt="go to website" className='opacity-75' />
            </a> : null
          }
          {
            project?.code_link ? 
            <a className="btn btn-primary btn-icon -mt-1 lg:mt-6 inline-flex" href={project?.code_link} target='_blank' rel="noreferrer">
            <img src={GithubLinkIcon} alt="go to website" className='opacity-75' />
               <span>Code</span>
            </a> : null
          }
          </div>
          </div>
          
        </div>

        <div className={`${styles.projectTools}`}>
          {project?.technologies?.map((item, i) => (
            <div key={`tech_icon-${project?.title}-${item?.name}`} className={`${styles.projectTool}`} style={{ transitionDelay: (i) * 80 + "ms" }}>
              <div className={styles.projectIcon}>
                <GatsbyImage alt={`thumb-${item?.title}`} image={getImage(item?.image?.childImageSharp?.gatsbyImageData)} />
              </div>
              <p className='text-sm text-white'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
  )

}

export default ProjectCard 