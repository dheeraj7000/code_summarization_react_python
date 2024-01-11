import React, {useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
 
export default function ChatPage(){

  const [query1, setQuery] = useState('');
  const [processedData, setProcessedData] = useState(null);
  
  // Function to handle input changes
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the data to the Flask backend
    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', {
        query1: query1,
      });

      if (response.status === 200) {
        console.log('Data sent successfully!');
        const responseData = response.data;
        // Update state with the processed data
        setProcessedData(responseData.result);
      } else {
        console.error('Failed to send data.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please enter your code"
          value={query1}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Your Code Explanation is: {processedData}</p>
    </div>
  );
}