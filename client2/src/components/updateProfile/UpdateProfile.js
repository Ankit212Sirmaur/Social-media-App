import React from 'react'
import './updateProfile.scss'
import userImg from '../../assests/user.png'

function UpdateProfile() {
    return (
        <div className="UpdateProfile">
            <div className="container">
                <div className="left-part">
                    <img className='user-img' src={userImg} alt='' />
                </div>
                <div className="right-part">
                    <form>
                        <input type="text" placeholder='Your name' />
                        <input type="text" placeholder='Your Bio' />

                        <input type="submit" className='btn-primary' submit />
                    </form>
                <button className="delete-account btn-primary">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile