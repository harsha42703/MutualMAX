import React from 'react';
import Navbar from './components/Navbar';
import StockList from './Pages/StockList';
import MutualList from './Pages/MutualList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="p-0 bg-black h-screen">
                <Routes>
                    <Route path="/stocks" element={<StockList />} />
                    <Route path="/mutual-funds" element={<MutualList />} />
                    <Route path="/" element={
                        <h2 className="text-8xl h-screen pl-6 pt-44 font-semibold text-yellow-400">
                            Welcome to Investment Tracker<span className='text-9xl text-white'>.</span>
                        </h2>
                    } />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
