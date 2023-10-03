import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  // Set Form Data State Dictionary of inputs for the ticket.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  // Handles any changes to formData being introduced by the user.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // This function submits the form to the API specifically to the /add/ endpoint using axios library.
  // Before calling the API it checks to ensure that all fields have been filled. If not it returns an error.
  // If all fields are filled API is called and new ticket is created in database.
  // All Form inputs are reset upon successful ticket creation.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    if (formData.name && formData.email && formData.description ){
      axios.post('http://18.221.23.167:8000/add/', formData)
        .then(response => {
            console.log(response.data)
            setFormData({
              name: '',
              email: '',
              description: ''
            });
            window.alert(`Your ticket has been successfully created! Your case id is ${response.data.id}`);
          })
        .catch(error => {
          console.log(error);
          window.alert('An error occurred while sending your ticket. Please try again!');
        });
    } else {
      window.alert('An error occurred while sending your ticket. Please try again!');
    }
  };

  return (
    <div className = "flex flex-col items-center justify-center text-center bg-gray bg-opacity-20 w-[75%] sm:w-[50%] h-full">
      {/*Rendering of form including inputs for - name, email, and description. And a button that calls the handleSubmit function */}
      <form onSubmit={handleSubmit} className="space-y-6 w-full h-full p-4">
        <div className ="w-full flex flex-col text-start">
          <label htmlFor="name" className="block text-sm font-bold text-gray">Your Full Name <span className="text-red">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className ="w-full flex flex-col text-start">
          <label htmlFor="email" className="block text-sm font-bold text-gray">Your Email Address <span className="text-red">*</span></label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className ="w-full flex flex-col text-start">
          <label htmlFor="description" className="block text-sm font-bold text-gray">How can we help you today? <span className="text-red">*</span></label>
          <textarea
            name="description"
            placeholder="Describe your issue"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-gray-dark text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
