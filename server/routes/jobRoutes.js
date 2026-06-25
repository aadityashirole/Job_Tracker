const express = require("express")
const Job = require("../models/Job")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Middleware to verify token and get user
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "No token provided" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }
}

// Get all jobs for logged in user
router.get("/", verifyToken, async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 })
        res.json(jobs)
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            userId: req.userId
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        res.json(job)
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
})

// Add new job
router.post("/", verifyToken, async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            userId: req.userId,

            statusHistory: [
                {
                    status: req.body.status || "applied"
                }
            ]
        })
        res.status(201).json(job)
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

// Update job status
router.put("/:id", verifyToken, async (req, res) => {
    try {

        const job = await Job.findOne({
            _id: req.params.id,
            userId: req.userId
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        if (
            req.body.status &&
            req.body.status !== job.status
        ) {
            job.statusHistory.push({
                status: req.body.status,
                date: new Date()
            })
        }

        Object.assign(job, req.body)

        await job.save()

        res.json(job)

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
})

// Delete job
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId })
        res.json({ message: "Job deleted" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
})

module.exports = router