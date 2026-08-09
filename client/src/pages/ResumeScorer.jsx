import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

function ResumeScorer() {
  const navigate = useNavigate()

  const [resume, setResume] = useState("")
  const [fileName, setFileName] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [parsingPdf, setParsingPdf] = useState(false)

  async function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.")
      return
    }

    setParsingPdf(true)
    setError("")

    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise
      let extractedText = ""

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item) => item.str).join(" ")
        extractedText += pageText + "\n"
      }

      setResume(extractedText)
      setFileName(file.name)
    } catch (err) {
      console.error(err)
      setError("Failed to parse PDF file. Please try pasting the text manually.")
    } finally {
      setParsingPdf(false)
    }
  }

  async function analyzeResume() {
    if (!resume.trim()) {
      setError("Please upload a PDF or paste your resume content.")
      return
    }
    if (resume.trim().length < 100) {
      setError("Please provide a complete resume (at least 100 characters)")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://job-tracker-qyzl.onrender.com"}/api/ai/resume-scorer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ resume })
        }
      );

      const parsed = await response.json();

      if (!response.ok) {
        setError(parsed.message || "AI analysis failed");
        return;
      }

      setResult(parsed);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #07111f, #0b1220, #111827)",
        color: "white"
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#10b981,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700"
            }}
          >
            JT
          </div>
          <span style={{ fontSize: "20px", fontWeight: "700" }}>CareerForge AI</span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            padding: "10px 18px",
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          ← Dashboard
        </button>
      </nav>

      {/* PAGE */}
      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(124,58,237,0.15)",
              color: "#a78bfa",
              border: "1px solid rgba(124,58,237,0.2)",
              fontSize: "13px",
              marginBottom: "16px"
            }}
          >
            AI Resume Analysis
          </div>

          <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "12px" }}>
            Resume Scorer
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "16px" }}>
            Upload your PDF resume to get an AI-powered score and actionable suggestions.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              padding: "14px",
              borderRadius: "14px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        {/* INPUT CARD */}
        <div
          style={{
            background: "rgba(17,24,39,0.75)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "28px",
            marginBottom: "30px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "15px", fontWeight: "600" }}>
              Upload Resume PDF
            </label>
          </div>

          {fileName ? (
            /* CLEAN UPLOADED FILE PREVIEW CARD */
            <div
              style={{
                background: "#0f172a",
                border: "1px solid rgba(0,237,100,0.3)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    background: "rgba(0,237,100,0.1)",
                    color: "#00ED64",
                    padding: "12px",
                    borderRadius: "12px",
                    fontSize: "20px"
                  }}
                >
                  📄
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", color: "#f8fafc" }}>{fileName}</h4>
                  <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#00ED64" }}>● Successfully parsed & ready for scoring</p>
                </div>
              </div>

              <button
                onClick={() => { setFileName(""); setResume(""); }}
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Remove / Change PDF
              </button>
            </div>
          ) : (
            /* DROPZONE / UPLOAD BOX */
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#0f172a",
                border: "2px dashed #334155",
                borderRadius: "16px",
                padding: "40px",
                textAlign: "center",
                cursor: "pointer",
                marginBottom: "24px",
                transition: "0.2s ease"
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>📁</div>
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#f8fafc", marginBottom: "6px" }}>
                {parsingPdf ? "Extracting text from PDF..." : "Click to upload your resume PDF"}
              </span>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>Supports standard PDF format</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          )}

          <button
            onClick={analyzeResume}
            disabled={loading || parsingPdf || !resume}
            style={{
              background: !resume ? "#334155" : "linear-gradient(135deg,#7c3aed,#3b82f6)",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "14px",
              fontWeight: "600",
              cursor: !resume ? "not-allowed" : "pointer",
              fontSize: "15px",
              width: "100%"
            }}
          >
            {loading ? "Analyzing Resume with AI..." : "Score My Resume"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <>
            {/* SCORE CARD */}
            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "32px",
                textAlign: "center",
                marginBottom: "24px"
              }}
            >
              <p style={{ color: "#94a3b8", marginBottom: "10px" }}>Overall Resume Score</p>
              <h2
                style={{
                  fontSize: "72px",
                  fontWeight: "700",
                  color:
                    result.overall_score >= 70
                      ? "#22c55e"
                      : result.overall_score >= 50
                        ? "#f59e0b"
                        : "#ef4444"
                }}
              >
                {result.overall_score}
              </h2>
              <p style={{ color: "#64748b" }}>out of 100</p>
            </div>

            {/* SECTION BREAKDOWN */}
            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "24px"
              }}
            >
              <h3 style={{ marginBottom: "20px", fontSize: "18px" }}>Section Breakdown</h3>
              {Object.entries(result.sections || {}).map(([key, value]) => (
                <div key={key} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#cbd5e1", textTransform: "capitalize" }}>{key}</span>
                    <span style={{ fontWeight: "600" }}>{value}</span>
                  </div>
                  <div style={{ background: "#1e293b", height: "10px", borderRadius: "999px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${key === "contact"
                            ? (value / 5) * 100
                            : key === "education"
                              ? (value / 10) * 100
                              : key === "ats"
                                ? (value / 15) * 100
                                : key === "grammar"
                                  ? (value / 10) * 100
                                  : (value / 20) * 100
                          }%`,
                        height: "100%",
                        background: value >= 70 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444",
                        transition: "0.5s"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* STRENGTHS + IMPROVEMENTS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              <div style={{ background: "rgba(17,24,39,0.75)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "24px" }}>
                <h3 style={{ color: "#22c55e", marginBottom: "16px" }}>✅ Strengths</h3>
                {result.strengths.map((item, index) => (
                  <p key={index} style={{ marginBottom: "12px", color: "#cbd5e1", lineHeight: "1.6" }}>
                    • {item}
                  </p>
                ))}
              </div>

              <div style={{ background: "rgba(17,24,39,0.75)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "24px" }}>
                <h3 style={{ color: "#ef4444", marginBottom: "16px" }}>⚠️ Improvements</h3>
                {result.improvements.map((item, index) => (
                  <p key={index} style={{ marginBottom: "12px", color: "#cbd5e1", lineHeight: "1.6" }}>
                    • {item}
                  </p>
                ))}
              </div>
            </div>

            {/* MISSING SECTIONS */}
            <div style={{ background: "rgba(17,24,39,0.75)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ color: "#f59e0b", marginBottom: "16px" }}>📌 Missing Sections</h3>
              {result.missing_sections.length === 0 ? (
                <p style={{ color: "#22c55e" }}>No important sections are missing.</p>
              ) : (
                result.missing_sections.map((item, index) => (
                  <p key={index} style={{ color: "#cbd5e1", marginBottom: "10px" }}>• {item}</p>
                ))
              )}
            </div>

            {/* SUMMARY */}
            <div style={{ background: "rgba(17,24,39,0.75)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "28px" }}>
              <h3 style={{ color: "#a78bfa", marginBottom: "14px" }}>💡 AI Summary</h3>
              <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>{result.summary}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ResumeScorer