const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

const escapeHTML = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const cloneSiteData = (value) => {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
};

const loadData = async (key) => {
  const store = window.PAUL_SITE_DATA || {};
  if (!(key in store)) throw new Error(`Could not load data: ${key}`);
  return cloneSiteData(store[key]);
};

/* Navigation */
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const currentPage = document.body.dataset.page;
document.querySelectorAll('.primary-nav a[data-page]').forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const updateScrollUI = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
  if (progress) progress.style.width = `${percent}%`;
  if (header) header.classList.toggle('scrolled', scrollTop > 14);
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* Scroll reveal */
let revealObserver = null;
const revealNewItems = (scope = document) => {
  const items = scope.querySelectorAll('[data-reveal]:not(.revealed)');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('revealed'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -45px 0px' });
  }
  items.forEach((item) => revealObserver.observe(item));
};
revealNewItems();

/* Blueberry cursor glow */
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && finePointer && !reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

/* Card hover response */
const bindInteractiveCards = (scope = document) => {
  if (!finePointer || reduceMotion) return;
  scope.querySelectorAll('.interactive-card:not([data-bound])').forEach((card) => {
    card.dataset.bound = 'true';
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      if (card.classList.contains('research-card')) {
        card.style.setProperty('--rx', `${(0.5 - py) * 1.7}deg`);
        card.style.setProperty('--ry', `${(px - 0.5) * 2.1}deg`);
      }
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });
};
bindInteractiveCards();

if (finePointer && !reduceMotion) {
  document.querySelectorAll('.interactive-button').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      button.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

/* Lightbox — event delegation also supports dynamically loaded images */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxOriginal = document.getElementById('lightbox-original');
const lightboxClose = document.querySelector('.lightbox-close');
let lastFocusedElement = null;

const openLightbox = (link) => {
  if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxOriginal) return;
  lastFocusedElement = document.activeElement;
  const href = link.getAttribute('href');
  const image = link.querySelector('img');
  lightboxImage.src = href;
  lightboxImage.alt = image?.alt || '';
  lightboxCaption.textContent = link.dataset.caption || image?.alt || '';
  lightboxOriginal.href = href;
  document.body.classList.add('lightbox-open');
  lightbox.showModal();
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox?.open) return;
  lightbox.close();
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
  lastFocusedElement?.focus?.();
};

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-lightbox]');
  if (!link) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openLightbox(link);
});
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox?.addEventListener('cancel', (event) => { event.preventDefault(); closeLightbox(); });

/* Data-driven content */
const iconId = (item) => `icon-${item.icon || 'data'}`;

const renderLatest = async () => {
  const container = document.getElementById('latest-feed');
  if (!container) return;
  try {
    const items = await loadData('latest');
    items.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    container.innerHTML = items.slice(0, 3).map((item) => {
      const target = item.external ? ' target="_blank" rel="noopener"' : '';
      return `<a class="latest-card" href="${escapeHTML(item.url || '#')}"${target} data-reveal>
        <div class="latest-meta"><span>${escapeHTML(item.type)}</span><span>${escapeHTML(item.displayDate)}</span></div>
        <h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p><span class="mini-arrow" aria-hidden="true">→</span>
      </a>`;
    }).join('');
    revealNewItems(container);
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Latest updates could not be loaded. If you opened the site directly from your computer, preview it with a local web server or GitHub Pages.</div>';
  }
};

const researchCardHTML = (item, index = 0) => {
  const wide = index === 0 ? ' research-card-wide' : '';
  return `<article class="research-card${wide} interactive-card" data-reveal>
    <a class="research-image image-link" href="${escapeHTML(item.image)}" data-lightbox data-caption="${escapeHTML(item.title)}">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" loading="lazy"><span class="image-action"><svg><use href="#icon-expand"></use></svg> View image</span>
    </a>
    <div class="card-body"><div class="card-topline"><span class="card-icon"><svg><use href="#${iconId(item)}"></use></svg></span><span class="tag">${escapeHTML(item.kicker)}</span></div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p></div>
  </article>`;
};

const renderFeaturedResearch = async () => {
  const container = document.getElementById('featured-research');
  if (!container) return;
  try {
    const items = await loadData('research');
    const featured = items.filter((item) => item.featured).slice(0, 3);
    container.innerHTML = featured.map(researchCardHTML).join('');
    revealNewItems(container);
    bindInteractiveCards(container);
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Research projects could not be loaded.</div>';
  }
};

const renderResearchPage = async () => {
  const container = document.getElementById('research-list');
  if (!container) return;
  try {
    const items = await loadData('research');
    container.innerHTML = items.map((item) => `<article class="research-detail" id="${escapeHTML(item.slug)}" data-reveal>
      <a class="detail-image image-link" href="${escapeHTML(item.image)}" data-lightbox data-caption="${escapeHTML(item.title)}"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" loading="lazy"><span class="image-action"><svg><use href="#icon-expand"></use></svg> View image</span></a>
      <div class="detail-copy"><div class="card-topline"><span class="card-icon"><svg><use href="#${iconId(item)}"></use></svg></span><span class="tag">${escapeHTML(item.kicker)}</span></div><h2>${escapeHTML(item.title)}</h2><p>${escapeHTML(item.summary)}</p><p>${escapeHTML(item.details)}</p><div class="tag-list">${(item.tags || []).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div></div>
    </article>`).join('');
    revealNewItems(container);
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Research projects could not be loaded.</div>';
  }
};

