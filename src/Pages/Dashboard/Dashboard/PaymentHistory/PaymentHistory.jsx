import { useEffect, useState } from "react";

const PaymentHistory = ({ participantId }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch payment history for the participant
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payments/${participantId}`);
        const data = await response.json();
        setPaymentHistory(data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPaymentHistory();
  }, [participantId]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Camp Name</th>
              <th className="px-4 py-2 border">Fees</th>
              <th className="px-4 py-2 border">Payment Status</th>
              <th className="px-4 py-2 border">Confirmation Status</th>
              <th className="px-4 py-2 border">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.length > 0 ? (
              paymentHistory.map((payment) => (
                <tr key={payment.transactionId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{payment.campName}</td>
                  <td className="px-4 py-2 border">${payment.fees}</td>
                  <td className="px-4 py-2 border">
                    {payment.paymentStatus === "Paid" ? (
                      <span className="text-green-500 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Unpaid</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {payment.confirmationStatus === "Confirmed" ? (
                      <span className="text-green-500 font-semibold">Confirmed</span>
                    ) : (
                      <span className="text-yellow-500 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{payment.transactionId || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
