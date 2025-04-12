
# Candidate Manager

A web application to display, search, filter, and manage candidates' data using modern web technologies.

## Features

### Table View for Candidates
- Displays candidates in a table with columns for name, phone, email, gender, experience, and skills
- Edit and delete functionality for each candidate

### Add Candidate
- "Add Candidate" button opens a form to add a new candidate
- Input fields for name, phone, email, gender, experience, and skills
- Form validation for required fields

### Search Functionality
- Search bar to filter candidates by name, phone, or email
- Dynamic updating as the user types

### Pagination
- Limits the number of candidates displayed per page
- Navigation buttons to move between pages

### Filter Options
- Filter candidates by gender, experience, and skills
- Dynamic updating of the table based on selected filters

## Technologies Used

- **Frontend**:
  - React.js with TypeScript
  - Tailwind CSS for styling
  - Shadcn UI component library
  - React Query for data fetching

## Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

```sh
# Clone the repository
git clone <https://github.com/LASHETTY/Web-Application-TruleeInnovate.git>

# Navigate to the project directory
cd web-application-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

1. View the list of candidates in the table
2. Use the search bar to find specific candidates
3. Use the filter drawer to narrow down results by gender, experience, or skills
4. Add new candidates using the "Add Candidate" button
5. Edit or delete existing candidates using the actions column

## Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/context`: Context providers
  - `/data`: Sample data
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions
  - `/pages`: Page components
  - `/types`: TypeScript type definitions

## Future Enhancements

- Backend integration with Node.js/Express
- Database connection (MongoDB/MySQL/PostgreSQL)
- Authentication system
- Advanced filtering options
- Data export functionality
