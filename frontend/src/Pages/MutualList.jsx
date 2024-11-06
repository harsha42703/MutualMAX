import React, { useEffect, useState } from 'react';

const MutualList = () => {
    const [mutualFunds, setMutualFunds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMutualFunds = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/mutual-funds/');
                const data = await response.json();
                setMutualFunds(data);
            } catch (error) {
                console.error('Error fetching mutual funds:', error);
            }
        };

        fetchMutualFunds();
    }, []);

    const filteredFunds = mutualFunds.filter(fund =>
        fund.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-2 py-6 custom-scrollbar h-screen">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full flex flex-col">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Mutual Fund List</h2>
                <input
                    type="text"
                    placeholder="Search mutual funds..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-600 p-3 rounded-2xl mb-4 w-full bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {/* Scrollable Area */}
                <div className="flex-grow overflow-y-auto max-h-72 pr-3 custom-scrollbar">
                    <ul className="divide-y divide-gray-600">
                        {filteredFunds.length > 0 ? (
                            filteredFunds.map(fund => (
                                <li key={fund.id} className="py-2 px-3 flex justify-between items-center hover:bg-gray-700 hover:rounded-xl transition-colors duration-200">
                                    <span className="text-gray-300">{fund.name}</span>
                                    <span className="text-yellow-500 font-bold">${fund.price} (Expense Ratio: {fund.expense_ratio}%)</span>
                                </li>
                            ))
                        ) : (
                            <li className="py-2 text-gray-500 text-center">No mutual funds found</li>
                        )}
                    </ul>
                </div>
            </div>
            <style jsx>{`
                tbody {
                    display: block; /* Allows us to set height on tbody */
                    max-height: 250px; /* Set fixed height for the table body */
                    overflow-y: auto; /* Enable vertical scrolling */
                }
                tr {
                    display: table; /* Display table for each row */
                    table-layout: fixed; /* Fix the layout */
                    width: 100%; /* Set width to 100% */
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px; /* Width of the scrollbar */
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #2d3748; /* Background of the scrollbar track */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #ffd700; /* Color of the scrollbar thumb */
                    border-radius: 4px; /* Rounded corners for the scrollbar thumb */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #e6b800; /* Color on hover for scrollbar thumb */
                }
            `}</style>
        </div>
    );
};

export default MutualList;
