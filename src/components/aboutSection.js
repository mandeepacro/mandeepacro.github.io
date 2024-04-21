import React, { useState, useEffect } from 'react'
import CameraVector from '../images/camera-vector.svg';
import ReadingVector from '../images/reading-vector.svg';
import WalkVector from '../images/walk-vector.svg';
import YoutubeVector from '../images/youtube-vector.svg';
import MovieVector from '../images/movie-vector.svg';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import { useStaticQuery, graphql } from 'gatsby';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import RightButton from './common/rightButton';
import LeftButton from './common/leftButton';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function ImageLightBox() {
    const [photos, setPhotos] = useState([]);
    const data = useStaticQuery(
        graphql`
            query {
              allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/photos/"}}) {
                nodes {
                  frontmatter {
                    title,
                    list {
                            caption
                            image {
                                childImageSharp {
                                  gatsbyImageData(
                                    width: 2000
                                    placeholder: BLURRED
                                    ),
                                }
                              }
                        }
                  }
                }
              }
            }
        `);

    useEffect(() => {
        let photosArray = data.allMarkdownRemark.nodes[0].frontmatter.list;
        let photosList = [];
        photosArray.forEach(photo => {
            const img = getImage(photo?.image?.childImageSharp?.gatsbyImageData);
            photosList.push({ src: img, description: photo.caption });
            //console.log("photos - ", photosList);
        });
        setPhotos(photosList);
    }, []); // empty dependency array to run the effect only once

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <button className="btn btn-primary btn-sm btn-border mt-3" onClick={() => setOpen(true)}>
                <span className="font-bold">
                    see photos
                </span>
            </button>
            <Lightbox
                plugins={[Captions, Counter]}
                captions={{ showToggle: false, descriptionTextAlign: "center", descriptionMaxLines: 1 }}
                styles={{ captionsDescription: { fontFamily: "DM Sans, sans-serif", fontWeight: 700 } }}
                open={open}
                close={() => setOpen(false)}
                render={{
                    slide: ({ slide }) => (
                        <GatsbyImage  layout="constrained" objectFit="contain" image={slide?.src} alt={slide?.description} />
                    ),
                    iconPrev: () => <LeftButton />,
                    iconNext: () => <RightButton />
                }}
                slides={photos}
            /> </>

    )

}

function AboutSection() {
    return (
        <>
            <div className='bg-black' id='about'>
                <div className="grid grid-cols-none md:grid-cols-5 lg:grid-cols-3">
                    <div className="grid md:col-span-3 lg:col-span-2">
                        <section>
                            <div className="container">
                                <h2 className="section-heading mb-0">
                                    More about me
                                </h2>

                                <p className='text-white text-md'>
                                    while, I am not working you can find me...
                                </p>

                                <div className="grid grid-cols-5 mt-16 gap-2 md:gap-4 lg:gap-6 items-center">
                                    <div className='col-span-3'>
                                        <div className="grid gap-2 md:gap-4 lg:gap-6">
                                            <div className="rounded-2xl md:rounded-3xl px-6 pb-8 pt-5 bg-[#E3FFE2]">
                                                <img src={CameraVector} className='w-20 lg:w-28 mb-6' alt="photography" />
                                                <h3 className='font-bold text-xl md:text-xl lg:text-2xl break-word'>doing <br /> photography</h3>
                                                <ImageLightBox />
                                            </div>


                                            <div className="grid grid-cols-2">
                                                <div></div>
                                                <div className="col-span-2 lg:col-span-1 rounded-2xl md:rounded-3xl px-6 pt-6 pb-4 bg-[#E5FFFF]">
                                                    <img src={WalkVector} className='w-16 mb-4' alt="long walk hobby" />
                                                    <h3 className='font-bold text-lg md:text-xl break-word'>taking <br />long walks</h3>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl md:rounded-3xl px-6 pb-6 pt-4 bg-[#FFA8A8]">
                                                <img src={YoutubeVector} className='w-20 lg:w-28 mb-6' alt="youtube hobby" />
                                                <h3 className='font-bold text-lg md:text-xl break-word'>watching random  <br />
                                                    youtube videos</h3>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-span-2'>
                                        <div className="grid gap-2 md:gap-4 lg:gap-6">

                                            <div className="rounded-2xl md:rounded-3xl px-4 pb-6 pt-4 bg-[#F5FFCB]">
                                                <img src={MovieVector} className='w-16 lg:w-20 mb-6' alt="photography" />
                                                <h3 className='font-bold text-lg md:text-xl lg:text-2xl break-word'>watching <br /> movies</h3>
                                                {/* <button className="btn btn-primary btn-sm btn-border mt-3">
                                            <span>
                                            see my favourites
                                                    </span>
                                            </button> */}
                                            </div>

                                            <div className="rounded-2xl md:rounded-3xl px-4 pb-6 pt-4 bg-[#B0C1FF]">
                                                <img src={ReadingVector} className='w-16 lg:w-20 mb-6' alt="photography" />
                                                <h3 className='font-bold text-lg md:text-xl lg:text-2xl break-word'>reading non-fiction novels</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                        <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
                    </div>
                </div>
            </div>

        </>

    )
}

export default AboutSection