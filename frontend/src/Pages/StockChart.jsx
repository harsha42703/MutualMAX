import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const StockChart = ({ initialStockPrice }) => {
    const [prices, setPrices] = useState([]);
    const [zoomLevel, setZoomLevel] = useState({ x: 1, y: 1 });

    useEffect(() => {
        const dummyData = Array.from({ length: 50 }, () =>
            parseFloat((initialStockPrice * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2))
        );
        setPrices(dummyData);
    }, [initialStockPrice]);

    useEffect(() => {
        const simulatePriceChange = () => {
            setPrices((prevPrices) => {
                const lastPrice = parseFloat(prevPrices[prevPrices.length - 1]);
                const change = (Math.random() - 0.5) * 2;
                const newPrice = parseFloat(Math.max(0, lastPrice + change).toFixed(2));
                return [...prevPrices, newPrice].slice(-100);
            });
        };

        const intervalId = setInterval(simulatePriceChange, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const backgroundColors = prices.map((price, index) => {
        if (index === 0) return 'rgba(255, 215, 0, 0.3)';
        return prices[index] > prices[index - 1] ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
    });

    const data = {
        labels: prices.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Stock Price',
                data: prices,
                fill: true,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(255, 215, 0, 1)',
                pointBackgroundColor: 'yellow',
                pointBorderColor: 'black',
                pointRadius: 4,
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Price',
                    color: '#FFD700',
                },
                grid: {
                    color: 'rgba(255, 215, 0, 0.2)',
                    lineWidth: 1,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Time',
                    color: '#FFD700',
                },
                grid: {
                    color: 'rgba(255, 215, 0, 0.2)',
                    lineWidth: 1,
                },
            },
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 7,
            },
        },
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'yellow',
                callbacks: {
                    label: function (context) {
                        return `Price: $${context.raw}`;
                    },
                },
            },
            legend: {
                labels: {
                    color: '#FFD700',
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    onPan: ({ chart }) => {
                        const { x, y } = chart.scales;
                        setZoomLevel({ x: x.max / x.min, y: y.max / y.min });
                    },
                },
                zoom: {
                    enabled: true,
                    mode: 'xy',
                    onZoom: ({ chart }) => {
                        const { x, y } = chart.scales;
                        setZoomLevel({ x: x.max / x.min, y: y.max / y.min });
                    },
                },
            },
        },
    };

    useEffect(() => {
        const chart = Chart.instances[0];
        if (chart) {
            chart.zoom(zoomLevel.x, zoomLevel.y);
        }
    }, [zoomLevel]);

    return (
        <div className="flex justify-center items-center overflow-x-hidden" style={{ width: '100%', height: '50vh' }}>
            <div className="bg-gray-900 rounded-xl p-3" style={{ width: '100%', height: '70%' }}>
                <h3 className="text-yellow-500 text-lg font-semibold mb-2">Stock Market</h3>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default StockChart;
