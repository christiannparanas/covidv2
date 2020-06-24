
// global
const global_cases = document.querySelector('#cases .value')
const global_active = document.querySelector('#active .value')
const global_recovered = document.querySelector('#recovered .value')
const global_deaths = document.querySelector('#deaths .value')


// global fetch data
function globalData() {

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
      globalStats(data)
   })
   .catch(err => {
      console.log(err);
   });
}

globalData()

function globalStats(data) {
   
   global_cases.innerHTML = numberWithCommas(data.Global.TotalConfirmed);
   global_recovered.innerHTML = numberWithCommas(data.Global.TotalRecovered);
}

// comma separator number
function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}