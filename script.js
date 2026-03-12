// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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
const database = getDatabase(app);

// EMI Calculator Logic
window.calculateEMI = function() {
    let p = document.getElementById("amount").value;
    let r = document.getElementById("rate").value / 12 / 100;
    let n = document.getElementById("months").value;
    let emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    document.getElementById("emiValue").innerText = "₹" + Math.round(emi).toLocaleString();
};

// Global Variable to store the link
let pendingLink = "https://sales.gromo.in/ac/hCxUWHMdHF"; 

window.scrollToLead = function(link) {
    pendingLink = link;
    document.getElementById('lead-form').scrollIntoView({behavior: 'smooth'});
};

// Lead Form Submission
document.getElementById('mainLeadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('loanAmount').value;

    // Data to save in Firebase
    const leadsRef = ref(database, 'leads');
    const newLeadRef = push(leadsRef);
    
    set(newLeadRef, {
        name: name,
        phone: phone,
        loanAmount: amount,
        timestamp: new Date().toISOString(),
        status: "New",
        productLink: pendingLink
    }).then(() => {
        alert("✅ Eligibility Check Successful! Redirecting to Bank Partner...");
        window.location.href = pendingLink;
    }).catch((error) => {
        console.error("Firebase Error: ", error);
        alert("Kuch error aaya, please try again.");
    });
});
