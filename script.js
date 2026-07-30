// Breeti Bandyopadhyay — Portfolio Script

// ── ICON MAP for tabs ──
  const ICONS = {
    'ico-user':       '<svg width="13" height="13"><use href="#ico-user"/></svg>',
    'ico-briefcase':  '<svg width="13" height="13"><use href="#ico-briefcase"/></svg>',
    'ico-flask':      '<svg width="13" height="13"><use href="#ico-flask"/></svg>',
    'ico-code':       '<svg width="13" height="13"><use href="#ico-code"/></svg>',
    'ico-trophy':     '<svg width="13" height="13"><use href="#ico-trophy"/></svg>',
    'ico-school':     '<svg width="13" height="13"><use href="#ico-school"/></svg>',
    'ico-cpu':        '<svg width="13" height="13"><use href="#ico-cpu"/></svg>',
    'ico-users':      '<svg width="13" height="13"><use href="#ico-users"/></svg>',
  };
  const TABS = {
    about:            { icon: 'ico-user',       label: 'about.md'           },
    experience:       { icon: 'ico-briefcase',  label: 'experience.json'    },
    research:         { icon: 'ico-flask',      label: 'research.md'        },
    projects:         { icon: 'ico-code',       label: 'projects.py'        },
    honours:          { icon: 'ico-trophy',     label: 'honours.md'         },
    certifications:   { icon: 'ico-school',     label: 'certifications.md'  },
    courses:          { icon: 'ico-code',       label: 'courses.md'         },
    education:        { icon: 'ico-school',     label: 'education.md'       },
    skills:           { icon: 'ico-cpu',        label: 'skills.json'        },
    organisations:    { icon: 'ico-users',      label: 'organisations.md'   },
  };

  // open tabs state — only about is open initially
  let openTabs = ['about'];
  let activeTab = 'about';

  function renderTabs() {
    const bar = document.getElementById('tabs-bar');
    bar.innerHTML = '';
    openTabs.forEach(id => {
      const t = TABS[id];
      const el = document.createElement('div');
      el.className = 'mc-tab' + (id === activeTab ? ' active' : '');
      el.innerHTML = `<span class="ico"><svg width="13" height="13" style="stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><use href="#${t.icon}"/></svg></span>${t.label}<span class="tab-close" onclick="closeTab(event,'${id}')">✕</span>`;
      el.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tab-close')) switchTab(id);
      });
      bar.appendChild(el);
    });
  }

  function openTab(id) {
    if (!openTabs.includes(id)) openTabs.push(id);
    switchTab(id);
  }

  function switchTab(id) {
    activeTab = id;
    // update nav
    document.querySelectorAll('.sb-nav-item').forEach((el, i) => {
      const keys = Object.keys(TABS);
      el.classList.toggle('active', keys[i] === id);
    });
    // update pages
    document.querySelectorAll('.page').forEach(p => {
      p.classList.toggle('active', p.id === 'page-' + id);
    });
    renderTabs();
  }

  function closeTab(e, id) {
    e.stopPropagation();
    openTabs = openTabs.filter(t => t !== id);
    // always keep at least one tab
    if (openTabs.length === 0) openTabs = ['about'];
    if (activeTab === id) switchTab(openTabs[openTabs.length - 1]);
    else renderTabs();
  }

  // ── THEME TOGGLE ──
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const icon = document.getElementById('theme-icon');
    icon.innerHTML = isDark
      ? '<use href="#ico-sun"/>'
      : '<use href="#ico-moon"/>';
  }

  // ── COPY TO CLIPBOARD ──
  function copyVal(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg width="1em" height="1em" style="stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><use href="#ico-check"/></svg>';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1500);
    });
  }

  // ── ACCORDION: close other details when one opens ──
  document.addEventListener('toggle', e => {
    if (e.target.matches('details.research-more') && e.target.open) {
      document.querySelectorAll('details.research-more').forEach(d => {
        if (d !== e.target) d.removeAttribute('open');
      });
    }
  }, true);

  // ── CURSOR RING: circle that trails the pointer and opens over clickables ──
  (function () {
    const ring = document.querySelector('.cursor-ring');
    // Nothing to follow on a touch screen, so don't run the loop there at all.
    if (!ring || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    // .mc-tab is the only clickable without an onclick attribute — the tab bar
    // wires its clicks up in renderTabs() above.
    const CLICKABLE = 'a, button, label, summary, [onclick], .mc-tab';
    // How fast the ring catches up: 1 sticks to the pointer, lower = more trail.
    const EASE = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.55;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, placed = false;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // First move: drop the ring straight onto the pointer instead of letting
      // it glide in from the top-left corner.
      if (!placed) { ringX = mouseX; ringY = mouseY; placed = true; }
      const el = e.target;
      ring.classList.toggle('over', el instanceof Element && !!el.closest(CLICKABLE));
    });

    document.addEventListener('mouseleave', () => ring.classList.remove('over'));

    (function frame() {
      ringX += (mouseX - ringX) * EASE;
      ringY += (mouseY - ringY) * EASE;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(frame);
    })();
  })();

  // init
  renderTabs();