// --- CONFIGURACIÓN DE PAGO DE LA PYME ---
const USA_STRIPE = false;
const STRIPE_PUBLIC_KEY = ""; 
const DATOS_BANCARIOS = {
    banco: "",
    clabe: "",
    titular: "Nombre del Titular"
};
// ----------------------------------------

const CONFIG = {
    whatsapp: "5214491472336", 
    whatsappAdicional: "5214491472336",
    sitioWeb: "https://www.mitsubishi-aguascalientes.mx/",
    facebook: "https://www.facebook.com/mitsubishimex/",
    instagram: "https://www.instagram.com/my_sing_studio/",
    maps: "https://maps.app.goo.gl/7JCGjc5ifwfBaPZAA", 
    youtubeUrl: "https://www.youtube.com/watch?v=r5QzKgmZM_A",
    textos: {
        cat1: { t: "QUIÉNES SOMOS", c: "Mitsubishi Aguascalientes representa la legendaria herencia de ingeniería y durabilidad japonesa en la región. Conducidos por la innovación y la robustez, ofrecemos una gama de vehículos diseñados para superar cualquier terreno con total seguridad, confort de primer nivel y la máxima confianza que solo nuestra tradición global puede otorgar." },
        cat2: { t: "EXCELENCIA", c: "Explora nuestra gama de servicios automotrices de clase mundial: Venta de SUVs y camionetas líderes como la pickup L200, Outlander y Montero Sport, atractivos planes de financiamiento a tu medida, pruebas de manejo dinámicas, taller especializado certificado y refacciones originales con garantía de defensa a defensa." },
        cat3: { t: "CLIENTES FELICES", c: "Nuestra prioridad es la absoluta satisfacción en cada kilómetro. Familias y empresas de Aguascalientes respaldan la solidez, el rendimiento de combustible inigualable y la tracción avanzada All-Wheel Control que definen la experiencia diaria de pertenecer a la gran familia Mitsubishi." }
    },
    sucursales: {
        suc1: { nombre: "Asesor 1", wa: "5214491472336", maps: "https://maps.app.goo.gl/kfnap4CBUjLZ5GDA6" },
        suc2: { nombre: "Asesor 2", wa: "5214491472336", maps: "https://maps.app.goo.gl/kfnap4CBUjLZ5GDA6" },
        suc3: { nombre: "Asesor 3", wa: "5214491472336", maps: "https://maps.app.goo.gl/kfnap4CBUjLZ5GDA6" },
        suc4: { nombre: "Asesor 4", wa: "5214491472336", maps: "https://maps.app.goo.gl/kfnap4CBUjLZ5GDA6" },
        suc5: { nombre: "Asesor 5", wa: "5214491472336", maps: "https://maps.app.goo.gl/kfnap4CBUjLZ5GDA6" },
        suc6: { nombre: "Asesor 6", wa: "5214491472336", maps: "https://maps.app.goo.gl/kfnap4CBUjLZ5GDA6" }
    }
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;

function openYouTubeVideo() { 
    playClick(); 
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    let videoId = "r5QzKgmZM_A"; 
    
    if(CONFIG.youtubeUrl.includes("shorts/")) { 
        videoId = CONFIG.youtubeUrl.split("shorts/")[1].split("?")[0]; 
    } else if(CONFIG.youtubeUrl.includes("v=")) { 
        videoId = CONFIG.youtubeUrl.split("v=")[1].split("&")[0]; 
    } else if(CONFIG.youtubeUrl.includes("youtu.be/")) {
        videoId = CONFIG.youtubeUrl.split("youtu.be/")[1].split("?")[0];
    }
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    overlay.style.display = 'flex';
}

function closeVideoLightbox() {
    playClick();
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    iframe.src = ""; 
    overlay.style.display = 'none';
}

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) { const src = imgElement.src; openLightbox(src, [src], true); }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);
    
    const imgCount = (cat === 'cat3') ? 3 : (cat === 'cat1' || cat === 'cat2') ? 6 : 4;
    const imgs = [];
    for(let i = 1; i <= imgCount; i++) { imgs.push(`assets/gallery/${cat}/${i}.jpg`); }
    
    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';
    imgs.forEach((src, index) => {
        const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
        rowGrid.appendChild(createPol(src, posClass, imgs));
    });
    grid.appendChild(rowGrid);
    
    if (cat === 'cat3') {
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = "display: flex; gap: 10px; margin-top: 15px; justify-content: center; width: 100%; flex-wrap: wrap;";
        videoContainer.innerHTML = `
            <a href="https://www.youtube.com/shorts/YoTUs3sr4v4" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Opinión de nuestros clientes</a>
            <a href="https://www.youtube.com/shorts/pOl0JsnDUh4" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Viviendo un MITSUBISHI</a>
        `;
        grid.appendChild(videoContainer);
    }
    
    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    div.onclick = (e) => { e.stopPropagation(); openLightbox(src, arr, false); };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    if(hideControls) { lightboxEl.classList.add('hide-nav-arrows'); } else { lightboxEl.classList.remove('hide-nav-arrows'); }
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    document.getElementById('text-zoom-title').innerText = CONFIG.textos[cat].t;
    document.getElementById('text-zoom-content').innerText = CONFIG.textos[cat].c;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }
