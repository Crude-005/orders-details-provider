
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function HomePage() {
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [orderId, setOrderId] = useState('');

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const res = await fetch('api/orders');
  //     const data = await res.json();
  //     if (data.success) {
  //       setOrders(data.orders);
  //     }
  //   };
  //   fetchOrders();
  // }, []);
  
  
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    // if (customerId == '' && orderId == ''){
    //   alert("Please enter valid Customer Id or Order ID");
    // }
    // else if(customerId != '' && ){

    // }
    if (isNaN(parseInt(customerId)) && customerId != ''){
      alert('Please enter a valid Customer ID');
      return;
    }
    if(isNaN(parseInt(orderId)) && orderId != '' ){
      alert('Please enter a valid Order ID');
    return;
    }

    console.log('Customer ID:', customerId);
    console.log('Order ID:', orderId);
    console.log("Loading.. ");
    try {
      const res = await axios.get(`api/orders?${customerId ? `customerId=${customerId}` : ''}${orderId ? `&orderId=${orderId}` : ''}`);
      console.log('API Response:', res.data);

      if (res.data.success) {
        setOrders(res.data.orders);
        console.log('Orders loaded:', res.data.orders);
      } else {
        console.error('API returned error:', res.data.error);
        alert('Failed to load orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem' }}>Organization Name</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label htmlFor="customerId">Customer ID:</label>
        <input
          type="text"
          id="customerId"
          value={customerId.trim()}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter customer ID..."
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />

        <label htmlFor="orderId">Order ID:</label>
        <input
          type="text"
          id="orderId"
          value={orderId.trim()}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter order ID..."
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>
          Submit
        </button>
      </form>
      {orders.length > 0 ? (
  <div style={{ marginTop: '2rem' }}>
    <h2>Orders</h2>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Order ID</th>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Order Date</th>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Lens Type</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{order['Order ID']}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{order['Status']}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{order['Order Date']}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{order['Lens Type']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    ) : (
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        textAlign: 'center' 
      }}>
        <p>No data found</p>
      </div>
    )}
    </main>
  );
}