# Where in the World? — REST Countries App

A responsive web app that lets you browse countries from around the world, search by name, filter by region, view detailed country information, and switch between light and dark themes.

Built as a solution to the [Frontend Mentor REST Countries API challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

---

## 📸 Live Demo

https://zingy-chaja-b2b5b7.netlify.app/

---

## ✨ Features

- **Browse all countries** on the homepage, displayed as responsive cards
- **Search** for a country by name using the search input
- **Filter** countries by region (Africa, Americas, Asia, Europe, Oceania)
- **Combine** search and region filter at the same time
- **View detailed information** about any country, including native name, population, region, sub-region, capital, top-level domain, currencies, and languages
- **Click through to border countries** from the detail page
- **Toggle between light and dark themes** with the preference saved in `localStorage`
- **Fully responsive** layout for mobile, tablet, and desktop

---

## 🛠️ Built With

- **HTML5** — semantic structure
- **CSS3** — custom properties (variables) for theming, Flexbox and Grid for layout, media queries for responsiveness
- **Vanilla JavaScript** — no frameworks or libraries, using `async/await`, `fetch`, array methods, and `localStorage`
- **JSON** — country data provided locally in `data/data.json` (the original REST Countries API is now a paid service, so data ships with the project)
- **Font Awesome** — icons for search, theme toggle, and back button

---

## 📁 Project Structure

```
├── index.html              # Homepage — list of all countries
├── detail.html             # Detail page — single country info
├── css/
│   └── style.css           # All styling, including theme variables
├── js/
│   ├── script.js           # Homepage logic (fetch, render, search, filter, theme)
│   └── detail.js           # Detail page logic (fetch, render, borders, theme)
├── data/
│   └── data.json           # Country data
└── README.md
```

---

## 🚀 Getting Started

1. **Clone or download** this repository.
2. **Open `index.html`** in your browser.
   - That's it — no build tools, no npm install, no server required.
   - (If you want to serve it locally, `npx serve` or the VS Code "Live Server" extension both work.)

---

## 🧭 How to Use

1. On the **homepage**, all countries load automatically.
2. Type in the **search bar** to filter by country name.
3. Use the **region dropdown** to narrow results by continent.
4. Combine both — for example, type "a" and select "Europe" to see European countries containing the letter "a".
5. **Click any country card** to open its detail page.
6. On the **detail page**, click a **border country** to jump to that country.
7. Click **"Back"** to return to the homepage.
8. Click **"Dark Mode"** in the header to toggle themes. Your choice is remembered next time you visit.

---

## 💡 What I Learned

- How to fetch and render data with `async/await` and `fetch()`
- Why defensive coding matters when data shape isn't guaranteed
- How to combine multiple filters so they narrow results together instead of overwriting each other
- How to persist user preferences with `localStorage`
- How to build a light/dark theme system using CSS custom properties
- The value of committing in small, focused steps

---

## 🔧 Potential Improvements

- Split JavaScript into ES modules for better organization
- Add a loading spinner while data is being fetched
- Debounce the search input to reduce filtering on every keystroke
- Cache fetched data in `sessionStorage` to avoid refetching on the detail page
- Add keyboard navigation and improved accessibility (ARIA labels, focus trapping)
- Write unit tests for the data-accessor helper functions

---

## 🙏 Acknowledgements

- Challenge by [Frontend Mentor](https://www.frontendmentor.io/)
- Country data originally from [REST Countries](https://restcountries.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Font: [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans)