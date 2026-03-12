const PEXELS_KEY = '7TEShXts406lDUgqHkVLnXRa1s6nepx5kb9tDtAUFetmTDpqrASG5mjR';

async function initHome() {
    try {
        // 1. Hero Video Loop
        const vidRes = await fetch(`https://api.pexels.com/videos/search?query=banking technology&per_page=1`, {
            headers: { Authorization: PEXELS_KEY }
        });
        const vidData = await vidRes.json();
        document.getElementById('heroVideo').src = vidData.videos[0].video_files[0].link;

        // 2. Load 8-9 Service Cards Dynamically
        const services = [
            "Personal Loan", "Business Loan", "Credit Card", 
            "Home Loan", "Education Loan", "Car Loan",
            "Gold Loan", "Insurance", "Free Audit"
        ];
        
        const imgRes = await fetch(`https://api.pexels.com/v1/search?query=finance luxury&per_page=9`, {
            headers: { Authorization: PEXELS_KEY }
        });
        const imgData = await imgRes.json();

        const grid = document.getElementById('serviceGrid');
        services.forEach((s, i) => {
            grid.innerHTML += `
                <div class="card">
                    <div class="card-img" style="background-image: url('${imgData.photos[i].src.large}')"></div>
                    <div class="card-body">
                        <h3>${s}</h3>
                        <p>Instant approval within 24 hours.</p>
                        <a href="pages/service-details.html" class="btn-text">View Details →</a>
                    </div>
                </div>
            `;
        });
    } catch(e) { console.log(e); }
}

initHome();
