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

module.exports = router