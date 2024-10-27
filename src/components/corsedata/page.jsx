"use client";

import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

// Sample data for departments
const ecommerceDepartments = [
  "Customer Service",
  "Order Fulfillment",
  "Product Management",
  "Sales & Marketing",
  "Inventory Management",
  "Logistics",
  "Payments & Billing",
  "Returns & Refunds",
  "Supplier Relations",
  "IT Support"
];

// Generate mock data
function generateMockData(count) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    department: faker.helpers.arrayElement(ecommerceDepartments),
  }));
}

const mockData = generateMockData(100);
const itemsPerPage = 6;

function getPaginatedData(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return mockData.slice(startIndex, endIndex);
}

function Data() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const currentData = getPaginatedData(currentPage);

  const handleSelection = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const submitSelectedItems = async () => {
    const Useremail = localStorage.getItem("email");

    try {
        const response = await fetch('/api/category', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: Useremail, interests: selectedItems }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update interests: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Updated user response:", data);
        setSelectedItems([]);
    } catch (error) {
        console.error("Error while submitting interests:", error);
    }
};

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPaginationButtons = () => {
    const paginationButtons = [];
    const maxButtons = 7;
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);


    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className="px-2 text-black font-semibold"
        >
          {i}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <div className="flex h-screen w-full justify-center items-center pt-28">
      <div className="w-[40%] p-8 border border-[#C1C1C1] rounded-[20px] shadow-md flex flex-col items-center">
        <h2 className="text-[32px] font-semibold text-center mb-2">Please mark your interests!</h2>
        <p className="mb-5 text-center">We will keep you notified.</p>

        <h3 className="text-[20px] text-start w-full font-medium mb-3">My saved interests!</h3>
        <ul className="w-full space-y-3 mb-8 overflow-y-auto">
          {currentData.map((item) => (
            <li key={item.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.department)}
                onChange={() => handleSelection(item.department)}
                className="mr-2 w-5 h-5 accent-black rounded-sm border-gray-300"
              />
              <span>
                {item.department}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center text-[20px] font-medium py-8 space-x-1 text-[#ACACAC]">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-2 ${currentPage === 1 ? 'text-[#ACACAC]' : 'text-black'}`}
          >
            &lt;&lt;&lt;
          </button>
          {getPaginationButtons()}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-2 ${currentPage === totalPages ? 'text-[#ACACAC]' : 'text-black'}`}
          >
            &gt;&gt;&gt;
          </button>
        </div>
        <button
          onClick={submitSelectedItems}
          className="mt-4 px-10 py-2 bg-black text-white rounded-md"
        >
          Submit Interests
        </button>
      </div>
    </div>
  );
}

export default Data;