import { React, useState, useEffect } from 'react'
import Banner from '../Components/Banner/Banner';
import './UserSettingspage.scss';
import useAuth from '../hooks/useAuth';
import { getUserByID } from '../Services/user';
import NameForm from '../Components/Form/UserSettings/NameForm';
import EmailForm from '../Components/Form/UserSettings/EmailForm';
import PasswordForm from '../Components/Form/UserSettings/PasswordForm';

function UserSettingsPage() {
  const { auth } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [showEditFullName, setShowEditFullName] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  // get user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const foundUserInfo = await getUserByID(auth?.user_info?.id, auth?.access_token);
        const parsedUserInfo = foundUserInfo.data[0];
        setUserInfo(parsedUserInfo);
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
          <NameForm
            userInfo={userInfo}
            showForm={showEditFullName}
            setShowForm={setShowEditFullName}
            blockForm={(showEditEmail || showEditPassword)}
          />
          <EmailForm
            userInfo={userInfo}
            showForm={showEditEmail}
            setShowForm={setShowEditEmail}
            blockForm={(showEditFullName || showEditPassword)}
          />
          <PasswordForm
            userInfo={userInfo}
            showForm={showEditPassword}
            setShowForm={setShowEditPassword}
            blockForm={(showEditFullName || showEditEmail)}
          />
        </div>
      </div>
    </div >
  );
}

export default UserSettingsPage;