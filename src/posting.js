import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const containerStyle = {
  background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  height: '100vh',
  marginTop: '0px',
};

const profileButtonStyle = {
  cursor: 'pointer',
  marginLeft: 'auto',
};

const headerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
  paddingBottom: '20px',
  marginLeft: '20px',
};

const appIconStyle = {
  width: '40px',
  height: '40px',
};

const greyBoxStyle = {
  background: 'grey',
  borderRadius: '4px',
  padding: '20px',
  display: 'grid',
  gridTemplateColumns: '3.5fr 1fr',
  gap: '20px',
  marginLeft: '40px',
  marginRight: '40px',
  marginBottom: '20px',
  borderTop: '4000px',
};

const titleBoxStyle = {
  background: 'white',
  padding: '10px',
  borderRadius: '4px',
  marginTop: '20px', // Adjusted margin-top
};

const editorStyle = {
  background: 'white',
  paddingBottom: '50px',
  borderRadius: '4px',
  marginBottom: '20px', // Adjusted margin-bottom
};

const buttonContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
};

const rulesContainerStyle = {
  marginTop: '59px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginRight: '20px', // Adjusted margin-right
};

const ruleBoxStyle = {
  background: '#f5f5f5',
  borderRadius: '4px',
  padding: '20px',
  height: '380px',
  width: '100%',
};

const RichTextEditor = ({
  appIconSrc,
  profileButtonText = 'profile',
  chooseImageButtonText = 'Choose Image',
  postButtonText = 'Post',
}) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Initialize with null
  const imageUploadInputRef = useRef(React.createRef());
  const [title, setTitle] = useState('');

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = () => {
    imageUploadInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setImage(base64); // Set the image state with base64 data
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }
  };

  const handlePost = async () => {
    try {
      const currentDate = new Date();
      const username = 'YourUsername';
      const likes = 0;

      await fetch('http://localhost:5000/saveContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image,
          date: currentDate,
          username,
          likes,
        }),
      });

      setTitle('');
      setContent('');
      setImage(null);

      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <img src={appIconSrc} alt="App Icon" style={appIconStyle} />
        </div>
        <div style={profileButtonStyle}>{profileButtonText}</div>
      </div>

      <div style={containerStyle}>
        <div style={greyBoxStyle}>
          <div>
            <div>
              <button className="btn btn-info" onClick={handleImageUpload}>
                {chooseImageButtonText}
              </button>
              <input
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={imageUploadInputRef}
              />
            </div>

            <div style={titleBoxStyle}>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', fontWeight: 'bold' }}
              />
            </div>

            <div style={editorStyle}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleEditorChange}
                style={{ width: '100%', height: '300px' }}
              />
            </div>
          </div>

          <div style={rulesContainerStyle}>
            <div style={ruleBoxStyle}>
              <h3>Community Rules</h3>
              <div>
                <label style={{ fontWeight: 'bold' }}>Rule 1:</label>
                <div>Don't be mean</div>
              </div>
              <div>
                <label style={{ fontWeight: 'bold' }}>Rule 2:</label>
                <div>No spam or self-promotion</div>
              </div>
            </div>
          </div>

          <div style={buttonContainerStyle}>
            <button className="btn btn-success" onClick={handlePost}>
              {postButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
