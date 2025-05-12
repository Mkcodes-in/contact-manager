import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEllipsisV,
  faUser,
  faPhone,
  faUserTie,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import ContactUpdate from './ContactUpdate';

export default function ContactCard({ mode, contacts, DeleteList, EditContact }) {
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [showEditContact, setShowEditContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowEditContact(true);
    setActiveDropdownId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {contacts.length === 0 ? (
          <p className={`text-2xl ml-2 ${mode ? 'text-white' : 'text-gray-900'}`}>
            No contact found.
          </p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`relative p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${mode
                  ? 'bg-gray-800 bg-opacity-70 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50'
                } shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${mode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        contact.category === 'work'
                          ? faBriefcase
                          : contact.category === 'business'
                            ? faUserTie
                            : faUser
                      }
                      className={`text-xl ${mode ? 'text-gray-300' : 'text-gray-600'}`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold ${mode ? 'text-white' : 'text-gray-800'}`}
                    >
                      {contact.name}
                    </h3>
                    <p
                      className={`text-sm ${mode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      {contact.category
                        ? contact.category.charAt(0).toUpperCase() + contact.category.slice(1)
                        : 'Personal'}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    className={`p-2 rounded-full ${mode ? 'hover:bg-gray-500' : 'hover:bg-gray-200'}`}
                    onClick={() =>
                      setActiveDropdownId(
                        activeDropdownId === contact.id ? null : contact.id
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className={mode ? 'text-gray-400' : 'text-gray-600'}
                    />
                  </button>

                  {activeDropdownId === contact.id && (
                    <div className={`absolute right-0 mt-2 ${mode ? "bg-gray-400" : "bg-gray-200"} border border-gray-200 rounded-md shadow-lg z-10`}>
                      <button
                        onClick={() => handleEdit(contact)}
                        className={`w-full px-4 py-2 text-sm hover:bg-gray-100 font-bold text-center`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => DeleteList(contact.id)}
                        className="w-full text-center px-4 py-2 text-sm font-bold text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={`mr-3 ${mode ? 'text-blue-400' : 'text-blue-600'}`}
                  />
                  <span className={mode ? 'text-gray-300' : 'text-gray-700'}>
                    {contact.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={`mr-3 ${mode ? 'text-purple-400' : 'text-purple-600'}`}
                  />
                  <span className={mode ? 'text-gray-300' : 'text-gray-700'}>
                    {contact.email}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Component */}
      {showEditContact && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md shadow-xl">
            <ContactUpdate
              setShowEditContact={setShowEditContact}
              handleEditClick={EditContact}
              contact={selectedContact}
            />
          </div>
        </div>
      )}
    </>
  );
}
