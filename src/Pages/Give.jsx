import React, { useEffect, useState } from "react";
import "./Give.css";
import {
  FaHandHoldingHeart,
  FaChurch,
  FaGraduationCap,
  FaUsers,
  FaGlobeAfrica
} from "react-icons/fa";
import { useForm } from "../hooks/useForm";

const initialGiveFormValues = {
  name: "",
  email: "",
  amount: "50",
  paymentMethod: "PayPal",
  givingType: "General Support"
};

const MinistryGive = () => {
  const { values: formData, setValues: setFormData, handleChange, resetForm } =
    useForm(initialGiveFormValues);

  const [step, setStep] = useState(1);
  const [result, setResult] = useState({ message: "", type: "" });

  useEffect(() => {
    if (result.type !== "success") return;

    const timeoutId = setTimeout(() => {
      setResult({ message: "", type: "" });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [result.type]);

  const paymentMethods = ["PayPal", "Credit Card", "Bank Transfer"];

  const givingTypes = [
    {
      id: "general",
      name: "General Support",
      icon: <FaHandHoldingHeart />,
      description: "Support our overall ministry operations and initiatives"
    },
    {
      id: "building",
      name: "Building Fund",
      icon: <FaChurch />,
      description: "Help us expand our physical facilities for worship and community service"
    },
    {
      id: "scholarship",
      name: "Scholarship Fund",
      icon: <FaGraduationCap />,
      description: "Provide educational opportunities for students in need"
    },
    {
      id: "outreach",
      name: "Community Outreach",
      icon: <FaUsers />,
      description: "Support our local community service programs and initiatives"
    },
    {
      id: "missions",
      name: "Global Missions",
      icon: <FaGlobeAfrica />,
      description: "Help spread the Gospel through our international mission work"
    }
  ];

  const suggestedAmounts = [20, 50, 100, 250, 500, 1000];

  const handleGivingTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, givingType: type }));
    setStep(2);
  };

  const handleAmountSelect = (amount) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult({
      message: "Thank you for your donation! Your payment is being processed.",
      type: "success"
    });

    resetForm();
    setStep(1);
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="give-page">
      <div className="give-hero">
        <div className="give-hero-content">
          <h1>Support Our Ministry</h1>
          <p>Your generosity helps us spread the Gospel and transform lives around the world</p>
        </div>
      </div>

      <div className="give-content">
        <div className="giving-container">
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

          <div className="giving-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Choose Purpose</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Select Amount</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Your Information</div>
          </div>

          {step === 1 && (
            <div className="giving-types-container">
              <h2>Select Where to Give</h2>
              <div className="giving-types">
                {givingTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`giving-type-card ${formData.givingType === type.name ? 'active' : ''}`}
                    onClick={() => handleGivingTypeSelect(type.name)}
                  >
                    <div className="giving-type-icon">{type.icon}</div>
                    <h3>{type.name}</h3>
                    <p>{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="giving-amount-container">
              <h2>Select Donation Amount</h2>
              <p>Choose an amount or enter a custom value</p>

              <div className="amount-options">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`amount-option ${formData.amount === amount.toString() ? 'active' : ''}`}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    ${amount}
                  </button>
                ))}
                <div className="custom-amount">
                  <label>Custom Amount:</label>
                  <div className="custom-amount-input">
                    <span>$</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="step-buttons">
                <button type="button" className="back-btn" onClick={prevStep}>Back</button>
                <button type="button" className="next-btn" onClick={nextStep}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="donor-info-container">
              <h2>Your Information</h2>
              <p>Please provide your details to complete your donation</p>

              <form onSubmit={handleSubmit} className="give-form">
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Payment Method:</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div className="donation-summary">
                  <h3>Donation Summary</h3>
                  <div className="summary-item">
                    <span>Purpose:</span>
                    <span>{formData.givingType}</span>
                  </div>
                  <div className="summary-item">
                    <span>Amount:</span>
                    <span>${formData.amount}</span>
                  </div>
                </div>

                <div className="step-buttons">
                  <button type="button" className="back-btn" onClick={prevStep}>Back</button>
                  <button type="submit" className="donate-btn">Complete Donation</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="giving-impact">
          <h2>Your Gift Makes a Difference</h2>
          <div className="impact-items">
            <div className="impact-item">
              <h3>Spreading the Gospel</h3>
              <p>Your donations help us reach more people with the message of hope and salvation.</p>
            </div>
            <div className="impact-item">
              <h3>Supporting Communities</h3>
              <p>We provide essential services and support to communities in need around the world.</p>
            </div>
            <div className="impact-item">
              <h3>Developing Leaders</h3>
              <p>Your generosity helps us train and equip the next generation of ministry leaders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryGive;
