// импорт компонентов для работы node.js
const fs = require("fs");
const path = require("path");

const eventDir = path.join(__dirname, "events");
const indexFile = path.join(eventDir, "events_index.json");

fs.mkdirSync(eventDir, { recursive: true });

const createEvent = (className, eventType, eventDate) => {
  const id = Date.now().toString();
  const filename = `event_${id}.json`;
  const eventData = { id, className, eventType, eventDate };

  const eventPath = path.join(eventDir, filename);

  if (fs.existsSync(eventPath)) {
    console.error("Ошибка операции FS: Запись уже существует");
    return;
  }

  fs.writeFileSync(eventPath, JSON.stringify(eventData, null, 2));

  const index = fs.existsSync(indexFile)
    ? JSON.parse(fs.readFileSync(indexFile))
    : [];
  index.push({ id, className, eventType, eventDate, filename });
  // null - не нужно использовать функцию замены
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`Событие "${eventType}" для класса "${className}" было успешно добавлено на ${eventDate}.`);
};

// Получаем аргументы командной строки
const [className, eventType, eventDate] = process.argv.slice(2);

if (className && eventType && eventDate) {
  createEvent(className, eventType, eventDate);
} else {
  console.log("Использование: node create.js <класс> <тип события> <дата события>");
}