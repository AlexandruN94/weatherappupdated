const textInputField = document.getElementById('city');
const getWeatherBtn = document.querySelector('.weatherbtn');
// const nav = document.querySelector('.nav');

const weekDaysDictionary = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
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

  const forecastTitle = document.createElement('p');
  const dayWord = data.forecast.forecastday.length === 1 ? `day` : `days`;

  forecastTitle.innerHTML = `The forecast for the following ${data.forecast.forecastday.length} ${dayWord}:`;

  const forecast = document.createElement('div');
  forecast.appendChild(forecastTitle);
  forecastTitle.classList.add('forecastTitle');
  data.forecast.forecastday.forEach(el => {
    const dailyForecast = document.createElement('p');
    dailyForecast.innerHTML = `${
      weekDaysDictionary[new Date(el.date).getDay()]
    }: ${el.day.maxtemp_c}°C`;
    forecast.appendChild(dailyForecast);

    // forecast.classList.add('forecastContainer');
  });

  // `The weather in ${data.location.name} for ${
  //   weekDaysDictionary[new Date(el.date).getDay() + 1]
  // } is ${el.day.maxtemp_c}°C.`;

  // Weather images
  if (data.current.is_day == 0) {
    cityContainer.classList.add('nightmode');
  } else {
    if (data.current.condition.text == 'Partly cloudy') {
      cityContainer.classList.add('partlycloudy');
    } else if (data.current.condition.text == 'Sunny' || 'Clear') {
      cityContainer.classList.add('sunnyclear');
    } else if (data.current.condition.text == 'Cloudy') {
      cityContainer.classList.add('cloudy');
    } else if (data.current.condition.text == 'Overcast') {
      cityContainer.classList.add('overcast');
    } else if (data.current.condition.text == 'Mist') {
      cityContainer.classList.add('mist');
    } else if (data.current.condition.text == 'Patchy rain possible') {
      cityContainer.classList.add('patchyrainpossible');
    }
  }

  cityContainer.appendChild(forecast);

  const leftSide = document.createElement('div');
  leftSide.appendChild(cityName);
  leftSide.appendChild(currentDate);
  leftSide.appendChild(degreesDiv);
  leftSide.appendChild(textTag);
  cityContainer.appendChild(leftSide);
  leftSide.classList.add('leftSide');

  const rightSide = document.createElement('div');

  rightSide.appendChild(forecast);
  cityContainer.appendChild(rightSide);
  rightSide.classList.add('rightSide');

  return cityContainer;
};

const getWeatherForCity = (city, days) => {
  const encodedCity = encodeURIComponent(city);

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ed104a87c20f401d9ea135033230504&q=${encodedCity}&days=${days}`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      const cityData = document.getElementById('citydata');
      cityData.appendChild(renderCityData(data));
      console.log(data);
      // if (data.current.is_day == 1) {
      //   document.body.style.background = 'orange';
      // } else {
      //   document.body.style.background = 'black';
      // }
    });
};

const triggerWeatherFetch = function () {
  const city = document.getElementById('city').value;
  const days = document.getElementById('days').value;
  getWeatherForCity(city, days);
};

window.addEventListener('load', e => {
  console.log(e);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        getWeatherForCity(`${latitude},${longitude}`, 7);
      },
      function () {
        alert('Could not retrieve your location.');
      }
    );
  }
});

textInputField.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    triggerWeatherFetch();
  }
});

getWeatherBtn.addEventListener('click', function () {
  triggerWeatherFetch();
});

///////////////////////// Backup code /////////////////////////////

/* const textInputField = document.getElementById('city');
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
        alert('Could not retrieve your location.');
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
}); */
