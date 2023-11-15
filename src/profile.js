import React, { useState } from 'react';

const Profilepage= () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    contactInfo: '',
    location: '',
    workEducation: '',
    interestsHobbies: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #3494e6, #ec6ead);
          }

          header {
            background: linear-gradient(to bottom, #333, #555);
            color: #fff;
            text-align: center;
            padding: 1em;
          }

          section {
            max-width: 800px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .profile-picture {
            max-width: 150px;
            border-radius: 50%;
            margin-bottom: 20px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          label {
            font-weight: bold;
          }

          input, textarea {
            width: 100%;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          button {
            background: linear-gradient(to bottom, #555, #333);
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .password-change {
            margin-top: 20px;
            background: linear-gradient(to bottom, #f2f2f2, #d9d9d9);
            padding: 20px;
            border-radius: 8px;
          }

          .activity-feed table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .activity-feed table td, .activity-feed table th {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .activity-feed table th {
            background: linear-gradient(to bottom, #333, #555);
            color: #fff;
          }

          .activity-feed {
            margin-top: 20px;
            background: linear-gradient(to bottom, #f2f2f2, #d9d9d9);
            padding: 20px;
            border-radius: 8px;
          }
        `}
      </style>

      <header>
        <h1>Profile Page</h1>
      </header>

      <section>
        <img className="profile-picture" src="profile-picture.jpg" alt="Profile Picture" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name/Username:</label>
          <input type="text" id="name" name="name" placeholder="Username" onChange={handleChange} />

          <label htmlFor="bio">Bio/Description:</label>
          <textarea id="bio" name="bio" placeholder="A brief description..." rows="4" onChange={handleChange}></textarea>

          <label htmlFor="contact-info">Contact Information:</label>
          <input type="text" id="contact-info" name="contactInfo" placeholder="example@email.com" onChange={handleChange} />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" placeholder="City, Country" onChange={handleChange} />

          <label htmlFor="work-education">Work/Education:</label>
          <input type="text" id="work-education" name="workEducation" placeholder="Job Title | University, Degree" onChange={handleChange} />

          <label htmlFor="interests-hobbies">Interests/Hobbies:</label>
          <input type="text" id="interests-hobbies" name="interestsHobbies" placeholder="Reading, Traveling, Coding" onChange={handleChange} />

          <button type="submit">Save Changes</button>
        </form>

        <div className="password-change">
          <h3>Password Change</h3>
          <form>
            <label htmlFor="current-password">Current Password:</label>
            <input type="password" id="current-password" name="currentPassword" required onChange={handleChange} />

            <label htmlFor="new-password">New Password:</label>
            <input type="password" id="new-password" name="newPassword" required onChange={handleChange} />

            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input type="password" id="confirm-new-password" name="confirmNewPassword" required onChange={handleChange} />

            <button type="submit">Change Password</button>
          </form>
        </div>

        <div className="activity-feed">
          <h3>Activity Feed</h3>

          <h4>Posts</h4>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Posted a new photo</td>
                <td>2023-11-07</td>
              </tr>
            </tbody>
          </table>

          <h4>Comments</h4>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Commented on a post</td>
                <td>2023-11-06</td>
              </tr>
            </tbody>
          </table>

          <h4>Saved Options</h4>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Saved a recipe</td>
                <td>2023-11-05</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
export default Profilepage;
