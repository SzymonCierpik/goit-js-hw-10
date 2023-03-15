console.log(fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages").then((t=>{if(!t.ok)throw new Error(t.status);return t.json()})));
//# sourceMappingURL=index.fe31ffae.js.map
