import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaCar, FaUpload, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const initialState = {
  name: '',
  catagory: '',
  color: '',
  fuel: '',
  hp: '',
  torque: '',
  transmission: '',
  gears: '',
  drivetrain: '',
  availability: true,
  discription: '',
  image: null,
};

const AddCar = () => {
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });
      await axios.post('http://localhost:7700/car/addcar', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Car added successfully!');
      setForm(initialState);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError('Failed to add car. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <FaCar className="text-blue-600 text-3xl" />
        <h2 className="text-2xl font-bold text-blue-800">Add New Car</h2>
      </div>
      {success && <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded"><FaCheckCircle /> {success}</div>}
      {error && <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded"><FaTimesCircle /> {error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input name="name" value={form.name} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Car Name</label>
        </div>
        <div className="relative">
          <input name="catagory" value={form.catagory} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Category</label>
        </div>
        <div className="relative">
          <input name="color" value={form.color} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Color</label>
        </div>
        <div className="relative">
          <input name="fuel" value={form.fuel} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Fuel</label>
        </div>
        <div className="relative">
          <input name="hp" value={form.hp} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Horsepower</label>
        </div>
        <div className="relative">
          <input name="torque" value={form.torque} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Torque</label>
        </div>
        <div className="relative">
          <input name="transmission" value={form.transmission} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Transmission</label>
        </div>
        <div className="relative">
          <input name="gears" value={form.gears} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Gears</label>
        </div>
        <div className="relative md:col-span-2">
          <input name="drivetrain" value={form.drivetrain} onChange={handleChange} required className="peer input-floating" autoComplete="off" />
          <label className="label-floating">Drivetrain</label>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" name="availability" checked={form.availability} onChange={handleChange} className="accent-blue-600" />
          <span className="text-gray-700">Available</span>
        </label>
      </div>
      <div className="relative mt-2">
        <textarea name="discription" value={form.discription} onChange={handleChange} required className="peer input-floating min-h-[60px] resize-y" autoComplete="off" />
        <label className="label-floating">Description</label>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-2">Car Image</label>
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 transition cursor-pointer relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <FaUpload className="text-blue-500 text-2xl mb-2" />
          <span className="text-gray-600">Drag & drop or click to select an image</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            tabIndex={-1}
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg shadow w-40 h-28 object-cover border" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaCar />} Add Car
      </button>
      {/* Floating label styles */}
      <style>{`
        .input-floating {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 1.25rem 1rem 0.5rem 1rem;
          font-size: 1rem;
          background: transparent;
          outline: none;
          transition: border 0.2s;
        }
        .input-floating:focus {
          border-color: #2563eb;
        }
        .label-floating {
          position: absolute;
          left: 1rem;
          top: 1.1rem;
          font-size: 1rem;
          color: #6b7280;
          background: white;
          padding: 0 0.25rem;
          pointer-events: none;
          transition: all 0.2s;
        }
        .input-floating:focus + .label-floating,
        .input-floating:not(:placeholder-shown) + .label-floating,
        textarea.input-floating:focus + .label-floating,
        textarea.input-floating:not(:placeholder-shown) + .label-floating {
          top: -0.7rem;
          left: 0.75rem;
          font-size: 0.85rem;
          color: #2563eb;
        }
      `}</style>
    </form>
  );
};

export default AddCar; 