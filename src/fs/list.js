const fs = require("fs");
const path = require("path");

const listEvents = () => {
  const indexPath = path.join(__dirname, "events", "events_index.json");

  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath));
    console.log("Список всех событий:");
    index.forEach((event) => {
      console.log(`${event.id}: ${event.className} - ${event.eventType} на ${event.eventDate}`);
    });
  } else {
    console.log("Записей нет.");
  }
};

listEvents();