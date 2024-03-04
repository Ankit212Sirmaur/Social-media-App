import React from 'react'
import './feed.scss'
import Post from '../Post/Post'
import Follower from '../follower/Follower'

function Feed() {
  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">You are following</h3>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
          </div>
          <div className="suggestions">
            <h3 className="title">Suggestion  for you</h3>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed