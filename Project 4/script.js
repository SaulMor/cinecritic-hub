"use strict";

// Carousel functionality
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");
const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const CAROUSEL_SIZE = carouselItems.length;

let currentSlideIndex = 0;

// Event listeners for carousel navigation buttons
if (leftBtn && rightBtn) {
  leftBtn.addEventListener("click", () => swipe(-1));
  rightBtn.addEventListener("click", () => swipe(1));

  function swipe(direction) {
    // Update the current slide index based on the direction
    currentSlideIndex =
      (currentSlideIndex + direction + CAROUSEL_SIZE) % CAROUSEL_SIZE;
    updateCarousel();
  }

  function updateCarousel() {
    // Remove active class from all carousel items and nav items
    carouselItems.forEach((item) => item.classList.remove("active"));
    navItems.forEach((item) => item.classList.remove("active"));

    // Add active class to the current items
    carouselItems[currentSlideIndex].classList.add("active");
    navItems[currentSlideIndex].classList.add("active");
  }

  // Event listener for the carousel navigation dots
  document
    .querySelector(".carousel-nav")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("nav-item")) {
        const clickedIndex = navItems.indexOf(event.target);
        currentSlideIndex = clickedIndex;
        updateCarousel();
      }
    });
}

// Get the root element for setting CSS variables
const root = document.documentElement;

// Select all accordion buttons
const accordionButtons = document.querySelectorAll(".accordion-button");

// Accordion functionality for Movie Discussions section 
if (accordionButtons.length > 0) {
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle the active class on the accordion item
      const accordionItem = this.parentElement;
      accordionItem.classList.toggle('active');

      const icon = this.querySelector('.icon i');
      if (accordionItem.classList.contains('active')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }  

      // Set the height dynamically for opening animation
      const accordionContent = this.nextElementSibling;
      if (accordionItem.classList.contains('active')) {
        accordionContent.style.height = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.height = "0";
      }

      // Collapse other open sections
      accordionButtons.forEach(otherButton => {
          const otherItem = otherButton.parentElement;
          if (otherItem !== accordionItem && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
              otherButton.nextElementSibling.style.height = "0";
        }
      });
    });
  });
}


// Get the modal
var modal = document.getElementById("loginModal");
var closeBtn = document.getElementsByClassName("close")[0];
var joinDiscussionButtons = document.querySelectorAll(".join-discussion-btn");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

// Function to close the modal
function closeModal() {
  modal.classList.remove("show"); 
  setTimeout(() => {
      modal.style.display = "none"; 
  }, 300); 
}

// Check if the close button exists before adding the event listener
if (closeBtn) {
  closeBtn.onclick = function() {
    closeModal();
  };
}

// Add click event to all join discussion buttons
joinDiscussionButtons.forEach(function(btn) {
  btn.addEventListener("click", openModal);
});

// Close the modal if clicked outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Check if the login form exists before adding the event listener
var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(event){
    event.preventDefault();
    closeModal();
  });
}


// Event listener for 'Read More' buttons in the reviews section
document.querySelectorAll('.review-card .read-more').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const movieId = this.closest('.review-card').getAttribute('data-movie-id');
    fetchMovieDetails(movieId);
  });
});

// Event listeners for 'Read More' buttons in the Local Film Highlights section
document.querySelectorAll('.highlight-film-card .read-more').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const movieId = this.closest('.highlight-film-card').getAttribute('data-movie-id');
    fetchMovieDetails(movieId); 
  });
});

// Function to fetch movie details using TMDB API
function fetchMovieDetails(movieId) {
  const apiKey = TMDB_API_KEY;
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  // Fetch movie details
  fetch(detailsUrl)
    .then(response => response.json())
    .then(data => {
      // Fetch credits information
      return fetch(creditsUrl)
        .then(response => response.json())
        .then(creditsData => {
          // Now that we have both movie details and credits, update the modal
          updateModalWithMovieData(data, creditsData.cast);
        });
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
      // Handle error (show error message or use fallback content)
    });
}

// Function to update the movie details modal with fetched data
function updateModalWithMovieData(movieData, cast) {
  document.getElementById("modal-title").textContent = movieData.title;
  document.getElementById("modal-summary").textContent = "Summary: " + movieData.overview;
  document.getElementById("modal-actors").textContent = "Primary Actors: " + (Array.isArray(cast) ? cast.map(actor => actor.name).join(", ") : "Information not available");
  showMovieModal();
}

// Show the movieDetailsModal function
function showMovieModal() {
  const movieModal = document.getElementById("movieDetailsModal");
  if (movieModal) {
    movieModal.style.display = "block"; 
    setTimeout(() => {
      movieModal.classList.add("show"); 
    }, 10); 
  }
}

// Hide the movie details modal
function hideMovieModal() {
  const movieModal = document.getElementById("movieDetailsModal");
  if (movieModal) {
    movieModal.classList.remove("show"); 
    setTimeout(() => {
      movieModal.style.display = "none"; 
    }, 300); 
  }
}

// Check if the close button for the movie details modal exists before adding the event listener
const closeMovieBtn = document.querySelector("#movieDetailsModal .close");
if (closeMovieBtn) {
    closeMovieBtn.addEventListener("click", hideMovieModal);
}

// Event listener to close the movie details modal when clicking outside of it
window.addEventListener("click", function(event) {
  const movieModal = document.getElementById("movieDetailsModal");
  const modalContent = document.querySelector(".movie-content");
  if (event.target == movieModal && !modalContent.contains(event.target)) {
    hideMovieModal();
  }
});
