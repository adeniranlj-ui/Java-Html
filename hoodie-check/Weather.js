const url = "https://api.open-meteo.com/v1/forecast" + "?latitude=29.88&longitude=-97.94" + "&current=temperature_2m&temperature_unit=fahrenheit"


const button = document.getElementById("check");
const temp = document.getElementById("temp");
const answer = document.getElementById("answer");


async function getWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.status);
    }
    const data = await response.json();
    console.log(data);
    const degrees = data.current.temperature_2m;
    temp.textContent = `${degrees}°F`;
    if (degrees > 65) {
      answer.textContent = "No hoodie needed. It's warm enough outside today.";
    }
    else {
      answer.textContent = "A hoodie is recommended. It's on the cooler side today.";
    }
    
  } catch (error) {
    console.error(error);
    temp.textContent = "Unable to load weather data. Please try again.";
  }
}

button.addEventListener("click", getWeather);