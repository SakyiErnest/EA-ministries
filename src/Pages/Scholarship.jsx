import React from "react";
import "./Scholarship.css";

const Scholarship = () => {
  return (
    <div className="scholarship-container">
      <header className="scholarship-header">
        <h1>Scholarship Program</h1>
        <p>Providing opportunities for students in need.</p>
      </header>

      <section className="scholarship-details">
        <h2>About the Scholarship</h2>
        <p>
  Our scholarship program is designed to support students who demonstrate academic excellence, leadership, and financial need. 
  We believe that education is a powerful tool for change, and our goal is to make it accessible to deserving individuals.

  To apply for the scholarship:
  - **Check Eligibility:** Ensure you meet the academic and financial criteria.
  - **Prepare Your Documents:** Submit your transcript, recommendation letters, and a personal essay.
  - **Complete the Application Form:** Fill out the online form with accurate details.
  - **Submit Before the Deadline:** Ensure all required materials are sent in on time.
  - **Wait for Selection Process:** Shortlisted candidates will be contacted for further review.

  If you're passionate about learning and need financial assistance, we encourage you to apply. This is your chance to unlock opportunities and pursue your dreams!
</p>
      </section>

      <section className="scholarship-apply">
        <h2>How to Apply</h2>
        <ul>
          <li>Fill out the application form.</li>
          <li>Submit required documents (transcripts, essay, and recommendations).</li>
          <li>Wait for our review and selection process.</li>
        </ul>
        <button className="apply-btn">Apply Now</button>
      </section>
    </div>
  );
};

export default Scholarship;