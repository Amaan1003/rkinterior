import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 3D Scene Variables
let canvas, renderer, scene, camera, controls, model;

// Initialize 3D Scene
function init3D() {
  // Setup scene
  canvas = document.querySelector('#heroCanvas');
  scene = new THREE.Scene();
  
  // Setup camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 8);
  
  // Setup renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // Load model
  const loader = new GLTFLoader();
  loader.load('3d/modern_bedroom (1).glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    model.position.y = -1;
    scene.add(model);
    animate();
  });
  
  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2.2;
  
  // Responsive handling
  window.addEventListener('resize', onWindowResize);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.002;
  renderer.render(scene, camera);
}

// Handle Window Resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Scroll Animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.3
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  init3D();
  
  // Hide loader after 1.5s
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);
});

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Get all service titles
  const serviceTitles = document.querySelectorAll('.service-title');

  // Add click event listeners to each service title
  serviceTitles.forEach(function (title) {
    title.addEventListener('click', function () {
      // Toggle the display of the corresponding description
      const description = title.nextElementSibling;
      if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
      } else {
        description.style.display = "none";
      }
    });
  });
});


// RK Gallery Animation
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.rk-collage-item');
  
  // Set animation delays for mobile
  if (window.innerWidth <= 768) {
    galleryItems.forEach((item, index) => {
      item.style.setProperty('--i', index);
    });
  }
  
  // Intersection Observer for scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });
  
  galleryItems.forEach(item => {
    observer.observe(item);
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      galleryItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
      });
    }
  });
  
  // Button hover effect
  const galleryBtn = document.querySelector('.rk-gallery-btn');
  if (galleryBtn) {
    galleryBtn.addEventListener('mouseenter', () => {
      galleryBtn.querySelector('svg').style.transform = 'translateY(3px)';
    });
    galleryBtn.addEventListener('mouseleave', () => {
      galleryBtn.querySelector('svg').style.transform = 'translateY(0)';
    });
  }
});


//hero section
// 3D Canvas Animation for Luxury Hero
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Canvas
  const canvas = document.getElementById('luxuryHeroCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.luxury-hero').offsetHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Luxury Gold Particles
  class LuxuryParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 0.5 + 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = `rgba(212, 175, 55, ${this.opacity})`;
      this.angle = Math.random() * Math.PI * 2;
      this.velocity = Math.random() * 0.2 - 0.1;
    }
    
    update() {
      this.y += this.speed;
      this.x += Math.sin(this.angle) * 0.5;
      this.angle += this.velocity;
      
      if (this.y > canvas.height + 10) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }
  
  // Create particles
  const luxuryParticles = [];
  const particleCount = Math.floor(window.innerWidth / 5);
  
  for (let i = 0; i < particleCount; i++) {
    luxuryParticles.push(new LuxuryParticle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    luxuryParticles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Initialize particles.js for additional luxury effect
  if (typeof particlesJS !== 'undefined') {
    particlesJS('luxury-particles-js', {
      "particles": {
        "number": {
          "value": 30,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#D4AF37"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#D4AF37",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }
});