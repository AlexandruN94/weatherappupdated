const textInputField = document.getElementById('city');
const getWeatherBtn = document.querySelector('.weatherbtn');

const weekDaysDictionary = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  0: 'Sunday',
};

const renderCityData = function (data) {
  const cityContainer = document.createElement('div');
  cityContainer.classList.add('cityContainer');

  const cityName = document.createElement('h2');
  cityName.innerHTML = data.location.name;
  cityName.classList.add('cityName');
  cityContainer.appendChild(cityName);

  const currentDate = document.createElement('p');
  currentDate.innerHTML = weekDaysDictionary[new Date().getDay()];
  cityContainer.appendChild(currentDate);

  const degreesDiv = document.createElement('div');
  degreesDiv.classList.add('degreesContainer');

  let image = document.createElement('img');
  image.setAttribute('src', data.current.condition.icon);
  degreesDiv.appendChild(image);

  const degrees = document.createElement('p');
  degrees.innerHTML = `${data.current.temp_c}°C`;
  degreesDiv.appendChild(degrees);

  cityContainer.appendChild(degreesDiv);

  const textTag = document.createElement('p');
  textTag.innerHTML = data.current.condition.text;
  cityContainer.appendChild(textTag);

  const forecast = document.createElement('div');
  data.forecast.forecastday.forEach(el => {
    const dailyForecast = document.createElement('p');
    dailyForecast.innerHTML = `The weather in ${data.location.name} for ${
      weekDaysDictionary[new Date(el.date).getDay() + 1]
    } is ${el.day.maxtemp_c}°C.`;
    forecast.appendChild(dailyForecast);
  });

  cityContainer.appendChild(forecast);
  return cityContainer;
};

const getWeatherForCity = city => {
  const encodedCity = encodeURIComponent(city);

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ed104a87c20f401d9ea135033230504&q=${encodedCity}&days=6`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      const cityData = document.getElementById('citydata');
      cityData.appendChild(renderCityData(data));

      // const forecastDiv = document.getElementById('forecast');
      // data.forecast.forecastday.forEach(el => {
      //   const d = document.createElement('div');
      //   d.innerHTML = `The weather in ${city} for ${
      //     weekDays[new Date(el.date).getDay() + 1]
      //   } is ${el.day.maxtemp_c}°C.`;
      //   forecast.appendChild(d);
      //   console.log(el);
      // });
    });
};

window.addEventListener('load', e => {
  console.log(e);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        getWeatherForCity(`${latitude},${longitude}`);
      },
      function () {
        alert('Could not retrieve your position');
      }
    );
  }
});

textInputField.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const value = document.getElementById('city').value;
    getWeatherForCity(value);
  }
});

getWeatherBtn.addEventListener('click', function () {
  const value = document.getElementById('city').value;
  getWeatherForCity(value);
});

///////////////////////// Backup code /////////////////////////////

// const textInputField = document.getElementById('city');
// const getWeatherBtn = document.querySelector('.weatherbtn');

// const weekDays = {
//   1: 'Monday',
//   2: 'Tuesday',
//   3: 'Wednesday',
//   4: 'Thursday',
//   5: 'Friday',
//   6: 'Saturday',
//   7: 'Sunday',
// };

// const getWeatherForCity = city => {
//   const encodedCity = encodeURIComponent(city);

//   fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=ed104a87c20f401d9ea135033230504&q=${encodedCity}&days=6`
//   )
//     .then(res => {
//       return res.json();
//     })
//     .then(data => {
//       const forecastDiv = document.getElementById('forecast');
//       data.forecast.forecastday.forEach(el => {
//         const d = document.createElement('div');
//         d.innerHTML = `The weather in ${city} for ${
//           weekDays[new Date(el.date).getDay() + 1]
//         } is ${el.day.maxtemp_c}°C.`;
//         forecast.appendChild(d);
//         console.log(el);
//       });

//       console.log(data);
//       const cityNameDiv = document.getElementById('cityname');
//       cityNameDiv.innerHTML = data.location.name;

//       const currentDate = document.getElementById('currentdate');
//       currentDate.innerHTML = weekDays[new Date().getDay()];

//       const degreesDiv = document.getElementById('degrees');
//       degreesDiv.innerHTML = `${data.current.temp_c}°C`;

//       const imageTag = document.getElementById('image');
//       imageTag.setAttribute('src', data.current.condition.icon);

//       const textTag = document.getElementById('weathertext');
//       textTag.innerHTML = data.current.condition.text;

//       //   if (data.current.condition.text == "Light snow"){
//       //     document.body.style.background = "grey"
//       // }
//       // if (data.current.condition.text == "Sunny"){
//       //     document.body.style.background = "lightblue"
//       // }
//     });
// };

// textInputField.addEventListener('keydown', function (e) {
//   if (e.key === 'Enter') {
//     const value = document.getElementById('city').value;
//     getWeatherForCity(value);
//   }
// });

// getWeatherBtn.addEventListener('click', function () {
//   const value = document.getElementById('city').value;
//   getWeatherForCity(value);
// });

////////////////////// Tests ////////////////////////

// const renderDay = function (data) {
//   const forecastDiv = document.getElementById('forecast');
//   data.forecast.forecastday.forEach(el => {
//     const d = document.createElement('div');
//     forecast.appendChild(d);
//     // console.log(el);
//     return d;
//   });
// };
