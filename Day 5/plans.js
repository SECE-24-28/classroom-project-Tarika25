const plan = [
    {
        "Name": "Jio",
        "Planprice": 39,
        "Data": "3GB/day",
        "Validity": "3 days",
        "Calls": "NA",
        "SMS": "NA",
        "ExtraBenefits": "NA ",
        "id": "1"
    },
    {
        "Name": "Jio",
        "Planprice": 349,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "28 days",
        "Calls": "Unlimited calls",
        "SMS": "100 SMS/day",
        "ExtraBenefits": "Unlimited true 5G data,Jio Hotstar,Jio TV",
        "id": "2"
    },
    {
        "Name": "Jio",
        "Planprice": 899,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "90 days",
        "Calls": "Unlimited Calls",
        "SMS": "100 SMS/day",
        "ExtraBenefits": "Unlimited true 5G data,Jio Hotstar,Jio TV",
        "id": "3"
    },
    {
        "Name": "Jio",
        "Planprice": 3599,
        "Data": "Unlimited 5G+2.5GB/day",
        "Validity": "365 days",
        "Calls": "Unlimited Calls",
        "SMS": "100 SMS/day",
        "ExtraBenefits": "Unlimited true 5G data,Jio Hotstar,Jio TV",
        "id": "4"
    },
    {
        "Name": "Jio",
        "Planprice": 11,
        "Data": "Unlimited",
        "Validity": "1 hour",
        "Calls": "NA",
        "SMS": "NA",
        "ExtraBenefits": "NA",
        "id": "5"
    },
    {
        "Name": "Airtel",
        "Planprice": 33,
        "Data": "2GB",
        "Validity": "1 day",
        "Calls": "NA",
        "SMS": "NA",
        "ExtraBenefits": "NA",
        "id": "6"
    },
    {
        "Name": "Airtel",
        "Planprice": 279,
        "Data": "1GB",
        "Validity": "1 month",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "Jio Hotstar,Zee5 Premium,Netflix basic",
        "id": "7"
    },
    {
        "Name": "Airtel",
        "Planprice": 349,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "28 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "Unlimited 5G,Apple Music",
        "id": "8"
    },
    {
        "Name": "Airtel",
        "Planprice": 859,
        "Data": "Unlimited 5G+2GB/day",
        "Validity": "84 days",
        "Calls": "Unlimited",
        "SMS": "100/day",
        "ExtraBenefits": "Unlimited 5G,Apple Music",
        "id": "9"
    },
    {
        "Name": "Airtel",
        "Planprice": 49,
        "Data": "Unlimited",
        "Validity": "1 day",
        "Calls": "Unlimited",
        "SMS": "100/day",
        "ExtraBenefits": "",
        "id": "10"
    },
    {
        "Name": "BSNL",
        "Planprice": 147,
        "Data": "Unlimited",
        "Validity": "25 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "11"
    },
    {
        "Name": "BSNL",
        "Planprice": 16,
        "Data": "Unlimited",
        "Validity": "1 day",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "12"
    },
    {
        "Name": "BSNL",
        "Planprice": 198,
        "Data": "Unlimited",
        "Validity": "30 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "13"
    },
    {
        "Name": "BSNL",
        "Planprice": 347,
        "Data": "Unlimited",
        "Validity": "50 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "14"
    },
    {
        "Name": "BSNL",
        "Planprice": 485,
        "Data": "Unlimited",
        "Validity": "72 days",
        "Calls": "Unlimited",
        "SMS": "Unlimited",
        "ExtraBenefits": "N/A",
        "id": "15"
    }
];

const planList = document.getElementById("plan-list");
const operatorSelect = document.getElementById("operator");
const tabs = document.querySelectorAll(".tab");

function getCategory(p) {
    if (p.Calls.toLowerCase().includes("unlimited")) return "unlimited";
    if (p.Data.toLowerCase().includes("gb") || p.Data.toLowerCase().includes("data")) return "data";
    if (p.Planprice <= 20) return "talktime";
    return "other";
}

function loadPlans(selectedCategory = "", selectedOperator = "") {
    planList.innerHTML = "";

    let filtered = plan;

    if (selectedOperator !== "") {
        filtered = filtered.filter(p => p.Name === selectedOperator);
    }

    if (selectedCategory !== "") {
        filtered = filtered.filter(p => getCategory(p) === selectedCategory);
    }

    if (filtered.length === 0) {
        planList.innerHTML = `
            <div class="no-plans-message">
                <i class="fas fa-search"></i>
                <h3>No plans found</h3>
                <p>Try selecting a different operator or plan type</p>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "plan-card";
        card.innerHTML = `
            <div class="plan-left" data-operator="${p.Name}">
                <h2>₹${p.Planprice}</h2>
                <p><b>Calls:</b> ${p.Calls}</p>
                <p><b>Data:</b> ${p.Data}</p>
                <p><b>SMS:</b> ${p.SMS}</p>
                <p><b>Extra:</b> ${p.ExtraBenefits || 'None'}</p>
            </div>
            <div class="plan-right">
                <h3>${p.Validity}</h3>
                <p>Validity</p>
            </div>
        `;
        
        // Add click event to select plan
        card.addEventListener('click', () => {
            alert(`Selected ${p.Name} plan for ₹${p.Planprice} with ${p.Validity} validity`);
        });
        
        planList.appendChild(card);
    });
}

// Initialize event listeners
function initEventListeners() {
    operatorSelect.addEventListener("change", function () {
        loadPlans("", operatorSelect.value);
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const category = tab.dataset.tab;
            loadPlans(category, operatorSelect.value);
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPlans();
    initEventListeners();
});