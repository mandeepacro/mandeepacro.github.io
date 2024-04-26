import React from 'react'
import LeftIcon from "../../images/left-arrow.png"

function LeftButton() {
  return (
    <img src={LeftIcon} className='h-4 w-4 md:h-8 md:w-8 brightness-0 invert' />
  )
}

export default LeftButton