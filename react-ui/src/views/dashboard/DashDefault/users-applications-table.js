import React, { useState } from 'react';

function ApplicationTable({ applications }) {
  const [sortedApplications, setSortedApplications] = useState([...applications]);
  const [filter, setFilter] = useState('all'); // Initial filter is set to 'all'

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
            // Apply filtering based on the selected filter
            if (filter === 'all' || application.status === filter) {
              return (
                <tr className="unread" key={index}>
                  {/* Render table rows as before */}
                  {/* ... */}
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
