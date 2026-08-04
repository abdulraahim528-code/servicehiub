"use client";

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SearchSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = ['All', 'Plumbing', 'Electrical', 'Cleaning', 'Gardening'];

    const handleSearch = () => {
        // Implement search functionality
        console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
    };

    return (
            <section className="py-16 bg-[#effaf8]">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Find Your Service</h2>
                <p className="text-lg mb-8">Search for the best services in your area</p>
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-4 rounded-full border border-gray-300 shadow-md mb-4 md:mb-0 md:mr-4"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-4 rounded-full border border-gray-300 shadow-md mb-4 md:mb-0 md:mr-4"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <motion.button
                        onClick={handleSearch}
                        className="bg-accent text-white rounded-full px-6 py-3 shadow-md hover:bg-[#e85d0c] transition duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        Search
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default SearchSection;
