import React, { useEffect, useState } from "react";
import "./Partnership.css";
import { FaHandshake, FaHeart, FaUsers, FaGraduationCap } from "react-icons/fa";
import { useForm } from "../hooks/useForm";

const initialPartnershipFormValues = {
  name: "",
  email: "",
  churchName: "",
  partnershipType: "Financial Support",
  message: "",
  amount: "",
  paymentMethod: "PayPal"
};

const MinistryPartnership = () => {
  const { values: formData, setValues: setFormData, handleChange, resetForm } =
    useForm(initialPartnershipFormValues);

  const [result, setResult] = useState({ message: "", type: "" });

  useEffect(() => {
    if (result.type !== "success") return;

    const timeoutId = setTimeout(() => {
      setResult({ message: "", type: "" });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [result.type]);

  const partnershipTypes = [
    { value: "Financial Support", icon: <FaHandshake /> },
    { value: "Volunteering", icon: <FaUsers /> },
    { value: "Community Outreach", icon: <FaHeart /> },
    { value: "Scholarship Support", icon: <FaGraduationCap /> }
  ];

  const paymentMethods = ["PayPal", "Credit Card", "Bank Transfer"];

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult({
      message: "Thank you for your partnership! Your request has been received.",
      type: "success"
    });

    resetForm();
  };

  return (
    <div className="partnership-page">
      <div className="partnership-hero">
        <div className="partnership-hero-content">
          <h1>Join Our Ministry Partnership</h1>
          <p>Together we can make a greater impact in spreading the Gospel and transforming lives</p>
        </div>
      </div>

      <div className="partnership-content">
        <div className="partnership-types-container">
          <h2>Ways to Partner With Us</h2>
          <div className="partnership-types">
            {partnershipTypes.map((type) => (
              <div
                key={type.value}
                className={`partnership-type-card ${formData.partnershipType === type.value ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, partnershipType: type.value }))}
              >
                <div className="partnership-type-icon">{type.icon}</div>
                <h3>{type.value}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="form-container">
          <h2>Partnership Form</h2>
          <p>Please fill out the form below to become a partner</p>

          {result.message ? (
            <div
              style={{
                padding: "12px 16px",
                marginBottom: 16,
                borderRadius: 8,
                background: result.type === "success" ? "#ecfdf5" : "#fef2f2",
                color: result.type === "success" ? "#065f46" : "#991b1b"
              }}
            >
              {result.message}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="ministry-form">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Church Name:</label>
              <input type="text" name="churchName" value={formData.churchName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Selected Partnership Type:</label>
              <select name="partnershipType" value={formData.partnershipType} onChange={handleChange} required>
                {partnershipTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.value}</option>
                ))}
              </select>
            </div>

            {formData.partnershipType === "Financial Support" && (
              <>
                <div className="form-group">
                  <label>Donation Amount:</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Payment Method:</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Message (Optional):</label>
              <textarea name="message" value={formData.message} onChange={handleChange} />
            </div>

            <button type="submit" className="submit-btn">Submit Partnership Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MinistryPartnership;
