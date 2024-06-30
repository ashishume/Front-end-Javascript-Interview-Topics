const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Base folder where feature folders are located
const baseFolder = path.join(__dirname);

// Function to dynamically add routes for all feature folders
const addRoutes = (baseFolder) => {
  fs.readdir(baseFolder, (err, folders) => {
    if (err) {
      console.error(`Error reading folder: ${baseFolder}`, err);
      return;
    }
    folders.forEach((folder) => {
      const folderPath = path.join(baseFolder, folder);
      const indexPathHtml = path.join(folderPath, "index.html");
      const indexPathJs = path.join(folderPath, "index.js");

      if (fs.existsSync(indexPathHtml)) {
        app.get(`/${encodeURIComponent(folder)}`, (req, res) => {
          res.sendFile(indexPathHtml);
        });
      }

      if (fs.existsSync(indexPathJs)) {
        app.get(`/${encodeURIComponent(folder)}/script`, (req, res) => {
          res.sendFile(indexPathJs);
        });
      }
    });

    // Serve the list of folders as HTML
    app.get("/", (req, res) => {
      const folderLinks = folders
        .map((folder) => {
          return `<li><a href="/${encodeURIComponent(
            folder
          )}">${folder}</a></li>`;
        })
        .join("");
      const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>JsConcepts Server</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                    <h1>JsConcepts Folders</h1>
                    <ul>
                        ${folderLinks}
                    </ul>
                </body>
                </html>
            `;
      res.send(html);
    });
  });
};

// Serve static files
app.use(express.static(baseFolder));

// Add dynamic routes
addRoutes(baseFolder);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
