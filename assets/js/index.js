
// global
const global_cases = document.querySelector('#cases .value')
const global_active = document.querySelector('#active .value')
const global_recovered = document.querySelector('#recovered .value')
const global_deaths = document.querySelector('#deaths .value')
const date = document.querySelector('.date')


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
   global_active.innerHTML = numberWithCommas(data.Global.TotalConfirmed - data.Global.TotalRecovered - data.Global.TotalDeaths);
   global_recovered.innerHTML = numberWithCommas(data.Global.TotalRecovered);
   global_deaths.innerHTML = numberWithCommas(data.Global.TotalDeaths);
   date.innerHTML = `Last Updated: ${convertDate(data.Date)}`
}

// comma separator number
function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// date converter
function convertDate(str) {
   var date = new Date(str),
     mnth = ("" + (date.getMonth() + 1)).slice(-2),
     day = ("" + date.getDate()).slice(-2) + ",";

     let months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
     }
   return [months[mnth], day, date.getFullYear()].join(" ");
}