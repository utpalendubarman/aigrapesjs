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

function extractJSFromHTML(htmlString) {
    // Parse the HTML string into a DOM object
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
  
    // Get all <script> elements
    const scriptTags = doc.querySelectorAll('script');
  
    // Extract JavaScript code
    const scripts = [];
    scriptTags.forEach(script => {
      if (!script.src) { // Only get inline scripts
        scripts.push(script.textContent.trim());
      }
    });
  
    return scripts;
  }
  
  // Example usage
  const html = `
    <html>
      <head>
        <script>
          console.log('Hello World');
        </script>
      </head>
      <body>
        <h1>Page Title</h1>
        <script>
          alert('Another script');
        </script>
      </body>
    </html>
  `;
  
  