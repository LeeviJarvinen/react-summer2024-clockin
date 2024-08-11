import React, { useEffect, useState } from 'react';
import { useHistoryQuery } from '../slices/usersApiSlice';

const History = () => {
    const [entries, setEntries] = useState([]);

    const { data, isLoading } = useHistoryQuery();

    useEffect(() => {
        if (data) {
            setEntries(data);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='home-sidebar history'>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <p>{entry.date} In: {entry.from} Out: {entry.to} Hours: {entry.hours}</p>  
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;