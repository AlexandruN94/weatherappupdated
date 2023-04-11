const textInputField = document.getElementById('city');
const getWeatherBtn = document.querySelector('.weatherbtn');

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
  // City container

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

  const cityDataContainer = document.createElement('div');
  cityDataContainer.classList.add('citydatacontainer');
  cityDataContainer.appendChild(cityName);
  cityDataContainer.appendChild(currentDate);
  cityDataContainer.appendChild(degreesDiv);
  cityDataContainer.appendChild(textTag);
  cityContainer.appendChild(cityDataContainer);

  // Forecast container

  const forecastTitle = document.createElement('p');
  const dayWord = data.forecast.forecastday.length === 1 ? `day` : `days`;
  forecastTitle.innerHTML = `The forecast for the following ${data.forecast.forecastday.length} ${dayWord} in ${data.location.name} is:`;

  const forecast = document.createElement('div');
  forecast.appendChild(forecastTitle);
  forecastTitle.classList.add('forecastTitle');
  data.forecast.forecastday.forEach(el => {
    const dailyForecast = document.createElement('p');
    dailyForecast.innerHTML = `${
      weekDaysDictionary[new Date(el.date).getDay()]
    }: ${el.day.maxtemp_c}°C`;
    forecast.appendChild(dailyForecast);
  });

  cityContainer.appendChild(forecast);

  const forecastDataContainer = document.createElement('div');
  forecastDataContainer.classList.add('forecastdatacontainer');
  forecastDataContainer.appendChild(forecast);
  cityContainer.appendChild(forecastDataContainer);

  // Weather images

  if (data.current.is_day == 0) {
    cityContainer.classList.add('night');
  } else {
    cityContainer.classList.add(
      data.current.condition.text.replaceAll(' ', '').toLowerCase()
    );
  }
  cityContainer.classList.add('bg-cover');

  return cityContainer;
};

// Weather API fetch

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
    });
};

// Event listeners

const triggerWeatherFetch = function () {
  const city = document.getElementById('city').value;
  const days = document.getElementById('days').value;
  getWeatherForCity(city, days);
};

window.addEventListener('load', e => {
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
