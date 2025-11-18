import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Messages.css";

export default function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [messagesForm, setMessagesForm] = useState({
    _id: "",
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch Messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/contacts`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [API_URL]);

  const openMessagesModal = (message = null) => {
    if (message) {
      setMessagesForm({
        _id: message._id,
        name: message.name,
        phone: message.phone || "",
        email: message.email,
        subject: message.subject,
        message: message.message,
      });
    } else {
      setMessagesForm({
        _id: "",
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    }
    setIsMessagesOpen(true);
  };

  const closeMessagesModal = () => setIsMessagesOpen(false);

  const handleMessagesChange = (e) => {
    const { name, value } = e.target;
    setMessagesForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMessagesSave = async (e) => {
    e.preventDefault();
    if (!messagesForm.name.trim() || !messagesForm.email.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const messageData = {
      name: messagesForm.name.trim(),
      phone: messagesForm.phone.trim(),
      email: messagesForm.email.trim(),
      subject: messagesForm.subject.trim(),
      message: messagesForm.message.trim(),
    };

    try {
      const isUpdate = messagesForm._id !== "";
      const url = isUpdate
        ? `${API_URL}/api/contacts/${messagesForm._id}`
        : `${API_URL}/api/contacts`;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      });

      if (response.status === 403) {
        alert("Admin role required to modify messages");
        return;
      }

      if (response.ok) {
        const savedMessage = await response.json();

        if (isUpdate) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg._id === savedMessage._id ? savedMessage : msg
            )
          );
        } else {
          setMessages((prev) => [savedMessage, ...prev]);
        }

        setMessagesForm({
          _id: "",
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
        closeMessagesModal();
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/contacts/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  return (
    <>
      <div className="page">
        <div className="messages-container">
          <h2>My Messages</h2>

          {loading ? (
            <div className="loading-message">...Loading Messages</div>
          ) : (
            <div className="messages-table-container">
              <table className="messages-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No messages found
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>{msg.name}</td>
                        <td>{msg.phone}</td>
                        <td>{msg.email}</td>
                        <td>{msg.subject}</td>
                        <td>{msg.message}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="messages-btn"
                              onClick={() => openMessagesModal(msg)}
                            >
                              Update
                            </button>
                            <button
                              className="messages-btn secondary"
                              onClick={() => handleDeleteMessage(msg._id)}
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
        </div>
      </div>
      {isMessagesOpen && (
        <div className="modal-overlay" onClick={closeMessagesModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>{messagesForm._id ? "Update Message" : "New Message"}</h2>
            <form className="modal-form" onSubmit={handleMessagesSave}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={messagesForm.name}
                  onChange={handleMessagesChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={messagesForm.phone}
                  onChange={handleMessagesChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={messagesForm.email}
                  onChange={handleMessagesChange}
                  required
                />
              </label>
              <label>
                Subject:
                <input
                  type="text"
                  name="subject"
                  value={messagesForm.subject}
                  onChange={handleMessagesChange}
                  required
                />
              </label>
              <label>
                Message:
                <textarea
                  name="message"
                  value={messagesForm.message}
                  onChange={handleMessagesChange}
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={closeMessagesModal}>
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
