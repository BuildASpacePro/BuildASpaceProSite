# Build A Space Program

A website dedicated to sharing knowledge and insights about space engineering, rocketry, and spacecraft systems.

## Project Structure

```
Build-A-Space-Program
├── public
│ ├── index.html         # Landing page of the website
│ ├── about.html         # About page detailing the mission
│ ├── blog.html          # Blog page for articles and updates
│ └── styles
│   └── main.css         # CSS styles for the website
├── src
│ ├── js
│ │ └── app.js           # JavaScript for interactivity
│ └── assets
│   └── favicon.ico      # Favicon for the website
├── package.json         # npm configuration file
└── README.md            # Project documentation
```

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode Toggle**: User preference saved in localStorage
- **Blog System**: Easy to update with new articles
- **Clean, Modern UI**: Focused on readability and user experience

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start local server: `npm start`
4. Visit `http://localhost:3000` in your browser

## Adding New Blog Posts

To add a new blog post, duplicate the existing article structure in `blog.html` and update the content with your new article. For example:

```html
<article id="your-article-id" class="blog-post">
    <h2>Your Article Title</h2>
    <div class="post-meta">
        <span class="date">Publication Date</span>
        <span class="category">Category</span>
    </div>
    <div class="post-content">
        <!-- Your article content here -->
    </div>
</article>
```

## Customization

- **Colors**: Edit theme variables in `main.css`
- **Fonts**: Change font-family properties in `main.css`
- **Layout**: Modify the grid and container widths as needed

## License

MIT