//This will handle the display and interaction of individual blocks and their transactions.
import React, { useState } from 'react';
import '../Block.css';

function Block({ blockNumber, alchemy }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 

  const fetchTransactions = async () => {
    
    setLoading(true);
    setError(null);
    try {
   // Handle transaction data or other actions here if needed
  } catch (err) {
    setError('Failed to load transactions');
  } finally {
    setLoading(false);
  }
  };

  return (
    <div>
       <h2 className="block-container" onClick={fetchTransactions}>Block: {blockNumber}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Block;
