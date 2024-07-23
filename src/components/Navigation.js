//This will handle navigation between blocks or transactions.
import React from 'react';

function Navigation({ current, setCurrent }) {
  return (
    <div>
      <button onClick={() => setCurrent(current - 1)}>Previous</button>
      <button onClick={() => setCurrent(current + 1)}>Next</button>
    </div>
  );
}

export default Navigation;
