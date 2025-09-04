document.addEventListener('DOMContentLoaded', function() {
    // Formulario de Contacto Mejorado
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            const nombre = document.getElementById('nombre');
            const nombreError = document.getElementById('nombre-error');
            if (nombre.value.trim() === '') {
                nombre.classList.add('error');
                nombreError.classList.add('show');
                nombre.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                nombre.classList.remove('error');
                nombreError.classList.remove('show');
                nombre.setAttribute('aria-invalid', 'false');
            }
            
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                emailError.classList.add('show');
                email.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                email.classList.remove('error');
                emailError.classList.remove('show');
                email.setAttribute('aria-invalid', 'false');
            }
            
            const mensaje = document.getElementById('mensaje');
            const mensajeError = document.getElementById('mensaje-error');
            if (mensaje.value.trim() === '') {
                mensaje.classList.add('error');
                mensajeError.classList.add('show');
                mensaje.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                mensaje.classList.remove('error');
                mensajeError.classList.remove('show');
                mensaje.setAttribute('aria-invalid', 'false');
            }
            
            const privacidad = document.getElementById('privacidad');
            const privacidadError = document.getElementById('privacidad-error');
            if (!privacidad.checked) {
                privacidadError.classList.add('show');
                isValid = false;
            } else {
                privacidadError.classList.remove('show');
            }
            
            if (isValid) {
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.setAttribute('role', 'alert');
                notification.setAttribute('aria-live', 'polite');
                notification.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i> Mensaje enviado correctamente';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
                
                this.reset();
            }
        });
        
        document.getElementById('nombre').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('error');
                document.getElementById('nombre-error').classList.remove('show');
                this.setAttribute('aria-invalid', 'false');
            }
        });
        
        document.getElementById('email').addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.classList.remove('error');
                document.getElementById('email-error').classList.remove('show');
                this.setAttribute('aria-invalid', 'false');
            }
        });
        
        document.getElementById('mensaje').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('error');
                document.getElementById('mensaje-error').classList.remove('show');
                this.setAttribute('aria-invalid', 'false');
            }
        });
        
        document.getElementById('privacidad').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('privacidad-error').classList.remove('show');
            }
        });
    }
});