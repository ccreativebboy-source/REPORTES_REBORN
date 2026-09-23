// MODO CLARO / MODO OSCURO (INDEX / GLOBAL)
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeBtn');
    
    // Cargar preferencia guardada en localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Inicializar lógica de pestañas si estamos en cuenta.html
    if (typeof initCuentaTabs === 'function') {
        initCuentaTabs();
    }
});

// VALIDACIÓN DE RUT
    function validarRut(rutCompleto) {
        rutCompleto = rutCompleto.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        if (rutCompleto.length < 8) return false;

        let cuerpo = rutCompleto.slice(0, -1);
        let dv = rutCompleto.slice(-1);

        let suma = 0;
        let multiplo = 2;

        for (let i = 1; cuerpo.length >= i; i++) {
            let index = multiplo * rutCompleto.charAt(cuerpo.length - i);
            suma = suma + index;
            if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
        }

        let dvEsperado = 11 - (suma % 11);
        let dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

        return dv === dvFinal;
    }

// PESTAÑAS Y TEXTO DE FONDO (cuenta.html)
    function initCuentaTabs() {
        const tabCuenta = document.getElementById('tab-cuenta');
        const tabSeguridad = document.getElementById('tab-seguridad');
        const seccionPerfil = document.getElementById('seccion-perfil');
        const seccionSeguridad = document.getElementById('seccion-seguridad');
        const contenedorTextoFondo = document.getElementById('texto-marquesina-fondo');

        if (!tabCuenta || !tabSeguridad) return;

        function actualizarTextoFondo(palabra) {
            if (!contenedorTextoFondo) return;
            contenedorTextoFondo.style.animation = 'none';
            contenedorTextoFondo.offsetHeight; 
            contenedorTextoFondo.style.animation = 'fadeInTextoFondo 0.5s ease-out forwards';

            let contenido = '';
            for (let i = 0; i < 14; i++) {
                contenido += `<span>${(palabra + ' ').repeat(15)}</span>\n`;
            }
            contenedorTextoFondo.innerHTML = contenido;
        }

        function cambiarPestaña(tabActiva, tabInactiva, seccionActiva, seccionInactiva, textoFondo) {
            tabActiva.classList.add('activo');
            tabInactiva.classList.remove('activo');

            const cursorActivo = tabActiva.querySelector('.cursorparpadea');
            const cursorInactivo = tabInactiva.querySelector('.cursorparpadea');

            if (cursorActivo) cursorActivo.style.display = 'inline-block';
            if (cursorInactivo) cursorInactivo.style.display = 'none';

            seccionInactiva.classList.remove('activo');

            setTimeout(() => {
                seccionInactiva.style.display = 'none';
                seccionActiva.style.display = 'block';

                setTimeout(() => {
                    seccionActiva.classList.add('activo');
                }, 30);
            }, 200);

            actualizarTextoFondo(textoFondo);
        }

// CUENTA
    actualizarTextoFondo('CUENTA');

    tabCuenta.addEventListener('click', () => {
        if (!seccionPerfil.classList.contains('activo')) {
            cambiarPestaña(tabCuenta, tabSeguridad, seccionPerfil, seccionSeguridad, 'CUENTA');
        }
    });

    tabSeguridad.addEventListener('click', () => {
        if (!seccionSeguridad.classList.contains('activo')) {
            cambiarPestaña(tabSeguridad, tabCuenta, seccionSeguridad, seccionPerfil, 'SEGURIDAD');
        }
    });
}

// ANIMACION LOOP DE ICONOS INDEX (integrantes cabezas)
    // Arreglo con las rutas locales de tus imágenes
    const imagenes = [
      "Archivos/imagen/Rodrigo.gif",
      "Archivos/imagen/Marko.gif",
      "Archivos/imagen/Nicolas.gif",
      "Archivos/imagen/Juanin.gif",
      "Archivos/imagen/Felix.gif",
    ];

    const img1 = document.getElementById("imagen1");
    const img2 = document.getElementById("imagen2");

    // Voltear la primera imagen horizontalmente
    img1.style.transform = "scaleX(-1)";

    // Variables para guardar las imágenes del ciclo anterior
    let ultimoIndice1 = null;
    let ultimoIndice2 = null;

    function cambiarImagenes() {
      let indice1, indice2;

      // Buscar un indice1 que no sea igual al que acaba de mostrar img1
      do {
        indice1 = Math.floor(Math.random() * imagenes.length);
      } while (indice1 === ultimoIndice1);

      // Buscar un indice2 que no sea igual al de img1 NI al que acaba de mostrar img2
      do {
        indice2 = Math.floor(Math.random() * imagenes.length);
      } while (indice2 === indice1 || indice2 === ultimoIndice2);

      // Asignar las nuevas imágenes
      img1.src = imagenes[indice1];
      img2.src = imagenes[indice2];

      // Guardar los índices actuales para la siguiente validación
      ultimoIndice1 = indice1;
      ultimoIndice2 = indice2;
    }

    // Cargar la primera vez
    cambiarImagenes();

    // Bucle cada 1 segundo
    setInterval(cambiarImagenes, 2000);

// Mostrar o no Contraseña
document.addEventListener('click', (e) => {
    // Buscar si se hizo clic en el botón o en el icono dentro del botón
    const btn = e.target.closest('.btn-toggle-password, #togglePassword');
    if (!btn) return;

    // Buscar el contenedor padre común (.contraseñaicono o .grupodeinputs)
    const contenedor = btn.closest('.contraseñaicono') || btn.closest('.grupodeinputs');
    if (!contenedor) return;

    // Obtener el campo input de contraseña y el icono de ojo
    const passwordInput = contenedor.querySelector('input[type="password"], input[type="text"]');
    const toggleIcon = btn.querySelector('i');

    if (passwordInput) {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        
        // Alternar tipo de input
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

        // Alternar iconos de Bootstrap Icons
        if (toggleIcon) {
            toggleIcon.classList.toggle('bi-eye-slash', !isPassword);
            toggleIcon.classList.toggle('bi-eye', isPassword);
        }
    }
});