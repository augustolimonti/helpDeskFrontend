# Help Desk Frontend Application

Welcome to the front-end application for the Help Desk system. This application is designed to facilitate the process of ticket submission for users and to provide an administrative interface for ticket management.

# Table of Contents
  - Page Structure
  - Dependencies

# The application is divided into several main components:

  1. App.js:
     - Serves as the entry point to our application.
     - Points directly to Nav.js which manages the navigation.
  2. Nav.js:
     - A basic navbar that provides links to different sections of the application.
     - Houses the routes (via react-router-dom) to direct the user to the appropriate pages.
  3. Home.js:
     - This is where users can submit their tickets.
     - Designed with a user-friendly interface for ease of use.
  4. Admin.js:
     - A dashboard for the admin to view a table of all open tickets.
     - Provides an overview of ongoing tickets and their statuses.
  5. userDetails.js:
     - A detailed view of a specific ticket.
     - Admins can use this page to view ticket details, respond to the user, update ticket status, or delete the ticket altogether.

# Dependencies
  - Axios: Used for making HTTP requests to the backend API.
  - react-router-dom: Enables routing capabilities within the React application, allowing for seamless navigation between pages.
  - Tailwind CSS - The front end was styled using Tailwind CSS, a utility-first CSS framework for rapidly building custom designs.

# Future Add-ons

As the front end evolves, there are several improvements and new features that can be incorporated to enhance both security and functionality. Two honorable mentions are the following:

1. Admin Authentication:
  - A secure login mechanism for the admin.
  - Ensuring only authorized personnel can access the admin panel.
  - Rerouting to the login page if an unauthorized user attempts to access admin-specific pages.

2. User Dashboard & Login:
  - A dedicated portal for users post-login where they can:
  - View the status of all their current tickets.
  - Access archives of past tickets.
  - Engage in direct conversation with the admin team regarding their tickets, fostering clearer communication.

These enhancements aim to provide a more personalized and secure experience for both the users and the admin.
