//This component would be responsible for fetching the Webhooks data and possibly handling its display or passing the data back up to blockexplorer/src/App.js via props or context. It uses an external app called ngrok that tunnels the webhooks from alchemy into this component.
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import '../DataFetcher.css';

function DataFetcher() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3001/api/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Webhook Data</h1>
            {data.length > 0 ? (
                <ReactJson src={data} theme="monokai" collapsed={false} />
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
}

export default DataFetcher;
