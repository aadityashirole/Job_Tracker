import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { generateCoverLetter } from "../api" // Double check this matches your api.js import

function CoverLetterGenerator() {
    const navigate = useNavigate()
    const [skills, setSkills] = useState("")
    const [jd, setJd] = useState("")
    const [role, setRole] = useState("")
    const [letter, setLetter] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleGenerate = async () => {
        // Basic validation so users don't send empty requests
        if (!role.trim() || !skills.trim() || !jd.trim()) {
            setError("Please fill out all fields.")
            return
        }

        setLoading(true)
        setError("")
        setLetter("")

        try {
            const data = await generateCoverLetter(skills, jd, role)
            if (data.message) {
                throw new Error(data.message)
            }
            setLetter(data.coverLetter)
        } catch (err) {
            console.error(err)
            setError(err.message || "Something went wrong. Try again.")
        }
        setLoading(false)
    }

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #07111f, #0b1220, #111827)", color: "white" }}>

            {/* NAVBAR */}
            <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)", background: "rgba(10,15,28,0.75)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#00ED64", color: "#071018", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" }}>
                        JT
                    </div>
                    <div>
                        <div style={{ fontWeight: "700", fontSize: "18px" }}>Job Tracker</div>
                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>AI Career Workspace</div>
                    </div>
                </div>
                <button onClick={() => navigate("/dashboard")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", padding: "10px 18px", borderRadius: "12px", cursor: "pointer", fontWeight: "600" }}>
                    ← Dashboard
                </button>
            </nav>

            {/* MAIN CONTENT */}
            <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
                <div style={{ marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>AI Cover Letter Generator</h1>
                    <p style={{ color: "#94a3b8", fontSize: "16px" }}>Instantly generate tailored cover letters based on your skills and the job description.</p>
                </div>

                {error && (
                    <div style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", padding: "14px", borderRadius: "12px", marginBottom: "20px" }}>
                        {error}
                    </div>
                )}

                <div style={{ background: "rgba(17,24,39,0.75)", backdropFilter: "blur(18px)", borderRadius: "20px", padding: "30px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "30px" }}>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1", fontWeight: "600" }}>Target Job Role *</label>
                        <input
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Full Stack Developer"
                            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1", fontWeight: "600" }}>Your Skills & Experience *</label>
                        <textarea
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            rows={4}
                            placeholder="Paste your skills, summary, or resume bullet points here..."
                            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", resize: "vertical", outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1", fontWeight: "600" }}>Job Description *</label>
                        <textarea
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            rows={6}
                            placeholder="Paste the full job description here..."
                            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", resize: "vertical", outline: "none", boxSizing: "border-box" }}
                        />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        style={{ background: "#00ED64", color: "#071018", border: "none", padding: "14px 28px", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "15px" }}
                    >
                        {loading ? "Generating..." : "Generate Cover Letter"}
                    </button>
                </div>

                {/* RESULTS BOX */}
                {letter && (
                    <div style={{ background: "rgba(17,24,39,0.75)", borderRadius: "20px", padding: "30px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "20px" }}>
                        <h2 style={{ color: "#00ED64", margin: 0 }}>✨ Your Cover Letter</h2>

                        <div style={{ whiteSpace: "pre-wrap", color: "#e2e8f0", lineHeight: "1.7", fontSize: "16px", background: "#0f172a", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
                            {letter}
                        </div>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(letter);
                                alert("Copied to clipboard!");
                            }}
                            style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}
                        >
                            📋 Copy to Clipboard
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CoverLetterGenerator;