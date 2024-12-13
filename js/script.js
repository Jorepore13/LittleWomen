document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container-nogallery', {
        effect: 'cards',
        grabCursor: true,
        loop: false,
		lazy: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const swiper2 = new Swiper('.swiper-container-gallery', {
      slidesPerView: 3,
      grid: {
        rows: 3,
      },
      spaceBetween: 20
    });
	
	console.log(swiper2)

    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlayImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const closeBtn = document.querySelector('.close');
    let currentImageIndex = 0;

    const images = document.querySelectorAll('.slider-image');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            currentImageIndex = index;
            showOverlay(image.src);
        });
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateOverlayImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateOverlayImage();
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    function showOverlay(src) {
        overlay.style.display = 'flex';
        overlayImage.src = src;
        updateDownloadLink(src);
    }

    function updateOverlayImage() {
        const newSrc = images[currentImageIndex].src;
        overlayImage.src = newSrc;
        updateDownloadLink(newSrc);
    }

    function updateDownloadLink(src) {
		const imageName = src.split('/').pop().split('.')[0];
		const pdfLink = src.replace('.webp', '.pdf'); // Asegúrate de que esto coincida con el formato de tus imágenes
		downloadBtn.href = pdfLink; // Configura el href al archivo PDF

		// Usar un enlace temporal para forzar la descarga
		downloadBtn.onclick = function(event) {
			event.preventDefault(); // Prevenir la acción predeterminada del enlace
			const link = document.createElement('a');
			link.href = pdfLink;
			link.target = "_blank";
			link.download = `${imageName}.pdf`; // Nombre del archivo de descarga
			document.body.appendChild(link);
			link.click(); // Simular clic para descargar
			document.body.removeChild(link); // Eliminar el enlace temporal
		};
	}

});

