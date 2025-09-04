document.addEventListener('DOMContentLoaded', function() {
    // Clase para ocultar elementos visualmente pero mantenerlos accesibles para lectores de pantalla
    const srOnlyStyle = document.createElement('style');
    srOnlyStyle.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(srOnlyStyle);

    // Función para controlar el tamaño del texto
    const root = document.documentElement;
    const defaultFontSize = 16; // Tamaño de fuente base en px
    
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        root.style.fontSize = `${savedFontSize}px`;
    }
    
    function updateFontSize(change) {
        const currentFontSize = parseFloat(getComputedStyle(root).fontSize);
        const newFontSize = Math.max(14, Math.min(20, currentFontSize + change));
        root.style.fontSize = `${newFontSize}px`;
        localStorage.setItem('fontSize', newFontSize);
        
        document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large', 'text-size-xlarge');
        
        if (newFontSize <= 15) {
            document.body.classList.add('text-size-small');
        } else if (newFontSize <= 17) {
            document.body.classList.add('text-size-medium');
        } else if (newFontSize <= 19) {
            document.body.classList.add('text-size-large');
        } else {
            document.body.classList.add('text-size-xlarge');
        }
    }
    
    document.getElementById('decrease-text').addEventListener('click', function() {
        updateFontSize(-1);
    });
    
    document.getElementById('increase-text').addEventListener('click', function() {
        updateFontSize(1);
    });
    
    document.getElementById('reset-text').addEventListener('click', function() {
        root.style.fontSize = `${defaultFontSize}px`;
        localStorage.setItem('fontSize', defaultFontSize);
        document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large', 'text-size-xlarge');
        document.body.classList.add('text-size-medium');
    });

    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainMenu.classList.remove('active');
        });
    });
    
    // Filtro de proyectos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtro = btn.getAttribute('data-filtro');
            
            proyectoCards.forEach(card => {
                if (filtro === 'todos' || card.getAttribute('data-categoria') === filtro) {
                    card.style.display = 'flex';
                    card.setAttribute('aria-hidden', 'false');
                } else {
                    card.style.display = 'none';
                    card.setAttribute('aria-hidden', 'true');
                }
            });
        });
    });

    // Efecto de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Optimización: Defer non-critical JavaScript
    function deferNonCriticalJS() {
        console.log("Non-critical JavaScript loaded");
    }
    
    window.addEventListener('load', deferNonCriticalJS);
});