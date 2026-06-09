import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
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

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  // Calculate stats from jobs array
  const totalJobs = jobs.length
  const interviews = jobs.filter(j => j.status === "interview").length
  const offers = jobs.filter(j => j.status === "offer").length
  const rejected = jobs.filter(j => j.status === "rejected").length

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#030712", color: "white" }}>

      {/* Navbar */}
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

      {/* Main Content */}
      <div style={{ padding: "32px" }}>

        {/* Header */}
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
        </div>

        {/* Stats Cards */}
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

        {/* Jobs List */}
        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Your Applications</h2>

          {jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
              <p style={{ fontSize: "16px", marginBottom: "8px" }}>No applications yet</p>
              <p style={{ fontSize: "14px" }}>Click "Add Job" to start tracking</p>
            </div>
          ) : (
            jobs.map(job => (
              <div key={job.id} style={{ padding: "16px", border: "1px solid #1f2937", borderRadius: "8px", marginBottom: "12px" }}>
                <p>{job.company_name}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard