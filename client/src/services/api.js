import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust the port as needed

export const upload = async (data) => {
  try {
    const formData = new FormData();

    // Assuming data.file is an array of File objects
    data.files.forEach((file, index) => {
                formData.append('name',file.name);
                formData.append('file',file)
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    const response = await axios.post(`${API_URL}/upload`, formData);

    // Handle the response from the server
    console.log('Response from server:', response.data);
    // You can do something with the response, e.g., update state or show a success message
  } catch (error) {
    // Handle errors
    console.error('Error uploading file:', error.message);
    // You can update state or show an error message
  }
};