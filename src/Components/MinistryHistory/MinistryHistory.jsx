import React from 'react'
import './MinistryHistory.css'
import image2 from '../../assets/image2.jpg'

function MinistryHistory() {
  return (
    <div className="ministry-history">
      <div className="ministry-header">
        <h1 className="ministry-title">Ministry Background</h1>
        <div className="title-underline"></div>
      </div>

      <div className="ministry-content">
        {/* Left column with text */}
        <div className="ministry-text">
          <p>
            The conception of EAM by the Founder, Rev Joseph Eastwood Anaba was birthed out of his life experiences as a young and dynamic speaker, preaching REVIVAL to the body of Christ in churches and communities.
          </p>
          <p>
            In 1987, Northern Deliverance In Tears Ministry (NINTAM) was born in the Upper North Region of Ghana with the purpose of bringing revival to a region that was steeped in tradition.
          </p>

          <p>
            In 1988, following a clash between operations of the traditional churches and the dynamic fast pace culture of NINTAM, the ministry was changed to Broken Yoke Foundation.
          </p>

          <blockquote className="ministry-quote">
            "The ministry ought to be our ministry and not my ministry. I should do what I am most gifted and resourced to do – preaching and ministering the spirit to the body of Christ. Others must exercise their gifts and release their potential in the church."
          </blockquote>
        </div>

        {/* Right column with image and more text */}
        <div className="ministry-media">
          <div className="image-container">
            <img src={image2} alt="Ministry history" className="ministry-image" />
          </div>

          <div className="additional-text">
            <p>
              Over time, other branches of Broken Yoke Foundation were formed, prompting a need to settle down, teach and grow the congregation. This led to a change of the church's name to Fountain Gate Chapel.
            </p>

            <p>
              After over 22 years as the General Overseer and Chairman of Fountain Gate, Rev Eastwood Anaba was led to step down as Chairman; it was time for him to enter another phase of his ministry – a full cycle where he started with God.
            </p>

            <p>
              Rev Eastwood's rejuvenated passion was geared towards revival within the body of Christ; taking the vision of the spirit beyond the shores of Africa; drawing out the gifts and resources within the body of Christ and ministering in the spirit.
            </p>

            <p>
              On the backdrop of this renewed passion and returning to his roots of why and when God called him, a new ministry was born – Eastwood Anaba Ministries (EAM).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinistryHistory;