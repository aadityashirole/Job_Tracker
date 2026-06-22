import { useNavigate } from "react-router-dom"

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{minHeight: "100vh", backgroundColor: "#030712", color: "white"}}>

      {/* Navbar */}
      <nav style={{padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1f2937"}}>
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <div style={{backgroundColor: "#2563eb", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}>
            JT
          </div>
          <span style={{fontWeight: "bold", fontSize: "20px"}}>Job Tracker</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          style={{backgroundColor: "#2563eb", color: "white", padding: "10px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px"}}
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{textAlign: "center", padding: "100px 20px 80px", maxWidth: "800px", margin: "0 auto"}}>
        <div style={{display: "inline-block", backgroundColor: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.3)", color: "#60a5fa", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", marginBottom: "24px"}}>
          🚀 AI-Powered Job Search Assistant
        </div>
        <h1 style={{fontSize: "48px", fontWeight: "bold", marginBottom: "20px", lineHeight: "1.2"}}>
          Track Your Job Search.<br/>Land Your Dream Role.
        </h1>
        <p style={{color: "#9ca3af", fontSize: "18px", marginBottom: "32px", lineHeight: "1.6"}}>
          Organize applications, analyze skill gaps, score your resume and prepare for interviews — all powered by AI, all in one place.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{backgroundColor: "#2563eb", color: "white", padding: "14px 36px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "16px"}}
        >
          Get Started Free →
        </button>
      </div>

      {/* Features Section */}
      <div style={{maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 100px"}}>
        <h2 style={{textAlign: "center", fontSize: "32px", fontWeight: "bold", marginBottom: "12px"}}>Everything You Need</h2>
        <p style={{textAlign: "center", color: "#6b7280", marginBottom: "60px"}}>One platform for your entire job search journey</p>

        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px"}}>

          <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "32px"}}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>📋</div>
            <h3 style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>Kanban Tracking</h3>
            <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>Visually track every application from applied to offer with drag and drop.</p>
          </div>

          <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "32px"}}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>🤖</div>
            <h3 style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>AI Gap Analyzer</h3>
            <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>Paste any job description and instantly know what skills you're missing.</p>
          </div>

          <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "32px"}}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>📄</div>
            <h3 style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>Resume Scorer</h3>
            <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>Get an AI-generated score and actionable feedback on your resume.</p>
          </div>

          <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "32px"}}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>🎯</div>
            <h3 style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>Interview Prep</h3>
            <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>Generate role-specific interview questions with insider tips.</p>
          </div>

          <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "32px"}}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>🔒</div>
            <h3 style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>Secure & Private</h3>
            <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>Your data is encrypted and accessible only to you with JWT authentication.</p>
          </div>

          <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "32px"}}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>⚡</div>
            <h3 style={{fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>Fast & Free</h3>
            <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>No subscriptions, no hidden costs. Built for students and job seekers.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div style={{borderTop: "1px solid #1f2937", padding: "32px 20px", textAlign: "center", color: "#6b7280", fontSize: "14px"}}>
        Built by Aaditya Shirole · Job Tracker {new Date().getFullYear()}
      </div>

    </div>
  )
}

export default Landing