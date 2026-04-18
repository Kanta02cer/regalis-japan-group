/**
 * corp-anim.js — Regalis Japan Group v3
 * Minimal animation: fade-in + gentle translate only.
 * No scale, no rotate, no complex effects.
 */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Page Loader ─────────────────────────────────── */
  function initLoader() {
    var loader = document.getElementById('corp-loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      loader.classList.add('corp-loader--done');
      setTimeout(function () { loader.remove(); }, 600);
    });
  }

  /* ── Scroll Reveal ───────────────────────────────── */
  function initReveal() {
    if (prefersReduced) {
      // Skip animation, just show everything
      document.querySelectorAll('.corp-reveal, .corp-line-reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.corp-reveal, .corp-line-reveal').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Stagger Reveal ──────────────────────────────── */
  function initStagger() {
    if (prefersReduced) {
      document.querySelectorAll('.corp-stagger').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.corp-stagger').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Active Nav ──────────────────────────────────── */
  function initActiveNav() {
    var links = document.querySelectorAll('.corp-nav a');
    var path = window.location.pathname;
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href !== '/' && path.indexOf(href) === 0) {
        a.classList.add('is-active');
      }
    });
  }

  /* ── Header scroll state ─────────────────────────── */
  function initHeaderScroll() {
    var header = document.querySelector('.corp-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ── Mobile nav ──────────────────────────────────── */
  function initMobileNav() {
    var btn = document.getElementById('corp-hamburger');
    var nav = document.getElementById('corp-mobile-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth anchor scroll ────────────────────────── */
  function initSmoothAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ── Counter animation ───────────────────────────── */
  function initCounters() {
    if (prefersReduced) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var end = parseFloat(el.dataset.count);
        var duration = 1200;
        var start = performance.now();
        var isFloat = el.dataset.count.includes('.');

        function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          // ease out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = eased * end;
          el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = isFloat ? end.toFixed(1) : end.toLocaleString();
        }

        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Init all ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initReveal();
    initStagger();
    initActiveNav();
    initHeaderScroll();
    initMobileNav();
    initSmoothAnchor();
    initCounters();
  });

})();