const publicationItemHTML = (item, home = false) => {
  if (home) {
    return `<article class="publication" data-reveal><span class="pub-year">${escapeHTML(item.year)}</span><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.authors)} · <em>${escapeHTML(item.journal)}</em></p>${item.url ? `<a class="publication-link" href="${escapeHTML(item.url)}" target="_blank" rel="noopener">View paper ↗</a>` : ''}</div><span class="publication-status">${escapeHTML(item.status)}</span></article>`;
  }
  return `<article class="publication-item" data-reveal><div class="publication-year">${escapeHTML(item.year)}</div><div class="publication-copy"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.authors)} · <em>${escapeHTML(item.journal)}</em></p><span class="publication-status">${escapeHTML(item.status)}</span></div>${item.url ? `<a class="publication-link" href="${escapeHTML(item.url)}" target="_blank" rel="noopener">View paper ↗</a>` : ''}</article>`;
};

const renderFeaturedPublications = async () => {
  const container = document.getElementById('featured-publications');
  if (!container) return;
  try {
    const items = await loadData('publications');
    items.sort((a, b) => Number(b.year) - Number(a.year));
    let featured = items.filter((item) => item.featured).slice(0, 5);
    if (!featured.length) featured = items.slice(0, 5);
    container.innerHTML = featured.map((item) => publicationItemHTML(item, true)).join('');
    revealNewItems(container);
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Publications could not be loaded.</div>';
  }
};

let publicationData = [];
const renderPublicationList = (items) => {
  const container = document.getElementById('publications-list');
  if (!container) return;
  container.innerHTML = items.length ? items.map((item) => publicationItemHTML(item, false)).join('') : '<div class="empty-state">No publications match this filter.</div>';
  revealNewItems(container);
};

const renderPublications = async () => {
  const container = document.getElementById('publications-list');
  if (!container) return;
  try {
    publicationData = await loadData('publications');
    publicationData.sort((a, b) => Number(b.year) - Number(a.year));
    const yearFilter = document.getElementById('publication-year-filter');
    if (yearFilter) {
      const years = [...new Set(publicationData.map((item) => item.year))].sort((a, b) => Number(b) - Number(a));
      yearFilter.innerHTML = '<option value="all">All years</option>' + years.map((y) => `<option value="${escapeHTML(y)}">${escapeHTML(y)}</option>`).join('');
    }
    renderPublicationList(publicationData);
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Publications could not be loaded.</div>';
  }
};

const filterPublications = () => {
  const query = (document.getElementById('publication-search')?.value || '').trim().toLowerCase();
  const yearValue = document.getElementById('publication-year-filter')?.value || 'all';
  const filtered = publicationData.filter((item) => {
    const haystack = [item.title, item.authors, item.journal, item.status, item.year].join(' ').toLowerCase();
    return (!query || haystack.includes(query)) && (yearValue === 'all' || String(item.year) === yearValue);
  });
  renderPublicationList(filtered);
};
document.getElementById('publication-search')?.addEventListener('input', filterPublications);
document.getElementById('publication-year-filter')?.addEventListener('change', filterPublications);

