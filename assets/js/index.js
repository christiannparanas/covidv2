
// global
const global_cases = document.querySelector('#cases .value')
const global_active = document.querySelector('#active .value')
const global_recovered = document.querySelector('#recovered .value')
const global_deaths = document.querySelector('#deaths .value')
const date = document.querySelector('.date')

const countriesPlace = document.querySelector('.countries')


// fetch data
function Data() {

   fetch(`https://api.covid19api.com/summary`, {
      "method": "GET",
   })
   .then(response => {
      if(response.status == 404){
         location.reload()
      }
      else {
         return response.json();
      }
   })
   .then( data => {
      

      let keys = Object.keys(data.Countries)
      
      keys.forEach( key => {
         countriesPlace.innerHTML += 
         `<div class="container">
            <div class="country-name">${data.Countries[key].Country}</div>
            <div class="country-cases">Total Cases: ${numberWithCommas(data.Countries[key].TotalConfirmed)}</div>
            <div class="country-recovered">Recovered: ${numberWithCommas(data.Countries[key].TotalRecovered)}</div>
            <div class="country-deaths">Deaths: ${numberWithCommas(data.Countries[key].TotalDeaths)}</div>
         </div>`
      })


      globalStats(data)
   })
   .catch(err => {
      console.log(err);
   });
}

Data()

function globalStats(data) {
   
   global_cases.innerHTML = numberWithCommas(data.Global.TotalConfirmed);
   global_active.innerHTML = numberWithCommas(data.Global.TotalConfirmed - data.Global.TotalRecovered - data.Global.TotalDeaths);
   global_recovered.innerHTML = numberWithCommas(data.Global.TotalRecovered);
   global_deaths.innerHTML = numberWithCommas(data.Global.TotalDeaths);
   date.innerHTML = `Last Updated: ${convertDate(data.Date)}`
}

// show countries
