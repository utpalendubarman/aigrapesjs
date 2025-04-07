function component_config(editor, component_id){

  if(component_id == "hero-title"){
    // Create Selector
    const HeroTitleSelector = sm.addSector("sector-id", {
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
  }else if(component_id == "navbar-brand"){
    // Navbar Title
    const newSector = sm.addSector(".navbar-brand", {
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
  }
  
}