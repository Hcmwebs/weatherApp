const api= {
  key: "bef3d791c76cd57f87ec71850db0092b",
  base: "https://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);


function setQuery(e) {
  if (e.keyCode === 13 ) {
    getResults(searchBox.value);
  }
}


function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {

  // === === get | location === ===

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

   // === === get | date === ===
  let now =new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateGenerator(now);

   // === === get | temp === ===
  let temp =document.querySelector('.current .temp');
  temp.innerHTML =`${Math.round(weather.main.temp)}<span>°C</span>`;

 // === === get | weather Description === ===
  let weatherDescription = document.querySelector('.current .weather');
  weatherDescription.innerText = weather.weather[0].main;

   // === === get | change the background imaged based on the temp === ===

  function changeTheBackground(temp) {
    let body = document.querySelector('body');

    if(temp < 16){
      body.style.backgroundImage = "url('/images/snow.jpg')";
      }
      else {
        body.style.backgroundImage = "url('/images/sunny.jpg')"

      }

  };

  changeTheBackground();

   // === === get | temp range === ===

  let hiLow = document.querySelector('.hi-low');
  hiLow.innerText =`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C `;

}

 // === generating the date ===

function dateGenerator(d) {
  let months = ['January', 'February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday,Saturday'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}` ;
}