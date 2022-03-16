const country = {
  name: "KOREA",
  population: 5000000,
  gdp: 30000,
  cities: {
    seoul: 100000000,
    busan: 50000000,
  },
  getName: function () {
    return this.name;
  },
};
console.log(country);
console.log(country.name);
console.log(country.population);
console.log(country.gdp);
console.log(country.getName());

console.log(country.cities);
console.log(country.cities.seoul);
console.log(country["cities"]);
console.log(country["cities"]["seoul"]);
