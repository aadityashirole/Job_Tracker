import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import KanbanBoard from "../components/KanbanBoard"

function Dashboard() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [view, setView] = useState("list")
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) fetchJobs(user.id)
    })
  }, [])

  async function fetchJobs(userId) {
    const { data, error } = await supabase
      .from("application")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    if (!error) setJobs(data)
  }

  async function updateStatus(jobId, newStatus) {
    const { error } = await supabase
      .from("application")
      .update({ status: newStatus })
      .eq("id", jobId)
    if (!error) {
      setJobs(jobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      ))
    }
  }

  async function deleteJob(jobId) {
    const { error } = await supabase
      .from("application")
      .delete()
      .eq("id", jobId)
    if (!error) {
      setJobs(jobs.filter(job => job.id !== jobId))
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  const totalJobs = jobs.length
  const interviews = jobs.filter(j => j.status === "interview").length
  const offers = jobs.filter(j => j.status === "offer").length
  const rejected = jobs.filter(j => j.status === "rejected").length

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#030712", color: "white" }}>

      <nav style={{ backgroundColor: "#111827", borderBottom: "1px solid #1f2937", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ backgroundColor: "#2563eb", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" }}>
            JT
          </div>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>Job Tracker</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#9ca3af", fontSize: "14px" }}>{user?.email}</span>
          <button
            onClick={handleLogout}
            style={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: "32px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}>Dashboard</h1>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>Track all your job applications</p>
          </div>
          <button
            onClick={() => navigate("/add-job")}
            style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
          >
            + Add Job
          </button>
          <button
            onClick={() => navigate("/jd-analyzer")}
            style={{ backgroundColor: "#7c3aed", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
          >
            🤖 AI Gap Analyzer
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", padding: "24px", borderRadius: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>Total Applied</p>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "white" }}>{totalJobs}</p>
          </div>
          <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", padding: "24px", borderRadius: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>Interviews</p>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#3b82f6" }}>{interviews}</p>
          </div>
          <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", padding: "24px", borderRadius: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>Offers</p>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>{offers}</p>
          </div>
          <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", padding: "24px", borderRadius: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>Rejected</p>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#ef4444" }}>{rejected}</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Your Applications</h2>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setView("list")}
                style={{ backgroundColor: view === "list" ? "#2563eb" : "#1f2937", border: "1px solid #374151", color: "white", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}
              >
                List
              </button>
              <button
                onClick={() => setView("kanban")}
                style={{ backgroundColor: view === "kanban" ? "#2563eb" : "#1f2937", border: "1px solid #374151", color: "white", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}
              >
                Kanban
              </button>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
              <p style={{ fontSize: "16px", marginBottom: "8px" }}>No applications yet</p>
              <p style={{ fontSize: "14px" }}>Click "Add Job" to start tracking</p>
            </div>
          ) : view === "list" ? (
            jobs.map(job => (
              <div key={job.id} style={{ padding: "20px", border: "1px solid #1f2937", borderRadius: "12px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#0f172a" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{job.company_name}</h3>
                    <span style={{
                      backgroundColor: job.status === "offer" ? "rgba(34,197,94,0.1)" : job.status === "interview" ? "rgba(59,130,246,0.1)" : job.status === "rejected" ? "rgba(239,68,68,0.1)" : "rgba(156,163,175,0.1)",
                      color: job.status === "offer" ? "#22c55e" : job.status === "interview" ? "#3b82f6" : job.status === "rejected" ? "#ef4444" : "#9ca3af",
                      padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500", textTransform: "capitalize"
                    }}>
                      {job.status}
                    </span>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>{job.role_title}</p>
                  <p style={{ color: "#4b5563", fontSize: "12px", margin: 0 }}>{job.applied_date ? `Applied: ${job.applied_date}` : ""}</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    style={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "6px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => deleteJob(job.id)}
                    style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <KanbanBoard jobs={jobs} onStatusUpdate={updateStatus} />
          )}

        </div>
      </div>
    </div>
  )
}

export default Dashboard