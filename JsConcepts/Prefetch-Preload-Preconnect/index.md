- Follow this link: https://sudiptasaha.hashnode.dev/prefetch-preload-and-preconnect 

- ## **Prefetch** hints the browser to fetch and cache resources that might be needed for subsequent navigation, improving the loading time of future pages.

` <link rel="prefetch" href="/uploads/images/pic.png"> `
 
Example: News article web page where the user lands on the home page which has multiple links for different articles, so  user need to have prefetched images and other styles to have a smooth experience.


- ## **Preload** hints the browser to fetch and cache a resource as soon as possible, even before it's needed. This is particularly useful for critical resources that are required for rendering the current page.
`<link rel="preload" href="/demo.js" as="script"> `


- ## **Preconnect** hints the browser to establish early connections to third-party origins to reduce connection latency when resources from those origins are later requested

` <link rel="preconnect" href="https://demo.com"> `

Example: A website integrates with a third-party API to fetch data or a CDN to serve static assets such as images or JavaScript libraries. Preconnecting to these domains can significantly reduce the time required to establish connections when the browser needs to fetch resources from them.