function openBrandModal(modalId) { playClick(); const modal = document.getElementById(modalId); if (modal) modal.style.display = 'flex'; }
function closeBrandModal(modalId) { const modal = document.getElementById(modalId); if (modal) modal.style.display = 'none'; }
function playClickSound() { playClick(); }

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const icon = document.getElementById('audio-icon');
    if (icon) icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function playClick() { const snd = document.getElementById('sndFxClick'); if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); } }
function openNetworkCard(url) { playClick(); window.open(url, '_blank'); }

function abrirMenu() {
    playClick();
    document.getElementById('miMenuContacto').style.display = 'flex';
}

function cerrarMenu() {
    document.getElementById('miMenuContacto').style.display = 'none';
    document.querySelectorAll('.sucursal-panel-content').forEach(panel => panel.style.display = 'none');
}

function toggleSucursalAcordeon(sucKey) {
    playClick();
    const panel = document.getElementById(`${sucKey}-panel`);
    const estaVisible = panel.style.display === 'flex';
    document.querySelectorAll('.sucursal-panel-content').forEach(p => p.style.display = 'none');
    if (!estaVisible) {
        panel.style.display = 'flex';
    }
}

// INYECCIÓN DINÁMICA DEL ACORDEÓN DE SUCURSALES / ASESORES
function inicializarAcordeon() {
    const contenedor = document.getElementById('contenedor-sucursales');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    Object.keys(CONFIG.sucursales).forEach((key, index) => {
        const suc = CONFIG.sucursales[key];
        
        // Crear Botón del Acordeón
        const btn = document.createElement('button');
        btn.className = 'sucursal-accordion-btn';
        btn.innerHTML = `${index + 1}. ${suc.nombre.toUpperCase()}`;
        btn.onclick = () => toggleSucursalAcordeon(key);
        
        // Crear Panel Oculto
        const panel = document.createElement('div');
        panel.id = `${key}-panel`;
        panel.className = 'sucursal-panel-content';
        panel.innerHTML = `
            <div class="sucursal-info-block">
                <p class="suc-domicilio"><i class="fas fa-user-tie"></i> Ejecutivo de Ventas Digitales Mitsubishi</p>
                <p class="suc-horario"><i class="far fa-clock"></i> 9:00 AM a 8:00 PM | Atención Personalizada</p>
            </div>
            <a href="https://wa.me/${suc.wa}?text=Hola!%20Me%20interesa%20cotizar%20un%20veh%C3%ADculo%20Mitsubishi%20y%20agendar%20una%20prueba%20de%20manejo." target="_blank" class="btn-menu whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="${suc.maps}" target="_blank" class="btn-menu maps-btn"><i class="fas fa-location-arrow"></i> Cómo Llegar</a>
        `;
        
        contenedor.appendChild(btn);
        contenedor.appendChild(panel);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarAcordeon();
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'Mitsubishi Aguascalientes', url: window.location.href }); }
    catch { playClick(); navigator.clipboard.writeText(window.location.href).then(() => { alert("¡Enlace de tarjeta copiado!"); }); }
}