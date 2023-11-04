window.addEventListener('DOMContentLoaded', (event) => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const intervalDuration = 5000;
  
    const showNextSlide = () => {
      carouselItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % carouselItems.length;
      carouselItems[currentIndex].classList.add('active');
    };
  
    carouselItems[currentIndex].classList.add('active');
    let interval = setInterval(showNextSlide, intervalDuration);
  
    const carousel = document.getElementById('myCarousel');
    carousel.addEventListener('mouseover', () => {
      clearInterval(interval);
    });
  
    carousel.addEventListener('mouseout', () => {
      interval = setInterval(showNextSlide, intervalDuration);
    });
  
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
  
    const handlePrevButtonClick = () => {
      carouselItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      carouselItems[currentIndex].classList.add('active');
      clearInterval(interval);
      interval = setInterval(showNextSlide, intervalDuration);
    };
  
    const handleNextButtonClick = () => {
      carouselItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % carouselItems.length;
      carouselItems[currentIndex].classList.add('active');
      clearInterval(interval);
      interval = setInterval(showNextSlide, intervalDuration);
    };
  
    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
  });
  