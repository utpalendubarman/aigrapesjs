function custom_components(editor, sections) {
    const sm = editor.StyleManager;

    // Create all sectors once on init (hidden by default)
    sections.forEach(({ section }) => {
        const sectorId = `${section}-component-id`;
        const sectorName = section.replace(/-/g, ' ').toUpperCase();

        if (!sm.getSector(sectorId)) {
            sm.addSector(sectorId, {
                name: sectorName,
                open: false,
                visible: false,
                properties: [
                    { property: "margin-top", type: "integer", defaults: '0', units: ['px', 'em', 'rem'], unit: 'px' },
                    { property: "margin-bottom", type: "integer", units: ['px', 'em', 'rem'] },
                    { property: "margin-left", type: "integer", units: ['px', 'em', 'rem'] },
                    { property: "margin-right", type: "integer", units: ['px', 'em', 'rem'] }
                ],
                set:0
            });

            setTimeout(() => {
                const smEl = sm.render().el;
                if (smEl) {
                    const sectorEl = smEl.querySelector(`.gjs-sm-sector__${section}-component-id`);
                    if (sectorEl && smEl.firstChild !== sectorEl) {
                        smEl.insertBefore(sectorEl, smEl.firstChild);
                    }
                }
            }, 0);
        }
        
    });

    editor.on("component:selected", (model) => {
        const classList = model.getClasses().map(c => c.id);
        const sectionNames = sections.map(s => s.section);

        // Hide all sectors first
        sectionNames.forEach(section => {
            const sector = sm.getSector(`${section}-component-id`);
            if (sector) sector.set("visible", false);
        });

        // Find first matching section name
        const match = sectionNames.find(name => classList.includes(name));
        if (match) {
            const sector = sm.getSector(`${match}-component-id`);
            if (sector) {
                sector.set("visible", true);
                sector.set("open", true);
            }

            // OPTIONAL: Sync computed style into model (to display in SM)
            const el = model.getEl();
            const computed = window.getComputedStyle(el);
            const margins = ['margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
            const styles = {};
            margins.forEach(prop => {
                const value = computed.getPropertyValue(prop);
                if (value) styles[prop] = value;
            });

            model.setStyle(styles);
        }

        // Re-render Style Manager
        sm.render(model);
    });

    return editor.DomComponents.getTypes();
}




function register_components(editor, sections) {
    sections.forEach((item) => {
        const name = item.section.replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

        editor.DomComponents.addType(item.section, {
            isComponent: (el) => {
                return el.tagName === 'DIV' && el.classList.contains(item.section)
                    ? { type: item.section }
                    : false;
            },
            model: {
                defaults: {
                    name: name,
                    tagName: 'div',
                    classes: [item.section],
                    draggable: true,
                    droppable: false,
                    editable: true,
                    content: '',
                    type: item.section,
                    traits: [
                        {
                            type: 'integer',
                            name: 'margin-top',
                            label: 'Margin Top',
                            placeholder: 'Enter Number',
                            changeProp: 1,
                        },
                        {
                            type: 'integer',
                            name: 'margin-left',
                            label: 'Margin Left',
                            placeholder: 'Enter Number',
                            changeProp: 1,
                        },
                        {
                            type: 'integer',
                            name: 'margin-right',
                            label: 'Margin Right',
                            placeholder: 'Enter Number',
                            changeProp: 1,
                        },
                        {
                            type: 'integer',
                            name: 'margin-bottom',
                            label: 'Margin Bottom',
                            placeholder: 'Enter Number',
                            changeProp: 1,
                        }
                    ],
                    selectable: true,
                },
                init() {
                    this.on('change:margin-top', this.marginTop);
                    this.on('change:margin-left', this.marginLeft);
                    this.on('change:margin-right', this.marginRight);
                    this.on('change:margin-bottom', this.marginBottom);
                },
        
                marginTop() {
                    const val = this.get('margin-top');
                    this.setStyle({
                        'margin-top': `${val}px`
                    });
                },
                marginLeft() {
                    const val = this.get('margin-left');
                    this.setStyle({
                        'margin-left': `${val}px`
                    });
                },
                marginRight() {
                    const val = this.get('margin-right');
                    this.setStyle({
                        'margin-right': `${val}px`
                    });
                },
                marginBottom() {
                    const val = this.get('margin-bottom');
                    this.setStyle({
                        'margin-bottom': `${val}px`
                    });
                }
            }
        });
    });
}


function hideAllAndShowSelected(sectionNames){
    console.log("Provided Sections are : "+JSON.stringify(sectionNames))
    sectionNames.forEach((item)=>{
        //class="gjs-sm-sector gjs-sm-sector__hero-component-id no-select gjs-sm-open"
        try {
            document.querySelectorAll(`.gjs-sm-sector__${item}-component-id`)[0].style.display="none";
        } catch (error) {
            console.log(error)
        }
        
    })
}