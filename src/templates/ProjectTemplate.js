import React from 'react'
import { graphql, useStaticQuery } from "gatsby"
import Layout from '../components/common/layout';
import * as styles from "./ProjectTemplate.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import RightIcon from "../images/right-arrow.png"
import { Link } from "gatsby"
import NotFoundPage from '../pages/404';

export default function ProjectTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log("project data ---- ", data);
  const { markdownRemark } = data // data.markdownRemark holds your post data

  const { frontmatter, html } = markdownRemark
  const AllProjects = data.allMarkdownRemark.nodes;
  console.log("all projects", AllProjects);
  console.log("frontmatter", frontmatter);

  const currentIndex = AllProjects.findIndex(el => el.frontmatter.id == frontmatter.id);
  console.log("current index", currentIndex);
  const nextIndex = (currentIndex + 1) % AllProjects.length;
  const nextProject = AllProjects[nextIndex].frontmatter;
  //console.log("next index - ", currentIndex, nextIndex);
  const getLighterAndNearWhiteShades = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    // Convert RGB to HSL
    const hsl = rgbToHsl(r, g, b);

    // Increase lightness component for lighter shade
    const lighterHsl = { ...hsl, l: Math.min(hsl.l + 0.3, 1) };
    const nearWhiteHsl = { ...hsl, l: Math.min(hsl.l + 0.37, 1) };
    // Convert lighter HSL to RGB and then to hex
    const lighterShade = hslToHex(lighterHsl.h, lighterHsl.s, lighterHsl.l);
    const nearWhiteShade = hslToHex(nearWhiteHsl.h, nearWhiteHsl.s, nearWhiteHsl.l);
    return { lighterShade, nearWhiteShade }
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h, s, l };
  }

  // Convert HSL to hex
  function hslToHex(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hueToRgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const { lighterShade, nearWhiteShade } = getLighterAndNearWhiteShades(frontmatter.color);
  const gradientStyle = {
    background: `linear-gradient(170.33deg, ${lighterShade} ,${nearWhiteShade})`,
  };

  return (
    <Layout showWhiteHeader={true}>
      <div className='py-6' style={gradientStyle}>
        <section>
          <div className="container">
            <h1 style={{ color: frontmatter.color }} className='text-6xl lg:text-7xl tracking-tighter mt-32'>{frontmatter.title}</h1>
            <p className="text-darkgrey font-bold text-lg lg:text-xl mt-4 max-w-4xl">
              {frontmatter.desc}
            </p>
          </div>
        </section>
        <div className={`${styles.contentGlassDiv} mt-8`}>
          <section className='pt-4 lg:pt-8 min-h-screen'>
            <div className="container">


              <div className='px-2 lg:px-0'>
                <p className="text-darkgrey font-medium mb-4">
                  made using
                </p>
                {frontmatter?.technologies?.map(item => (
                  <div className="inline-flex gap-2 mr-4 mb-4 items-center shadow-sm px-4 lg:px-6 py-2 rounded-full bg-white">
                    <GatsbyImage class='w-6 h-auto object-contain' image={getImage(item?.image?.childImageSharp?.gatsbyImageData)} alt={item.name} />
                    <p className='text-sm text-dark font-bold'>{item.name}</p>
                  </div>
                ))}
              </div>
              <div className={styles.content}>
                <div
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="container">
          <Link className="py-4 pt-8 lg:py-16 block" to={`/project/` + nextProject?.id}>
            <p className="group inline-flex gap-2 items-center text-gr-link">
              <span className="font-bold text-darkgrey text-lg">Next Project</span>
              <img src={RightIcon} className='transition-all ease-out-cubic w-8 lg:w-12 group-hover:translate-x-2 group-hover:opacity-[.25]' alt="Visit Project" />
            </p>
            <h1 className="lg:text-end mt-4 lg:mt-8" style={{ color: nextProject?.color }}>
              {
                nextProject?.title
              }
            </h1>
          </Link>
        </div>

      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(frontmatter : {id: { eq: $id }}) {
      html
      frontmatter {
        id
        title
        color
        desc
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
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/projects/"}}) {
      nodes {
        frontmatter {
          title
          color
          id
        }
      }
    }
  }
`