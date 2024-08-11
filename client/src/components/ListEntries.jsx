import React, { useEffect, useState } from 'react';
import { useHistoryAllQuery } from '../slices/usersApiSlice';

const ENTRIES_PER_PAGE = 10;

const ListEntries = () => {
    const [entryArr, setEntryArr] = useState([]);
    const [curPage, setCurPage] = useState(1);

    const { data, isLoading } = useHistoryAllQuery();

    useEffect(() => {
        if (data) {
            setEntryArr(data.slice().reverse());
        }
    }, [data]);

    const lastindx = curPage * ENTRIES_PER_PAGE;
    const firstindx = lastindx - ENTRIES_PER_PAGE;
    const entries = entryArr.slice(firstindx, lastindx);
    const pages = Math.ceil(entryArr.length / ENTRIES_PER_PAGE);
    
    const navNumbers = [...Array(pages).keys()].map(n => n + 1);

    const handlePageChange = (pageNum) => {
        setCurPage(pageNum);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="history-container">
            <h1>History</h1>
            <ul className="history-list">
                {entries.map((entry, index) => (
                    <li key={index} className="history-item">
                        <div className="history-row">
                            <div className="history-column">
                                <div className="history-title">Date:</div>
                                <div className="history-value">{entry.date}</div>
                            </div>
                            <div className="history-column">
                                <div className="history-title">From:</div>
                                <div className="history-value">{entry.from}</div>
                            </div>
                            <div className="history-column">
                                <div className="history-title">To:</div>
                                <div className="history-value">{entry.to}</div>
                            </div>
                            <div className="history-column">
                                <div className="history-title">Hours:</div>
                                <div className="history-value">{entry.hours}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination">
                {navNumbers.map(num => (
                    <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`default-button-style ${curPage === num ? 'active' : ''}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListEntries;
