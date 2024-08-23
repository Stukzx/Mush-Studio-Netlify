function smoothScrollTo(target) {
    const targetPosition = document.querySelector(target).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 200; // duração em milissegundos
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo(this.getAttribute('href'));
    });
});

function nextSlide(button) {
    let carousel = button.parentElement;
    let images = carousel.querySelectorAll('.carousel-image');
    let currentIndex = Array.from(images).findIndex(image => image.classList.contains('active'));
    
    images[currentIndex].classList.remove('active');
    
    let nextIndex = (currentIndex + 1) % images.length;
    images[nextIndex].classList.add('active');
}

function prevSlide(button) {
    let carousel = button.parentElement;
    let images = carousel.querySelectorAll('.carousel-image');
    let currentIndex = Array.from(images).findIndex(image => image.classList.contains('active'));
    
    images[currentIndex].classList.remove('active');
    
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    images[prevIndex].classList.add('active');
}
