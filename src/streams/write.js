const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "events.json");

const writeDataToFile = (newEventData) => {
  // Читаем текущее содержимое файла
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return;
    }

    let events = [];

    // Если файл не пустой, парсим его содержимое
    if (data) {
      try {
        events = JSON.parse(data);
      } catch (parseError) {
        console.error("Ошибка при парсинге JSON:", parseError);
        return;
      }
    }

    // Добавляем новые данные
    events.push(...newEventData);

    // Записываем обновленный массив обратно в файл
    fs.writeFile(filePath, JSON.stringify(events, null, 2), (writeError) => {
      if (writeError) {
        console.error("Ошибка при записи файла:", writeError);
      } else {
        console.log("Запись завершена.");
      }
    });
  });
};

const newEvents = [
  {
    id: Date.now(),
    className: "10A",
    eventType: "Праздник",
    eventDate: "2023-12-01",
  },
  {
    id: Date.now() + 1,
    className: "9B",
    eventType: "Соревнование",
    eventDate: "2023-11-15",
  },
];

// Вызываем функцию для записи данных
writeDataToFile(newEvents);