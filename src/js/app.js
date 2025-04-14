document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme attribute
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to cards when they come into view
    const observeElements = document.querySelectorAll('.card, .blog-post');
    
    if (observeElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Fetch and render blog posts
    const blogPostsContainer = document.getElementById('blog-posts');
    if (blogPostsContainer) {
        fetch('../src/assets/blog-posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    if (post.file) {
                        // Fetch and render Markdown file
                        fetch(post.file)
                            .then(response => response.text())
                            .then(markdown => {
                                const article = document.createElement('article');
                                article.classList.add('blog-post');
                                article.innerHTML = marked.parse(markdown); // Use a Markdown parser like "marked.js"
                                blogPostsContainer.appendChild(article);
                            })
                            .catch(error => console.error('Error loading blog post:', error));
                    } else {
                        // Render inline content
                        const article = document.createElement('article');
                        article.classList.add('blog-post');
                        article.innerHTML = `
                            <h2>${post.title}</h2>
                            <div class="post-meta">
                                <span class="date">${post.date}</span>
                                <span class="category">${post.category}</span>
                            </div>
                            <div class="post-content">
                                ${post.content}
                            </div>
                        `;
                        blogPostsContainer.appendChild(article);
                    }
                });
            })
            .catch(error => console.error('Error loading blog posts:', error));
    }

    // Fetch and render blog post links
    const blogLinksContainer = document.getElementById('blog-links');
    if (blogLinksContainer) {
        fetch('../src/assets/blog-posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.textContent = post.title;
                    link.href = post.file ? post.file : '#';
                    link.target = '_blank';
                    listItem.appendChild(link);
                    blogLinksContainer.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error loading blog post links:', error));
    }
});