import React, { useEffect, useState } from 'react';
import StockChart from './StockChart';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStockData, setSelectedStockData] = useState(null);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/stocks/');
                const data = await response.json();
                setStocks(data.map(stock => ({
                    ...stock,
                    price: parseFloat(stock.price),
                    priceHistory: [parseFloat(stock.price)]
                })));
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    const handleRowClick = (stockId) => {
        const stockData = stocks.find(stock => stock.id === stockId);
        setSelectedStockData(stockData);
        setShowChart(true);
    };

    const handleBackClick = () => {
        setShowChart(false);
        setSelectedStockData(null);
    };

    return (
        <div className='bg-gray-900 w-full h-screen overflow-x-hidden'>
            <div className="flex flex-col p-4 bg-gray-900 custom-scrollbar">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Stock List</h2>
            {showChart ? (
                <div className="flex flex-col flex-grow overflow-auto rounded-2xl bg-gray-800 shadow-lg">
                    <button 
                        onClick={handleBackClick} 
                        className="mb-4 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
                    >
                        Back to Stock List
                    </button>
                    {selectedStockData && (
                        <StockChart 
                            initialStockPrice={selectedStockData.price} 
                            stockName={selectedStockData.name}
                            stockSymbol={selectedStockData.symbol}
                        />
                    )}
                </div>
            ) : (
                <div className="flex-grow overflow-auto rounded-2xl bg-gray-800 shadow-lg">
                    <table className="min-w-full bg-gray-800 rounded-t-2xl">
                        <thead className="sticky top-0 bg-gray-700 text-yellow-400 uppercase text-sm leading-normal">
                            <tr>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Symbol</th>
                                <th className="py-3 px-6 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-sm font-light custom-scrollbar">
                            {stocks.length > 0 ? (
                                stocks.map((stock) => (
                                    <tr
                                        key={stock.id}
                                        className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                                        onClick={() => handleRowClick(stock.id)}
                                    >
                                        <td className="py-3 px-6">{stock.name}</td>
                                        <td className="py-3 px-6">{stock.symbol}</td>
                                        <td className="py-3 px-6 text-yellow-500 font-bold">${stock.price.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-4 text-center text-gray-400">
                                        Loading stocks...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <style jsx>{`
                tbody {
                    display: block;
                    max-height: 400px;
                    overflow-y: auto;
                }
                tr {
                    display: table;
                    table-layout: fixed;
                    width: 100%;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #2d3748;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #ffd700;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #e6b800;
                }
            `}</style>
        </div>
        </div>
    );
};

export default StockList;
