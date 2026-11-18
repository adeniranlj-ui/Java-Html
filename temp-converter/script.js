const result = document.getElementById("result");

// Round to 2 decimal places and drop trailing zeros (25.00 -> 25)
function format(value) {
  return parseFloat(value.toFixed(2));
}

function toFahrenheit(event) {
  event.preventDefault();
  const input = document.getElementById("celsius").value;
  if (input === "") return;
  const celsius = Number(input);
  const fahrenheit = celsius * 9 / 5 + 32;
  result.textContent = `${format(celsius)} °C is ${format(fahrenheit)} °F`;
}

function toCelsius(event) {
  event.preventDefault();
  const input = document.getElementById("fahrenheit").value;
  if (input === "") return;
  const fahrenheit = Number(input);
  const celsius = (fahrenheit - 32) * 5 / 9;
  result.textContent = `${format(fahrenheit)} °F is ${format(celsius)} °C`;
}

document.getElementById("to-fahrenheit").addEventListener("submit", toFahrenheit);
document.getElementById("to-celsius").addEventListener("submit", toCelsius);
