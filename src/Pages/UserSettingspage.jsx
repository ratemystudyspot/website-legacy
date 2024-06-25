import { React, useState, useEffect } from 'react'
import Banner from '../Components/Banner/Banner';
import './UserSettingspage.css';
import useAuth from '../hooks/useAuth';
import { getUserByID } from '../Services/user';

// TODO: when user is logged in, and they reload this page, it still redirects to login page --> must be because of authprovider issue
const UserSettingsPage = () => {
  const { auth } = useAuth();

  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState(userInfo?.password);
  const [showEditFullName, setShowEditFullName] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const savingFullName = (e) => {
    e.preventDefault();


    // TODO: finish function
  }

  const savingEmail = (e) => {
    e.preventDefault();

    // TODO: finish function
  }

  const savingPassword = (e) => {
    e.preventDefault();

    // TODO: finish function
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const foundUserInfo = await getUserByID(auth?.user_info?.id, auth?.access_token);
        const parsedUserInfo = foundUserInfo.data[0];
        setUserInfo(parsedUserInfo);
        setName(parsedUserInfo?.name);
        setEmail(parsedUserInfo?.email);
        setPassword(parsedUserInfo?.password)
      } catch (error) {
        console.error(error);
      }
    }

    if (Object.keys(userInfo).length === 0) fetchUserInfo();
  }, [])

  return (
    <div className="container">
      <div className='settings-banner'>
        <Banner />
      </div>
      <div className="form-container">
        <div className="header">
          <span>Account &gt; Settings</span>
          <h1>Account Settings</h1>
        </div>
        <div className="form">
          {(showEditFullName)
            ? (
              <form className="form-group" onSubmit={savingFullName}>
                <div className='label-info'>
                  <label>Full name</label>
                  <p>Make sure this matches the name on your government-issued ID.</p>
                  <div className="name-fields">
                    <div className='input-field'>
                      <label className="input-placeholder">First Name</label>
                      <input type="text" defaultValue={name.split(" ")[0]} required />
                    </div>
                    <div className='input-field'>
                      <label className="input-placeholder">Last Name</label>
                      <input type="text" defaultValue={name.split(" ")[1]} required />
                    </div>
                  </div>
                  <button className="save-button">Save</button>
                </div>

                <button type="submit" className="cancel-button" onClick={() => setShowEditFullName(false)}>Cancel</button>
              </form>
            ) : (
              <div className={(showEditEmail || showEditPassword) ? "form-group blocked" : "form-group"}>
                <div className='label-info'>
                  <label>Full name</label>
                  <p>{userInfo?.name}</p>
                </div>

                <button className={(showEditEmail || showEditPassword) ? "show-button blocked" : "show-button"} onClick={() => setShowEditFullName(true)}>Edit</button>
              </div>
            )}
          {(showEditEmail)
            ? (
              <form className="form-group" onSubmit={savingEmail}>
                <div className='label-info'>
                  <label>Email address</label>
                  <p>Use an email address you'll always have access to.</p>
                  <div className="name-fields">
                    <div className='input-field'>
                      <label className="input-placeholder">Email Address</label>
                      <input type="text" defaultValue={email} required />
                    </div>
                  </div>
                  <button className="save-button">Save</button>
                </div>

                <button className="cancel-button" onClick={() => setShowEditEmail(false)}>Cancel</button>
              </form>
            ) : (
              <div className={(showEditFullName || showEditPassword) ? "form-group blocked" : "form-group"} onSubmit={savingPassword}>
                <div className='label-info'>
                  <label>Email address</label>
                  <p>{userInfo?.email}</p>
                </div>

                <button className={(showEditFullName || showEditPassword) ? "show-button blocked" : "show-button"} onClick={() => setShowEditEmail(true)}>Edit</button>
              </div>
            )}
          {(showEditPassword)
            ? (
              <form className="form-group">
                <div className='label-info'>
                  <label>Password</label>
                  <p>This is the password you will use to login with.</p>
                  <div className="name-fields">
                    <div className='input-field'>
                      <label className="input-placeholder">Password</label>
                      <input type="text" required />
                    </div>
                  </div>
                  <button className="save-button">Save</button>
                </div>

                <button className="cancel-button" onClick={() => setShowEditPassword(false)}>Cancel</button>
              </form>
            ) : (
              <div className={(showEditFullName || showEditEmail) ? "form-group blocked" : "form-group"}>
                <div className='label-info'>
                  <label>Password</label>
                  <p>**************</p>
                </div>

                <button className={(showEditFullName || showEditEmail) ? "show-button blocked" : "show-button"} onClick={() => setShowEditPassword(true)}>Edit</button>
              </div>
            )}
        </div>
        {/* <div className="info-box">
          <div className="info-item">
            <h3>Why isn’t my info shown here?</h3>
            <p>We’re hiding some account details to protect your identity.</p>
          </div>
          <div className="info-item">
            <h3>Which details can be edited?</h3>
            <p>
              Details Airbnb uses to verify your identity can’t be changed. Contact info and some personal details can be edited, but we may ask you to verify your identity the next time you book or create a listing.
            </p>
          </div>
          <div className="info-item">
            <h3>What info is shared with others?</h3>
            <p>Airbnb only releases contact information for Hosts and guests after a reservation is confirmed.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
// const [fullName, setFullName] = useState('John Doe'); // Example state for full name
// const [email, setEmail] = useState('johndoe@example.com'); // Example state for email
// const [password, setPassword] = useState(''); // Example state for password (for security settings)

// const [editFullName, setEditFullName] = useState(false);
// const [editEmail, setEditEmail] = useState(false);
// const [editPassword, setEditPassword] = useState(false);

// const handleSaveFullName = () => {
//   // Save logic for full name
//   setEditFullName(false); // Disable editing after save
// };

// const handleSaveEmail = () => {
//   // Save logic for email
//   setEditEmail(false); // Disable editing after save
// };

// const handleSavePassword = () => {
//   // Save logic for password
//   setEditPassword(false); // Disable editing after save
// };

// return (
//   <div>
//     <div className='account-settings-banner'>
//       <Banner />
//     </div>
//     <div className="account-settings">
//       <h2>Account Settings</h2>

//       <section className="settings-section">
//         <h3>Profile</h3>
//         <div className="setting-item">
//           <label>Full Name:</label>
//           {editFullName ? (
//             <>
//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//               <button className="save-button" onClick={handleSaveFullName}>
//                 Save
//               </button>
//             </>
//           ) : (
//             <>
//               <span>{fullName}</span>
//               <button className="edit-button" onClick={() => setEditFullName(true)}>
//                 Edit
//               </button>
//             </>
//           )}
//         </div>

//         <div className="setting-item">
//           <label>Email Address:</label>
//           {editEmail ? (
//             <>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <button className="save-button" onClick={handleSaveEmail}>
//                 Save
//               </button>
//             </>
//           ) : (
//             <>
//               <span>{email}</span>
//               <button className="edit-button" onClick={() => setEditEmail(true)}>
//                 Edit
//               </button>
//             </>
//           )}
//         </div>
//       </section>

//       <section className="settings-section">
//         <h3>Security</h3>
//         <div className="setting-item">
//           <label>Change Password:</label>
//           {editPassword ? (
//             <>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button className="save-button" onClick={handleSavePassword}>
//                 Save
//               </button>
//             </>
//           ) : (
//             <button className="edit-button" onClick={() => setEditPassword(true)}>
//               Change Password
//             </button>
//           )}
//         </div>
//       </section>
//     </div>
//   </div>

// );
// }

export default UserSettingsPage;