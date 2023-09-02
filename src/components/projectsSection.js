import React from 'react'
import ProjectCard from './projectCard';
import { useStaticQuery, graphql } from 'gatsby';

const ProjectsSection = () => {

  const data = useStaticQuery(
    graphql`
    query {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/projects/"}}) {
        nodes {
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 2000
                  placeholder: DOMINANT_COLOR
                  ),
              }
            }
            title
            color
            desc
            id
            technologies {
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 100
                    placeholder: DOMINANT_COLOR
                    ),
                }
              }
              name
            }
          }
        }
      }
    }
`)

  const projects = data.allMarkdownRemark.nodes;
  //console.log("projects -- ",projects);

  return (
    <section id='work'>
      <div className="container">
      <div className="text-center">
        <h2 className="section-heading">
          projects i've worked upon
        </h2>
        </div>
        {
          projects.map((project,index) => {
            return (
              <div className={`grid gap-4 ${ index != projects.length - 1? 'mb-8 md:mb-12 lg:mb-20':''}`}> 
                <ProjectCard project={project.frontmatter}></ProjectCard>
              </div>
            )
          })
        }
      
      </div>
      
    </section>
  )
}

export default ProjectsSection

