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
            // 1. Hunt for the Job Title (Tries multiple methods)
            // 1. Hunt for the Job Title (Aggressive Selectors)
            // Replace your roleSelectors array with this:
            const roleSelectors = [
                '.job-details-jobs-unified-top-card__job-title h1',
                '.job-details-jobs-unified-top-card__job-title',
                // This targets an <a> tag specifically inside the top job card area
                '.job-details-jobs-unified-top-card__container a[href*="/jobs/view/"]',
                'h1' // The "nuclear option" - grab any h1 inside the top job card area
            ];

            for (let selector of roleSelectors) {
                const el = document.querySelector(selector);
                if (el && el.innerText) {
                    role = el.innerText.trim();
                    break; // Stop looking once we find it
                }
            }

            // 2. Hunt for the Company Name (Tries multiple methods)
            // We lock the search to the top card so it doesn't accidentally grab a random company from the sidebar
            const topCard = document.querySelector('.job-details-jobs-unified-top-card') || document;
            const compSelectors = [
                '.job-details-jobs-unified-top-card__company-name a',
                '.job-details-jobs-unified-top-card__primary-description-container a',
                '.jobs-details-top-card__company-url',
                'a[href*="/company/"]'
            ];

            for (let selector of compSelectors) {
                const el = topCard.querySelector(selector);
                if (el && el.innerText) {
                    // Make sure it doesn't just grab the word "LinkedIn"
                    if (el.innerText.trim().toLowerCase() !== "linkedin") {
                        company = el.innerText.trim();
                        break;
                    }
                }
            }
        }
        else if (url.includes('naukri.com')) {
            // Naukri logic remains the same
            const titleElement = document.querySelector('h1.styles_jd-header-title__rD36r, .jd-header-title, h1');
            if (titleElement) role = titleElement.innerText.trim();

            const companyElement = document.querySelector('.jd-header-comp-name a, .styles_jd-header-comp-name__MawbY, .jd-header-company-name, a[href*="company"]');
            if (companyElement) company = companyElement.innerText.trim();
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