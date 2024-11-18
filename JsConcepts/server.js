const express = require("express");
const path = require("path");
const fs = require("fs");
const marked = require("marked");
const app = express();
const PORT = 7100;

// Base folder where feature folders are located
const baseFolder = path.join(__dirname);

// Store folders and their content for search functionality
let foldersContent = {};

// Function to read markdown content
const readMarkdownContent = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error(`Error reading markdown file: ${filePath}`, err);
    return "";
  }
};

// Function to initialize folders content
const initializeFoldersContent = async (folders) => {
  for (const folder of folders) {
    const folderPath = path.join(baseFolder, folder);
    const indexPathMd = path.join(folderPath, "index.md");

    if (fs.existsSync(indexPathMd)) {
      const content = await readMarkdownContent(indexPathMd);
      foldersContent[folder] = {
        title: folder,
        content: content.toLowerCase(),
        path: `/${encodeURIComponent(folder)}`,
      };
    }
  }
};

// Function to dynamically add routes for all feature folders
const addRoutes = async (baseFolder) => {
  try {
    const folders = await fs.promises.readdir(baseFolder);

    // Initialize folders content for search
    await initializeFoldersContent(folders);

    folders.forEach((folder) => {
      const folderPath = path.join(baseFolder, folder);
      const indexPathHtml = path.join(folderPath, "index.html");
      const indexPathJs = path.join(folderPath, "index.js");
      const indexPathMd = path.join(folderPath, "index.md");

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

      if (fs.existsSync(indexPathMd)) {
        app.get(`/${encodeURIComponent(folder)}`, (req, res) => {
          fs.readFile(indexPathMd, "utf8", (err, data) => {
            if (err) {
              res.status(500).send("Error reading Markdown file");
              return;
            }
            const htmlContent = marked.parse(data);
            const html = `
              <!DOCTYPE html>
              <html>
              <head>
                  <title>${folder}</title>
                  <script src="https://cdn.tailwindcss.com"></script>
              </head>
              <body class="bg-gray-100 text-gray-900">
                  <div class="container mx-auto p-10">
                      <h1 class="text-3xl font-bold mb-5">${folder}</h1>
                      <div class="prose">${htmlContent}</div>
                  </div>
              </body>
              </html>
            `;
            res.send(html);
          });
        });
      }
    });

    // Add search API endpoint
    app.get("/api/search", (req, res) => {
      const query = req.query.q?.toLowerCase() || "";
      if (!query) {
        res.json([]);
        return;
      }

      const results = Object.values(foldersContent)
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.content.includes(query)
        )
        .map((item) => ({
          title: item.title,
          path: item.path,
        }));

      res.json(results);
    });

    // Serve the list of folders as HTML with search functionality
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
        <body class="bg-gray-100 text-gray-900 mx-5">
            <div class="container mx-auto py-10">
                <h1 class="text-3xl font-bold mb-5">Javascript Concepts</h1>
                <div class="mb-6">
                    <input 
                        type="text" 
                        id="searchInput" 
                        placeholder="Search concepts..."
                        class="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <div id="searchResults" class="mt-2 max-w-md"></div>
                </div>
                <div class='text-sm'>The following links contains the output in console, head on to the github repo for code details
                    <a href='https://github.com/ashishume/Front-end-Javascript-Interview-Topics/tree/75bec7c7515331a2df0692f08390324348e3702b/JsConcepts' 
                       class='text-blue-600 hover:text-blue-800 font-semibold hover:underline' 
                       target='_blank'>(Github repo)</a>
                </div>
                <ul class="list-disc pl-5 mt-4" id="folderList">
                    ${folderLinks}
                </ul>
            </div>
            <script>
                let debounceTimeout;
                const searchInput = document.getElementById('searchInput');
                const searchResults = document.getElementById('searchResults');
                const folderList = document.getElementById('folderList');

                searchInput.addEventListener('input', (e) => {
                    clearTimeout(debounceTimeout);
                    const query = e.target.value.trim();
                    
                    if (!query) {
                        searchResults.innerHTML = '';
                        folderList.style.display = 'block';
                        return;
                    }

                    debounceTimeout = setTimeout(async () => {
                        try {
                            const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
                            const results = await response.json();
                            
                            if (results.length > 0) {
                                searchResults.innerHTML = results
                                    .map(result => \`
                                        <a href="\${result.path}" 
                                           class="block p-2 hover:bg-gray-200 rounded text-blue-600 hover:text-blue-800">
                                            \${result.title}
                                        </a>
                                    \`).join('');
                                folderList.style.display = 'none';
                            } else {
                                searchResults.innerHTML = '<p class="text-gray-500">No results found</p>';
                                folderList.style.display = 'none';
                            }
                        } catch (error) {
                            console.error('Search error:', error);
                            searchResults.innerHTML = '<p class="text-red-500">Error performing search</p>';
                        }
                    }, 300);
                });
            </script>
        </body>
        </html>
      `;
      res.send(html);
    });
  } catch (err) {
    console.error(`Error reading folder: ${baseFolder}`, err);
  }
};

// Serve static files
app.use(express.static(baseFolder));

// Add dynamic routes
addRoutes(baseFolder);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
