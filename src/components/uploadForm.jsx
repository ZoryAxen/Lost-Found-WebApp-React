import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Input, SelectField, TextAreaField, Button, Message } from '@aws-amplify/ui-react';

import axios from 'axios';

function UploadForm() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState(false);

  const optionList = ['Electronics', 'Wearables', 'Valuables', 'Others']

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  function generateImageName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const uploadImageToS3 = async (file) => {
    try {
      const fileName = generateImageName(15);

      const s3file = 'https://cadassignmentupload.s3.amazonaws.com/' + fileName + '.jpg'
      await fetch(`https://9atnhscopd.execute-api.us-east-1.amazonaws.com/dev/cadassignmentupload/${fileName}.jpg`, {
        method: 'PUT',
        body: file
      });
      return s3file;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !location || !description || !image) {
      setFailedMessage(true);
      return; // Prevent form submission
    }
    const imageUrl = await uploadImageToS3(image);
    try {
      const formData = {
        description: description,
        category: category,
        location: location,
        imageUrl: imageUrl
      };

      const response = await axios.put('https://r5mex7xr1e.execute-api.us-east-1.amazonaws.com/default/createdbitempython', {
        body: {
          formData
        }
      })

      if (response.status == 200) {
        setSuccessMessage(true);
        setImage(null);
        setCategory('');
        setDescription('');
        setLocation('');
        setPreviewImage(null);

        const fileInput = document.getElementById('image-upload');
        if (fileInput) {
          fileInput.value = ''; // Reset the value of the file input field
        }

      } else if (response.status == 400) {
        console.log("Missing things", response);
      } else {
        console.log("Failed Submitting form", response);
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <Container>
      { successMessage ? <Message colorTheme="success" isDismissible={true} onDismiss={() => { setSuccessMessage(false) }}>Report Uploaded!</Message> : <></>}
      { failedMessage ? <Message colorTheme="error" isDismissible={true} onDismiss={() => { setFailedMessage(false) }}>Upload Failed!</Message> : <></>}
      <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'block', width: '100%', padding: '0px' }}>
        <div className="mb-4" style={{ fontSize: '20px' }}>
          <p>Category</p>
          <SelectField type="text" value={category} onChange={(event) => handleCategoryChange(event)} placeholder='Please select a category'
            options={optionList}>
          </SelectField>
        </div>
        <div className="mb-4" style={{ fontSize: '20px' }}>
          <p>Location</p>
          <Input type="text" value={location} rows={3} onChange={(event) => handleLocationChange(event)} placeholder='Enter Location Found' />
        </div>
        <div className="mb-4" style={{ fontSize: '20px' }}>
          <p>Description</p>
          <TextAreaField value={description} rows={3} onChange={(event) => handleDescriptionChange(event)} placeholder='Enter Description' />
        </div>
        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column', fontSize: '20px', alignItems: 'flex-start' }}>
          <p>Image Upload -Jpeg files only-</p>
          <label htmlFor="image-upload" className="custom-file-upload">
            Choose Image
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/jpeg"
            onChange={handleImageChange}
            style={{ display: 'none' }} // Hide the default file input
          />
          {previewImage && <img src={previewImage} alt="Preview" className='preview-image mt-2' />}
        </div>
        <div className="mb-4" style={{ fontSize: '20px' }}>
          <Button
              variation="primary"
              className="form-button"
              type="submit"
          >
              Save
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default UploadForm;