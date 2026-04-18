/**
 * corp-anim.js — Regalis Japan Group v3
 * カスタムカーソル · テキストスプリット · マグネティックボタン
 * スクロールプログレス · カード3Dチルト · ノイズグレイン
 * スムーズリビール · パーティクル · パラレル
 */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════════════════════════════════════
     0. PAGE LOADER
  ══════════════════════════════════════════════ */
  function initLoader() {
    var loader = document.getElementById('corp-loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      loader.classList.add('corp-loader--done');
      setTimeout(function () { loader.remove(); }, 800);
    });
  }

  /* ══════════════════════════════════════════════
     1. CUSTOM CURSOR
  ══════════════════════════════════════════════ */
  function initCursor() {
    if (prefersReduced || window.matchMedia('(hover: none)').matches) return;

    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'corp-cursor__dot';
    ring.className = 'corp-cursor__ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = -100, my = -100;
    var rx = -100, ry = -100;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    }, { passive: true });

    function lerp(a, b, t) { return a + (b - a) * t; }

    (function loop() {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.transform = 'translate(' + (rx - 18) + 'px,' + (ry - 18) + 'px)';
      requestAnimationFrame(loop);
    })();

    // Scale on interactive elements
    var interactables = 'a, button, [data-magnetic], .corp-btn, .featured-biz-card, .consult-card';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactables)) {
        ring.classList.add('corp-cursor__ring--active');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactables)) {
        ring.classList.remove('corp-cursor__ring--active');
      }
    });
    document.addEventListener('mousedown', function () { ring.classList.add('corp-cursor__ring--click'); });
    document.addEventListener('mouseup',   function () { ring.classList.remove('corp-cursor__ring--click'); });
  }

  /* ══════════════════════════════════════════════
     2. SCROLL PROGRESS BAR
  ══════════════════════════════════════════════ */
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'corp-scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', function () {
      var s = document.documentElement;
      var p = s.scrollTop / (s.scrollHeight - s.clientHeight);
      bar.style.transform = 'scaleX(' + Math.min(p, 1) + ')';
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════
     3. TEXT SPLIT — heading char animation
     Add class="corp-split" to any heading
  ══════════════════════════════════════════════ */
  function initTextSplit() {
    if (prefersReduced) return;

    var els = document.querySelectorAll('.corp-split');
    els.forEach(function (el) {
      var text = el.textContent;
      el.textContent = '';
      el.setAttribute('aria-label', text);

      text.split('').forEach(function (ch, i) {
        var span = document.createElement('span');
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.className = 'corp-split__char';
        span.style.transitionDelay = (i * 28) + 'ms';
        el.appendChild(span);
      });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            el.classList.add('corp-split--visible');
            io.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      io.observe(el);
    });
  }

  /* ══════════════════════════════════════════════
     4. LINE REVEAL — text wipe effect
     Add class="corp-line-reveal" to paragraphs
  ══════════════════════════════════════════════ */
  function initLineReveal() {
    if (prefersReduced) return;

    var els = document.querySelectorAll('.corp-line-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('corp-line-reveal--visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ══════════════════════════════════════════════
     5. SCROLL REVEAL  (.reveal / .reveal-x / .reveal-scale)
  ══════════════════════════════════════════════ */
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-x, .reveal-scale, .reveal-up');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.dataset.delay || 0;

        // class-based delay
        var cls = el.className;
        if (!delay) {
          if (cls.indexOf('reveal--delay-1') > -1) delay = 100;
          else if (cls.indexOf('reveal--delay-2') > -1) delay = 200;
          else if (cls.indexOf('reveal--delay-3') > -1) delay = 300;
          else if (cls.indexOf('reveal--delay-4') > -1) delay = 400;
        }

        setTimeout(function () {
          el.classList.add('revealed');
        }, parseInt(delay, 10));
        io.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ══════════════════════════════════════════════
     6. STAGGER CHILDREN
  ══════════════════════════════════════════════ */
  function initStagger() {
    document.querySelectorAll('.reveal-stagger').forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) {
        child.classList.add('reveal');
        child.dataset.delay = i * 90;
      });
    });
  }

  /* ══════════════════════════════════════════════
     7. MAGNETIC BUTTONS
     Add data-magnetic to any element
  ══════════════════════════════════════════════ */
  function initMagnetic() {
    if (prefersReduced || window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('[data-magnetic], .corp-btn').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var cx = rect.left + rect.width  / 2;
        var cy = rect.top  + rect.height / 2;
        var dx = (e.clientX - cx) * 0.28;
        var dy = (e.clientY - cy) * 0.28;
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
        el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
        setTimeout(function () { el.style.transition = ''; }, 600);
      });
    });
  }

  /* ══════════════════════════════════════════════
     8. CARD 3D TILT
     Add class="corp-tilt" to any card
  ══════════════════════════════════════════════ */
  function initTilt() {
    if (prefersReduced || window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.corp-tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width  - 0.5;
        var y = (e.clientY - rect.top)  / rect.height - 0.5;
        el.style.transform = 'perspective(800px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.02)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
      });
    });
  }

  /* ══════════════════════════════════════════════
     9. COUNTER ANIMATION
  ══════════════════════════════════════════════ */
  function initCounters() {
    var counters = document.querySelectorAll('.corp-counter, .corp-stat__num[data-target]');
    if (!counters.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.target || el.textContent, 10) || 0;
        var suffix = el.dataset.suffix || '';
        var start  = performance.now();
        var dur    = 1600;

        function step(now) {
          var p  = Math.min((now - start) / dur, 1);
          var ep = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(target * ep) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      if (!el.dataset.target) el.dataset.target = el.textContent.replace(/\D/g, '');
      io.observe(el);
    });
  }

  /* ══════════════════════════════════════════════
     10. PARALLAX
  ══════════════════════════════════════════════ */
  function initParallax() {
    if (prefersReduced) return;
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    var ticking = false;

    function update() {
      var sy = window.scrollY;
      els.forEach(function (el) {
        var speed = parseFloat(el.dataset.parallax) || 0.15;
        var rect  = el.parentElement ? el.parentElement.getBoundingClientRect() : el.getBoundingClientRect();
        var centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = 'translateY(' + (centerY * speed) + 'px)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════════
     11. 3D GYROSCOPE
  ══════════════════════════════════════════════ */
  function initGyroscope() {
    var sphere = document.querySelector('.geo-sphere');
    if (!sphere) return;
    var cx = 0, cy = 0, tx = 0, ty = 0;
    function lerp(a, b, t) { return a + (b - a) * t; }
    (function loop() {
      cx = lerp(cx, tx, 0.06); cy = lerp(cy, ty, 0.06);
      sphere.style.transform = 'rotateX(' + (-cy * 18) + 'deg) rotateY(' + (cx * 18) + 'deg)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX / window.innerWidth  - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function (e) {
        if (e.gamma !== null) { tx = Math.max(-1, Math.min(1, e.gamma / 45)); ty = Math.max(-1, Math.min(1, (e.beta - 40) / 30)); }
      }, { passive: true });
    }
  }

  /* ══════════════════════════════════════════════
     12. FLOATING PARTICLES (canvas)
  ══════════════════════════════════════════════ */
  function initParticles() {
    if (prefersReduced) return;
    var hero = document.querySelector('.corp-hero, .ceo-hero, .praxis-hero, .academia-hero, .oratio-hero');
    if (!hero) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'corp-particles';
    hero.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var W, H, particles = [];
    var GOLD = 'rgba(201,162,75,';

    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    function Particle() {
      this.reset();
    }
    Particle.prototype.reset = function () {
      this.x  = Math.random() * W;
      this.y  = H + Math.random() * 60;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vy = -(Math.random() * 0.5 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.a  = Math.random() * 0.4 + 0.05;
      this.life = 0;
      this.maxLife = Math.random() * 180 + 120;
    };
    Particle.prototype.update = function () {
      this.x += this.vx; this.y += this.vy; this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    };
    Particle.prototype.draw = function () {
      var prog = this.life / this.maxLife;
      var alpha = this.a * (prog < 0.2 ? prog / 0.2 : prog > 0.8 ? (1 - prog) / 0.2 : 1);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + alpha + ')';
      ctx.fill();
    };

    resize();
    for (var i = 0; i < 50; i++) {
      var p = new Particle();
      p.y = Math.random() * H;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    window.addEventListener('resize', resize, { passive: true });

    (function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) { p.update(); p.draw(); });
      requestAnimationFrame(loop);
    })();
  }

  /* ══════════════════════════════════════════════
     13. NOISE GRAIN OVERLAY
  ══════════════════════════════════════════════ */
  function initGrain() {
    if (prefersReduced) return;
    var canvas = document.createElement('canvas');
    canvas.className = 'corp-grain';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var W = 256, H = 256;
    canvas.width = W; canvas.height = H;

    function generateNoise() {
      var img = ctx.createImageData(W, H);
      for (var i = 0; i < img.data.length; i += 4) {
        var v = Math.random() * 255;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = 18;
      }
      ctx.putImageData(img, 0, 0);
    }

    generateNoise();
    setInterval(generateNoise, 80);
  }

  /* ══════════════════════════════════════════════
     14. TICKER PAUSE ON HOVER
  ══════════════════════════════════════════════ */
  function initTicker() {
    var track = document.querySelector('.corp-ticker__track');
    if (!track) return;
    var ticker = track.parentElement;
    ticker.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
    ticker.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
  }

  /* ══════════════════════════════════════════════
     15. ACTIVE NAV LINK
  ══════════════════════════════════════════════ */
  function initActiveNav() {
    var path = window.location.pathname;
    document.querySelectorAll('.corp-nav a, .corp-mobile-nav a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var np = path.replace(/\/$/, '').replace(/\.html$/, '');
      var nh = href.replace(/\/$/, '').replace(/\.html$/, '');
      if (nh && (np === nh || np.startsWith(nh + '/'))) a.classList.add('is-active');
    });
  }

  /* ══════════════════════════════════════════════
     16. SECTION IN-VIEW CLASS
  ══════════════════════════════════════════════ */
  function initSectionView() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.04 });
    document.querySelectorAll('.corp-section').forEach(function (s) { io.observe(s); });
  }

  /* ══════════════════════════════════════════════
     17. HORIZONTAL SCROLL HINT (timeline)
  ══════════════════════════════════════════════ */
  function initTimelineDrag() {
    var tl = document.querySelector('.opportunity-timeline--h');
    if (!tl) return;
    var isDown = false, startX, scrollLeft;
    tl.addEventListener('mousedown', function (e) {
      isDown = true; startX = e.pageX - tl.offsetLeft; scrollLeft = tl.scrollLeft;
    });
    tl.addEventListener('mouseleave', function () { isDown = false; });
    tl.addEventListener('mouseup',    function () { isDown = false; });
    tl.addEventListener('mousemove',  function (e) {
      if (!isDown) return;
      e.preventDefault();
      tl.scrollLeft = scrollLeft - (e.pageX - tl.offsetLeft - startX);
    });
  }

  /* ══════════════════════════════════════════════
     18. NAV DROPDOWN (hover)
  ══════════════════════════════════════════════ */
  function initNavDropdown() {
    document.querySelectorAll('.corp-nav__has-drop').forEach(function (li) {
      var drop = li.querySelector('.corp-nav__drop');
      if (!drop) return;
      li.addEventListener('mouseenter', function () { drop.classList.add('is-open'); });
      li.addEventListener('mouseleave', function () { drop.classList.remove('is-open'); });
    });
  }

  /* ══════════════════════════════════════════════
     19. SMOOTH ANCHOR SCROLL
  ══════════════════════════════════════════════ */
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

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    initLoader();
    initScrollProgress();
    initCursor();
    initStagger();
    initReveal();
    initTextSplit();
    initLineReveal();
    initParallax();
    initMagnetic();
    initTilt();
    initCounters();
    initGyroscope();
    initParticles();
    initGrain();
    initTicker();
    initActiveNav();
    initSectionView();
    initTimelineDrag();
    initNavDropdown();
    initSmoothAnchor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
