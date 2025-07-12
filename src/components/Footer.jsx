import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} alt=""  width={150}/>
      <p className='flex-1 border-l pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @rawat.dev | All right reserved.</p>
      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.instagram_icon} alt="" />
      </div>
      
    </div>
  )
}

export default Footer
