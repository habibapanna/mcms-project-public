import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get('https://mcms-project-server.vercel.app/payments'); // Get all payments
        console.log('Payment history response:', response.data);  // Log the response data
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []); // Empty dependency array means this will only run on mount

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment History</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : payments.length === 0 ? (
        <div className="text-center text-gray-500">No payment history available.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table-auto w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b">
                <th className="px-6 py-3 font-semibold">Camp Name</th>
                <th className="px-6 py-3 font-semibold">Fees</th>
                <th className="px-6 py-3 font-semibold">Payment Status</th>
                <th className="px-6 py-3 font-semibold">Confirmation Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{payment.CampName}</td>
                  <td className="px-6 py-4 text-gray-900">${payment.amount}</td>
                  <td className={`px-6 py-4 ${payment.status === 'succeeded' ? 'text-green-500' : 'text-red-500'}`}>
                    {payment.status === 'succeeded' ? 'Paid' : 'Failed'}
                  </td>
                  <td className="px-6 py-4">{payment.confirmationStatus || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
