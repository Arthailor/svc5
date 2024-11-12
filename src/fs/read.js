const fs = require("fs");
const path = require("path");

const readEvent = (id) => {
  const indexPath = path.join(__dirname, "events", "events_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const event = index.find((event) => event.id === id);

  if (!event) {
    console.error("Ошибка: Событие не найдено.");
    return;
  }

  const eventPath = path.join(__dirname, "events", event.filename);
  const eventData = fs.readFileSync(eventPath);

  console.log("Информация о событии:");
  console.log(eventData.toString());
};

const id = process.argv[2];

if (id) {
  readEvent(id);
} else {
  console.log("Использование: node read.js <id события>");
}