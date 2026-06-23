import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getJobById, updateJob } from "../api"

function EditJobs() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [form, setForm] = useState({
        company_name: "",
        role_title: "",
        job_description: "",
        status: "applied",
        applied_date: "",
        notes: "",
        job_link: ""
    })

    useEffect(() => {
        fetchJob()
    }, [])

    async function fetchJob() {
        const token = localStorage.getItem("token")
        const job = await getJobById(token, id)

        setForm({
            company_name: job.company_name || "",
            role_title: job.role_title || "",
            job_description: job.job_description || "",
            status: job.status || "applied",
            applied_date: job.applied_date
                ? job.applied_date.slice(0, 10)
                : "",
            notes: job.notes || "",
            job_link: job.job_link || "",
        })
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit() {
        const token = localStorage.getItem("token")

        await updateJob(token, id, form)

        navigate("/dashboard")
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom, #07111f, #0b1220, #111827)",
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
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)"
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
                            background:
                                "linear-gradient(135deg,#10b981,#3b82f6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "700"
                        }}
                    >
                        JT
                    </div>

                    <span
                        style={{
                            fontSize: "20px",
                            fontWeight: "700"
                        }}
                    >
                        Job Tracker
                    </span>
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

            {/* PAGE CONTENT */}
            <div
                style={{
                    maxWidth: "900px",
                    margin: "50px auto",
                    padding: "0 20px"
                }}
            >
                {/* Heading */}
                <div style={{ marginBottom: "32px" }}>
                    <div
                        style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            borderRadius: "999px",
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.2)",
                            color: "#34d399",
                            fontSize: "13px",
                            marginBottom: "16px"
                        }}
                    >
                        Edit Application
                    </div>

                    <h1
                        style={{
                            fontSize: "42px",
                            fontWeight: "700",
                            marginBottom: "10px"
                        }}
                    >
                        Edit Job Application
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "16px"
                        }}
                    >
                        Update your application details.
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
                            marginBottom: "24px"
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* FORM CARD */}
                <div
                    style={{
                        background: "rgba(17,24,39,0.7)",
                        backdropFilter: "blur(18px)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "24px",
                        padding: "32px"
                    }}
                >
                    {/* Company */}
                    <div style={{ marginBottom: "22px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "#cbd5e1",
                                fontSize: "14px"
                            }}
                        >
                            Company Name *
                        </label>

                        <input
                            name="company_name"
                            value={form.company_name}
                            onChange={handleChange}
                            placeholder="Google, Microsoft, Amazon..."
                            style={{
                                width: "100%",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "white",
                                padding: "14px",
                                borderRadius: "14px",
                                outline: "none",
                                fontSize: "14px",
                                boxSizing: "border-box"
                            }}
                        />
                        {form.company_name && (
                            <div
                                style={{
                                    marginTop: "10px",
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "#00ED64",
                                    color: "#071018",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                    fontWeight: "700"
                                }}
                            >
                                {form.company_name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Role */}
                    <div style={{ marginBottom: "22px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "#cbd5e1",
                                fontSize: "14px"
                            }}
                        >
                            Role Title *
                        </label>
                        <div style={{ marginBottom: "22px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#cbd5e1",
                                    fontSize: "14px"
                                }}
                            >
                                Job Link
                            </label>

                            <input
                                name="job_link"
                                value={form.job_link}
                                onChange={handleChange}
                                placeholder="https://careers.google.com/..."
                                style={{
                                    width: "100%",
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    color: "white",
                                    padding: "14px",
                                    borderRadius: "14px",
                                    outline: "none"
                                }}
                            />
                        </div>

                        <input
                            name="role_title"
                            value={form.role_title}
                            onChange={handleChange}
                            placeholder="Frontend Developer"
                            style={{
                                width: "100%",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "white",
                                padding: "14px",
                                borderRadius: "14px",
                                outline: "none",
                                fontSize: "14px",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    {/* STATUS + DATE */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "20px",
                            marginBottom: "22px"
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#cbd5e1",
                                    fontSize: "14px"
                                }}
                            >
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    color: "white",
                                    padding: "14px",
                                    borderRadius: "14px",
                                    outline: "none"
                                }}
                            >
                                <option value="applied">Applied</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#cbd5e1",
                                    fontSize: "14px"
                                }}
                            >
                                Applied Date
                            </label>

                            <input
                                type="date"
                                name="applied_date"
                                value={form.applied_date}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    color: "white",
                                    padding: "14px",
                                    borderRadius: "14px",
                                    outline: "none"
                                }}
                            />
                        </div>
                    </div>

                    {/* JD */}
                    <div style={{ marginBottom: "22px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "#cbd5e1",
                                fontSize: "14px"
                            }}
                        >
                            Job Description
                        </label>

                        <textarea
                            name="job_description"
                            value={form.job_description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Paste the complete job description..."
                            style={{
                                width: "100%",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "white",
                                padding: "14px",
                                borderRadius: "14px",
                                resize: "vertical",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    {/* NOTES */}
                    <div style={{ marginBottom: "30px" }}>
                        <label>
                            Notes ({form.notes.length}/500)
                        </label>

                        <textarea
                            maxLength={500}
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Interview rounds, referral details, salary expectations..."
                            style={{
                                width: "100%",
                                background: "#0f172a",
                                border: "1px solid #334155",
                                color: "white",
                                padding: "14px",
                                borderRadius: "14px",
                                resize: "vertical",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: "100%",
                            background:
                                "linear-gradient(135deg,#10b981,#3b82f6)",
                            color: "white",
                            border: "none",
                            padding: "16px",
                            borderRadius: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            fontSize: "15px"
                        }}
                    >
                        {loading ? "Updating..." : "Update Application"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditJobs