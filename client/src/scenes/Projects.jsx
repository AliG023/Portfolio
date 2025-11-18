import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Project.css";
import { useUser } from "../context/usercontext.jsx";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    liveUrl: "",
    codeUrl: "",
    tech: "",
  });
  const { user } = useUser();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Check for token in localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await fetch(`${API_URL}/api/projects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [navigate, API_URL]);

  const handleDeleteProject = async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        alert("Admin role required to delete projects");
        return;
      }

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const openProjectModal = () => {
    setProjectForm({
      title: "",
      description: "",
      image: "",
      liveUrl: "",
      codeUrl: "",
      tech: "",
    });
    setIsProjectOpen(true);
  };

  const closeProjectModal = () => setIsProjectOpen(false);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSave = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const newProject = {
      title: projectForm.title.trim(),
      description: projectForm.description.trim(),
      image: projectForm.image.trim(),
      liveUrl: projectForm.liveUrl.trim(),
      codeUrl: projectForm.codeUrl.trim(),
      tech: projectForm.tech
        ? projectForm.tech
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (response.status === 403) {
        alert("Admin role required to create projects");
        return;
      }

      if (response.ok) {
        const savedProject = await response.json();
        setProjects((prev) => [savedProject, ...prev]);
        setProjectForm({
          title: "",
          description: "",
          image: "",
          liveUrl: "",
          codeUrl: "",
          tech: "",
        });
        closeProjectModal();
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <>
      <div className="page">
        <div className="projects-container">
          <h2>My Projects</h2>

          {loading ? (
            <div className="loading-message">...Loading Projects</div>
          ) : (
            <div className="projects-table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Tech Stack</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No projects found
                      </td>
                    </tr>
                  ) : (
                    projects.map((p) => (
                      <tr key={p._id}>
                        <td>
                          {p.image ? (
                            <div className="project-image-container">
                              <img
                                src={p.image}
                                alt={`${p.title} thumbnail`}
                                className="project-image"
                              />
                            </div>
                          ) : (
                            <div className="project-image-container">
                              {/* Empty placeholder */}
                            </div>
                          )}
                        </td>
                        <td>{p.title}</td>
                        <td>{p.description}</td>
                        <td>
                          <div className="tech-stack">
                            {(p.tech || []).map((t, idx) => (
                              <span className="tech-tag" key={idx}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="project-btn"
                              onClick={() =>
                                p.liveUrl ? openLink(p.liveUrl) : null
                              }
                            >
                              View Project
                            </button>
                            <button
                              className="project-btn"
                              onClick={() =>
                                p.codeUrl ? openLink(p.codeUrl) : null
                              }
                            >
                              View Code
                            </button>
                            {user && user.role === "admin" ? (
                              <div className="admin-btn">
                                <button
                                  className="project-btn"
                                  onClick={() =>
                                    navigate(`/project-details/${p._id}`)
                                  }
                                >
                                  Update
                                </button>
                                <button
                                  className="project-btn secondary"
                                  onClick={() => handleDeleteProject(p._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            ) : null}
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
        {user && user.role === "admin" && (
          <div>
            <button className="add-project" onClick={openProjectModal}>
              {" "}
              Add Project{" "}
            </button>
          </div>
        )}
      </div>

      {isProjectOpen && (
        <div className="modal-overlay" onClick={closeProjectModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Add Project</h2>
            <form onSubmit={handleProjectSave} className="modal-form">
              <label>
                Title *
                <input
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  required
                />
              </label>
              <label>
                Description *
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                />
              </label>
              <label>
                Image URL
                <input
                  name="image"
                  value={projectForm.image}
                  onChange={handleProjectChange}
                />
              </label>
              <label>
                Live URL
                <input
                  name="liveUrl"
                  value={projectForm.liveUrl}
                  onChange={handleProjectChange}
                />
              </label>
              <label>
                Code URL *
                <input
                  name="codeUrl"
                  value={projectForm.codeUrl}
                  onChange={handleProjectChange}
                />
              </label>
              <label>
                Tech (comma separated) *
                <input
                  name="tech"
                  value={projectForm.tech}
                  onChange={handleProjectChange}
                />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={closeProjectModal}>
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
