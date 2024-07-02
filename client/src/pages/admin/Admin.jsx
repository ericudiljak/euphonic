import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./admin.scss";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // State to track current user being edited
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const { currentUser: authUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await makeRequest.get("/users");
      console.log("Users:", response.data); // Log response data to check if users are fetched
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      await makeRequest.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      fetchUsers(); // Refresh the user list after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (userId, newUsername, newEmail, newRole) => {
    try {
      console.log("Updating user with ID:", userId);
      const response = await makeRequest.put(
        `/users/${userId}`,
        {
          username: newUsername,
          email: newEmail,
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      console.log("Update response:", response.data); // Log response data to check if update is successful

      // Update state of users after successful update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, username: newUsername, email: newEmail, role: newRole } : user
        )
      );

      setCurrentUser(null); // Clear current user after update
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleUpdateClick = () => {
    if (currentUser) {
      updateUser(currentUser.id, newUsername, newEmail, newRole);
    }
  };

  const handleCancelUpdate = () => {
    setCurrentUser(null); // Clear current user when cancelling update
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setNewUsername(user.username);
    setNewEmail(user.email);
    setNewRole(user.role);
  };

  return (
    <div>
      <h1>Admin Panel - Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Update</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Dialog */}
      {currentUser && (
        <div>
          <h2>Update User</h2>
          <label>Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          
          <label>Email:</label>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          
          <label>Role:</label>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          /> 
          <button onClick={handleUpdateClick}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
