console.log('🚀 detail.js loaded');

let allCountries = [];

/* --- Safe accessors --- */
function getCountryName(c) {
    if (typeof c.name === 'string') return c.name;
    if (c.name && c.name.common) return c.name.common;
    return 'Unknown';
}
function getFlagUrl(c) {
    if (c.flags && c.flags.svg) return c.flags.svg;
    if (c.flags && c.flags.png) return c.flags.png;
    if (c.flag) return c.flag;
    return '';
}
function getCapital(c) {
    if (Array.isArray(c.capital)) return c.capital[0] || 'N/A';
    if (typeof c.capital === 'string') return c.capital;
    return 'N/A';
}
function getCountryCode(c) {
    return c.cca3 || c.alpha3Code || '';
}

/* --- Theme toggle --- */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        }
    }
    applyTheme(localStorage.getItem('theme') || 'light');
    themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
}

/* --- Main --- */
async function init() {
    console.log('🚀 init() started');

    const code = localStorage.getItem('selectedCountry');
    console.log('🔑 selectedCountry from localStorage:', code);

    if (!code) {
        document.getElementById('country-detail').innerHTML =
            '<p class="loading">No country selected. <a href="index.html">Go home</a> and click a country.</p>';
        return;
    }

    try {
        console.log('🔍 Fetching data.json...');
        const response = await fetch('data/data.json');
        console.log('📡 Response status:', response.status);

        if (!response.ok) throw new Error('HTTP ' + response.status);

        const data = await response.json();
        console.log('✅ Data loaded:', data.length, 'countries');
        allCountries = data;

        const current = allCountries.find(c => getCountryCode(c) === code);
        console.log('🎯 Matching country:', current);

        if (!current) {
            document.getElementById('country-detail').innerHTML =
                '<p class="loading">Country not found. <a href="index.html">Go back</a></p>';
            return;
        }

        renderDetail(current);
        console.log('✅ renderDetail() complete');

    } catch (err) {
        console.error('❌ Error:', err);
        document.getElementById('country-detail').innerHTML =
            '<p class="loading">Something went wrong: ' + err.message + '. <a href="index.html">Go back</a></p>';
    }
}

function renderDetail(country) {
    const name = getCountryName(country);
    const flag = getFlagUrl(country);
    const capital = getCapital(country);

    let nativeName = name;
    if (country.name && country.name.nativeName) {
        nativeName = Object.values(country.name.nativeName)[0].common || name;
    }

    let currencies = 'N/A';
    if (country.currencies) {
        currencies = Object.values(country.currencies).map(c => c.name).join(', ');
    }

    let languages = 'N/A';
    if (country.languages) {
        languages = Object.values(country.languages).join(', ');
    }

    let tld = 'N/A';
    if (Array.isArray(country.tld)) tld = country.tld[0];
    else if (typeof country.tld === 'string') tld = country.tld;

    let bordersHTML = '<span>None</span>';
    const borderCodes = country.borders || country.border || [];
    if (borderCodes.length > 0) {
        bordersHTML = borderCodes.map(bCode => {
            const border = allCountries.find(c => getCountryCode(c) === bCode);
            if (!border) return '';
            return `<a href="#" class="border-country" data-code="${bCode}">${getCountryName(border)}</a>`;
        }).join('');
    }

    const container = document.getElementById('country-detail');
    container.innerHTML = `
        <img class="country-detail__flag" src="${flag}" alt="Flag of ${name}">
        <div class="country-detail__info">
            <h2 class="country-detail__name">${name}</h2>
            <div class="country-detail__columns">
                <div>
                    <p class="country-detail__text"><span class="country-detail__label">Native Name:</span> ${nativeName}</p>
                    <p class="country-detail__text"><span class="country-detail__label">Population:</span> ${country.population ? country.population.toLocaleString() : 'N/A'}</p>
                    <p class="country-detail__text"><span class="country-detail__label">Region:</span> ${country.region || 'N/A'}</p>
                    <p class="country-detail__text"><span class="country-detail__label">Sub Region:</span> ${country.subregion || 'N/A'}</p>
                    <p class="country-detail__text"><span class="country-detail__label">Capital:</span> ${capital}</p>
                </div>
                <div>
                    <p class="country-detail__text"><span class="country-detail__label">Top Level Domain:</span> ${tld}</p>
                    <p class="country-detail__text"><span class="country-detail__label">Currencies:</span> ${currencies}</p>
                    <p class="country-detail__text"><span class="country-detail__label">Languages:</span> ${languages}</p>
                </div>
            </div>
            <div class="country-detail__borders">
                <span class="country-detail__label">Border Countries:</span>
                ${bordersHTML}
            </div>
        </div>
    `;

    container.querySelectorAll('.border-country').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            localStorage.setItem('selectedCountry', e.target.dataset.code);
            window.location.reload();
        });
    });
}

init();