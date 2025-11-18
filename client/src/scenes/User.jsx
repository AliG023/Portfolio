import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import "../styles/User.css";

export default function User() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [usersForm, setUsersForm] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/users`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API_URL]);

  const openUsersModal = (userData = null) => {
    if (userData) {
      setUsersForm({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        password: "", // Don't populate password for security
        role: userData.role || "user",
      });
    } else {
      setUsersForm({
        _id: "",
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    }
    setIsUsersOpen(true);
  };

  const closeUsersModal = () => setIsUsersOpen(false);

  const handleUsersChange = (e) => {
    const { name, value } = e.target;
    setUsersForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsersSave = async (e) => {
    e.preventDefault();
    if (!usersForm.username.trim() || !usersForm.email.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const isUpdate = usersForm._id !== "";

    // For updates, only include password if it's been changed
    const userData = {
      username: usersForm.username.trim(),
      email: usersForm.email.trim(),
      role: usersForm.role,
    };

    // Only include password if it's provided (for create) or changed (for update)
    if (usersForm.password.trim()) {
      userData.password = usersForm.password.trim();
    } else if (!isUpdate) {
      alert("Password is required for new users");
      return;
    }

    try {
      const url = isUpdate
        ? `${API_URL}/api/users/${usersForm._id}`
        : `${API_URL}/api/users`;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 403) {
        alert("Admin role required to modify users");
        return;
      }

      if (response.ok) {
        const savedUser = await response.json();

        if (isUpdate) {
          setUsers((prev) =>
            prev.map((u) => (u._id === savedUser._id ? savedUser : u))
          );
        } else {
          setUsers((prev) => [savedUser, ...prev]);
        }

        setUsersForm({
          _id: "",
          username: "",
          email: "",
          password: "",
          role: "user",
        });
        closeUsersModal();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to save user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred while saving the user");
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="page">
        <div className="users-container">
          <h2>User Management</h2>

          {loading ? (
            <div className="loading-message">...Loading Users</div>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u, index) => (
                      <tr key={u._id || u.username || index}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.role || "N/A"}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="users-btn"
                              onClick={() => openUsersModal(u)}
                              disabled={!u._id}
                            >
                              Update
                            </button>
                            <button
                              className="users-btn secondary"
                              onClick={() => u._id && handleDeleteUser(u._id)}
                              disabled={!u._id}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          <button className="add-user" onClick={() => openUsersModal()}>
            Add New User
          </button>
        </div>
      </div>
      {isUsersOpen && (
        <div className="modal-overlay" onClick={closeUsersModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>{usersForm._id ? "Update User" : "New User"}</h2>
            <form className="modal-form" onSubmit={handleUsersSave}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={usersForm.username}
                  onChange={handleUsersChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={usersForm.email}
                  onChange={handleUsersChange}
                  required
                />
              </label>
              <label>
                Password {usersForm._id && "(leave blank to keep current)"}:
                <input
                  type="password"
                  name="password"
                  value={usersForm.password}
                  onChange={handleUsersChange}
                  required={!usersForm._id}
                />
              </label>
              <label>
                Role:
                <select
                  name="role"
                  value={usersForm.role}
                  onChange={handleUsersChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" onClick={closeUsersModal}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
