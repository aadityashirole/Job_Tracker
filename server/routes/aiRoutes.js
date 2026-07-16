const express = require("express")
const router = express.Router()
const Question = require("../models/Question") // Added the DB Model

router.post("/jd-analyzer", async (req, res) => {
    // ... [KEEP YOUR EXISTING CODE HERE - NO CHANGES] ...
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
                model: "llama-3.3-70b-versatile",
                response_format: { type: "json_object" },
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
    // ... [KEEP YOUR EXISTING CODE HERE - NO CHANGES] ...
    try {
        const { resume } = req.body

        const prompt = `
You are an expert ATS Resume Analyzer and Senior Technical Recruiter.
Your task is to objectively evaluate the resume below.
Scoring Rules:
Contact Information (5 marks)
Education (10 marks)
Technical Skills (20 marks)
Projects (20 marks)
Work Experience (20 marks)
ATS Keywords & Relevance (15 marks)
Grammar & Formatting (10 marks)

Rules:
- Score each section independently.
- The overall_score MUST be the exact sum of all section scores.
- Never use a fixed score.
- Base the score ONLY on the resume content.
- If a section is missing, give it a low score.
- If the resume is excellent, the score can exceed 90.
- If the resume is weak, the score can be below 40.

Resume:
${resume}

Return ONLY valid JSON.
{
  "overall_score": 0,
  "sections": {
    "contact": 0, "education": 0, "skills": 0, "projects": 0, "experience": 0, "ats": 0, "grammar": 0
  },
  "strengths": [], "improvements": [], "missing_sections": [], "summary": ""
}
`

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
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
        console.error(err);
        res.status(500).json({ message: "AI request failed", error: err.message, stack: err.stack });
    }
})

// --- UPDATED HYBRID ROUTE ---
router.post("/interview-prep", async (req, res) => {
    try {
        const { role, jd } = req.body

        // 1. Check Database First (Case-insensitive)
        const dbQuestions = await Question.findOne({ role: new RegExp(`^${role}$`, 'i') })

        if (dbQuestions) {
            console.log("Serving curated questions from Database")
            return res.json({
                source: "database", // Flag for frontend
                technical: dbQuestions.technical,
                behavioral: dbQuestions.behavioral,
                hr: dbQuestions.hr
            })
        }

        console.log("No DB match found. Generating with Groq AI...")
        // 2. Fallback to Groq AI
        const prompt = `
You are an expert technical interviewer at a top tech company.
Generate interview questions for the following role.

Role: ${role}
${jd ? `Job Description: ${jd}` : ""}

Respond in this exact JSON format only, no extra text, no markdown:
{
  "technical": [
    {"question": "question text", "tip": "what interviewer looks for"}
  ],
  "behavioral": [
    {"question": "question text", "tip": "what interviewer looks for"}
  ],
  "hr": [
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
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5
            })
        })

        const data = await response.json();
        const text = data.choices[0].message.content;
        const match = text.match(/\{[\s\S]*\}/);

        if (!match) {
            throw new Error("No JSON found in AI response.");
        }

        const result = JSON.parse(match[0]);
        result.source = "ai"; // Flag for frontend

        // 3. Optional Bonus: Save AI generated questions to DB for next time
        try {
            await Question.create({
                role: role.toLowerCase(), // Normalize role string
                technical: result.technical,
                behavioral: result.behavioral,
                hr: result.hr
            });
            console.log("Saved new AI questions to Database");
        } catch (dbErr) {
            console.log("Could not save to DB (might already exist or missing fields)", dbErr.message);
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "AI request failed", error: err.message })
    }
})

module.exports = router