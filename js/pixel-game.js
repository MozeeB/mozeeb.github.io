/* ===========================
   PIXEL ART GAME PORTFOLIO
   Vanilla JS - No libraries
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  // ===== STAR GENERATION =====
  var starsEl = document.getElementById('stars');
  if (starsEl) {
    for (var i = 0; i < 80; i++) {
      var star = document.createElement('div');
      star.className = 'star' + (Math.random() > 0.7 ? ' star--large' : '');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      starsEl.appendChild(star);
    }
  }

  // ===== SMOOTH SCROLL NAV =====
  var navLinks = document.querySelectorAll('.hud__link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile menu
        var nav = document.querySelector('.hud__nav');
        if (nav) nav.classList.remove('open');
      }
    });
  });

  // ===== MOBILE MENU TOGGLE =====
  var menuBtn = document.querySelector('.hud__menu-btn');
  var navMenu = document.querySelector('.hud__nav');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });
  }

  // ===== SCROLLSPY - Active nav highlighting =====
  var sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.hud__link[href="#' + id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ===== SCROLL FADE-IN ANIMATIONS =====
  var fadeElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== SKILL BAR ANIMATION =====
  var skillBars = document.querySelectorAll('.skill-bar__fill');
  if ('IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var targetWidth = entry.target.getAttribute('data-width');
          if (targetWidth) {
            entry.target.style.width = targetWidth;
          }
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillBars.forEach(function (bar) {
      skillObserver.observe(bar);
    });
  } else {
    skillBars.forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-width') || '0%';
    });
  }

});
