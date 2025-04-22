# 🎬 CineCritic Hub

CineCritic Hub is an interactive movie review and information web application built using HTML, CSS, and JavaScript. It allows users to browse trending films, read brief reviews, and explore cast information using The Movie Database (TMDB) API. The project focuses on dynamic UI features like modals, carousels, accordions, and responsive layouts.

> 📍 **Live Demo:** [View Project]([https://webpages.charlotte.edu/YOUR_USERNAME/cinecritic-hub/](https://webpages.charlotte.edu/smorenoa/itis3135/Project%204/))  

---

## 📌 Features

- 🔍 **Movie Search & Reviews**: Browse reviews and explore popular films.
- 🎞️ **Carousel UI**: Interactive sliding interface for featured movies.
- 🎬 **Cast & Summary Details**: Pulls live data from TMDB API.
- 📄 **Modal Windows**: Expands detailed movie information on click.
- 📂 **Accordion Panels**: Expandable discussions on specific films.
- 🔐 **Login Prompt**: UI prompt for joining discussions (mock modal).

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

## 🔐 API Key Notice

This project uses the TMDB API, which requires an API key. For security, the actual API key is stored in a local `config.js` file that is excluded from version control.

### To Run Locally:
1. Clone the repository
2. Create a new `config.js` file in the project root:
```js
// config.js
const TMDB_API_KEY = "your_api_key_here";
