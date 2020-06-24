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

const global = document.getElementById('global');
const country = document.getElementById('country');
const about = document.getElementById('about')

const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')

function pageSwitcher(num) {
   
   if(num == 1){
      box1.style.color = "#5FF2D0"
      box2.style.color = "#CCD6F6"
      box3.style.color = "#CCD6F6"
      global.style.display = 'block'
      country.style.display = 'none'
      about.style.display = 'none'
   }
   else if(num == 2){
      box1.style.color = "#CCD6F6"
      box2.style.color = "#5FF2D0"
      box3.style.color = "#CCD6F6"
      global.style.display = 'none'
      country.style.display = 'block'
      about.style.display = 'none'
   }
   else {
      box1.style.color = "#CCD6F6"
      box2.style.color = "#CCD6F6"
      box3.style.color = "#5FF2D0"
      global.style.display = 'none'
      country.style.display = 'none'
      about.style.display = 'block'
   }
}

const input = document.getElementById('input')
const closeIcon = document.querySelector('.close')

// search close icon
input.addEventListener('input', () => {
   if(input.value){
      closeIcon.style.display = "block"
   }
   else {
      closeIcon.style.display = "none"
   }
})

closeIcon.addEventListener('click', () => {
   input.value = "";
   closeIcon.style.display = "none"
})
