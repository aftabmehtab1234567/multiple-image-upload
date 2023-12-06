import React, { useState } from 'react';
import { upload } from '../services/api'; // Import your upload function or API module

export default function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    // Access the selected files from the input element
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);

    // You can perform additional actions with the files if needed
    console.log('Selected files:', files);
  };

  const handleButtonClick = async () => {
    try {
      if (selectedFiles.length > 0) {
        // Call the upload function with the selected files
        await upload({ files: selectedFiles });

        console.log('Upload successful!');
      } else {
        console.log('No files selected');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    } finally {
      // Clear selected files after upload
      setSelectedFiles([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // If you need to perform actions when the form is submitted, you can add them here
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Input for file selection */}
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          name="images"
          methos="post"
        />

        {/* Display the selected file names (optional) */}
        {selectedFiles.length > 0 && (
          <div>
            <p>Selected Files:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit button */}
        <button type="button" onClick={handleButtonClick}>
          Submit
        </button>
      </form>
    </div>
  );
}
