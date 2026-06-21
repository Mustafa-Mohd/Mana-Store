import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const AdminDashboard = () => {
    const [events, setEvents] = useState([
        { time: new Date(Date.now() - 5000).toLocaleTimeString(), type: 'LOCK_STATUS', productId: 'product:demo-lock-1', isLocked: true },
        { time: new Date(Date.now() - 10000).toLocaleTimeString(), type: 'LOCK_STATUS', productId: 'product:01903ba8-111a-7b3c', isLocked: false },
        { time: new Date(Date.now() - 12000).toLocaleTimeString(), type: 'INVENTORY_UPDATE', productId: 'product:01903ba8-111a-7b3c', remainingStock: 49 },
        { time: new Date(Date.now() - 15000).toLocaleTimeString(), type: 'LOCK_STATUS', productId: 'product:01903ba8-111a-7b3c', isLocked: true },
        { time: new Date(Date.now() - 25000).toLocaleTimeString(), type: 'LOCK_STATUS', productId: 'product:flash-sale-2', isLocked: true },
        { time: new Date(Date.now() - 45000).toLocaleTimeString(), type: 'LOCK_STATUS', productId: 'product:01903ba8-9d21-f051', isLocked: false },
        { time: new Date(Date.now() - 47000).toLocaleTimeString(), type: 'INVENTORY_UPDATE', productId: 'product:01903ba8-9d21-f051', remainingStock: 19 },
        { time: new Date(Date.now() - 50000).toLocaleTimeString(), type: 'LOCK_STATUS', productId: 'product:01903ba8-9d21-f051', isLocked: true },
    ]);
    const [activeLocks, setActiveLocks] = useState({
        'product:demo-lock-1': true,
        'product:flash-sale-2': true
    });
    
    // Mock user login data
    const [userLogins] = useState([
        { id: 'usr_8x9a', name: 'John Doe', email: 'john.doe@example.com', ip: '192.168.1.45', time: new Date(Date.now() - 240000).toLocaleTimeString(), status: 'Success' },
        { id: 'usr_2b4c', name: 'Alice Smith', email: 'alice.s@example.com', ip: '10.0.0.12', time: new Date(Date.now() - 600000).toLocaleTimeString(), status: 'Success' },
        { id: 'usr_9f1d', name: 'Bob Johnson', email: 'bob.j@example.com', ip: '172.16.0.5', time: new Date(Date.now() - 1800000).toLocaleTimeString(), status: 'Failed (Wrong Password)' },
        { id: 'usr_3k7e', name: 'Emma Wilson', email: 'emma.w@example.com', ip: '192.168.1.102', time: new Date(Date.now() - 3600000).toLocaleTimeString(), status: 'Success' },
        { id: 'usr_5m2n', name: 'Michael Brown', email: 'mike.b@example.com', ip: '10.0.0.44', time: new Date(Date.now() - 7200000).toLocaleTimeString(), status: 'Success' }
    ]);

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

            {/* User Logins Section */}
            <div className="row mt-24">
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-16 p-24">
                        <h4 className="mb-16">Recent User Logins</h4>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>IP Address</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userLogins.map((login, idx) => (
                                        <tr key={idx}>
                                            <td><span className="text-gray-500 fw-medium">{login.id}</span></td>
                                            <td>{login.name}</td>
                                            <td>{login.email}</td>
                                            <td><code>{login.ip}</code></td>
                                            <td>{login.time}</td>
                                            <td>
                                                <span className={`badge ${login.status === 'Success' ? 'bg-success' : 'bg-danger'}`}>
                                                    {login.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
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
