// GETTING THE DATA

let allCountries = [];
let displayedCountries = [];

async function fetchCountries() {
    try {
        console.log('🔍 Starting to fetch countries...'); // Debug log
        
        const response = await fetch('data/data.json');
        
        // Check if the fetch worked
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ Data loaded! Number of countries:', data.length); // Debug log
        console.log('📦 First country looks like:', data[0]); // Debug log
        
        allCountries = data;
        displayedCountries = data;
        
        renderCountries(displayedCountries);
        
    } catch (error) {
        console.error('❌ Oops! Could not get the data:', error);
        
        // Show error on page so user knows something went wrong
        document.getElementById('countries-grid').innerHTML = 
            `<p style="color: red;">Error loading countries: ${error.message}</p>`;
    }
}

// HELPER FUNCTION: Get country name safely

function getCountryName(country) {
    // Handle both data structures:
    // Structure 1: { name: { common: "United States" } }
    // Structure 2: { name: "United States" }
    
    if (typeof country.name === 'string') {
        return country.name;  // Structure 2
    } else if (country.name && country.name.common) {
        return country.name.common;  // Structure 1
    } else {
        return 'Unknown Country';
    }
}

// HELPER FUNCTION: Get flag URL safely

function getFlagUrl(country) {
    // Handle both structures:
    // Structure 1: { flags: { svg: "url" } }
    // Structure 2: { flag: "url" }
    
    if (country.flags && country.flags.svg) {
        return country.flags.svg;  // Structure 1
    } else if (country.flags && country.flags.png) {
        return country.flags.png;
    } else if (country.flag) {
        return country.flag;  // Structure 2
    } else {
        return '';  // No flag found
    }
}

// HELPER FUNCTION: Get capital safely

function getCapital(country) {
    if (Array.isArray(country.capital)) {
        return country.capital[0] || 'N/A';  // Structure 1 (array)
    } else if (typeof country.capital === 'string') {
        return country.capital;  // Structure 2 (string)
    } else {
        return 'N/A';
    }
}

// SHOWING COUNTRIES ON THE PAGE

function renderCountries(countries) {
    const grid = document.getElementById('countries-grid');
    
    console.log('🎨 Rendering', countries.length, 'countries'); // Debug log
    
    grid.innerHTML = '';
    
    if (countries.length === 0) {
        grid.innerHTML = '<p class="no-results">No countries found. Try a different search!</p>';
        return;
    }
    
    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');
        
        // Get the country name using our safe helper
        const countryName = getCountryName(country);
        const flagUrl = getFlagUrl(country);
        const capital = getCapital(country);
        
        // Get the country code safely (for the detail page)
        const countryCode = country.cca3 || country.alpha3Code || '';
        
        card.addEventListener('click', () => {
            if (countryCode) {
                localStorage.setItem('selectedCountry', countryCode);
                window.location.href = 'detail.html';
            }
        });
        
        card.innerHTML = `
            <img 
                class="country-card__flag" 
                src="${flagUrl}" 
                alt="Flag of ${countryName}"
                onerror="this.style.display='none'"
            >
            <div class="country-card__info">
                <h2 class="country-card__name">${countryName}</h2>
                <p class="country-card__detail">
                    <span class="country-card__label">Population:</span> 
                    ${country.population ? country.population.toLocaleString() : 'N/A'}
                </p>
                <p class="country-card__detail">
                    <span class="country-card__label">Region:</span> 
                    ${country.region || 'N/A'}
                </p>
                <p class="country-card__detail">
                    <span class="country-card__label">Capital:</span> 
                    ${capital}
                </p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// START THE APP

fetchCountries();


// COMBINED SEARCH AND FILTER

const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');

// Safety check - make sure both elements exist
if (!searchInput || !regionFilter) {
    console.error('❌ Missing element!');
    console.error('searchInput:', searchInput);
    console.error('regionFilter:', regionFilter);
} else {
    console.log('✅ Search and filter elements found');
    
    // This function applies BOTH search AND region filter together
    function applyFilters() {
        // Get search term (make it lowercase, remove extra spaces)
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Get selected region
        const selectedRegion = regionFilter.value;
        
        console.log('🔍 Search term:', `"${searchTerm}"`, '| Region:', `"${selectedRegion}"`);
        
        // Start with ALL countries
        let filtered = allCountries;
        
        // Apply search filter if user typed something
        if (searchTerm !== '') {
            filtered = filtered.filter(country => {
                const name = getCountryName(country).toLowerCase();
                return name.includes(searchTerm);
            });
        }
        
        // Apply region filter if user selected a region
        if (selectedRegion !== '') {
            filtered = filtered.filter(country => {
                return country.region === selectedRegion;
            });
        }
        
        console.log('📊 Showing', filtered.length, 'countries');
        
        // Show the filtered countries
        displayedCountries = filtered;
        renderCountries(displayedCountries);
    }
    
    // Listen for search input
    searchInput.addEventListener('input', applyFilters);
    
    // Listen for region change
    regionFilter.addEventListener('change', applyFilters);
}

