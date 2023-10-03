import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserDetails = () => {
  // variable to grab current url link
  var currentURL = window.location.href;
  // state variable to grab ticket details
  const [ticketDetails, setTicketDetails] = useState();
  // state variable to set a readable version of Date
  const [dateCreated, setDateCreated] = useState();
  // state variable to set response submitted from form
  const [responseData, setResponseData] = useState({response: ''});
  // state variable to set the two status options in select dropdown bar
  const [statusOptions, setStatusOptions] = useState({'in_progress': 'In Progress', 'resolved': 'Resolved'});
  // state variable to set the currently chosen status from the dropdown bar
  const [newStatus, setNewStatus] = useState('in_progress');
  // state variable to rerender useEffect every time status is updated.
  const [reloadPage, setReloadPage] = useState(0);
  // Hook to navigate back to main admin page when ticket is deleted or back button pressed.
  const navigate = useNavigate();

  // Uses the current window link to grab the ticket id and use it to filter out
  // the specific data of the ticket id from the get api call to the database.
  useEffect(() => {
    var urlParts = currentURL.split("/");
    var ticketID = parseInt(urlParts[urlParts.length - 1]);
    axios.get('http://18.221.23.167:8000/')
      .then(response => {
        const userTicket = response.data.filter((ticket) => ticket.id === ticketID)
        console.log(userTicket[0])
        setTicketDetails(userTicket[0]);
        const dateObject = new Date(userTicket[0].created_at);
        const readableDate = dateObject.toLocaleDateString();
        const readableTime = dateObject.toLocaleTimeString();
        setDateCreated(readableDate + ' at ' + readableTime)
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

  },[currentURL, reloadPage]);

  // Handles any changes to responseData being introduced by the admin user.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponseData({
      ...responseData,
      [name]: value
    });
  };
  // This function calls the the delete function in the api to delete the ticket completely.
  const handleDelete = (ticketId) => {
    axios.delete(`http://18.221.23.167:8000/delete/${ticketId}/`)
      .then(response => {
        console.log('Ticket deleted successfully');
        window.alert('Ticket has been deleted!');
        navigate('/admin/');
        // Optionally, re-fetch ticket data to reflect the deletion
        // or remove the deleted ticket from `ticketData` state directly.
        // setTicketDetails(ticketDetails.filter(ticket => ticket.id !== ticketId));
      })
      .catch(error => {
        console.error('There was an error deleting the ticket!', error);
      });
  };
  // This function calls the api to the update the status of the ticket based on the user selection.
  const handleStatusUpdate = (ticketId, newStatus) => {
    // console.log(ticketId, newStatus)
    const url = `http://18.221.23.167:8000/update_status/${ticketId}/`;
    const data = {
       status: newStatus
     };

    axios.patch(url, data)
     .then(response => {
       console.log('Success:', response.data);
       setReloadPage(reloadPage + 1)
       window.alert('Ticket status has been updated!');
     })
     .catch(error => {
       console.error('Error:', error.response ? error.response.data : error.message);
       window.alert('An error occurred while updating status. Please try again!');
     });
  };
  // This function is where the response email would be sent to the email specified on the ticket upon submission of the response.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (responseData.response){
      console.log('Your response: "' + responseData.response + '" has been emailed to ' + ticketDetails?.name)
      window.alert('Your response: "' + responseData.response + '" has been emailed to ' + ticketDetails?.name);
    } else {
      console.log('Response is empty. Email not sent. Please Type a response to respond to the ticket!')
      window.alert('Response is empty. Email not sent. Please Type a response to respond to the ticket!');
    }
  };
  // Function that takes user back to main admin portal.
  const backToAdmin = () => {
    navigate('/admin/');
  };

  return (
    <div className = "flex flex-col items-center justify-center text-center bg-gray w-[75%] h-full bg-opacity-20 mb-4">
      <div className ="w-full flex flex-row justify-between text-start bg-gray p-2">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-light"> Ticket Details</h1>
        <div onClick = {backToAdmin} className="flex items-center font-bold text-gray-light hover:text-gray-dark">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" className="mr-2" />
          <span className="text-lg sm:text-2xl">BACK</span>
        </div>
      </div>
      <div className = "flex flex-col sm:grid sm:grid-cols-3 w-full px-8 py-4 gap-4">
        <div className ="w-full flex flex-col text-start gap-4 col-span-1">
          <div className="grid grid-cols-2 grid-rows-3 w-full gap-4 text-xs sm:text-sm font-bold">
            <div className ="w-full flex flex-col text-start break-words">
              <p className=" text-gray"> User's Name: </p>
              <p className=" text-gray-dark">{ticketDetails?.name}</p>
            </div>
            <div className ="w-full flex flex-col text-start break-words">
              <p className=" text-gray"> Current Status: </p>
              <p className=" text-gray-dark">{ticketDetails?.status === 'new' ? 'New' : statusOptions[ticketDetails?.status]}</p>
            </div>
            <div className ="w-full flex flex-col text-start break-words">
              <p className=" text-gray"> User's Email: </p>
              <p className=" text-gray-dark">{ticketDetails?.email}</p>
            </div>
            <div className ="w-full flex flex-col text-start break-words">
              <p className=" text-gray"> Case ID: </p>
              <p className=" text-gray-dark">{ticketDetails?.id}</p>
            </div>
            <div className ="w-full flex flex-col text-start break-words">
              <p className=" text-gray"> Created: </p>
              <p className=" text-gray-dark">{dateCreated}</p>
            </div>
          </div>
        </div>
        <div className ="w-full flex flex-col text-start col-span-2 text-sm font-bold gap-2">
          <p className="text-gray"> Description: </p>
          <p className="text-gray-dark mb-4">{ticketDetails?.description}</p>
          <div className ="w-full flex flex-wrap flex-rows text-start gap-2">
            <select className="bg-dark-gray rounded" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                {Object.keys(statusOptions).map((status) => (
                    <option value={status} className="">{statusOptions[status]}</option>
                ))}
            </select>
            <button onClick={() => handleStatusUpdate(ticketDetails?.id, newStatus)} className="bg-gray-dark text-white px-4 py-2 rounded">
              Update Status
            </button>
            <button onClick={() => handleDelete(ticketDetails?.id)} className="bg-gray-dark text-white px-4 py-2 rounded">
              Delete Ticket
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className ="w-full flex flex-col text-start gap-4 px-8 py-4">
        <div className ="w-full flex flex-col text-start">
          <label htmlFor="response" className="block  text-gray">Respond To Ticket:</label>
          <textarea
            name="response"
            placeholder="Respond to the user's issue"
            value={responseData.response}
            onChange={handleChange}
            rows="5"
            className="p-2 border rounded w-full"
          />
        </div>
        <div className ="w-full flex flex-row items-start text-start gap-2">
          <button type="submit" className="bg-gray-dark text-white px-4 py-2 rounded">
            Submit Response
          </button>
        </div>
      </form>
    </div>
  );

}

export default UserDetails;
