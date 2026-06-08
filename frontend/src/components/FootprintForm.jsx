import React, { useState } from 'react';
import { Leaf, Zap, Car } from 'lucide-react';

export const FootprintForm = ({ onCalculate, loading }) => {
  const [formData, setFormData] = useState({
    electricityKwh: '',
    transportKm: '',
    vehicleType: 'petrol'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
        <Leaf size={22} /> Carbon Impact Analyzer
      </h2>
      
      <div>
        <label htmlFor="electricityKwh" className="block text-sm font-medium mb-2 flex items-center gap-1.5">
          <Zap size={16} className="text-amber-500" /> Monthly Electricity Consumption (kWh)
        </label>
        <input
          type="number"
          id="electricityKwh"
          name="electricityKwh"
          min="0"
          required
          value={formData.electricityKwh}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          placeholder="e.g. 250"
        />
      </div>

      <div>
        <label htmlFor="transportKm" className="block text-sm font-medium mb-2 flex items-center gap-1.5">
          <Car size={16} className="text-blue-500" /> Monthly Travel Distance (km)
        </label>
        <input
          type="number"
          id="transportKm"
          name="transportKm"
          min="0"
          required
          value={formData.transportKm}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          placeholder="e.g. 600"
        />
      </div>

      <div>
        <label htmlFor="vehicleType" className="block text-sm font-medium mb-2">
          Primary Transport Mode
        </label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
        >
          <option value="petrol">Petrol Car</option>
          <option value="diesel">Diesel Car</option>
          <option value="electric">Electric Vehicle (EV)</option>
          <option value="public">Public Transit (Bus/Train)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl tracking-wide transition shadow-md shadow-emerald-600/10 active:scale-[0.99] disabled:opacity-50"
      >
        {loading ? 'Analyzing Footprint...' : 'Calculate Impacts'}
      </button>
    </form>
  );
};