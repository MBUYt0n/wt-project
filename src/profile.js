import React, { useState, useEffect } from 'react';

const ProfilePage = ({ credentials }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/profile/${credentials.username}`, {
          headers: {
            Authorization: `Bearer ${credentials.password}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name || '',
            bio: data.bio || '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [credentials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, bio, currentPassword, newPassword, confirmNewPassword } = formData;

    try {
      // Update profile
      const profileResponse = await fetch(`/api/profile/${credentials.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.password}`,
        },
        body: JSON.stringify({ name, bio }),
      });

      if (!profileResponse.ok) {
        console.error('Failed to update profile');
        return;
      }

      // Change password
      if (newPassword && confirmNewPassword) {
        const passwordResponse = await fetch('/api/changePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.password}`,
          },
          body: JSON.stringify({
            username: credentials.username,
            currentPassword,
            newPassword,
          }),
        });

        if (!passwordResponse.ok) {
          console.error('Failed to change password');
          return;
        }

        console.log('Password changed successfully!');
      }

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    try {
      if (newPassword && confirmNewPassword) {
        const passwordResponse = await fetch('/api/changePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.password}`,
          },
          body: JSON.stringify({
            username: credentials.username,
            currentPassword,
            newPassword,
          }),
        });

        if (!passwordResponse.ok) {
          console.error('Failed to change password');
          return;
        }

        console.log('Password changed successfully!');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

          .tab {
            display: inline-block;
            padding: 10px 15px;
            cursor: pointer;
            background: #eee;
            border-radius: 5px;
            margin-right: 10px;
          }

          .tab:hover {
            background: #ddd;
          }

          .active-tab {
            background: linear-gradient(to bottom, #555, #333);
            color: #fff;
          }
        `}
      </style>

      <header>
        <h1>Profile Page</h1>
      </header>

      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name/Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="bio">Bio/Description:</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="A brief description..."
            rows="4"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Save Changes</button>
        </form>

        <div className="password-change">
          <h3>Password Change</h3>
          <form onSubmit={handlePasswordChange}>
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              name="currentPassword"
              required
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-new-password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />

            <button type="submit">Change Password</button>
          </form>
        </div>

        <div className="tab-container">
          <div
            className={`tab ${activeTab === 'posts' && 'active-tab'}`}
            onClick={() => handleTabClick('posts')}
          >
            Posts
          </div>
          <div
            className={`tab ${activeTab === 'comments' && 'active-tab'}`}
            onClick={() => handleTabClick('comments')}
          >
            Comments
          </div>
          <div
            className={`tab ${activeTab === 'liked' && 'active-tab'}`}
            onClick={() => handleTabClick('liked')}
          >
            Liked
          </div>
        </div>

        {/* Additional code for posts, comments, and liked sections */}
      </section>
    </div>
  );
};

export default ProfilePage;
