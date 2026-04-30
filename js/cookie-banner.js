/**
 * Banner de Cookies para BPLANAIR360
 * Gestiona el consentimiento de cookies según RGPD
 */

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        cookieName: 'bplanair_cookies_consent',
        cookieExpireDays: 365,
        analyticsId: 'G-8TMEME0R02', // ID de Google Analytics
    };

    // Verificar si ya existe consentimiento
    function hasConsent() {
        return getCookie(CONFIG.cookieName) !== null;
    }

    // Obtener cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Establecer cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    // Cargar Google Analytics
    function loadGoogleAnalytics() {
        if (CONFIG.analyticsId === 'G-XXXXXXXXXX') {
            console.warn('BPLANAIR360: ID de Google Analytics no configurado');
            return;
        }

        // Cargar script de Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.analyticsId}`;
        document.head.appendChild(script);

        // Inicializar Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', CONFIG.analyticsId, {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=Lax;Secure'
        });

        console.log('BPLANAIR360: Google Analytics cargado');
    }

    // Aceptar todas las cookies
    function acceptAllCookies() {
        setCookie(CONFIG.cookieName, 'all', CONFIG.cookieExpireDays);
        loadGoogleAnalytics();
        hideBanner();
    }

    // Aceptar solo cookies necesarias
    function acceptNecessaryCookies() {
        setCookie(CONFIG.cookieName, 'necessary', CONFIG.cookieExpireDays);
        hideBanner();
    }

    // Ocultar banner
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Crear HTML del banner
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-overlay"></div>
            <div class="cookie-banner-content">
                <div class="cookie-banner-header">
                    <span class="cookie-icon">🍪</span>
                    <h3 class="cookie-title">Usamos cookies</h3>
                </div>
                <p class="cookie-text">
                    Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el uso del sitio. 
                    Las cookies necesarias son imprescindibles para el funcionamiento. Las analíticas nos ayudan a mejorar.
                </p>
                <div class="cookie-buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">
                        Aceptar todas
                    </button>
                    <button id="cookie-accept-necessary" class="cookie-btn cookie-btn-secondary">
                        Solo necesarias
                    </button>
                </div>
                <a href="politica-cookies.html" class="cookie-link" target="_blank">
                    Más información sobre cookies
                </a>
            </div>
        `;

        // Añadir estilos
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }

            #cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 999999;
                animation: slideUp 0.3s ease-out;
            }

            .cookie-banner-overlay {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100vh;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(2px);
            }

            .cookie-banner-content {
                position: relative;
                background: white;
                padding: 1.5rem;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
                max-width: 600px;
                margin: 0 auto;
                border-radius: 12px 12px 0 0;
            }

            .cookie-banner-header {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1rem;
            }

            .cookie-icon {
                font-size: 2rem;
            }

            .cookie-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0;
            }

            .cookie-text {
                color: #4b5563;
                font-size: 0.9rem;
                line-height: 1.5;
                margin: 0 0 1.25rem 0;
            }

            .cookie-buttons {
                display: flex;
                gap: 0.75rem;
                flex-wrap: wrap;
                margin-bottom: 0.75rem;
            }

            .cookie-btn {
                flex: 1;
                min-width: 140px;
                padding: 0.75rem 1.25rem;
                font-size: 0.95rem;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
            }

            .cookie-btn-primary {
                background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
                color: white;
            }

            .cookie-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
            }

            .cookie-btn-secondary {
                background: #f3f4f6;
                color: #374151;
            }

            .cookie-btn-secondary:hover {
                background: #e5e7eb;
            }

            .cookie-link {
                display: inline-block;
                color: #7c3aed;
                font-size: 0.85rem;
                text-decoration: underline;
                margin-top: 0.5rem;
            }

            .cookie-link:hover {
                color: #6d28d9;
            }

            /* Responsive */
            @media (max-width: 640px) {
                .cookie-banner-content {
                    padding: 1.25rem;
                    border-radius: 16px 16px 0 0;
                }

                .cookie-buttons {
                    flex-direction: column;
                }

                .cookie-btn {
                    width: 100%;
                }

                .cookie-title {
                    font-size: 1.1rem;
                }

                .cookie-text {
                    font-size: 0.85rem;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', acceptAllCookies);
        document.getElementById('cookie-accept-necessary').addEventListener('click', acceptNecessaryCookies);
    }

    // Función para reabrir el banner (desde configuración)
    window.reopenCookieBanner = function() {
        // Eliminar cookie de consentimiento
        document.cookie = `${CONFIG.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        // Mostrar banner de nuevo
        if (!document.getElementById('cookie-banner')) {
            createBanner();
        }
    };

    // Inicialización
    function init() {
        // Si no hay consentimiento, mostrar banner
        if (!hasConsent()) {
            createBanner();
        } else {
            // Si ya aceptó cookies analíticas, cargar Google Analytics
            const consent = getCookie(CONFIG.cookieName);
            if (consent === 'all') {
                loadGoogleAnalytics();
            }
        }
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
