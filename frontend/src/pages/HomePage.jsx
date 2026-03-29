import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import { Rat } from 'lucide-react';
import { RateLimitedUI } from '../components/rateLimitedUi';
import axios from 'axios';
const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = React.useState(false);
    const [notes, setNotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.post('http://localhost:5173/api/notes');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}
        </div>
    )
}
export default HomePage;