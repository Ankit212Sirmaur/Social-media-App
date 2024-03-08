import React, { useEffect, useState } from 'react'
import './updateProfile.scss'
import userImg from '../../assests/user.png'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading,updateMyProfile  } from '../../redux/Slice/appConfigSlice';

function UpdateProfile() {

    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const[name, setName] = useState('');
    const[bio, setBio] = useState('');
    const[img, setImg] = useState('');
    const dispatch = useDispatch();

    useEffect(() =>{
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '')
        setImg(myProfile?.avatar?.url || '');
    }, [myProfile]);

    function handleSubmit(e){
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            img,
        }));
    }

    function handleImage(e){
        // this are come with DOM
        const file = e.target.files[0];
        const filreader = new FileReader();
        filreader.readAsDataURL(file);
        filreader.onload = () =>{
            if(filreader.readyState === filreader.DONE){
                setImg(filreader.result);
                console.log('img data', filreader.result);
            }
        }
    }
    return ( <div className="UpdateProfile">
    <div className="container">
        <div className="left-part">
            <div className="input-user-img">
                <label htmlFor="inputImg" className="labelImg">
                    <img src={userImg} alt={name} />
                </label>
                <input
                    className="inputImg"
                    id="inputImg"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />
            </div>
        </div>
        <div className="right-part">
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    value={bio}
                    type="text"
                    placeholder="Your Bio"
                    onChange={(e) => setBio(e.target.value)}
                />
                <input type="submit" className="btn-primary" onClick={handleSubmit}/>
            </form>

            <button className="delete-account btn-primary">
                Delete Account
            </button>
        </div>
    </div>
</div>
);
}

export default UpdateProfile