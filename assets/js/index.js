
// global
const global_cases = document.querySelector('#cases .value')
const global_active = document.querySelector('#active .value')
const global_recovered = document.querySelector('#recovered .value')
const global_deaths = document.querySelector('#deaths .value')
const date = document.querySelector('.date')

const countriesPlace = document.querySelector('.countries')

let bansa = [];



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
      console.log(data)
      let id = 0;

      let keys = Object.keys(data.Countries)
      let DATA = data.Countries;
      
      keys.forEach( key => {
         bansa.push(DATA[key].Country)

         countriesPlace.innerHTML += 
         `<div class="container" id="bansa${id}">
            <div class="country-name">${DATA[key].Country}</div>
            <div class="country-cases">Total Cases: ${numberWithCommas(DATA[key].TotalConfirmed)}</div>
            <div class="country-recovered">Recovered: ${numberWithCommas(DATA[key].TotalRecovered)}</div>
            <div class="country-deaths">Deaths: ${numberWithCommas(DATA[key].TotalDeaths)}</div>
         </div>`

         id++;
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

// search country
const inpu = document.getElementById('input');

inpu.addEventListener('input', () => {
   let value = inpu.value.toUpperCase();
   let num = 0;

   bansa.forEach( bans => {
      if(bans.toUpperCase().startsWith(value)){
         document.getElementById(`bansa${num}`).classList.remove("hide")
      } else {
         document.getElementById(`bansa${num}`).classList.add("hide")
      }

      num++;
   })
})