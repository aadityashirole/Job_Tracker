const API_URL = `${import.meta.env.VITE_API_URL || "https://job-tracker-qyzl.onrender.com"}/api`

export async function registerUser(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    return res.json()
}

export async function loginUser(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    return res.json()
}

export async function getJobs(token) {
    const res = await fetch(`${API_URL}/jobs`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return res.json()
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
    return res.json()
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
    return res.json()
}

export async function deleteJob(token, jobId) {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    })
    return res.json()
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

    return res.json()
}
export async function getJobById(token, jobId) {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res.json()
}