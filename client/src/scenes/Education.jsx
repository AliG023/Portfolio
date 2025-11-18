import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Education.css";
import { useUser } from "../context/usercontext.jsx";

export default function Education() {
  const navigate = useNavigate();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [educationForm, setEducationForm] = useState({
    school: "",
    degree: "",
    year: "",
  });
  const { user } = useUser();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch Education from API
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await fetch(`${API_URL}/api/qualifications`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch education");
        }

        const data = await response.json();
        setEducation(data);
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, [API_URL]);

  const openEducationModal = () => {
    setEducationForm({ school: "", degree: "", year: "" });
    setIsEducationOpen(true);
  };

  const closeEducationModal = () => setIsEducationOpen(false);

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationSave = async (e) => {
    e.preventDefault();
    if (!educationForm.school.trim() || !educationForm.degree.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const newEducation = {
      school: educationForm.school.trim(),
      degree: educationForm.degree.trim(),
      year: educationForm.year.trim(),
    };

    try {
      const response = await fetch(`${API_URL}/api/qualifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEducation),
      });

      if (response.status === 403) {
        alert("Admin role required to add education records");
        return;
      }

      if (response.ok) {
        const savedEducation = await response.json();
        setEducation((prev) => [savedEducation, ...prev]);
        setEducationForm({ school: "", degree: "", year: "" });
        closeEducationModal();
      }
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const handleDeleteEducation = async (educationId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/qualifications/${educationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 403) {
        alert("Admin role required to delete education records");
        return;
      }

      if (response.ok) {
        setEducation((prev) => prev.filter((edu) => edu._id !== educationId));
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <>
      <div className="page">
        <div className="education-container">
          <h2>My Education</h2>

          {loading ? (
            <div className="loading-message">...Loading Education</div>
          ) : (
            <div className="education-table-container">
              <table className="education-table">
                <thead>
                  <tr>
                    <th>School</th>
                    <th>Degree / Certificate</th>
                    <th>Year</th>
                    {user && user.role === "admin" && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {education.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No education records found
                      </td>
                    </tr>
                  ) : (
                    education.map((edu) => (
                      <tr key={edu._id}>
                        <td>{edu.school}</td>
                        <td>{edu.degree}</td>
                        <td>{edu.year}</td>
                        {user && user.role === "admin" && (
                          <td>
                            <div className="action-buttons">
                              <button
                                className="education-btn"
                                onClick={() =>
                                  navigate(`/education-details/${edu._id}`)
                                }
                              >
                                Update
                              </button>
                              <button
                                className="education-btn secondary"
                                onClick={() => handleDeleteEducation(edu._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {user && user.role === "admin" && (
          <div>
            <button className="add-education" onClick={openEducationModal}>
              {" "}
              Add Education{" "}
            </button>
          </div>
        )}
      </div>

      {isEducationOpen && (
        <div className="modal-overlay" onClick={closeEducationModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Education</h2>
            <form className="modal-form" onSubmit={handleEducationSave}>
              <label>
                School *:
                <input
                  type="text"
                  name="school"
                  value={educationForm.school}
                  onChange={handleEducationChange}
                  required
                />
              </label>
              <label>
                Degree / Certificate *:
                <input
                  type="text"
                  name="degree"
                  value={educationForm.degree}
                  onChange={handleEducationChange}
                  required
                />
              </label>
              <label>
                Year *:
                <input
                  type="text"
                  name="year"
                  value={educationForm.year}
                  onChange={handleEducationChange}
                />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={closeEducationModal}>
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