const renderPodcast = async () => {
  const hostsContainer = document.getElementById('podcast-hosts');
  const episodesContainer = document.getElementById('podcast-episodes');
  if (!hostsContainer && !episodesContainer) return;
  try {
    const data = await loadData('podcast');
    const series = data.series || {};
    const status = document.getElementById('podcast-status');
    const description = document.getElementById('podcast-description');
    if (status) status.textContent = series.status || 'In development';
    if (description) description.textContent = series.description || '';
    if (hostsContainer) {
      hostsContainer.innerHTML = (series.hosts || []).map((host) => `<article class="host-card interactive-card" data-reveal><h3>${escapeHTML(host.name)}</h3><p><strong>${escapeHTML(host.role)}</strong></p><p>${escapeHTML(host.organization)}</p></article>`).join('');
      bindInteractiveCards(hostsContainer);
      revealNewItems(hostsContainer);
    }
    if (episodesContainer) {
      const episodes = data.episodes || [];
      episodesContainer.innerHTML = episodes.length ? episodes.map((ep) => {
        const image = ep.image || series.logo || 'assets/images/phenomix-logo.png';
        const links = [['YouTube', ep.youtube], ['Spotify', ep.spotify], ['Apple Podcasts', ep.apple], ['Episode page', ep.url]].filter(([,url]) => url);
        return `<article class="episode-card interactive-card" data-reveal><a class="episode-image image-link" href="${escapeHTML(image)}" data-lightbox data-caption="${escapeHTML(ep.title || 'PlantPhenomixPodcast')}"><img src="${escapeHTML(image)}" alt="${escapeHTML(ep.imageAlt || ep.title || 'Podcast episode artwork')}" loading="lazy"><span class="image-action"><svg><use href="#icon-expand"></use></svg> View</span></a><div class="episode-body"><div class="card-kicker">${escapeHTML(ep.date || '')}${ep.guest ? ` · ${escapeHTML(ep.guest)}` : ''}</div><h3>${escapeHTML(ep.title || 'Episode')}</h3><p>${escapeHTML(ep.description || '')}</p><div class="episode-links">${links.map(([label,url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">${label} ↗</a>`).join('')}</div></div></article>`;
      }).join('') : '<div class="empty-state">Episodes are in development. Add the first episode to <code>data/podcast.js</code> when it is ready.</div>';
      bindInteractiveCards(episodesContainer);
      revealNewItems(episodesContainer);
    }
  } catch (error) {
    if (hostsContainer) hostsContainer.innerHTML = '<div class="empty-state">Podcast information could not be loaded.</div>';
    if (episodesContainer) episodesContainer.innerHTML = '<div class="empty-state">Podcast episodes could not be loaded.</div>';
  }
};


const renderEduKidsHome = async () => {
  const summary = document.getElementById('edukids-home-summary');
  const stats = document.getElementById('edukids-home-stats');
  const reportLink = document.getElementById('edukids-home-report');
  if (!summary && !stats && !reportLink) return;
  try {
    const data = await loadData('edukids');
    if (summary) summary.textContent = data.summary || '';
    if (reportLink && data.report) reportLink.href = data.report;
    if (stats) {
      stats.innerHTML = (data.metrics || []).slice(0, 4).map((item) => `<div class="impact-mini-card" data-reveal><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span></div>`).join('');
      revealNewItems(stats);
    }
  } catch (error) {
    if (stats) stats.innerHTML = '<div class="empty-state">Edu-Kids impact information could not be loaded.</div>';
  }
};

const renderEduKidsPage = async () => {
  const impact = document.getElementById('edukids-impact');
  const highlights = document.getElementById('edukids-highlights');
  const gallery = document.getElementById('edukids-gallery');
  const summary = document.getElementById('edukids-page-summary');
  const reportLinks = [document.getElementById('edukids-hero-report'), document.getElementById('edukids-report-link')].filter(Boolean);
  const impactYear = document.getElementById('edukids-impact-year');
  const reportMark = document.getElementById('edukids-report-mark');
  const reportTitleYear = document.getElementById('edukids-report-title-year');
  const heroReportYear = document.getElementById('edukids-hero-report-year');
  const summaryReportYear = document.getElementById('edukids-summary-report-year');
  if (!impact && !highlights && !gallery && !summary && !reportLinks.length) return;
  try {
    const data = await loadData('edukids');
    if (summary) summary.textContent = data.summary || '';
    reportLinks.forEach((link) => { if (data.report) link.href = data.report; });
    if (impactYear && data.reportYear) impactYear.textContent = data.reportYear;
    if (reportMark && data.reportYear) reportMark.textContent = data.reportYear;
    if (reportTitleYear && data.reportYear) reportTitleYear.textContent = data.reportYear;
    if (heroReportYear && data.reportYear) heroReportYear.textContent = data.reportYear;
    if (summaryReportYear && data.reportYear) summaryReportYear.textContent = data.reportYear;
    if (impact) {
      impact.innerHTML = (data.metrics || []).map((item) => `<article class="impact-card interactive-card" data-reveal><strong>${escapeHTML(item.value)}</strong><p>${escapeHTML(item.label)}</p></article>`).join('');
      bindInteractiveCards(impact);
      revealNewItems(impact);
    }
    if (highlights) {
      highlights.innerHTML = (data.highlights || []).map((item) => `<li data-reveal>${escapeHTML(item)}</li>`).join('');
      revealNewItems(highlights);
    }
    if (gallery) {
      gallery.innerHTML = (data.gallery || []).map((item, index) => `<figure class="${index === 0 ? 'edukids-gallery-wide' : ''}" data-reveal><a class="image-link" href="${escapeHTML(item.image)}" data-lightbox data-caption="${escapeHTML(item.caption)}"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" loading="lazy"><span class="image-action"><svg><use href="#icon-expand"></use></svg> View</span></a><figcaption>${escapeHTML(item.caption)}</figcaption></figure>`).join('');
      revealNewItems(gallery);
    }
  } catch (error) {
    if (impact) impact.innerHTML = '<div class="empty-state">Edu-Kids impact information could not be loaded.</div>';
  }
};

renderLatest();
renderFeaturedResearch();
renderResearchPage();
renderFeaturedPublications();
renderPublications();
renderPodcast();
renderEduKidsHome();
renderEduKidsPage();

window.addEventListener('resize', () => {
  if (window.innerWidth > 780 && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});
