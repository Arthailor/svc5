const { spawn } = require("child_process");
const path = require("path");

const searchEvents = (keyword) => {
  const findstr = spawn("findstr", [
    keyword,
    path.join(__dirname, "..", "streams", "events.json"),
  ]);

  findstr.stdout.on("data", (data) => {
    console.log(`Результаты поиска: \n${data}`);
  });

  findstr.stderr.on("data", (data) => {
    console.error(`Ошибка поиска: ${data}`);
  });

  findstr.on("error", (error) => {
    console.error(`Ошибка: ${error.message}`);
  });

  findstr.on("close", (code) => {
    console.log(`Поиск завершен с кодом: ${code}`);
  });
};

const [keyword] = process.argv.slice(2);

if (keyword) {
  searchEvents(keyword);
} else {
  console.log("Использование: node spawn.js <ключевое_слово>");
}