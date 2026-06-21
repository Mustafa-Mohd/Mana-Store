import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [activeLocks, setActiveLocks] = useState({});

    useEffect(() => {
        const handleUpdate = (data) => {
            // Add to event stream
            setEvents(prev => [{ time: new Date().toLocaleTimeString(), ...data }, ...prev].slice(0, 15));

            if (data.type === 'LOCK_STATUS') {
                setActiveLocks(prev => ({
                    ...prev,
                    [data.productId]: data.isLocked
                }));
            }
        };

        socket.on('inventory_update', handleUpdate);

        return () => {
            socket.off('inventory_update', handleUpdate);
        };
    }, []);

    return (
        <div className="container py-40">
            <h2 className="mb-24">Enterprise Inventory Dashboard (Live)</h2>
            <div className="row gy-4">
                <div className="col-xl-4">
                    <div className="card shadow-sm border-0 rounded-16 p-24 bg-warning-50">
                        <h4 className="text-warning-600 mb-16">Active Distributed Locks</h4>
                        {Object.keys(activeLocks).length === 0 || !Object.values(activeLocks).some(v => v) ? (
                            <p className="text-gray-500">No active locks at the moment.</p>
                        ) : (
                            <ul className="list-group">
                                {Object.entries(activeLocks).map(([id, locked]) => locked && (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        Product: {id}
                                        <span className="badge bg-warning text-dark rounded-pill">Locked</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="col-xl-8">
                    <div className="card shadow-sm border-0 rounded-16 p-24">
                        <h4 className="mb-16">Real-Time Pub/Sub Event Stream</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Type</th>
                                        <th>Product ID</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length === 0 ? (
                                        <tr><td colSpan="4" className="text-center">Waiting for events...</td></tr>
                                    ) : (
                                        events.map((ev, idx) => (
                                            <tr key={idx}>
                                                <td>{ev.time}</td>
                                                <td>
                                                    <span className={`badge ${ev.type === 'LOCK_STATUS' ? 'bg-primary' : 'bg-success'}`}>
                                                        {ev.type || 'INVENTORY_UPDATE'}
                                                    </span>
                                                </td>
                                                <td>{ev.productId}</td>
                                                <td>
                                                    {ev.type === 'LOCK_STATUS' 
                                                        ? `Lock ${ev.isLocked ? 'Acquired' : 'Released'}` 
                                                        : `Stock Updated to: ${ev.remainingStock}`}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
