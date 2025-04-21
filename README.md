# Build A Space Program

A website dedicated to sharing knowledge and insights about space engineering, rocketry, and spacecraft systems.

## Project Structure

```
Build-A-Space-Program
├── site
│   ├── _posts/                 # Blog posts written in Markdown
│   │   └── 2025-04-14-welcome-to-jekyll.markdown
│   ├── _site/                  # Generated static site (do not edit directly)
│   ├── _config.yml             # Jekyll configuration file
│   ├── index.markdown          # Landing page content
│   ├── about.markdown          # About page content
│   ├── 404.html                # Custom 404 error page
│   ├── Gemfile                 # Ruby gems for Jekyll and plugins
│   └── .gitignore              # Files and directories to ignore in Git
├── CNAME                       # Custom domain configuration
└── README.md                   # Project documentation
```

## Features

- **Static Site Generator**: Powered by Jekyll for fast and secure static websites.
- **Markdown Support**: Write blog posts and pages in Markdown for simplicity.
- **Customizable Theme**: Based on the Minima theme, easily customizable via `_config.yml` and CSS.
- **Blog System**: Automatically generates blog pages from Markdown files in the `_posts` directory.

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Build-A-Space-Program.git
   cd Build-A-Space-Program/site
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Serve the site locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and visit:
   ```
   http://localhost:4000
   ```

## Adding New Blog Posts

1. Create a new Markdown file in the `_posts` directory. Name it using the format:
   ```
   YEAR-MONTH-DAY-title.markdown
   ```

2. Add the following front matter to the top of the file:
   ```markdown
   ---
   layout: post
   title: "Your Blog Post Title"
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: [category1, category2]
   ---
   ```

3. Write your content below the front matter using Markdown syntax.

4. Save the file and restart the Jekyll server to see your changes.

## Customization

- **Site Settings**: Update `_config.yml` to change the site title, description, and other global settings.
- **Theme Customization**: Modify the CSS in the Minima theme or override it by adding custom styles.
- **Navigation**: Edit the navigation links in the `_layouts` or `_includes` directory (if overridden).

## Deployment

1. Build the site for production:
   ```bash
   bundle exec jekyll build
   ```

2. Deploy the contents of the `_site` directory to your web server or hosting platform (e.g., GitHub Pages).

## License

MIT