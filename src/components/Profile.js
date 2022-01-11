import React from "react";
import { useState,useEffect } from 'react'
import '../index.css';
import {storage} from '../firebase/config'

import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';

const localUrl = localStorage.getItem('urls');
const locUrl = JSON.parse(localUrl);
if(locUrl)
{
  var loclUrl = locUrl;
}

const Profile = () => {
  const [file,setFile] = useState(null);
  const [progress,setProgress] = useState(0);
  const [previewUrl,setpreviewUrl] = useState();

  
  useEffect(() => {
    if(!file)
    {
      return;
    }
    // const fileReader = new FileReader();
    // fileReader.onload=() => {
    //   setpreviewUrl(fileReader.result);
    // }
    // fileReader.readAsDataURL(file);
    const storageRef = ref(storage,`/files/${file.name}`);
    const uploadImage = uploadBytesResumable(storageRef,file);
    uploadImage.on("state_changed",
      (snapshot) => {
        const prog =Math.round((snapshot.bytesTransferred / snapshot.totalBytes ) * 100 );
        setProgress(prog);
      },(err)=> console.log(err),
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
        .then((url) => {
          localStorage.setItem('urls',JSON.stringify(url));
          setpreviewUrl(url);
          console.log(url)
        }
        );
      }
    )
  },[file]);

    const changeHandler = (e) => {
      let pickedFile;
      if(e.target.files && e.target.files.length===1)
      {
        pickedFile = e.target.files[0];
        setFile(pickedFile);
      }
    }

  

  return (
    <div className="container profile">
      <div className="mt-3 piccontainer">
        {previewUrl&&loclUrl&&<img src={previewUrl} className="image" alt="Profile-pic" width="400px" height="400px" />}
        {previewUrl&&!loclUrl&&<img src={previewUrl} className="image" alt="Profile-pic" width="400px" height="400px" />}
        {!previewUrl&&!loclUrl&&<img src="logo512.png" className="image" alt="Profile-pic" width="400px" height="400px" />}
        {loclUrl&&!previewUrl&&<img src={loclUrl} className="image" alt="Profile-pic" width="400px" height="400px" />}
        <div className="overlay">
          <div className="icon">
            <form>
              <label htmlFor="file"><i className="fa fa-camera" aria-hidden="true"></i></label>
              <input type="file" className="file" id="file" onChange={changeHandler} accept=".jpg,.png,.jpeg" />
            </form>
          </div>
        </div>
      </div>
      <div>
        Uploaded:{progress}%
      </div>
    </div>
  )
}

export default Profile;