import { useNavigate } from "react-router-dom"

function Landing() {
  const navigate = useNavigate()

  const features = [
    { title: "Application Tracking", desc: "Track every application from Applied to Offer using a clean Kanban workflow.", icon: "📋" },
    { title: "AI Gap Analysis", desc: "Compare your skills against any job description and identify missing skills instantly.", icon: "🤖" },
    { title: "Resume Scoring", desc: "Get detailed AI feedback and actionable improvements for your resume.", icon: "📄" },
    { title: "Interview Preparation", desc: "Generate tailored interview questions and preparation tips.", icon: "🎯" }
  ]

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #07111f, #0b1220, #111827)", color: "white" }}>
      <nav style={{ padding: "22px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg,#10b981,#3b82f6)", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }}>
              JT
            </div>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Job Tracker</span>
          </div>
          <button onClick={() => navigate("/login")} style={{ background: "linear-gradient(135deg,#10b981,#3b82f6)", color: "white", border: "none", padding: "12px 24px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}>
            Sign In
          </button>
        </div>
      </nav>

      <section style={{ padding: "120px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "8px 16px", borderRadius: "999px", background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)", fontSize: "14px", fontWeight: "600", marginBottom: "24px" }}>
            AI Powered Career Assistant
          </div>
          <h1 style={{ fontSize: "64px", fontWeight: "800", lineHeight: "1.1", marginBottom: "24px" }}>
            Organize Your Job Search.<br />Get Hired Faster.
          </h1>
          <p style={{ maxWidth: "700px", margin: "0 auto", color: "#94a3b8", fontSize: "20px", lineHeight: "1.8", marginBottom: "40px" }}>
            Track applications, analyze skill gaps, improve your resume, and prepare for interviews — all from one intelligent platform.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/login")} style={{ background: "linear-gradient(135deg,#10b981,#3b82f6)", color: "white", border: "none", padding: "16px 32px", borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "16px" }}>
              Get Started
            </button>
            <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", padding: "16px 32px", borderRadius: "12px", fontWeight: "600", cursor: "pointer" }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 80px" }}>
        <div style={{ background: "rgba(17,24,39,0.75)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", padding: "40px" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", color: "#34d399" }}>100%</h2>
            <p style={{ color: "#94a3b8" }}>Free For Students</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", color: "#34d399" }}>4+</h2>
            <p style={{ color: "#94a3b8" }}>AI Career Tools</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", color: "#34d399" }}>1</h2>
            <p style={{ color: "#94a3b8" }}>Unified Dashboard</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "42px", marginBottom: "12px" }}>Everything You Need</h2>
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>Built specifically for students and job seekers.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px" }}>
          {features.map((feature) => (
            <div key={feature.title} style={{ background: "rgba(17,24,39,0.75)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "32px" }}>
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>{feature.icon}</div>
              <h3 style={{ marginBottom: "12px", fontSize: "20px" }}>{feature.title}</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px", textAlign: "center", color: "#64748b" }}>
        Built by Aaditya Shirole · {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Landing