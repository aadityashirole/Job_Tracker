import { useState } from "react";
import { generateCoverLetter } from "../api";

function CoverLetterGenerator() {
    const [skills, setSkills] = useState("");
    const [jd, setJd] = useState("");
    const [role, setRole] = useState("");
    const [letter, setLetter] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        const data = await generateCoverLetter(skills, jd, role);
        setLetter(data.coverLetter);
        setLoading(false);
    };

    return (
        <div style={{ padding: "40px", color: "white" }}>
            <h1>Cover Letter Generator</h1>
            <input placeholder="Job Role" onChange={(e) => setRole(e.target.value)} />
            <textarea placeholder="My Skills..." onChange={(e) => setSkills(e.target.value)} />
            <textarea placeholder="Job Description..." onChange={(e) => setJd(e.target.value)} />

            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Letter"}
            </button>

            {letter && (
                <div style={{ background: "#1e293b", padding: "20px", marginTop: "20px" }}>
                    <p>{letter}</p>
                    <button onClick={() => navigator.clipboard.writeText(letter)}>Copy to Clipboard</button>
                </div>
            )}
        </div>
    );
}

export default CoverLetterGenerator;