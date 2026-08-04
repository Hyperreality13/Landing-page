/* ==========================================================================
   AIDAN LANDING PAGE — ANIMATIONS & INTERACTION ENGINE
   Powered by GSAP & Custom Micro-Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Register GSAP ScrollTrigger */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Cinematic Reveal for all .reveal-up elements
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Draw SVG Wavy Underline Path
    const wavyPath = document.getElementById('wavyPath1');
    if (wavyPath) {
      const length = wavyPath.getTotalLength ? wavyPath.getTotalLength() : 400;
      gsap.set(wavyPath, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(wavyPath, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 70%'
        }
      });
    }
  }

  /* 2. Floating Glass Navbar Scroll Blur Effect */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }
  });

  /* 3. 3D Parallax Mouse Tilt Physics on .tilt-card Elements */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;   // max 6 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* 4. Magnetic CTA Button Physics */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  /* 5. Hero Typewriter Loop Simulation */
  const heroTypewriter = document.getElementById('hero-typewriter');
  const heroQueries = [
    "What did Rahul say about pricing?",
    "Find the Sequoia cold email template",
    "Where is the investor deck v3?",
    "Summarize podcast notes from February"
  ];
  let queryIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeHeroQuery() {
    if (!heroTypewriter) return;
    const currentQuery = heroQueries[queryIndex];
    if (isDeleting) {
      heroTypewriter.textContent = currentQuery.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heroTypewriter.textContent = currentQuery.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 25 : 50;

    if (!isDeleting && charIndex === currentQuery.length) {
      typeSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      queryIndex = (queryIndex + 1) % heroQueries.length;
      typeSpeed = 400;
    }

    setTimeout(typeHeroQuery, typeSpeed);
  }

  if (heroTypewriter) {
    setTimeout(typeHeroQuery, 1000);
  }

  /* 6. Waitlist Modal & Toast Notification Handling */
  const modal = document.getElementById('waitlist-modal');
  const modalClose = document.getElementById('modal-close');
  const triggerBtns = document.querySelectorAll('.trigger-waitlist-modal');
  const toast = document.getElementById('toast-notification');
  const inlineForm = document.getElementById('inline-waitlist-form');
  const modalForm = document.getElementById('modal-waitlist-form');

  function openModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  function showToast(msg) {
    if (toast) {
      if (msg) toast.querySelector('.toast-message').textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = inlineForm.querySelector('.waitlist-input');
      if (input && input.value) {
        showToast(`Thanks! ${input.value} is on the priority waitlist.`);
        input.value = '';
      }
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast("Priority access granted! We'll reach out shortly.");
      modalForm.reset();
    });
  }

});
