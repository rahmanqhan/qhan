function updateGreetingAndDate() {
  const greetingEl = document.getElementById("greeting");
  const dateEl = document.getElementById("date");

  const now = new Date();
  const hours = now.getHours();
  let greeting = "Hello";
  let emoji = "👋";

  if (hours < 12) {
    greeting = "Good morning";
    emoji = "☀️";
  } else if (hours < 18) {
    greeting = "Good afternoon";
    emoji = "🌤️";
  } else {
    greeting = "Good evening";
    emoji = "🌙";
  }

  greetingEl.textContent = `${emoji} ${greeting},`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

updateGreetingAndDate();

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-bar");
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query !== "") {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, "_blank");
        searchInput.value = "";
      }
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      err => {
        console.error("Geolocation error:", err);
        document.getElementById("weather").textContent = "Weather unavailable";
      }
    );
  } else {
    document.getElementById("weather").textContent = "Weather unavailable";
  }
});

function fetchWeather(lat, lon) {
  const apiKey = "663227d90ebc5542ea3bd6420a5f9b8b"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const temp = Math.round(data.main.temp);
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
        <img src="${iconUrl}" alt="weather" style="width: 20px; height: 20px; vertical-align: middle;"> ${temp}°C
      `;
    })
    .catch(err => {
      console.error("Weather error:", err);
      document.getElementById("weather").textContent = "Weather unavailable";
    });
}

chrome.identity.getProfileUserInfo((userInfo) => {
  if (userInfo && userInfo.email) {
    const guessedName = userInfo.email.split('@')[0].split(/[._]/)[0];
    localStorage.setItem("orbeniqUserName", capitalizeFirst(guessedName));
    updateGreetingAndDate();
  }
});

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}







