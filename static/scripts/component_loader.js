// Root Adapter
const component_loader = (editor,sections) => {
    console.log(sections)
    editor.on("selector:custom", (props) => {
      classes = props.selected.map((el) => {
        return el.attributes.name;
      });
      const sm = editor.StyleManager;

      // Hero Title
      if (classes.includes("hero-title")) {  
          const HeroTitleSelector = sm.addSector("hero-title-id", {
          name: "Hero Title",
          open: true,
          properties: [
            {
              property: "font-family",
              type: "select",
              defaults: "Arial",
              list: [
                { value: "Arial", name: "Arial" },
                { value: "Helvetica", name: "Helvetica" },
                { value: "Times New Roman", name: "Times New Roman" },
                { value: "Courier New", name: "Courier New" },
                { value: "Georgia", name: "Georgia" },
                { value: "Verdana", name: "Verdana" },
                { value: "Tahoma", name: "Tahoma" }
              ]
            },
            { property: "color", type: "color" },
            { property: "font-size", type: "integer", units: ['px', 'em', 'rem'] },
            { property: "text-shadow", type: "text" },
          ]
        });
        sm.getSectors().remove("hero-title-id");
        sm.getSectors().add(HeroTitleSelector, { at: 0 });
      } else {
        if(sm.getSector("hero-title-id")!=null){
          sm.getSector("hero-title-id").set("visible", false);
        }
      }

      // Navbar Brand
      if (classes.includes("navbar-brand")) {  
        const HeroTitleSelector = sm.addSector("navbar-brand-id", {
          name: "Navbar Brand",
          open: true,
          properties: [
            {
              property: "font-family",
              type: "select",
              defaults: "Arial",
              list: [
                { value: "Arial", name: "Arial" },
                { value: "Helvetica", name: "Helvetica" },
                { value: "Times New Roman", name: "Times New Roman" },
                { value: "Courier New", name: "Courier New" },
                { value: "Georgia", name: "Georgia" },
                { value: "Verdana", name: "Verdana" },
                { value: "Tahoma", name: "Tahoma" }
              ]
            },
            { property: "color", type: "color" },
            { property: "font-size", type: "integer", units: ['px', 'em', 'rem'] },
            { property: "text-shadow", type: "text" },
          ]
        });
        sm.getSectors().remove("navbar-brand-id");
        sm.getSectors().add(HeroTitleSelector, { at: 0 });
      }else{
        if(sm.getSector("navbar-brand-id")!=null){
          sm.getSector("navbar-brand-id").set("visible", false);
        }
      }

      // Hero Subtitle
      if (classes.includes("hero-subtitle")) {  
          const HeroSubTitleSelector = sm.addSector("hero-subtitle-id", {
          name: "Hero Subtitle",
          open: true,
          properties: [
            {
              property: "font-family",
              type: "select",
              defaults: "Arial",
              list: [
                { value: "Arial", name: "Arial" },
                { value: "Helvetica", name: "Helvetica" },
                { value: "Times New Roman", name: "Times New Roman" },
                { value: "Courier New", name: "Courier New" },
                { value: "Georgia", name: "Georgia" },
                { value: "Verdana", name: "Verdana" },
                { value: "Tahoma", name: "Tahoma" }
              ]
            },
            { property: "color", type: "color" },
            { property: "font-size", type: "integer", units: ['px', 'em', 'rem'] },
            { property: "text-shadow", type: "text" },
          ]
        });
        sm.getSectors().remove("hero-subtitle-id");
        sm.getSectors().add(HeroSubTitleSelector, { at: 0 });
      } else {
        if(sm.getSector("hero-subtitle-id")!=null){
          sm.getSector("hero-subtitle-id").set("visible", false);
        }
      }

      // CTA Button
      if (classes.includes("hero-button")) {  
          const HeroTitleSelector = sm.addSector("hero-button-id", {
          name: "CTA Button",
          open: true,
          properties: [
            { property: "background-color", type: "color" },
            { property: "color", type: "color" },
            { property: "font-size", type: "integer", units: ['px', 'em', 'rem'] },
          ]
        });
        sm.getSectors().remove("hero-button-id");
        sm.getSectors().add(HeroTitleSelector, { at: 0 });
      } else {
        if(sm.getSector("hero-button-id")!=null){
          sm.getSector("hero-button-id").set("visible", false);
        }
      }

      // Hero Background
      if (classes.includes("hero")) {  
        const HeroBackground = sm.addSector("hero-id", {
          name: "Hero Background",
          open: true,
          properties: [
            {
              name: "Hero Image URL",
              property: "background-image", // Custom property key (not a CSS property)
              type: "text",
              defaults: "url(PLACE_IMAGE_URL)", // Default value
              stylable: false, // ✅ prevents export in CSS
              traits: [
                {
                  type: 'text',
                  label: 'Hero Background Image',
                  name: 'background-image',
                  changeProp: 1,
                  placeholder: 'https://example.com/image.jpg',
                },
              ],init() {
                this.on('change:background-image', this.updateBackgroundImage);
              },
              
              updateBackgroundImage() {
                const url = this.get('background-image');
                this.setStyle({ 'background-image': url ? `url(${url})` : 'none' });
              },
              
            }
          ]
        });
        sm.getSectors().remove("hero-id");
        sm.getSectors().add(HeroBackground, { at: 0 });
      } else {
        //sm.removeSector("hero-id");
        //sm.getSector("hero-id").set("visible", false);
      }

    });

    // Register Hero Title component
    editor.DomComponents.addType('hero-title', {
      isComponent: (el) => {
        return el.tagName === 'H1' && el.classList.contains('hero-title')
          ? { type: 'hero-title' }
          : false;
      },
      model: {
        defaults: {
          name: 'Hero Title',
          tagName: 'h1',
          classes: ['hero-title'],
          draggable: true,
          droppable: false,
          editable: true,
          content: 'Hero Title Text',
          type: 'text',
          traits: [],
        }
      },
      extend: 'text',
    });

    // Register Hero Subtitle  component
    editor.DomComponents.addType('hero-subtitle', {
      isComponent: (el) => {
        return el.tagName === 'p' && el.classList.contains('hero-subtitle')
          ? { type: 'hero-subtitle' }
          : false;
      },
      model: {
        defaults: {
          name: 'Hero Subtitle',
          tagName: 'p',
          classes: ['hero-subtitle'],
          draggable: true,
          droppable: false,
          editable: true,
          content: 'Hero Subtitle Text',
          type: 'text',
          traits: [],
        }
      },
      extend: 'text',
    });

    // Register Navbar Brand component
    editor.DomComponents.addType('navbar-brand', {
      isComponent: (el) => {
        return el.tagName === 'A' && el.classList.contains('navbar-brand')
          ? { type: 'navbar-brand' }
          : false;
      },
      model: {
        defaults: {
          name: 'Navbar Brand',
          tagName: 'a',
          classes: ['navbar-brand'],
          draggable: true,
          droppable: false,
          editable: true,
          content: 'Hero Title Text',
          type: 'text',
          traits: [],
        }
      },
      extend: 'text',
    });

    // Register CTA Button
    editor.DomComponents.addType('hero-button', {
      isComponent: (el) => {
        return el.tagName === 'A' && el.classList.contains('hero-button')
          ? { type: 'hero-button' }
          : false;
      },
      model: {
        defaults: {
          name: 'CTA Button',
          tagName: 'a',
          classes: ['hero-button'],
          draggable: true,
          droppable: false,
          editable: true,
          content: 'Hero Title Text',
          type: 'text',
          traits: [
            {
              type: 'text',
              label: 'URL:',
              name: 'href',
              placeholder: 'https://example.com',
            },
          ]
        }
      },
      extend: 'text',
    });

    // Register Hero Background
    editor.DomComponents.addType('hero', {
      isComponent: (el) => {
        return el.tagName === 'SECTION' && el.classList.contains('hero')
          ? { type: 'hero' }
          : false;
      },
      model: {
        defaults: {
          name: 'Hero Background',
          tagName: 'section',
          classes: ['hero'],
          draggable: true,
          droppable: false,
          editable: true,
          content: 'Hero Background',
          type: 'text',
          traits: [],
        }
      }
    });
  
  };