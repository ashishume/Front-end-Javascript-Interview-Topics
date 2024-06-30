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
          return `<li class="mb-2"><a class="text-blue-500 hover:text-blue-700" href="/${encodeURIComponent(
            folder
          )}">${folder}</a></li>`;
        })
        .join("");
      const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Javascript Concepts</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="bg-gray-100 text-gray-900">
                    <div class="container mx-auto py-10">
                        <h1 class="text-3xl font-bold mb-5">Javscript Concepts</h1>
                        <div class='text-sm'>The following links contains the output in console, head on to the github repo for code details
                        <a href='https://github.com/ashishume/Front-end-Javascript-Interview-Topics/tree/75bec7c7515331a2df0692f08390324348e3702b/JsConcepts' class='text-blue-600 hover:text-blue-800 font-semibold hover:underline' target='_blank'>(Github repo)</a>
                       
                        </div>
                        <ul class="list-disc pl-5">
                            ${folderLinks}
                        </ul>
                    </div>
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
