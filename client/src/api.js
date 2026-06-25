const API_BASE = (import.meta.env.VITE_API_URL || "https://job-tracker-qyzl.onrender.com").trim().replace(/\/+$/, "")
const API_URL = API_BASE.endsWith("/api") ? API_BASE : `${API_BASE}/api`

async function handleResponse(res) {
    const text = await res.text()

    try {
        return JSON.parse(text)
    } catch {
        return {
            message: text || "Request failed",
            status: res.status
        }
    }
}

export async function registerUser(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    return handleResponse(res)
}

export async function loginUser(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    return handleResponse(res)
}

export async function getJobs(token) {
    const res = await fetch(`${API_URL}/jobs`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return handleResponse(res)
}

export async function addJob(token, jobData) {
    const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
    })
    return handleResponse(res)
}

export async function updateJobStatus(token, jobId, status) {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    })
    return handleResponse(res)
}

export async function deleteJob(token, jobId) {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    })
    return handleResponse(res)
}

export async function updateJob(token, jobId, jobData) {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
    })

    return handleResponse(res)
}

export async function getJobById(token, jobId) {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return handleResponse(res)
}