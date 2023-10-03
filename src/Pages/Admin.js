import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {

  // variable to save ticket data for rendering
  const [ticketData, setTicketData] = useState([]);
  const [status, setStatus] = useState({'new': 'New', 'in_progress': 'In Progress', 'resolved': 'Resolved'})

  // Hook to use to navigate to a specific tickets detail page
  const navigate = useNavigate();

  // This useEffect contains a get request to the API to retreive all ticket data to render in admin portal.
  useEffect(() => {
    // GET request
    axios.get('http://18.221.23.167:8000/')
      .then(response => {
        console.log(response.data)
        setTicketData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  //This is a button to navigate to a specific ticket to view more details for that ticket.
  const viewDetails = (userTicket) => {
    navigate(`/admin/${userTicket.id}`);
  }

  return (
    <div className = "grid w-full h-full p-16 overflow-y-scroll">
      <div className="grid grid-cols-5 gap-4 p-5 w-full font-bold bg-gray bg-opacity-50">
        <div className="col-span-1">Ticket ID</div>
        <div className="col-span-1">Name</div>
        <div className="col-span-1">Email</div>
        <div className="col-span-1">Status</div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-5 w-full bg-gray bg-opacity-20">
        {ticketData.map(ticket => (
          <React.Fragment key={ticket.id}>
            <div className="col-span-1 break-words">{ticket.id}</div>
            <div className="col-span-1 break-words">{ticket.name}</div>
            <div className="col-span-1 break-words">{ticket.email}</div>
            <div className="col-span-1 break-words">{status[ticket.status]}</div>
            <div className="col-span-1 break-words">
              <button onClick={() => viewDetails(ticket)} className="px-2 py-1 bg-gray-dark text-white rounded">Ticket Details</button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Admin;
