import React, { useState } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteButton from '../../assets/delete.png';

function DeleteImageButton({ onClick }) {
  return (
    <img
      src={DeleteButton}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: -10,
        right: -10,
        width: 18,
        height: 18,
        backgroundColor: 'white',
        borderRadius: '50%',
        zIndex: 1001
      }}
      alt=""
    />
  );
}

function AddImageButton({ size, setAvatar }) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };

  const handleProgress = (progress) => setProgress(progress);
  const handleUploadError = (error) => setIsUploading(false);
  const handleUploadSuccess = (filename) => {
    setProgress(100);
    setIsUploading(false);
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => setAvatar(url));
  };
  return (
    <label>
      <AddBoxIcon
        color="action"
        style={{
          width: size,
          height: size
        }}
      />

      <FileUploader
        hidden
        accept="image/*"
        randomizeFilename
        storageRef={firebase.storage().ref('images')}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        onProgress={handleProgress}
      />
    </label>
  );
}

function ImageAvatar({ avatar, setAvatar }) {
  const handleDeleteAvatar = () => {
    setAvatar('');
  };

  return (
    <div className={`clearfix`}>
      <div style={{ position: 'relative', float: 'left', width: 160, height: 160 }}>
        {avatar && <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
        {avatar && <DeleteImageButton onClick={() => handleDeleteAvatar()} />}
        {!avatar && <AddImageButton size={160} setAvatar={setAvatar} />}
      </div>
    </div>
  );
}

export default ImageAvatar;
