import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import TestimonialCarousel from './TestimonialCarousel';

function TestimonialSection() {
  const data = useStaticQuery(
    graphql`
        query {
          allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/testimonials/"}}) {
            nodes {
              frontmatter {
                title,
                list {
                    content
                    name
                    designation
                    image {
                      childImageSharp {
                        gatsbyImageData(
                          width: 200
                          placeholder: DOMINANT_COLOR
                          ),
                      }
                    }
                }
              }
            }
          }
        }
    `);

  const testimonialsData = data.allMarkdownRemark.nodes[0].frontmatter.list;

  return (
    <section className='testimonial-section bg-light-gr' id='testimonial'>
      <div className="container">
        <h2 className='section-heading section-heading-dark'>
          testimonials
        </h2>
        </div>
        <TestimonialCarousel carouselData={testimonialsData} />
    </section>
  )

}

export default TestimonialSection