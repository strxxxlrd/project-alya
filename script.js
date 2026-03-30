// ================================================
// LOADER
// ================================================
const loaderPercent = document.getElementById('loaderPercent');
const loaderBar = document.getElementById('loaderBar');
const loader = document.getElementById('loader');

if (loader) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 3 + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.display = 'none'; }, 600);
            }, 300);
        }
        if (loaderPercent) loaderPercent.textContent = Math.floor(progress) + '%';
        if (loaderBar) loaderBar.style.width = progress + '%';
    }, 40);
}

// ================================================
// COOKIE BANNER
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-btn');
    const rejectBtn = document.getElementById('reject-btn');

    if (!banner) return;

    function hasConsent() {
        return document.cookie.split('; ').some(row => row.startsWith('cookie_consent='));
    }

    if (!hasConsent()) banner.classList.add('show');

    if (acceptBtn) acceptBtn.addEventListener('click', () => {
        document.cookie = "cookie_consent=accepted; max-age=" + (365 * 24 * 60 * 60) + "; path=/";
        banner.classList.remove('show');
    });

    if (rejectBtn) rejectBtn.addEventListener('click', () => {
        document.cookie = "cookie_consent=rejected; max-age=" + (365 * 24 * 60 * 60) + "; path=/";
        banner.classList.remove('show');
    });
});

// ================================================
// CURSOR (works page)
// ================================================
const cursorBtn = document.getElementById('cursorBtn');
const imgWraps = document.querySelectorAll('.work-img-wrap, .work-img-wrap2');

if (cursorBtn) {
    let currentHref = '#';

    document.addEventListener('mousemove', (e) => {
        cursorBtn.style.left = e.clientX + 'px';
        cursorBtn.style.top  = e.clientY + 'px';
    });

    imgWraps.forEach(wrap => {
        const link = wrap.getAttribute('data-href');

        wrap.addEventListener('mouseenter', () => {
            currentHref = link || '#';
            cursorBtn.classList.add('visible');
        });

        wrap.addEventListener('mouseleave', () => {
            cursorBtn.classList.remove('visible');
        });

        wrap.addEventListener('mousedown', () => {
            cursorBtn.classList.add('clicking');
        });

        wrap.addEventListener('mouseup', () => {
            cursorBtn.classList.remove('clicking');
            if (currentHref && currentHref !== '#') {
                window.location.href = currentHref;
            }
        });
    });
}

// ================================================
// BURGER MENU
// ================================================
const burger = document.getElementById('burger');
const burgerMenu = document.getElementById('burgerMenu');
const burgerClose = document.getElementById('burgerClose');

if (burger && burgerMenu) {
    burger.addEventListener('click', () => {
        burgerMenu.classList.add('open');
    });
}

if (burgerClose && burgerMenu) {
    burgerClose.addEventListener('click', () => {
        burgerMenu.classList.remove('open');
    });
}

// Close on link click
if (burgerMenu) {
    burgerMenu.querySelectorAll('.bm-link').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('open');
        });
    });
}

// ================================================
// ACCORDION
// ================================================
function toggle(header) {
    if (!header || !header.nextElementSibling) return;
    const body = header.nextElementSibling;
    const isOpen = body.classList.contains('open');

    document.querySelectorAll('.service-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.service-header').forEach(h => h.classList.remove('active'));

    if (!isOpen) {
        body.classList.add('open');
        header.classList.add('active');
    }
}
