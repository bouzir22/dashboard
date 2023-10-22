import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApplicationTable({ updateApplications }) {
  const [applications, setApplications] = useState([]);
  const [sortedApplications, setSortedApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]); // Added state for opportunities
  const [filter, setFilter] = useState('all');

  // Fetch application data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/api/applications/') // Update this URL to match your API endpoint
      .then((response) => {
        setApplications(response.data);
        setSortedApplications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });

    // Fetch opportunity data from the backend
    axios.get('http://localhost:8000/api/opportunities/') // Update this URL to match your API endpoint
      .then((response) => {
        setOpportunities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching opportunities:', error);
      });
  }, []);

  // Function to accept an application
  const acceptApplication = (applicationId) => {
    // Make an API request to accept the application
    axios
      .post(`/api/accept-application/${applicationId}`)
      .then((response) => {
        // Update the applications with the new data
        updateApplications(response.data);
      })
      .catch((error) => {
        console.error('Error accepting application:', error);
      });
  };

  // Handle sorting by application score
  const handleSort = () => {
    const sorted = [...sortedApplications];
    sorted.sort((a, b) => a.score - b.score);
    setSortedApplications(sorted);
  };

  // Handle filtering
  const handleFilter = (status) => {
    setFilter(status);
  };

  return (
    <div>
      <button onClick={handleSort}>Sort by Score</button>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="approve">Approved</option>
        <option value="reject">Rejected</option>
      </select>

      <table>
        <tbody>
          {sortedApplications.map((application, index) => {
            if (filter === 'all' || application.status === filter) {
              const opportunity = opportunities.find((opp) => opp.id === application.opportunity);
              return (
                <tr className="unread" key={index}>
                  <td>{application.applicant.name}</td>
                  <td>{application.score}</td>
                  <td>{opportunity ? opportunity.title : 'Opportunity not found'}</td>
                  <td>
                    {application.status === 'approve' ? (
                      'Approved'
                    ) : (
                      <button onClick={() => acceptApplication(application.id)}>Approve</button>
                    )}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;
