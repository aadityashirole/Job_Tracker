import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getJobs, updateJobStatus, deleteJob } from "../api"
import KanbanBoard from "../components/KanbanBoard"

function Dashboard() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [view, setView] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")


  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")
    setUser(storedUser)

    if (token) fetchJobs(token)
  }, [])

  async function fetchJobs(token) {
    const data = await getJobs(token)
    if (Array.isArray(data)) setJobs(data)
  }

  async function handleStatusUpdate(jobId, newStatus) {
    const token = localStorage.getItem("token")

    await updateJobStatus(token, jobId, newStatus)

    setJobs(
      jobs.map(job =>
        job._id === jobId
          ? { ...job, status: newStatus }
          : job
      )
    )
  }

  async function handleDeleteJob(jobId) {
    const token = localStorage.getItem("token")

    await deleteJob(token, jobId)

    setJobs(
      jobs.filter(job => job._id !== jobId)
    )
  }

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const totalJobs = jobs.length
  const interviews = jobs.filter(j => j.status === "interview").length
  const shortlisted = jobs.filter(j => j.status === "shortlisted").length
  const offers = jobs.filter(j => j.status === "offer").length
  const rejected = jobs.filter(j => j.status === "rejected").length
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.company_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.role_title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      job.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statCard = {
    background: "rgba(17,24,39,0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "24px",
    transition: "0.3s ease"
  }


  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #15304a 0%, #0A0F1C 45%, #0A0F1C 100%)",
        color: "#F8FAFC"
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          background: "rgba(10,15,28,0.75)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#00ED64",
              color: "#071018",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800"
            }}
          >
            JT
          </div>

          <div>
            <h2
              style={{
                fontSize: "18px",
                margin: 0
              }}
            >
              Job Tracker
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#94A3B8"
              }}
            >
              AI Career Workspace
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <span
            style={{
              color: "#94A3B8",
              fontSize: "14px"
            }}
          >
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F8FAFC",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div
        style={{
          padding: "40px"
        }}
      >
        {/* HERO */}

        <div
          style={{
            marginBottom: "40px"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "rgba(0,237,100,0.08)",
              border: "1px solid rgba(0,237,100,0.25)",
              color: "#00ED64",
              fontSize: "13px",
              marginBottom: "20px"
            }}
          >
            ● Career Command Center
          </div>

          <h1
            style={{
              fontSize: "46px",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "14px"
            }}
          >
            Welcome back,
            <br />
            stay on top of your job hunt.
          </h1>

          <p
            style={{
              color: "#94A3B8",
              fontSize: "17px",
              maxWidth: "700px",
              lineHeight: "1.7"
            }}
          >
            Track applications, prepare for interviews,
            analyze job descriptions and improve your
            resume from one professional workspace.
          </p>
        </div>

        {/* ACTION BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "34px"
          }}
        >
          <button
            onClick={() => navigate("/add-job")}
            style={{
              background: "#00ED64",
              color: "#071018",
              border: "none",
              padding: "14px 22px",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            + Add Job
          </button>

          <button
            onClick={() => navigate("/jd-analyzer")}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F8FAFC",
              padding: "14px 22px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            🤖 AI Gap Analyzer
          </button>

          <button
            onClick={() => navigate("/resume-scorer")}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F8FAFC",
              padding: "14px 22px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            📄 Resume Scorer
          </button>

          <button
            onClick={() => navigate("/interview-prep")}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F8FAFC",
              padding: "14px 22px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            🎯 Interview Prep
          </button>
        </div>

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
            marginBottom: "36px"
          }}
        >
          <div style={statCard}>
            <p style={{ color: "#94A3B8", marginBottom: "10px" }}>
              Total Applications
            </p>

            <h2
              style={{
                fontSize: "40px",
                margin: 0
              }}
            >
              {totalJobs}
            </h2>
          </div>

          <div style={statCard}>
            <p style={{ color: "#94A3B8", marginBottom: "10px" }}>
              Interviews
            </p>

            <h2
              style={{
                color: "#60A5FA",
                fontSize: "40px",
                margin: 0
              }}
            >
              {interviews}
            </h2>
          </div>
          <div style={statCard}>
            <p style={{ color: "#94A3B8", marginBottom: "10px" }}>
              Shortlisted
            </p>

            <h2
              style={{
                color: "#F59E0B",
                fontSize: "40px",
                margin: 0
              }}
            >
              {shortlisted}
            </h2>
          </div>

          <div style={statCard}>
            <p style={{ color: "#94A3B8", marginBottom: "10px" }}>
              Offers
            </p>

            <h2
              style={{
                color: "#00ED64",
                fontSize: "40px",
                margin: 0
              }}
            >
              {offers}
            </h2>
          </div>

          <div style={statCard}>
            <p style={{ color: "#94A3B8", marginBottom: "10px" }}>
              Rejected
            </p>

            <h2
              style={{
                color: "#EF4444",
                fontSize: "40px",
                margin: 0
              }}
            >
              {rejected}
            </h2>
          </div>
        </div>

        {/* PART 2 STARTS FROM HERE */}
        <div
          style={{
            background: "rgba(17,24,39,0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "28px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px"
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap"
              }}
            >
              <input
                type="text"
                placeholder="Search company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  background: "#111827",
                  color: "#F8FAFC",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                <option value="all" style={{ color: "black" }}>
                  All Status
                </option>
                <option value="applied" style={{ color: "black" }}>
                  Applied
                </option>
                <option value="shortlisted" style={{ color: "black" }}>
                  Shortlisted
                </option>
                <option value="interview" style={{ color: "black" }}>
                  Interview
                </option>
                <option value="offer" style={{ color: "black" }}>
                  Offer
                </option>
                <option value="rejected" style={{ color: "black" }}>
                  Rejected
                </option>
              </select>
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px"
                }}
              >
                Your Applications
              </h2>

              <p
                style={{
                  marginTop: "6px",
                  color: "#94A3B8",
                  fontSize: "14px"
                }}
              >
                Manage and monitor every application.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px"
              }}
            >
              <button
                onClick={() => setView("list")}
                style={{
                  background:
                    view === "list"
                      ? "#00ED64"
                      : "rgba(255,255,255,0.05)",
                  color:
                    view === "list"
                      ? "#071018"
                      : "#F8FAFC",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                List
              </button>

              <button
                onClick={() => setView("kanban")}
                style={{
                  background:
                    view === "kanban"
                      ? "#00ED64"
                      : "rgba(255,255,255,0.05)",
                  color:
                    view === "kanban"
                      ? "#071018"
                      : "#F8FAFC",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Kanban
              </button>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px"
              }}
            >
              <h3
                style={{
                  marginBottom: "12px"
                }}
              >
                No applications yet
              </h3>

              <p
                style={{
                  color: "#94A3B8"
                }}
              >
                Start by adding your first application.
              </p>
            </div>
          ) : view === "list" ? (
            jobs.map(job => (
              <div
                key={job._id}
                style={{
                  background: "#0F172A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  padding: "22px",
                  marginBottom: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px"
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px"
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "18px"
                      }}
                    >
                      {job.company_name}
                    </h3>

                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "capitalize",

                        backgroundColor:
                          job.status === "offer"
                            ? "rgba(0,237,100,0.12)"
                            : job.status === "interview"
                              ? "rgba(96,165,250,0.12)"
                              : job.status === "rejected"
                                ? "rgba(239,68,68,0.12)"
                                : "rgba(255,255,255,0.08)",

                        color:
                          job.status === "offer"
                            ? "#00ED64"
                            : job.status === "interview"
                              ? "#60A5FA"
                              : job.status === "rejected"
                                ? "#EF4444"
                                : "#CBD5E1"
                      }}
                    >
                      {job.status}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "#94A3B8"
                    }}
                  >
                    {job.role_title}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  <select
                    value={job.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        job._id,
                        e.target.value
                      )
                    }
                    style={{
                      background: "#111827",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#F8FAFC",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      cursor: "pointer"
                    }}
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">
                      Shortlisted
                    </option>
                    <option value="interview">
                      Interview
                    </option>
                    <option value="offer">Offer</option>
                    <option value="rejected">
                      Rejected
                    </option>
                  </select>
                  <button
                    onClick={() => navigate(`/edit-job/${job._id}`)}
                    style={{
                      background: "rgba(96,165,250,0.12)",
                      border: "1px solid rgba(96,165,250,0.25)",
                      color: "#60A5FA",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteJob(job._id)
                    }
                    style={{
                      background:
                        "rgba(239,68,68,0.12)",
                      border:
                        "1px solid rgba(239,68,68,0.25)",
                      color: "#EF4444",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <KanbanBoard
              jobs={filteredJobs.map(j => ({
                ...j,
                id: j._id
              }))}
              onStatusUpdate={handleStatusUpdate}
              onDeleteJob={handleDeleteJob}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard