document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (!typewriterElement) return;
    
    const text = 'Build. Test. Fly.';
    let index = 0;
    
    // Clear initial text and show cursor
    typewriterElement.innerHTML = '<span class="cursor">|</span>';
    
    function typeText() {
        if (index < text.length) {
            const currentText = text.substring(0, index + 1);
            typewriterElement.innerHTML = currentText + '<span class="cursor">|</span>';
            index++;
            setTimeout(typeText, 170); // Adjust typing speed here (170ms per character)
        } else {
            // Keep blinking cursor for a bit, then remove it
            setTimeout(() => {
                typewriterElement.innerHTML = text;
            }, 2000);
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeText, 500);
});