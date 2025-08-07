function combineColors(bg, colors) {
    let a = colors[3];
    let r = Math.round((1 - a) * bg[0] + a * colors[0]);
    let g = Math.round((1 - a) * bg[1] + a * colors[1]);
    let b = Math.round((1 - a) * bg[2] + a * colors[2]);
    let color = [r, g, b].join();
    return 'rgb(' + color + ')';
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.form');
    const blocks = container.querySelectorAll('.form_data');
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            const blockRect = block.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const scrollLeft = container.scrollLeft;
            const offset = blockRect.left - containerRect.left;
            const centerOffset = offset - (containerRect.width / 2) + (blockRect.width / 2);

            container.scrollTo({
                left: scrollLeft + centerOffset, behavior: 'smooth'
            });
        });
    });
});