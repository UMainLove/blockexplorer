import React, { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

import './App.css';

import BlockDetails from './components/BlockDetails';
import TransactionList from './components/TransactionList';

import useWebSocket from './components/WebSocketService';

import Block from './components/Block';
import AccountInfo from './components/AccountInfo';
import Navigation from './components/Navigation';

import NFTMetadata from './components/NFTMetadata';

import DataFetcher from './components/DataFetcher';


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

    /*Handle data received from WebSocket*/
  const handleWebSocketMessage = (data) => {
    console.log("Data received from WebSocket: ", data);

    /*Assuming data received includes block number*/
    setBlockNumber(JSON.parse(data).blockNumber);
  }

  /*WebSocket URL*/
  const wsUrl = process.env.REACT_APP_ALCHEMY_WS_URL;
  
   /*Establish WebSocket connection and listen for messages*/
   useWebSocket(wsUrl, handleWebSocketMessage);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

   

  return (
    <div className="App">
      <h1>Ethereum Block Explorer</h1>
      {blockNumber && <Block blockNumber={blockNumber} alchemy={alchemy} />}
      {blockNumber && <BlockDetails alchemy={alchemy} />}
      <Navigation current={blockNumber} setCurrent={setBlockNumber} />
      {blockNumber && <TransactionList blockNumber={blockNumber} alchemy={alchemy} />}
      <AccountInfo alchemy={alchemy} />
      <NFTMetadata />
      <DataFetcher />
    </div>
);
}

export default App;
