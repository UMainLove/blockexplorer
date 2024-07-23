//To display detailed block information.
import React, { useEffect, useState } from 'react';

import '../BlockDetails.css';

function BlockDetails({ alchemy }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const blockDetails = await alchemy.core.getBlock('latest');
      setDetails(blockDetails);
    }
    fetchDetails();
  }, [alchemy]);

  if (!details) return <div className="block-details-loading">Loading...</div>;

  return (
    <div className="block-details">
      <h2>Block Details</h2>
      <div className="detail-item">
      <strong>Miner:</strong> {details.miner}
      </div>
      <div className="detail-item">
      <strong>Number of Transactions:</strong> {details.transactions.length}
      </div>
      {/* Add more details as needed */}
    </div>
  );
}

export default BlockDetails;