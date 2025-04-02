import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./accountsettings.css";

const AccountSettings = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${currentUser.id}`, {
        name,
        email,
        password,
      });

      setCurrentUser({ ...currentUser, name, email });
      localStorage.setItem("user", JSON.stringify({ ...currentUser, name, email }));
      setSuccess("Account updated successfully.");
      setPassword("");
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update account.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="account-settings">
      <div className="account-header">
        <h2>Account Settings</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <form onSubmit={handleUpdate}>
        <label>Username</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>New Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Update Account</button>
      </form>

      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default AccountSettings;
