import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMoon,
    faSearch,
    faSun, faUser,
    faUserTie,
    faBriefcase,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import ContactInput from './ContactInput';
import ContactCard from './ContactCard';

export default function ContactHeader({ AddList, list, DeleteList, EditContact }) {
    const [activeTab, setActiveTab] = useState('all');
    const [showAddContact, setShowAddContact] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [mode, setMode] = useState(() => {
        const saveMode = localStorage.getItem("mode");
        return saveMode ? JSON.parse(saveMode) : false;
    });

    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(mode));
    }, [mode]);

    {/* Contact search logic */}
    const ContactFinder = list.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeTab === 'all' || item.category === activeTab;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={`min-h-screen transition-colors duration-300 ${mode ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
                {/* Header */}
                <div className="flex justify-between items-center p-2 pb-6 sm:p-4">
                    <h2 className="text-2xl sm:text-3xl bg-gradient-to-r from-blue-700 to-purple-200 bg-clip-text text-transparent font-bold text-shadow-2xs">
                        Connectify
                    </h2>
                    <button
                        onClick={() => setMode(!mode)}
                        className={`${mode ? "text-gray-600 bg-gray-200" : "text-white bg-yellow-300"} 
                        cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
                        shadow-md rounded-full text-lg sm:text-xl transition-all`}
                    >
                        {mode ? (
                            <FontAwesomeIcon icon={faMoon} />
                        ) : (
                            <FontAwesomeIcon icon={faSun} />
                        )}
                    </button>
                </div>

                {/* Search Bar */}
                <div className={`relative ${mode ? 'bg-gray-800' : 'bg-white'} 
                    p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg mb-4 mx-2 sm:mx-0`}>
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon 
                            icon={faSearch} 
                            className={mode ? 'text-gray-400' : 'text-gray-500'} 
                        />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        placeholder="Search contacts..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 bg-transparent outline-none 
                            ${mode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
                    />
                </div>

                {/* Category Tabs */}
                <div className="max-w-4xl mx-auto px-2 sm:px-0 mt-2 sm:mt-4">
                    <div className="flex space-x-1 sm:space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        {['all', 'personal', 'work', 'business'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center 
                                    whitespace-nowrap transition-all text-sm sm:text-base ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                                        : mode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {tab === 'personal' && <FontAwesomeIcon icon={faUser} className="mr-1 sm:mr-2" />}
                                {tab === 'work' && <FontAwesomeIcon icon={faBriefcase} className="mr-1 sm:mr-2" />}
                                {tab === 'business' && <FontAwesomeIcon icon={faUserTie} className="mr-1 sm:mr-2" />}
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contact Cards Grid */}
                <div className="max-w-4xl mx-auto px-2 sm:px-0 mt-2 grid gap-3 sm:gap-4">
                    <ContactCard
                        contacts={ContactFinder}
                        DeleteList={DeleteList}
                        mode={mode}
                        EditContact={EditContact}
                        AddList={AddList}
                    />
                </div>

                {/* Add Contact Button */}
                <button
                    onClick={() => setShowAddContact(true)}
                    className="fixed z-10 bottom-6 sm:bottom-10 right-4 sm:right-10 
                        w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center 
                        bg-gradient-to-r from-purple-700 to-pink-400 text-white 
                        rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-xl" />
                </button>

                {/* Add Contact Modal */}
                {showAddContact && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <ContactInput 
                            AddList={AddList} 
                            list={list}
                            EditContact={EditContact}
                            setShowAddContact={setShowAddContact} 
                        />
                    </div>
                )}
            </div>
        </div>
    )
}