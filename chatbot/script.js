const model = "google/gemma-3-12b-it";
const api = "https://api.deepinfra.com/v1/openai/chat/completions";

const messages = [
  {
    role: "system",
    content: "You are a patient tutor for students learning web development. Answer in 3 short sentences, plain text, with one example."
  }
];

const chat = document.querySelector("#chat");
const box = document.querySelector("#question");
const sendButton = document.querySelector("#send");

function show(who, text) {
  const p = document.createElement("p");
  const name = document.createElement("strong");
  name.textContent = who + ": ";
  p.append(name, text);
  chat.append(p);
  chat.scrollTop = chat.scrollHeight;
}

async function ask(event) {
  event.preventDefault();
  const question = box.value.trim();
  if (!question) return;

  if (typeof key === "undefined" || !key) {
    show("Tutor", "No API key found. Copy env.example.js to env.js and add your DeepInfra API key.");
    return;
  }

  show("You", question);
  messages.push({ role: "user", content: question });
  box.value = "";
  sendButton.disabled = true;

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model, messages })
    });
    const data = await response.json();

    if (!response.ok || !data.choices) {
      throw new Error(data.error?.message || `Request failed (${response.status})`);
    }

    const answer = data.choices[0].message.content;
    messages.push({ role: "assistant", content: answer });
    show("Tutor", answer);
  } catch (error) {
    messages.pop(); // drop the unanswered question so the conversation stays consistent
    show("Tutor", "Sorry, something went wrong: " + error.message);
  } finally {
    sendButton.disabled = false;
    box.focus();
  }
}

document.querySelector("#ask").addEventListener("submit", ask);
