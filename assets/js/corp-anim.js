/**
 * corp-anim.js — Regalis Japan Group Corporate Site
 * Scroll reveal · Parallax · Gyroscope interaction · Counter animation
 */

(function () {
  'use strict';

  /* ───────────────────────────────────────────
     1. SCROLL REVEAL  (.reveal / .reveal-x)
  ─────────────────────────────────────────── */
  function initReveal() {
    var elements = document.querySelectorAll('.reveal, .reveal-x, .reveal-scale');
    if (!elements.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.dataset.delay || 0;
          setTimeout(function () {
            el.classList.add('is-visible');
          }, parseInt(delay, 10));
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    elements.forEach(function (el) { io.observe(el); });
  }

  /* ───────────────────────────────────────────
     2. STAGGER CHILDREN  (.reveal-stagger)
     Adds data-delay to each child automatically
  ─────────────────────────────────────────── */
  function initStagger() {
    var parents = document.querySelectorAll('.reveal-stagger');
    parents.forEach(function (parent) {
      var children = parent.querySelectorAll(':scope > *');
      children.forEach(function (child, i) {
        child.classList.add('reveal');
        child.dataset.delay = i * 80;
      });
    });
  }

  /* ───────────────────────────────────────────
     3. PARALLAX  (data-parallax="speed")
     Smooth Y-axis drift on scroll
  ─────────────────────────────────────────── */
  function initParallax() {
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;

    var ticking = false;

    function update() {
      var sy = window.scrollY;
      els.forEach(function (el) {
        var speed = parseFloat(el.dataset.parallax) || 0.15;
        var rect = el.parentElement.getBoundingClientRect();
        var centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = 'translateY(' + (centerY * speed) + 'px)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ───────────────────────────────────────────
     4. 3D GYROSCOPE — Mouse / DeviceOrientation
     The .geo-sphere responds to pointer movement
  ─────────────────────────────────────────── */
  function initGyroscope() {
    var wrap = document.querySelector('.geo-sphere-wrap');
    var sphere = document.querySelector('.geo-sphere');
    if (!wrap || !sphere) return;

    var currentX = 0, currentY = 0;
    var targetX = 0, targetY = 0;
    var raf;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);
      sphere.style.transform =
        'rotateX(' + (-currentY * 18) + 'deg) rotateY(' + (currentX * 18) + 'deg)';
      raf = requestAnimationFrame(animate);
    }

    // Mouse tracking (desktop)
    document.addEventListener('mousemove', function (e) {
      targetX = (e.clientX / window.innerWidth - 0.5);
      targetY = (e.clientY / window.innerHeight - 0.5);
    });

    // Device orientation (mobile)
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function (e) {
        if (e.gamma !== null && e.beta !== null) {
          targetX = Math.max(-1, Math.min(1, e.gamma / 45));
          targetY = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
        }
      }, { passive: true });
    }

    animate();
  }

  /* ───────────────────────────────────────────
     5. COUNTER ANIMATION  (.corp-counter)
     data-target="1200" data-suffix="+"
  ─────────────────────────────────────────── */
  function initCounters() {
    var counters = document.querySelectorAll('.corp-counter');
    if (!counters.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.target, 10) || 0;
        var suffix = el.dataset.suffix || '';
        var duration = 1400;
        var start = performance.now();

        function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { io.observe(el); });
  }

  /* ───────────────────────────────────────────
     6. TICKER PAUSE ON HOVER
  ─────────────────────────────────────────── */
  function initTicker() {
    var track = document.querySelector('.corp-ticker__track');
    if (!track) return;
    var ticker = track.parentElement;
    ticker.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }

  /* ───────────────────────────────────────────
     7. ACTIVE NAV LINK HIGHLIGHT
  ─────────────────────────────────────────── */
  function initActiveNav() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.corp-nav a, .corp-mobile-nav a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      // Strip trailing slash / .html for comparison
      var normalPath = path.replace(/\/$/, '').replace(/\.html$/, '');
      var normalHref = href.replace(/\/$/, '').replace(/\.html$/, '');
      if (normalPath === normalHref || (normalHref !== '' && normalPath.startsWith(normalHref))) {
        a.classList.add('is-active');
      }
    });
  }

  /* ───────────────────────────────────────────
     8. SECTION ENTRANCE — clip-path wipe
     (just ensures CSS transitions fire on load)
  ─────────────────────────────────────────── */
  function initSectionWipe() {
    var sections = document.querySelectorAll('.corp-section');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ───────────────────────────────────────────
     INIT ALL
  ─────────────────────────────────────────── */
  function init() {
    initStagger();   // must run before initReveal
    initReveal();
    initParallax();
    initGyroscope();
    initCounters();
    initTicker();
    initActiveNav();
    initSectionWipe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
