document.addEventListener('DOMContentLoaded', () => {
    const iconMap = {
        'gjs-f-b1': 'fa fa-cube', // example mapping
        'gjs-f-image': 'fa fa-image',
        'gjs-f-text': 'fa fa-font',
        // add more mappings as needed
    };

    Object.entries(iconMap).forEach(([gjsClass, faClass]) => {
        document.querySelectorAll(`.${gjsClass}`).forEach(el => {
            el.classList.remove(gjsClass, 'gjs-fonts');
            el.classList.add(...faClass.split(' '));
            el.innerHTML = ''; // Optional: remove old icon glyph
        });
    });
      
});