import React from 'react'
import './MinistryHistory.css'
import image2 from '../../assets/image2.jpg'

function MinistryHistory() {
  return (
    <div className="ministry-history">
      <div className="text-container">
        <h1 className='text'>Ministry Background</h1>
        <p>
          The conception of EAM by the Founder, Rev Joseph Eastwood Anaba was birthed out of his life experiences as a young and dynamic speaker, preaching REVIVAL to the body of Christ in churches and communities.
        </p>
        <p>
          In 1987, Northern Deliverance In Tears Ministry (NINTAM) was born in the Upper North Region of Ghana with the purpose of bringing revival to a region that was steeped in tradition.
        </p>
        <div>
          <img src={image2} alt='' className='image'/>
        </div>
        <p>
          In 1988, following a clash between operations of the traditional churches and the dynamic fast pace culture of NINTAM, the ministry was changed to Broken Yoke Foundation.
        </p>
        <p>
          Over time, other branches of Broken Yoke Foundation were formed, prompting a need to settle down, teach and grow the congregation. The tone of aggressive preaching that characterises evangelistic ministries and the constant exertion of energy had to give way to a culture of dwelling together as families for fellowship and mutual edification. This led to a change of the church's name to Fountain Gate Chapel.
        </p>
        <p>
          After over 22 years as the General Overseer and Chairman of Fountain Gate, Rev Eastwood Anaba was led to step down as Chairman; it was time for him to enter another phase of his ministry – a full cycle where he started with God.
        </p>
        <blockquote>
          "The ministry ought to be our ministry and not my ministry. I should do what I am most gifted and resourced to do – preaching and ministering the spirit to the body of Christ. Others must exercise their gifts and release their potential in the church."
        </blockquote>
        <p>
          Rev Eastwood's rejuvenated passion was geared towards revival within the body of Christ; taking the vision of the spirit beyond the shores of Africa; drawing out the gifts and resources within the body of Christ and ministering in the spirit.
        </p>
        <p>
          On the backdrop of this renewed passion and returning to his roots of why and when God called him, a new ministry was born – Eastwood Anaba Ministries (EAM).
        </p>
      </div>
    </div>
  );
}

export default MinistryHistory;