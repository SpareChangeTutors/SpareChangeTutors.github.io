document.addEventListener('DOMContentLoaded', () => {
    // Overlay functions
    function on() {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function off() {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "none";
        document.body.style.overflow = "";
    }

    // Attach event listeners
    document.querySelector('.fa-bars').addEventListener('click', on);
    document.querySelector('.fa-times').addEventListener('click', off);


    // Team Slider Setup
    const images = document.querySelectorAll('.teamslide img');
    const dots = document.querySelectorAll('.team-nav a');
    const container = document.querySelector('.teamslide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlideIndex = 0;

    function setActive(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function updateSlide(index) {
        container.scrollLeft = images[index].offsetLeft;
        setActive(index);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlideIndex = index;
            updateSlide(index);
        });
    });

    leftArrow.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlide(currentSlideIndex);
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentSlideIndex < images.length - 1) {
            currentSlideIndex++;
            updateSlide(currentSlideIndex);
        }
    });

    container.addEventListener('scroll', () => {
        const index = Math.round(container.scrollLeft / container.offsetWidth);
        currentSlideIndex = index;
        setActive(index);
    });

    // Function to scroll back to the first image
    function scrollToFirstImage() {
        container.scrollLeft = 0;
        setActive(0);
    }

    // Function for the final contact section at the bottom to fade in upon being scrolled on
    const finalContactSection = document.querySelector('.finalcontact');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function onVisibilityChange() {
        if (isElementInViewport(finalContactSection)) {
            finalContactSection.classList.add('visible');
            window.removeEventListener('scroll', onVisibilityChange);
            window.removeEventListener('resize', onVisibilityChange);
        }
    }

    window.addEventListener('scroll', onVisibilityChange);
    window.addEventListener('resize', onVisibilityChange);

    // Scroll back to the first image when "Meet The Team" is in view
    const teamSection = document.querySelector('#team');

    function checkTeamSection() {
        if (isElementInViewport(teamSection)) {
            scrollToFirstImage();
        }
    }

    window.addEventListener('scroll', checkTeamSection);
    window.addEventListener('resize', checkTeamSection);

    // Initial setup
    setActive(currentSlideIndex);
});
