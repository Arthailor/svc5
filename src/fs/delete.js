const fs = require("fs");
const path = require("path");

const deleteEvent = (id) => {
  const indexPath = path.join(__dirname, "events", "events_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const event = index.find((event) => event.id === id);

  if (!event) {
    console.error("Ошибка: Запись не найдена.");
    return;
  }

  const eventPath = path.join(__dirname, "events", event.filename);
  console.log(eventPath);

  if (fs.existsSync(eventPath)) {
    // Удаление файла
    fs.unlinkSync(eventPath);
    console.log(`Событие с ID ${id} было удалено.`);

    const updatedIndex = index.filter((event) => event.id !== id);
    fs.writeFileSync(indexPath, JSON.stringify(updatedIndex, null, 2));
  } else {
    console.error("Ошибка: Файл не найден.");
  }
};

const id = process.argv[2];

if (id) {
  deleteEvent(id);
} else {
  console.log("Использование: node delete.js <id события>");
}