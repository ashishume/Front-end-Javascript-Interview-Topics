export const FolderData = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "public",
      isFolder: true,
      items: [
        { name: "index.html", isFolder: false },
        { name: "favico.ico", isFolder: false },
      ],
    },
    {
      name: "src",
      isFolder: true,
      items: [
        {
          name: "App.js",
          isFolder: false,
        },
        {
          name: "Index.js",
          isFolder: false,
        },
        {
          name: "Style.scss",
          isFolder: false,
        },
        {
          name: "Components",
          isFolder: true,
          items: [
            {
              name: "Utils.js",
              isFolder: false,
            },
            {
              name: "Styles.js",
              isFolder: false,
            },
          ],
        },
      ],
    },
  ],
};
