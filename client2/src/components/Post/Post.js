import React from 'react'
import Avatar from '../Avatar/Avatar'
import './post.scss'
import temple from '../../assests/temple.avif'
import { FaRegHeart } from "react-icons/fa";

function Post({ post }) {
  return (
    <div className="Post">
      <div className="heading">
        <Avatar />
        <h4>Piyush Raj</h4>
      </div>
      <div className="content">
        <img src={temple} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <FaRegHeart className='icon'/>
          <h4>likes</h4>
        </div>
        <div className="caption">This is temple view in the moon night</div>
        <div className="time-ago">4 hrs ago</div>
      </div>
    </div>
  )
}

export default Post