// THREE.js animated background for Raihan Abdul Rasheed Portfolio
let scene, camera, renderer, stars = [];

function init() {
    const canvas = document.getElementById('bg-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create animated stars
    for (let i = 0; i < 800; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.15, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${Math.random()*360}, 80%, 60%)`) });
        const star = new THREE.Mesh(geometry, material);
        star.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );
        scene.add(star);
        stars.push(star);
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    stars.forEach((star, i) => {
        star.position.x += Math.sin(Date.now() * 0.0002 + i) * 0.01;
        star.position.y += Math.cos(Date.now() * 0.0002 + i) * 0.01;
        star.rotation.x += 0.002;
        star.rotation.y += 0.002;
    });
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scroll for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 40,
                behavior: 'smooth'
            });
        }
    });
});

window.onload = () => {
    init();
    // Section and card animations on scroll
    const animatedEls = document.querySelectorAll('.animated-fade-in, .animated-slide-in, .animated-pop-in');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animatedEls.forEach(el => {
        // Pause animation until in view
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}; 