function getCountryName(event) {
  event.preventDefault();
  const countryOutput = document.querySelector('#country-output');
  const code = document.querySelector('#country-text').value;
  const targetCountry = JSON.parse(window.localStorage.getItem('country-coder')).filter(country => parseCountryCode(country) === `+${code}`)[0]
  countryOutput.innerHTML = `<li>${targetCountry?.name?.common ?? 'Invalid country code'}</li>`
}

async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const json = await response.json();
  const sortedCountries = json.sort((a, b) => a.name.common.localeCompare(b.name.common));
  window.localStorage.setItem('country-coder', JSON.stringify(sortedCountries));
  setCountryOptions();
}

function setCountryOptions() {
  const countrySelect = document.querySelector('#country-select');
  const countries = JSON.parse(window.localStorage.getItem('country-coder')); 
  countries.map(country => (countrySelect.innerHTML += `<option value="${country.name.common}">${country.name.common}</option>`));
}

async function getCallingCode(event) {
  const codeOuput = document.querySelector('#code-output');
  const selectedCountry = event.target.value;
  const countryData = JSON.parse(window.localStorage.getItem('country-coder')).filter(country => country.name.common === selectedCountry)[0]; 
  const parsedCountryCode = parseCountryCode(countryData); 
  codeOuput.style.display = 'inline';
  codeOuput.innerText = parsedCountryCode; 
}

function parseCountryCode(countryData) {
  return `${countryData.idd.root}${countryData?.idd?.suffixes?.[0] ?? ''}`;
}

document.querySelector('#get-country').addEventListener('submit', getCountryName);
document.querySelector('#country-select').addEventListener('change', getCallingCode);

getCountries();
