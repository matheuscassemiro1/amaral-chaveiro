document.addEventListener('DOMContentLoaded', () => {
    function registrarCall(e) {
        e = e || window.event;
        const target = (e && (e.currentTarget || e.target)) || this || null;
        if (!target) return;

        const href = (target.tagName === 'A' && typeof target.href === 'string') ? target.href : null;

        const payload = {
            form_name: "call-button",
            page_location: window.location.href,
            click_text: (target.textContent || '').trim().replace(/\s+/g, ' ')
        };

        if (typeof gtag === 'function') {
            try {
                gtag('event', 'ligacao', payload);

            } catch (err) {
                console.warn('gtag error:', err);
            }
        } else {

        }


        if (href && href.startsWith('tel:')) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            setTimeout(() => {
                try {
                    window.location.href = href;
                } catch (err) {
                    console.warn('Call link error:', err);
                }
            }, 200);
        }
    }

    function registrarWpp(e) {
        e = e || window.event;
        const target = (e && (e.currentTarget || e.target)) || this || null;
        if (!target) return;

        const href = (target.tagName === 'A' && typeof target.href === 'string') ? target.href : null;

        const payload = {
            form_name: "whatsapp-button",
            page_location: window.location.href,
            click_text: (target.textContent || '').trim().replace(/\s+/g, ' ')
        };

        if (typeof gtag === 'function') {
            try {
                gtag('event', 'mensagem-whatsapp', payload);
            } catch (err) {
                console.warn('gtag error:', err);
            }
        } else {

        }


        if (href) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            setTimeout(() => {
                try {
                    window.location.href = href;
                } catch (err) {
                    console.warn('Wpp link error:', err);
                }
            }, 200);
        }
    }

    const els = document.querySelectorAll('.cta-cel');
    if (els && els.length) {
        els.forEach(el => el.addEventListener('click', registrarCall));
    }

    const wppEls = document.querySelectorAll('.cta-wpp');
    if (wppEls && wppEls.length) {
        wppEls.forEach(el => el.addEventListener('click', registrarWpp));
    }
});