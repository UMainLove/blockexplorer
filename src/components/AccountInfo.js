//This will manage the account information lookup feature.
import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { Utils } from 'alchemy-sdk';


function AccountInfo({ alchemy }) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


const getBalance = debounce(async () => {
  if (!address) {
    setError('Please enter a valid address.');
    return;
  }
  setIsLoading(true);
  setError(null);

  try {
    const weiBalance = await alchemy.core.getBalance(address);
    const etherBalance = Utils.formatEther(weiBalance);
    setBalance(etherBalance);
    

  } catch (err) {
    setError('Failed to fetch balance. Make sure the address is correct.');
    setBalance('');
  } finally {
    setIsLoading(false);
  }
}, 500);  // Adjust debounce timing as needed

return (
  <div>
    <h1>Wallet Checker</h1>
    <input 
      type="text" 
      value={address} 
      onChange={e => setAddress(e.target.value)} 
      placeholder="Enter address"
    />
    <button onClick={getBalance} disabled={isLoading}>Get Balance</button>
    {isLoading ? <p>Loading...</p> : <p>Balance: {balance} ETH</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
);
}

export default AccountInfo;
