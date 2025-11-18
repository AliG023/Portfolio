import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext";
import "../styles/User.css";

export default function User() {
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
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API_URL]);

  const openUsersModal = (user = null) => {
    console.log("Opening modal with user:", user);
    if (user) {
      setUsersForm({
        _id: user._id || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        role: user.role || "user",
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

  const closeUsersModal = () => {
    setIsUsersOpen(false);
    setUsersForm({
      _id: "",
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleUsersChange = (e) => {
    const { name, value } = e.target;
    setUsersForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsersSave = async (e) => {
    e.preventDefault();

    console.log("Saving user with form data:", {
      ...usersForm,
      password: "[REDACTED]",
    });

    if (!usersForm.username.trim() || !usersForm.email.trim()) {
      alert("Username and email are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const isUpdate = usersForm._id && usersForm._id.trim() !== "";

    const userData = {
      username: usersForm.username.trim(),
      email: usersForm.email.trim(),
      role: usersForm.role,
    };

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

      console.log(`Making ${method} request to:`, url);
      console.log("With data:", {
        ...userData,
        password: userData.password ? "[REDACTED]" : undefined,
      });

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      console.log("Response status:", response.status);

      if (response.status === 403) {
        alert("Admin role required to modify users");
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);
        const savedUser = responseData.user || responseData;

        if (isUpdate) {
          setUsers((prev) =>
            prev.map((u) => (u._id === savedUser._id ? savedUser : u))
          );
        } else {
          setUsers((prev) => [savedUser, ...prev]);
        }

        closeUsersModal();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(errorData.error || errorData.message || "Failed to save user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred while saving the user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error("No user ID provided for deletion");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    console.log("Deleting user with ID:", userId);

    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response status:", response.status);

      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        alert("User deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        alert(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
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
                    users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.role || "N/A"}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="users-btn"
                              onClick={() => openUsersModal(u)}
                            >
                              Update
                            </button>
                            <button
                              className="users-btn secondary"
                              onClick={() => handleDeleteUser(u._id)}
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
