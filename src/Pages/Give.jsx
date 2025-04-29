import React, { useState } from "react";
import "./Give.css";

const MinistryGive = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    paymentMethod: "PayPal",
  });

  const paymentMethods = ["PayPal", "Credit Card", "Bank Transfer"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your donation! Your payment is being processed.");
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>Support Our Ministry</h2>
      <p>Help spread the Gospel by giving a donation to support our mission.</p>

      <form onSubmit={handleSubmit} className="give-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Donation Amount ($):</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

        <label>Select Payment Method:</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>{method}</option>
          ))}
        </select>

        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
};

export default MinistryGive;