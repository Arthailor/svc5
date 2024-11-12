const fs = require("fs");
const path = require("path");

const renameFile = (oldFilename, newFilename) => {
  const oldPath = path.join(__dirname, "events", oldFilename);
  const newPath = path.join(__dirname, "events", newFilename);

  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Файл переименован с ${oldFilename} на ${newFilename}`);
  } else {
    console.error("Ошибка: Файл не найден.");
  }

  const indexPath = path.join(__dirname, "events", "events_index.json");
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath));
    index.forEach((event) => {
      if(event.filename == oldFilename)
      {
        event.filename = newFilename;
      }
    });
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  } else {
    console.log("Записей нет.");
  }
};

const [oldFilename, newFilename] = process.argv.slice(2);

if (oldFilename && newFilename) {
  renameFile(oldFilename, newFilename);
} else {
  console.log(
    "Использование: node rename.js <старое_название> <новое_название>"
  );
}