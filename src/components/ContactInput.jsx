import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function ContactInput({ setShowAddContact, AddList, list }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [text, setText] = useState('');

  const HandleAdd = () => {
    if (text !== "") {
      setText('');
    }
  };

  const onSubmit = (data) => {
    const isDuplicate = list.some(
      (item) =>
        item.name.toLowerCase() === data.name.toLowerCase() ||
        item.email.toLowerCase() === data.email.toLowerCase() ||
        item.phone === data.phone
    );
  
    if (isDuplicate) {
      alert("This contact already exists!");
      return;
    }  
    HandleAdd();
    AddList(data);
    console.log(data);
    setShowAddContact(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.form
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-2xl w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          onClick={() => setShowAddContact(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-purple-600 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Add New Contact</h2>

        {/* Name Field */}
        
        <div className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faUser} className="text-purple-500" />
            </div>
            <input
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                errors.name ? "border-red-400 focus:ring-red-200" : "border-purple-200 focus:ring-purple-200"
              }`}
              {...register("name", { required: "Name is required" })}
              placeholder="Full Name"
              type="text"
            />
          </div>
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 ml-1 text-red-500 text-sm"
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        {/* Email Field */}

        <div className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-purple-500" />
            </div>
            <input
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                errors.email ? "border-red-400 focus:ring-red-200" : "border-purple-200 focus:ring-purple-200"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email Address"
              type="text"
            />
          </div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 ml-1 text-red-500 text-sm"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Phone Field */}

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faPhone} className="text-purple-500" />
            </div>
            <input
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? "border-red-400 focus:ring-red-200" : "border-purple-200 focus:ring-purple-200"
              }`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Invalid Indian phone number",
                },
              })}
              placeholder="Phone Number"
              type="text"
            />
          </div>
          {errors.phone && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 ml-1 text-red-500 text-sm"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>

        {/* {category Feild} */}

        <div className="mb-3">
            <select 
            className={`w-full pl-2 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? "border-red-400 focus:ring-red-200" : "border-purple-200 focus:ring-purple-200"
              }`} 
              {...register("category", {required: "Category is required"})}
              name="category" 
              id="category">
              <option value="personal">Personal</option>
              <option value="business">Business</option>
              <option value="work">Work</option>
            </select>
        </div>
        {errors.category && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 ml-1 text-red-500 text-sm"
            >
              {errors.category.message}
            </motion.p>
          )}

        {/* Buttons */}

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddContact(false)}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-lg font-medium hover:shadow-md transition-all"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Add Contact
          </motion.button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>We'll never share your details with anyone else.</p>
        </div>
      </motion.form>
    </motion.div>
  );
}