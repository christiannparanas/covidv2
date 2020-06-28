
// global
const global_cases = document.querySelector('#cases .value')
const global_active = document.querySelector('#active .value')
const global_recovered = document.querySelector('#recovered .value')
const global_deaths = document.querySelector('#deaths .value')
const date = document.querySelector('.date')

const countriesPlace = document.querySelector('.countries')
let bansa = [];
let countryCode = [];
let DATA;



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
      let id = 0;

      let keys = Object.keys(data.Countries)
      DATA = data.Countries;
      let count = 0;
      
      keys.forEach( key => {
         bansa.push(DATA[key].Country)
         countryCode.push(DATA[key].CountryCode)

         countriesPlace.innerHTML += 
         `<div class="container" id="bansa${id}" onclick="mymodal(${count})" code="${DATA[key].CountryCode}">
            <div class="country-name">${DATA[key].Country}</div>
            <div class="country-cases">Total Cases: ${numberWithCommas(DATA[key].TotalConfirmed)}</div>
            <div class="country-recovered">Recovered: ${numberWithCommas(DATA[key].TotalRecovered)}</div>
            <div class="country-deaths">Deaths: ${numberWithCommas(DATA[key].TotalDeaths)}</div>
         </div>`

         id++;
         count++;
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


// modal
const modal = document.querySelector('.country-modal')
const country_name_modal = document.querySelector('.country-name')

const totalCasesModal = document.querySelector('.cases .total')
const newCasesModal = document.querySelector('.cases .new')
const totalRecoveredModal = document.querySelector('.recovered .total')
const newRecoveredModal = document.querySelector('.recovered .new')
const totalDeathsModal = document.querySelector('.deaths .total')
const newDeathsModal = document.querySelector('.deaths .new')

function closeModal() {
   modal.style.display = "none"
}

function mymodal(num) {
   modal.style.display = "none"

   const container = document.getElementById(`bansa${num}`)

   countryCode.forEach( code => {
      if(code == container.getAttribute("code")){
         modal.style.display = "block"
         country_name_modal.innerHTML = `${DATA[num].Country} <img src="https://www.countryflags.io/${code}/flat/64.png">`;

         totalCasesModal.innerHTML = `Total Cases: ${numberWithCommas(DATA[num].TotalConfirmed)}`
         newCasesModal.innerHTML = `New: ${numberWithCommas(DATA[num].NewConfirmed)}`

         totalRecoveredModal.innerHTML = `Recovered: ${numberWithCommas(DATA[num].TotalRecovered)}`
         newRecoveredModal.innerHTML = `New: ${numberWithCommas(DATA[num].NewRecovered)}`
         totalDeathsModal.innerHTML = `Deaths: ${numberWithCommas(DATA[num].TotalDeaths)}`
         newDeathsModal.innerHTML = `New: ${numberWithCommas(DATA[num].NewDeaths)}`

      }
   })
}

