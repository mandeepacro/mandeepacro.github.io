import React from 'react'
import BehanceIcon from '../../images/behance.svg';
import GithubIcon from '../../images/github.svg';
import LinkedinIcon from '../../images/linkedin.svg';
import InstagramIcon from '../../images/instagram.svg';

function SocialMediaPanel({isWhite}) {
  return (
    <div className="flex gap-16 justify-center opacity-80 mt-8 px-2">
    <a href="https://www.linkedin.com/in/mandeepbaghel" target='_blank' className='w-12'>
        <img src={LinkedinIcon} alt="linkedin" className={isWhite?"invert":""} />
    </a>
    <a href="https://github.com/mandeepb29" className='w-12' target='_blank'>
    <img src={GithubIcon} alt="github" className={isWhite?"invert":""} />
    </a>
    <a href="https://www.instagram.com/mandeepbaghel/" className='w-12' target='_blank'>
    <img src={InstagramIcon} alt="instagram" className={isWhite?"invert":""} />
    </a>
    <a href="https://www.behance.net/mandeepbaghel" className='w-12' target='_blank'>
    <img src={BehanceIcon} alt="behance" className={isWhite?"invert":""} />
    </a>
</div>
  )
}

export default SocialMediaPanel