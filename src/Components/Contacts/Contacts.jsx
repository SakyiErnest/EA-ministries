import React from 'react'
import './Contacts.css'
import msgicon from '../../assets/msg-icon.png'
import mail from '../../assets/mail.png'
import phone from '../../assets/phone-call.png'
import location from '../../assets/location.png'
const Contacts = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "9b8ad355-12a1-4777-9221-e7c44b0df6f6");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='contact'>
      <h1>Get In Touch</h1>
      <div className='contact-col'>
        <h3>Send Us A Message <img src={msgicon} alt=''/></h3>
        <ul>
          <li><img src={mail} alt='' />email</li>
          <li><img src={phone} alt=''/>Phone Number</li>
          <li><img src={location } alt=''/>Address</li>
        </ul>
      </div>
      <div className='contact-col'>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input type='text' name='name' placeholder='Enter Your Name' required/>
          <label>Phone Number</label>
          <input type='tel' name='phone' placeholder='Enter Your Phone Number' required/>
          <label>Email</label>
          <input type='email' name='email' placeholder='Enter Your Email' required/>
          <label>Message</label>
          <textarea name='message' rows='6' placeholder='Enter your messsage' required></textarea>
          <button type='submit' className='btn dark-nav'>Submit</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contacts