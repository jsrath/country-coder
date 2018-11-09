function getCountryName(event) {
  event.preventDefault();
  const countryOutput = document.querySelector('#country-output');
  let code = document.querySelector('#country-text').value;

  countryOutput.innerHTML = '';

  fetch(`https://restcountries.eu/rest/v2/callingcode/${code}`)
    .then(result => result.json())
    .then(result => {
      result.map(country => (countryOutput.innerHTML += `<li>${country.name}</li>`));
    })
    .catch(() => {
      countryOutput.innerHTML = `<h3>Country Not Found</h3>`;
    });
}

function getCountries() {
  const countrySelect = document.querySelector('#country-select');
  fetch(`https://restcountries.eu/rest/v2/all`)
    .then(result => result.json())
    .then(result => {
      result.map(country => (countrySelect.innerHTML += `<option value="${country.name}">${country.name}</option>`));
    });
}

function getCallingCode(event) {
  const codeOuput = document.querySelector('#code-output');
  let country = event.target.value;
  fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    .then(result => result.json())
    .then(result => {
      codeOuput.style.display = 'inline';
      codeOuput.innerText = result[0].callingCodes[0];
    });
}

document.querySelector('#get-country').addEventListener('submit', getCountryName);
document.querySelector('#country-select').addEventListener('change', getCallingCode);

getCountries();
