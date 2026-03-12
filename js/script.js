const PEXELS_KEY = '7TEShXts406lDUgqHkVLnXRa1s6nepx5kb9tDtAUFetmTDpqrASG5mjR';

// 1. Dynamic Video Loop for Hero
async function setupHero() {
    const res = await fetch(`https://api.pexels.com/videos/search?query=banking technology&per_page=1`, {
        headers: { Authorization: PEXELS_KEY }
    });
    const data = await res.json();
    document.getElementById('heroVideo').src = data.videos[0].video_files[0].link;
}

// 2. Dynamic Service Cards Generator (8-9 Services)
const servicesList = [
    { title: "Personal Loan", desc: "Instant cash for your needs." },
    { title: "Business Loan", desc: "Grow your business today." },
    { title: "Credit Cards", desc: "Premium rewards, low interest." },
    { title: "Home Loan", desc: "Sapno ka ghar ab door nahi." },
    { title: "Insurance", desc: "Family ki suraksha sabse pehle." },
    { title: "Gold Loan", desc: "Quick cash against gold." }
];

async function loadServices() {
    const imgRes = await fetch(`https://api.pexels.com/v1/search?query=finance luxury&per_page=6`, {
        headers: { Authorization: PEXELS_KEY }
    });
    const imgData = await imgRes.json();
    
    const container = document.getElementById('dynamicServices');
    servicesList.forEach((s, index) => {
        container.innerHTML += `
            <div class="s-card">
                <div class="s-img" style="background-image: url('${imgData.photos[index].src.large}')"></div>
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
                <button onclick="window.location.href='#lead-form'">Check Approval</button>
            </div>
        `;
    });
}

// Initialize Everything
setupHero();
loadServices();
