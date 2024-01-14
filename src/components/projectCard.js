import React from 'react'
import * as styles from "./projectCard.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby";

function ProjectCard({ project }) {
  let thumbnailImage = getImage(project?.image?.childImageSharp?.gatsbyImageData)

  return (
    <Link to={`project/${project?.id}`} target='_blank' rel="noreferrer">
      <div className={styles.projectCard} id="projectCard">
        <GatsbyImage image={thumbnailImage} className={styles.projectImg} alt={`thumb-${project?.title}`} />
        {/* <img src={project?.image} className={styles.projectImg} alt={project?.title} /> */}
        <div className={`${styles.projectCardContent} h-[54rem] w-[54rem]`}>
          <p className={styles.heading} style={{ color: project?.color }}>
            {project?.title}
          </p>
          <p className={styles.description}>
            {project?.desc}
          </p>
          <p className="btn btn-primary -mt-1 lg:mt-6 inline-flex" to=''>
            <span>
              see more details
            </span>
          </p>

        </div>

        <div className={styles.projectTools}>
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
    </Link>
  )

}

export default ProjectCard 