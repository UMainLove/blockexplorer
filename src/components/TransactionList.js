//To list transactions from the current block and allow users to click on them for more details.
import React, { useEffect, useState } from 'react';
import { Utils } from 'alchemy-sdk';

import '../TransactionList.css';

function TransactionList({ alchemy, blockNumber }) {
  const [transactions, setTransactions] = useState([]);
  const [expandedTx, setExpandedTx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      
    const fetchTransactions = async() => {
        if (!blockNumber) return;
        setLoading(true);
        setError(null);

        try {
          const blockWithTx = await alchemy.core.getBlockWithTransactions(blockNumber);
          setTransactions(blockWithTx.transactions);
        } catch (err) {
          setError('Failed to fetch transactions.');
          setTransactions([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
  }, [blockNumber, alchemy]);

  const toggleDetails = (hash) => {
    setExpandedTx(expandedTx === hash ? null : hash);
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (transactions.length === 0) return <div>No transactions found.</div>;

  return (
    <div className="transaction-container">
      <h3>Transactions in Block {blockNumber}</h3>
      <div className="transaction-grid">
      {transactions.map((tx, index) => (
        <div key={index} className="transaction-box">
          <div className="transaction-details">
          <p><strong>Tx Hash:</strong> {tx.hash}</p>
          {expandedTx === tx.hash && (
          <>
            <p><strong>From:</strong> {tx.from}</p>
            <p><strong>To:</strong> {tx.to}</p>
            <p><strong>Value:</strong> {Utils.formatEther(tx.value)} ETH</p>
            <p><strong>Gas Price:</strong> {Utils.formatUnits(tx.gasPrice, 'gwei')} Gwei</p>
          </>
      )}
      </div>
        <div className="arrow"onClick={() => toggleDetails(tx.hash)}>{expandedTx === tx.hash ? '▲' : '▼'}</div>
      </div>
      ))}
    </div>
  </div>
  );
}

export default TransactionList;