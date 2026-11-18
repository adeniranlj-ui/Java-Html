// ----- Calculator -----

function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) throw new Error("Cannot divide by zero.");
      return a / b;
    default:
      throw new Error("Unknown operator.");
  }
}

function showResult(event) {
  event.preventDefault();
  const output = document.getElementById("result");
  const aInput = document.getElementById("a").value;
  const bInput = document.getElementById("b").value;

  if (aInput === "" || bInput === "") {
    output.textContent = "Please enter both numbers.";
    return;
  }

  try {
    const result = calculate(Number(aInput), Number(bInput), document.getElementById("op").value);
    // Round away floating-point noise (e.g. 0.1 + 0.2 = 0.30000000000000004)
    output.textContent = `Result: ${parseFloat(result.toFixed(10))}`;
  } catch (error) {
    output.textContent = error.message;
  }
}

document.getElementById("calc-form").addEventListener("submit", showResult);

// ----- Credit score checker -----

function creditScoreLabel(score) {
  if (score >= 800) return "Excellent";
  if (score >= 740) return "Very Good";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
}

function showLabel(event) {
  event.preventDefault();
  const input = document.getElementById("credit-score").value;
  const rating = document.getElementById("rating");
  const score = Number(input);

  if (input === "" || score < 300 || score > 850) {
    rating.textContent = "Please enter a valid credit score (300–850).";
    return;
  }

  rating.textContent = `Credit score rating: ${creditScoreLabel(score)}`;
}

document.getElementById("score-form").addEventListener("submit", showLabel);
