function fetchCountries() {
  const url = `https://restcountries.com/v3.1/all`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Problem-1');
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    })
    .catch(error => {
      console.error('Problem-2:', error);
    });
}
