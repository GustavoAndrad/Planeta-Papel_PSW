import React from 'react';

const PaymentMethod = ({ label, id, onClick, children }) => {
  return (
    <div className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6" style={{ borderColor: "#1D437A" }}>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id={id}
          name="payment"
          className="mr-2"
          onClick={onClick}
        />
        <label htmlFor={id} className="text-xl font-semibold" style={{ color: "#1D437A" }}>
          {label}
        </label>
        <button
          onClick={onClick}
          className="ml-auto focus:outline-none"
        >
          <svg
            className="w-5 h-5 transition-transform duration-200 transform"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 10l5-5 5 5H7z" />
          </svg>
        </button>
      </div>
      <hr className="border-[#5a7597] mb-4" />
      {children}
    </div>
  );
};

export default PaymentMethod;

  