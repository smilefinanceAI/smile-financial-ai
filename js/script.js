import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Firebase (Jaisa aapne diya tha)
const firebaseConfig = {
    apiKey: "AIzaSyD3FEfP9Htj3ANvIENwzlNIKZRE7qIYFBc",
    authDomain: "smile-finance-ai-2026.firebaseapp.com",
    databaseURL: "https://smile-finance-ai-2026-default-rtdb.firebaseio.com",
    projectId: "smile-finance-ai-2026"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// PEXELS API LOGIC
const PEXELS_KEY = '7TEShXts406lDUgqHkVLnXRa1s6nepx5kb9tDtAUFetmTDpqrASG5mjR';

async function fetchMedia() {
    try {
        // 1. Fetch Hero Video
        const vidRes = await fetch(`https://api.pexels.com/videos/search?query=business finance&per_page=1`, {
            headers: { Authorization: PEXELS_KEY }
        });
        const vidData = await vidRes.json();
        document.getElementById('heroVideo').src = vidData.videos[0].video_files[0].link;

        // 2. Fetch Service Images
        const imgRes = await fetch(`https://api.pexels.com/v1/search?query=banking money&per_page=2`, {
            headers: { Authorization: PEXELS_KEY }
        });
        const imgData = await imgRes.json();
        document.getElementById('img-loan').style.backgroundImage = `url('${imgData.photos[0].src.large}')`;
        document.getElementById('img-card').style.backgroundImage = `url('${imgData.photos[1].src.large}')`;
    } catch (e) { console.log("API Error", e); }
}

fetchMedia();

// Form Redirect Logic
window.scrollToLead = (link) => {
    document.getElementById('lead-form').scrollIntoView({behavior:'smooth'});
}

document.getElementById('mainLeadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('uName').value,
        phone: document.getElementById('uPhone').value,
        time: new Date().toLocaleString()
    };
    push(ref(db, 'leads'), data).then(() => {
        alert("Success! Redirecting to Bank Site...");
        window.location.href = "https://sales.gromo.in/ac/hCxUWHMdHF";
    });
});
