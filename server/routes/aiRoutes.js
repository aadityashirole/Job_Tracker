const express = require("express")
const router = express.Router()

router.post("/jd-analyzer", async (req, res) => {
    try {
        const { skills, jd } = req.body

        const prompt = `
You are a career advisor. Analyze the gap between a candidate's skills and a job description.

Candidate's current skills:
${skills}

Job Description:
${jd}

Respond in this exact JSON format only, no extra text, no markdown:
{
  "matched_skills": ["skill1", "skill2"],
  "missing_skills": ["skill1", "skill2"],
  "recommendation": "2-3 sentence advice on what to learn first and why",
  "match_percentage": 65
}
`

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            })
        })

        const data = await response.json()
        const text = data.choices[0].message.content
        const cleaned = text.replace(/```json|```/g, "").trim()
        const parsed = JSON.parse(cleaned)
        res.json(parsed)
    } catch (err) {
        res.status(500).json({ message: "AI request failed", error: err.message })
    }
})
router.post("/resume-scorer", async (req, res) => {
    try {
        const { resume } = req.body

        const prompt = `
You are an expert resume reviewer with 10 years of experience in tech hiring.
Analyze this resume and provide detailed feedback.

Resume:
${resume}

Respond in this exact JSON format only, no extra text, no markdown:
{
  "overall_score": 72,
  "sections": {
    "content": 75,
    "structure": 80,
    "impact": 65,
    "keywords": 70
  },
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "summary": "2-3 sentence overall assessment"
}
`

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            })
        })

        const data = await response.json()
        const text = data.choices[0].message.content
        const cleaned = text.replace(/```json|```/g, "").trim()
        const parsed = JSON.parse(cleaned)
        res.json(parsed)
    } catch (err) {
        res.status(500).json({ message: "AI request failed", error: err.message })
    }
})

router.post("/interview-prep", async (req, res) => {
    try {
        const { role, jd } = req.body

        const prompt = `
You are an expert technical interviewer at a top tech company.
Generate interview questions for the following role.

Role: ${role}
${jd ? `Job Description: ${jd}` : ""}

Respond in this exact JSON format only, no extra text, no markdown:
{
  "technical": [
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"}
  ],
  "behavioral": [
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"}
  ],
  "hr": [
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"}
  ]
}
`

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5
            })
        })

        const data = await response.json()
        const text = data.choices[0].message.content
        const cleaned = text.replace(/```json|```/g, "").trim()
        const parsed = JSON.parse(cleaned)
        res.json(parsed)
    } catch (err) {
        res.status(500).json({ message: "AI request failed", error: err.message })
    }
})

module.exports = router