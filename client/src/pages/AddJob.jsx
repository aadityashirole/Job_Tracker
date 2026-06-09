import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

function AddJob() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    company_name: "",
    role_title: "",
    job_description: "",
    status: "applied",
    applied_date: "",
    notes: ""
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.company_name || !form.role_title) {
      setError("Company name and role title are required")
      return
    }
    setLoading(true)
    setError("")

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from("application")
      .insert([{ ...form, user_id: user.id }])

    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <div style={{minHeight: "100vh", backgroundColor: "#030712", color: "white"}}>

      {/* Navbar */}
      <nav style={{backgroundColor: "#111827", borderBottom: "1px solid #1f2937", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <div style={{backgroundColor: "#2563eb", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px"}}>
            JT
          </div>
          <span style={{fontWeight: "bold", fontSize: "18px"}}>Job Tracker</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"}}
        >
          ← Back
        </button>
      </nav>

      {/* Form */}
      <div style={{maxWidth: "600px", margin: "40px auto", padding: "0 16px"}}>
        <h1 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "8px"}}>Add New Application</h1>
        <p style={{color: "#6b7280", fontSize: "14px", marginBottom: "32px"}}>Track a new job you've applied to</p>

        {error && (
          <div style={{backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#f87171", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px"}}>
            {error}
          </div>
        )}

        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "6px"}}>Company Name *</label>
            <input
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="e.g. Google, TCS, Infosys"
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            />
          </div>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "6px"}}>Role Title *</label>
            <input
              name="role_title"
              value={form.role_title}
              onChange={handleChange}
              placeholder="e.g. Software Engineer, Frontend Developer"
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            />
          </div>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "6px"}}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            >
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "6px"}}>Date Applied</label>
            <input
              type="date"
              name="applied_date"
              value={form.applied_date}
              onChange={handleChange}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            />
          </div>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "6px"}}>Job Description</label>
            <textarea
              name="job_description"
              value={form.job_description}
              onChange={handleChange}
              placeholder="Paste the job description here..."
              rows={5}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box", resize: "vertical"}}
            />
          </div>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "6px"}}>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
              rows={3}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box", resize: "vertical"}}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{backgroundColor: "#2563eb", color: "white", padding: "14px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "16px", opacity: loading ? 0.5 : 1}}
          >
            {loading ? "Saving..." : "Save Application"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddJob