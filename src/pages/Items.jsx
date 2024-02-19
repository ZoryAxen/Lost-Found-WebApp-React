import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import { Container, Card } from 'react-bootstrap';


const Home = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('https://lbsmyg0wih.execute-api.us-east-1.amazonaws.com/default/readItems');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            const parsedData = JSON.parse(jsonData.body);
            console.log(parsedData)
            setItems(parsedData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        }
    
        fetchData();
      }, []);

    return (
        <div>
            <Navbar activelink="/items" />
            <h1>Lost and Found Items</h1>
            <Container fluid >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row p-4">
                    {items.map(item => (
                        <div className="col-md-2 mb-3" key={item.itemID}>
                            <Card>
                                <Card.Img variant="top" src={item.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{item.description}</Card.Title>
                                    <Card.Text>
                                        <strong>Category:</strong> {item.category}<br />
                                        <strong>Location Found:</strong> {item.locationFound}<br />
                                        <strong>Status:</strong> {item.status}<br />
                                        <strong>Found Date:</strong> {item.foundDate}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            </Container>
        </div>
    );
};

export default Home