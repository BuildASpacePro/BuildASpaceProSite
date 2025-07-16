document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    
    function updateColorsOnScroll() {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = documentHeight - windowHeight;
        const currentScroll = window.scrollY;
        const scrollProgress = Math.min(currentScroll / maxScroll, 1);
        
        const startBgColor = { r: 255, g: 255, b: 255 };
        const endBgColor = { r: 0, g: 0, b: 0 };
        const startTextColor = { r: 0, g: 0, b: 0 };
        const endTextColor = { r: 255, g: 255, b: 255 };
        
        const currentBgColor = {
            r: Math.round(startBgColor.r + (endBgColor.r - startBgColor.r) * scrollProgress),
            g: Math.round(startBgColor.g + (endBgColor.g - startBgColor.g) * scrollProgress),
            b: Math.round(startBgColor.b + (endBgColor.b - startBgColor.b) * scrollProgress)
        };
        
        const currentTextColor = {
            r: Math.round(startTextColor.r + (endTextColor.r - startTextColor.r) * scrollProgress),
            g: Math.round(startTextColor.g + (endTextColor.g - startTextColor.g) * scrollProgress),
            b: Math.round(startTextColor.b + (endTextColor.b - startTextColor.b) * scrollProgress)
        };
        
        const backgroundColor = `rgb(${currentBgColor.r}, ${currentBgColor.g}, ${currentBgColor.b})`;
        const textColor = `rgb(${currentTextColor.r}, ${currentTextColor.g}, ${currentTextColor.b})`;
        
        body.style.backgroundColor = backgroundColor;
        body.style.color = textColor;
        
        const allTextElements = document.querySelectorAll('h1, h2, p, div, em, strong');
        allTextElements.forEach(element => {
            if (!element.closest('a')) {
                element.style.color = textColor;
            }
        });
        
        const contentLinks = document.querySelectorAll('.post-content a');
        contentLinks.forEach(link => {
            const linkBlue = {
                r: Math.round(0 + (136 - 0) * scrollProgress),
                g: Math.round(102 + (204 - 102) * scrollProgress),
                b: Math.round(204 + (255 - 204) * scrollProgress)
            };
            link.style.color = `rgb(${linkBlue.r}, ${linkBlue.g}, ${linkBlue.b})`;
        });
        
        const navLinks = document.querySelectorAll('.site-nav a');
        navLinks.forEach(link => {
            link.style.color = textColor;
        });
    }
    
    window.addEventListener('scroll', updateColorsOnScroll);
    updateColorsOnScroll();
});