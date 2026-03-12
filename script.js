import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3FEfP9Htj3ANvIENwzlNIKZRE7qIYFBc",
  authDomain: "smile-finance-ai-2026.firebaseapp.com",
  databaseURL: "https://smile-finance-ai-2026-default-rtdb.firebaseio.com",
  projectId: "smile-finance-ai-2026",
  storageBucket: "smile-finance-ai-2026.firebasestorage.app",
  messagingSenderId: "325593143394",
  appId: "1:325593143394:web:2b5f3c2404279d4594d93b",
  measurementId: "G-93L7XN6ECR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 1. EMI Calculator Function
window.calculateEMI = function() {
    let p = document.getElementById("loanAmountRange").value;
    let r = 10.5 / 12 / 100; // Average Interest 10.5%
    let n = 12; // 1 Year tenure default
    document.getElementById("amtLabel").innerText = "₹" + parseInt(p).toLocaleString();
    
    let emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    document.getElementById("emiResultText").innerText = "₹" + Math.round(emi).toLocaleString() + "*";
}

// 2. Redirect Handling
let activeLink = "https://sales.gromo.in/ac/hCxUWHMdHF"; 

window.scrollToLead = function(link) {
    activeLink = link;
    document.getElementById('lead-form').scrollIntoView({behavior: 'smooth'});
}

// 3. Lead Submission to Firebase
document.getElementById('mainLeadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Processing...";
    btn.disabled = true;

    const leadData = {
        name: document.getElementById('custName').value,
        phone: document.getElementById('custPhone').value,
        product: document.getElementById('loanOption').value,
        targetLink: activeLink,
        timestamp: new Date().toLocaleString()
    };

    const newLeadRef = push(ref(db, 'leads'));
    set(newLeadRef, leadData).then(() => {
        alert("🎉 Eligibility Match! Bank Page Par Jayein.");
        window.location.href = activeLink;
    }).catch((err) => {
        alert("Error: " + err.message);
        btn.disabled = false;
        btn.innerText = "Try Again";
    });
});
