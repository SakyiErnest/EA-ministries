import React, { useState } from "react";
import "./Partnership.css";

const MinistryPartnership = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    churchName: "",
    partnershipType: "Financial Support",
    message: "",
    amount: "",
    paymentMethod: "PayPal",
  });

  const partnershipTypes = [
    "Financial Support",
    "Volunteering",
    "Prayer Partner",
    "Community Outreach",
    "Scholarship Support",
  ];

  const paymentMethods = ["PayPal", "Credit Card", "Bank Transfer"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your partnership! Your donation is being processed.");
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>Join Our Ministry Partnership</h2>
      <p>Help support our mission through your chosen partnership type.</p>

      <form onSubmit={handleSubmit} className="ministry-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Church Name:</label>
        <input type="text" name="churchName" value={formData.churchName} onChange={handleChange} required />

        <label>Select Partnership Type:</label>
        <select name="partnershipType" value={formData.partnershipType} onChange={handleChange} required>
          {partnershipTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>

        {formData.partnershipType === "Financial Support" && (
          <>
            <label>Donation Amount:</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

            <label>Payment Method:</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>{method}</option>
              ))}
            </select>
          </>
        )}

        <label>Message (Optional):</label>
        <textarea name="message" value={formData.message} onChange={handleChange} />

        <button type="submit">Submit Partnership Request</button>
      </form>
    </div>
  );
};

export default MinistryPartnership;