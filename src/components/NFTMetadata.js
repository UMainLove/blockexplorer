//This component retrieves NFT metadata based on the contract address and token ID.
import React, { useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import '../NFTMetadata.css';
import ReactJson from 'react-json-view';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function NFTMetadata() {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [metadata, setMetadata] = useState(null);

  const fetchNFTMetadata = async () => {

    if (!contractAddress || !tokenId) {
      console.error("Contract address or token ID is missing");
      return;
  }
  console.log("Fetching metadata for:",contractAddress, "\n TokenID is:",tokenId);

  try{

    let data = await alchemy.nft.getNftMetadata(contractAddress, tokenId, {});

    console.log("Metadata received:", data);


    setMetadata(data);

  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
}
  };

  return (
    <div className="nft-metadata">
      <h1> NFT Inspector</h1>
      <input type="text" 
      value={contractAddress} 
      onChange={(e) => setContractAddress(e.target.value)} placeholder="Contract Address" />
      <input type="text" 
      value={tokenId} 
      onChange={(e) => setTokenId(e.target.value)} placeholder="Token ID" />
      <button onClick={fetchNFTMetadata}>Fetch NFT Metadata</button>
      {metadata ? (
        <ReactJson src={metadata} theme="monokai" collapsed={false} />
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

export default NFTMetadata;
