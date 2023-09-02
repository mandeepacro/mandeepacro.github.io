import React from 'react'
import * as styles from "./projectCard.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby";

function ProjectCard({ project }) {
  let thumbnailImage = getImage(project?.image?.childImageSharp?.gatsbyImageData)

  return (
    <a href={`project/${project?.id}`} target='_blank'>
      <div className={styles.projectCard} id="projectCard">
        <GatsbyImage image={thumbnailImage} className={styles.projectImg} />
        {/* <img src={project?.image} className={styles.projectImg} alt={project?.title} /> */}
        <div className={`${styles.projectCardContent} h-[54rem] w-[54rem]`}>
          <p className={styles.heading} style={{ color: project?.color }}>
            {project?.title}
          </p>
          <p className={styles.description}>
            {project?.desc}
          </p>
          <Link className="btn btn-primary -mt-1 lg:mt-6 inline-flex">
            <span>
              see more details
            </span>
          </Link>

        </div>

        <div className={styles.projectTools}>
          {project?.technologies?.map((item, i) => (
            <div className={`${styles.projectTool}`} style={{ transitionDelay: (i) * 80 + "ms" }}>
              <div className={styles.projectIcon}>
                <GatsbyImage image={getImage(item?.image?.childImageSharp?.gatsbyImageData)} alt={item.name} />
              </div>
              <p className='text-sm text-white'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </a>
  )

}

export default ProjectCard 