document.addEventListener('DOMContentLoaded', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeJobDetails
    }, (injectionResults) => {
        // We added some console logs here so we can debug if it fails!
        if (chrome.runtime.lastError) {
            console.error("Script Injection Failed: ", chrome.runtime.lastError.message);
            return;
        }

        if (injectionResults && injectionResults[0] && injectionResults[0].result) {
            const { company, role } = injectionResults[0].result;

            if (company) document.getElementById('company').value = company;
            if (role) document.getElementById('role').value = role;
        }
    });
});

// --- THE BRUTE FORCE SCRAPER ---
function scrapeJobDetails() {
    let company = '';
    let role = '';
    const url = window.location.href;

    try {
        if (url.includes('linkedin.com')) {
            // 1. Get Company (Your current logic is working, keep it)
            const topCard = document.querySelector('.job-details-jobs-unified-top-card') || document;
            const compSelectors = ['.job-details-jobs-unified-top-card__company-name a', 'a[href*="/company/"]'];
            for (let selector of compSelectors) {
                const el = topCard.querySelector(selector);
                if (el && el.innerText && el.innerText.trim().toLowerCase() !== "linkedin") {
                    company = el.innerText.trim();
                    break;
                }
            }

            // 2. Get Job Title (XPath - The "Impossible to Break" Method)
            // This searches for an H2 or H1 that contains the job title text
            const titleXPath = "//h1 | //h2[contains(@class, 'title')] | //div[contains(@class, 'title')]";
            const result = document.evaluate(titleXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

            if (result.singleNodeValue) {
                role = result.singleNodeValue.innerText.trim();
            }
        }
    } catch (err) {
        console.error("Scraping error:", err);
    }

    return { company, role };
}

// --- SAVE BUTTON LOGIC ---
document.getElementById('addBtn').addEventListener('click', async () => {
    const company = document.getElementById('company').value;
    const role = document.getElementById('role').value;
    const statusDiv = document.getElementById('status');

    if (!company || !role) {
        statusDiv.style.color = "#ef4444";
        statusDiv.innerText = "Please fill in both fields!";
        return;
    }

    statusDiv.style.color = "#94a3b8";
    statusDiv.innerText = "Saving to dashboard...";

    try {
        const response = await fetch("https://job-tracker-qyzl.onrender.com/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                company_name: company,
                role_title: role,
                status: "applied"
            })
        });

        if (response.ok) {
            statusDiv.style.color = "#00ED64";
            statusDiv.innerText = "Successfully added!";
            setTimeout(() => window.close(), 1500);
        } else {
            throw new Error("Failed to save");
        }
    } catch (error) {
        console.error(error);
        statusDiv.style.color = "#ef4444";
        statusDiv.innerText = "Error saving job.";
    }
});