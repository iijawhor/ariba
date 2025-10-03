import React, { useState } from "react";

const Payment = () => {
  const [openModal, setOpenModal] = useState(false);

  const student = {
    name: "John Doe",
    class: "10th Grade",
    totalFee: 50000,
    paid: 30000,
    balance: 20000
  };

  const paymentHistory = [
    { date: "2025-09-01", amount: 10000, method: "Card" },
    { date: "2025-07-01", amount: 20000, method: "UPI" },
    { date: "2025-05-01", amount: 10000, method: "Card" },
    { date: "2025-03-01", amount: 10000, method: "UPI" }
    // add more items to test scrolling
  ];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("Payment Submitted!");
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-6">
      {/* Sticky Header */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 sticky top-4 z-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#2C80FF]">
            {student.name}
          </h2>
          <p className="text-gray-700 mt-1">{student.class}</p>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Total Fee</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{student.totalFee}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Paid</p>
            <p className="text-lg font-semibold text-green-600">
              ₹{student.paid}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Balance</p>
            <p className="text-lg font-semibold text-red-500">
              ₹{student.balance}
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#2C80FF] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Pay Now
        </button>
      </div>

      {/* Payment History Table */}
      <div className="bg-white shadow-lg rounded-xl p-4 overflow-auto max-h-[400px]">
        <h2 className="text-lg font-semibold text-[#2C80FF] mb-4 sticky top-0 bg-white z-5">
          Payment History
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase sticky top-8">
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-gray-800">{payment.date}</td>
                <td className="p-3 text-gray-800">₹{payment.amount}</td>
                <td className="p-3 text-gray-800">{payment.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm transition">
          <div className="bg-white rounded-xl w-11/12 md:w-1/2 lg:w-1/3 p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold text-[#2C80FF] mb-4">
              Pay ₹{student.balance}
            </h2>
            <form
              className="flex flex-col gap-4"
              onSubmit={handlePaymentSubmit}
            >
              <input
                type="text"
                placeholder="Card Number"
                required
                className="border border-gray-300 p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-800"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  required
                  className="border border-gray-300 p-2 rounded-lg w-1/2 outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-800"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  className="border border-gray-300 p-2 rounded-lg w-1/2 outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-800"
                />
              </div>
              <input
                type="text"
                placeholder="Name on Card"
                required
                className="border border-gray-300 p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-800"
              />
              <button
                type="submit"
                className="bg-[#2C80FF] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Pay Now
              </button>
            </form>
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-700 text-xl font-bold hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
