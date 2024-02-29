import React, { useEffect, useState } from 'react';
import { axiosclient } from '../../utils/axiosClient';

function Home() {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axiosclient.get('posts/All');
            console.log('got response from the home to backend', response.data);

            // Assuming your response contains a 'data' property
            setPostData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            {postData ? (
                // Render your data here, assuming postData is an array or an object
                <div>
                    <p>Status: {postData.status}</p>
                    <p>Data: {JSON.stringify(postData.data)}</p>
                    <p>StatusCode: {postData.statusCode}</p>
                </div>
            ) : (
                // Render loading or placeholder content
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Home;
