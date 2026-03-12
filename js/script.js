import { db } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const PEXELS_KEY = '7TEShXts406lDUgqHkVLnXRa1s6nepx5kb9tDtAUFetmTDpqrASG5mjR';

// 1. Fetch Pexels Image for Hero
async function setHeroImg() {
    const res = await fetch(`https://api.pexels.com/v1/search?query=smiling business man&per_page=1`, {
        headers: { Authorization: PEXELS_KEY }
    });
    const data = await res.json();
    document.getElementById('pexels-hero-img').style.backgroundImage = `url('${data.photos[0].src.large}')`;
}

// 2. Real-time Product Loading from Admin
function loadLiveProducts() {
    const productRef = ref(db, 'products');
    onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        // Yahan hum products ko category ke hisab se sort karke UI pe dikhayenge
        console.log("Admin Products Loaded:", data);
    });
}

setHeroImg();
loadLiveProducts();
