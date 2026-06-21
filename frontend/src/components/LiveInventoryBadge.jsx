import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const LiveInventoryBadge = ({ productId, initialStock }) => {
  const [stock, setStock] = useState(initialStock || 0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Fetch current initial stock on mount
    fetch(`http://localhost:5000/api/inventory/${productId}`)
      .then(res => res.json())
      .then(data => setStock(data.stock))
      .catch(err => console.error("Error fetching stock:", err));

    // Listen for real-time inventory updates
    const handleInventoryUpdate = (data) => {
      if (data.productId === productId) {
        if (data.type === 'LOCK_STATUS') {
          setIsLocked(data.isLocked);
        } else {
          setStock(data.remainingStock);
        }
      }
    };

    socket.on('inventory_update', handleInventoryUpdate);

    return () => {
      socket.off('inventory_update', handleInventoryUpdate);
    };
  }, [productId]);

  if (isLocked) {
    return (
      <span className="badge bg-warning text-dark px-12 py-8 rounded-pill fw-semibold text-14 d-inline-flex align-items-center gap-8 mb-16 animate__animated animate__pulse animate__infinite">
        <i className="ph ph-lock-key"></i> Currently being purchased...
      </span>
    );
  }

  if (stock === 0) {
    return (
      <span className="badge bg-danger text-white px-12 py-8 rounded-pill fw-semibold text-14 d-inline-flex align-items-center gap-8 mb-16">
        <i className="ph ph-x-circle"></i> Out of Stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="badge bg-danger-600 text-white px-12 py-8 rounded-pill fw-semibold text-14 d-inline-flex align-items-center gap-8 mb-16 animate__animated animate__flash animate__slow">
        <i className="ph ph-fire"></i> Only {stock} left in stock!
      </span>
    );
  }

  return (
    <span className="badge bg-success-600 text-white px-12 py-8 rounded-pill fw-semibold text-14 d-inline-flex align-items-center gap-8 mb-16">
      <i className="ph ph-check-circle"></i> In Stock ({stock})
    </span>
  );
};

export default LiveInventoryBadge;
