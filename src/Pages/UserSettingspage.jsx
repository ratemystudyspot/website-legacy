import { React, useState, useEffect } from 'react'
import Banner from '../Components/Banner/Banner';
import './UserSettingspage.scss';
import useAuth from '../hooks/useAuth';
import useRecovery from '../hooks/useRecovery';
import { getUserByID, updateUser } from '../Services/user';
import { useNavigate } from 'react-router-dom';


const UserSettingsPage = () => {
  const { auth } = useAuth();
  const { setRecoveryState } = useRecovery();
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [justSubmittedForm, setJustSubmittedForm] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);
  const [showEditFullName, setShowEditFullName] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const navigate = useNavigate();

  const savingFullName = async (e) => {
    try {
      const { firstName, lastName } = { firstName: e.target.firstName.value, lastName: e.target.lastName.value };
      const fullName = `${firstName} ${lastName}`;
      const id = auth?.user_info?.id;
      setName(fullName);

      await updateUser({ id, name: fullName }, auth?.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  const savingEmail = async (e) => {
    try {
      const inputEmail = e.target.email.value;
      const id = auth?.user_info?.id;
      setEmail(inputEmail);

      await updateUser({ id, email: inputEmail }, auth?.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  const savingPassword = async (e) => {
    try {
      e.preventDefault();
      setJustSubmittedForm(true); // just submitted the form

      const [currentPassword, newPassword, confirmPassword] = [e.target.oldPassword.value, e.target.newPassword.value, e.target.confirmPassword.value];
      const id = auth?.user_info?.id;

      // check if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) throw new Error("Passwords don't match");

      setInvalidPassword(false);

      // update if currentPassword is correct
      await updateUser({ id, old_password: currentPassword, new_password: newPassword }, auth?.access_token)
      setJustSubmittedForm(false);
      setSavedPassword(true);
    } catch (error) {
      e.preventDefault();
      setInvalidPassword(true);
      console.error(error);
    }
  }

  // get user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const foundUserInfo = await getUserByID(auth?.user_info?.id, auth?.access_token);
        const parsedUserInfo = foundUserInfo.data[0];
        setUserInfo(parsedUserInfo);
        setName(parsedUserInfo?.name);
        setEmail(parsedUserInfo?.email);
      } catch (error) {
        console.error(error);
      }
    }

    if (Object.keys(userInfo).length === 0) fetchUserInfo();
  }, [])

  return (
    <div className="user-settings-box">
      <div className="user-settings-box__banner">
        <Banner />
      </div>
      <div className="user-settings-box__form-container">
        <div className="user-settings-box__header">
          <span className="user-settings-box__header-directory">Account &gt; Settings</span>
          <h1 className="user-settings-box__header-title">Account Settings</h1>
        </div>
        <div className="user-settings-box__form">
          {(showEditFullName)
            ? (
              <form className="user-settings-box__form-group" onSubmit={savingFullName}>
                <div className='user-settings-box__settings-box'>
                  <label className="user-settings-box__label-info-title">Full name</label>
                  <p className="user-settings-box__label-info-text">Make sure this matches the name on your government-issued ID.</p>
                  <div className="user-settings-box__name-fields">
                    <div className='user-settings-box__input-field'>
                      <label className="user-settings-box__input-placeholder">First Name</label>
                      <input
                        type="text"
                        className="user-settings-box__name-fields-input"
                        name="firstName"
                        defaultValue={name.split(" ")[0]}
                        required
                      />
                    </div>
                    <div className='user-settings-box__input-field'>
                      <label className="user-settings-box__input-placeholder">Last Name</label>
                      <input
                        type="text"
                        className="user-settings-box__name-fields-input"
                        name="lastName"
                        defaultValue={name.split(" ")[1]}
                        required
                      />
                    </div>
                  </div>
                  <button className="user-settings-box__save-button">Save</button>
                </div>

                <button className="user-settings-box__cancel-button" onClick={() => setShowEditFullName(false)}>Cancel</button>
              </form>
            ) : (
              <div className={(showEditEmail || showEditPassword) ? "user-settings-box__form-group--blocked" : "user-settings-box__form-group"}>
                <div className='user-settings-box__settings-box'>
                  <label className="user-settings-box__label-info-title">Full name</label>
                  <p className="user-settings-box__label-info-text">{userInfo?.name}</p>
                </div>

                <button className={(showEditEmail || showEditPassword) ? "user-settings-box__show-button--blocked" : "user-settings-box__show-button"} onClick={() => setShowEditFullName(true)}>Edit</button>
              </div>
            )}
          {(showEditEmail)
            ? (
              <form className="user-settings-box__form-group" onSubmit={savingEmail}>
                <div className='user-settings-box__settings-box'>
                  <label className="user-settings-box__label-info-title">Email address</label>
                  <p className="user-settings-box__label-info-text">Use an email address you'll always have access to.</p>
                  <div className="user-settings-box__email-fields">
                    <div className='user-settings-box__input-field'>
                      <label className="user-settings-box__input-placeholder">Email Address</label>
                      <input
                        type="text"
                        className="user-settings-box__email-fields-input"
                        name="email"
                        defaultValue={email}
                        required
                      />
                    </div>
                  </div>
                  <button className="user-settings-box__save-button">Save</button>
                </div>

                <button className="user-settings-box__cancel-button" onClick={() => setShowEditEmail(false)}>Cancel</button>
              </form>
            ) : (
              <div className={(showEditFullName || showEditPassword) ? "user-settings-box__form-group--blocked" : "user-settings-box__form-group"} onSubmit={savingPassword}>
                <div className='user-settings-box__settings-box'>
                  <label className="user-settings-box__label-info-title">Email address</label>
                  <p className="user-settings-box__label-info-text">{userInfo?.email}</p>
                </div>

                <button className={(showEditFullName || showEditPassword) ? "user-settings-box__show-button--blocked" : "user-settings-box__show-button"} onClick={() => setShowEditEmail(true)}>Edit</button>
              </div>
            )}
          {(showEditPassword)
            ? (
              <form className="user-settings-box__form-group" onSubmit={savingPassword}>
                <div className='user-settings-box__settings-box'>
                  <label className="user-settings-box__label-info-title">Password</label>
                  <p className="user-settings-box__label-info-text">This is the password you will use to login with.</p>
                  <div className="user-settings-box__password-fields">
                    <div className='user-settings-box__input-field'>
                      <label className="user-settings-box__input-placeholder">Current Password</label>
                      <input
                        type="password"
                        className="user-settings-box__password-fields-input"
                        name="oldPassword"
                        required
                      />
                      <button
                        className="user-settings-box__forget-password-button"
                        onClick={() => {
                          setRecoveryState({ page: "recover", email: email });
                          navigate('/login', { state: { from_not_login: true } });
                        }}>
                        Forgot Password?
                      </button>
                    </div>
                    <div className='user-settings-box__input-field'>
                      <label className="user-settings-box__input-placeholder">New Password</label>
                      <input
                        type="password"
                        className="user-settings-box__password-fields-input"
                        name="newPassword"
                        required
                      />
                    </div>
                    <div className='user-settings-box__input-field'>
                      <label className="user-settings-box__input-placeholder">Confirm Password</label>
                      <input
                        type="password"
                        className="user-settings-box__password-fields-input"
                        name="confirmPassword"
                        required
                      />
                    </div>
                  </div>
                  <button className="user-settings-box__save-button">Save</button>
                  {
                    (invalidPassword && justSubmittedForm)
                      ? <p className='user-settings-box__request-label'>Request failed, please try again.</p> // if user has submitted but api returns error
                      : (justSubmittedForm)
                        ? <p className='user-settings-box__request-label'>Loading...</p> // if user has submitted, but waiting for api
                        : (savedPassword)
                          ? <p className='user-settings-box__request-label'>Saved!</p> // if user has subitted, and successfully saves
                          : (null) // if user has not done anything yet
                  }
                </div>

                <button
                  className="user-settings-box__cancel-button"
                  onClick={() => { // close form and reset request label states 
                    setShowEditPassword(false);
                    setInvalidPassword(true);
                    setJustSubmittedForm(false);
                    setSavedPassword(false);
                  }}>
                  Cancel
                </button>
              </form>
            ) : (
              <div className={(showEditFullName || showEditEmail) ? "user-settings-box__form-group--blocked" : "user-settings-box__form-group"}>
                <div className='user-settings-box__settings-box'>
                  <label className="user-settings-box__label-info-title">Password</label>
                  <p className="user-settings-box__label-info-text">Hidden</p>
                </div>

                <button className={(showEditFullName || showEditEmail) ? "user-settings-box__show-button--blocked" : "user-settings-box__show-button"} onClick={() => setShowEditPassword(true)}>Edit</button>
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
    </div >
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
//               <button className="user-settings-box__save-button" onClick={handleSaveFullName}>
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
//               <button className="user-settings-box__save-button" onClick={handleSaveEmail}>
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
//               <button className="user-settings-box__save-button" onClick={handleSavePassword}>
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