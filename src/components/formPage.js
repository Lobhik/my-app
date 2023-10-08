// FormPage.js
import React, { useState, useEffect } from 'react';
import Form from './form';

const url = "http://13.48.67.44/user/city?l=0";

const FormPage = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        
        setCities(data.data); // Access the 'data' property in the response
        console.log("formPage",cities)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      <Form cities={cities} />
    </div>
  );
};

export default FormPage;
