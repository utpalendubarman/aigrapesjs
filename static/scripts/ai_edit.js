function ai_edit(editor) {
    // Add toolbar button on component select
    editor.on('component:selected', (component) => {
        if (!component) return;
        const toolbar = component.get('toolbar') || [];
        const exists = toolbar.some(item => item.id === 'ai-edit');
        if (!exists) {
            toolbar.push({
                id: 'ai-edit',
                label: '<i class="fa fa-magic glow-icon"></i>',
                attributes: { title: 'Edit with AI' },
                command: 'open-ai-edit-prompt'
            });
            component.set('toolbar', toolbar);
        }
    });

    prompt_input_fix = `<style>.gjs-mdl-container {
    background-color: rgb(0 0 0 / 25%) !important;
}.input-wrapper{width:fit-content;height:45px;border-radius:12px;padding:5px;box-sizing:content-box;display:flex;align-items:center;background-color:#292524}.icon{width:30px;fill:rgb(255,255,255);margin-left:8px;transition:all 0.3s}.input{width:410px;height:100%;border:none;outline:none;padding-left:15px;background-color:#292524;color:white;font-size:1em}.input:-webkit-autofill{-webkit-box-shadow:0 0 0px 1000px #292524 inset;-webkit-text-fill-color:#ffffff}.Modify-btn{height:100%;width:95px;border:none;border-radius:15px;color:rgb(0,0,0);cursor:pointer;background-color:#ffffff;font-weight:500;overflow:hidden;display:flex;align-items:center;justify-content:center;position:relative;transition:all 0.3s}.arrow{position:absolute;margin-right:150px;transition:all 0.3s}.input-wrapper:active.icon{transform:scale(1.3)}.Modify-btn:hover{color:#c2c2c2}.Modify-btn:hover.arrow{margin-right:0;animation:jello-vertical 0.9s both;transform-origin:right}@keyframes jello-vertical{0%{transform:scale3d(1,1,1)}30%{transform:scale3d(0.75,1.25,1)}40%{transform:scale3d(1.25,0.75,1)}50%{transform:scale3d(0.85,1.15,1)}65%{transform:scale3d(1.05,0.95,1)}75%{transform:scale3d(0.95,1.05,1)}100%{transform:scale3d(1,1,1)}}.Modify-btn:active{transform:scale(0.9)}</style><div class="input-wrapper"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<g data-name="Layer 2"><g data-name="inbox"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect><path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z"></path></g></g></svg><input type="text" id="fix" name="prompt" placeholder="Change the color of the element" class="input"/><button class="Modify-btn" id="fix_btn"><svg 
    xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 38 15" class="arrow"><path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"></path></svg>Enhance</button></div>`;

    // Create a simple AI prompt modal
    editor.Commands.add('open-ai-edit-prompt', {
        run(editor) {
            const modal = editor.Modal;
            const selected = editor.getSelected();
            if (!selected) return;
            const content = document.createElement('div');
            content.innerHTML = prompt_input_fix;
            modal.setTitle('');
            modal.setContent(content);
            modal.open();
            fix_ui_events(modal, editor);
        }
    });
}

function get_selected_element(editor) {
    const selected = editor.getSelected();
    if (selected) {
        const selectedHtml = selected.toHTML();
        const selectedCss = editor.CssComposer.getAll().models
            .filter(rule => rule.get('selectors').some(sel => selected.getSelectorsString().includes(sel.get('name'))))
            .map(rule => rule.toCSS())
            .join('\n');

        return { "html": selectedHtml, "css": selectedCss }
    }
}

function get_canvas_code(editor) {
    const fullHtml = editor.getHtml();
    const fullCss = editor.getCss();
    const code = `<style>${fullCss}</style>${fullHtml}`
    return code
}

function pushJavascript(editor) {
    editor.addComponents({
        type: "",
        content: "",
        script: function () {
            var items = document.querySelectorAll("#igbjv");
            for (var i = 0, len = items.length; i < len; i++) {
                (function () {
                    var n,
                        t = this,
                        e = "gjs-collapse",
                        a = "max-height",
                        o = 0,
                        i = (function () {
                            var n = document.createElement("void"),
                                t = {
                                    transition: "transitionend",
                                    OTransition: "oTransitionEnd",
                                    MozTransition: "transitionend",
                                    WebkitTransition: "webkitTransitionEnd",
                                };
                            for (var e in t) if (void 0 !== n.style[e]) return t[e];
                        })(),
                        r = function (n) {
                            o = 1;
                            var t = (function (n) {
                                var t = window.getComputedStyle(n),
                                    e = t.display,
                                    o = parseInt(t[a]);
                                if ("none" !== e && 0 !== o) return n.offsetHeight;
                                (n.style.height = "auto"),
                                    (n.style.display = "block"),
                                    (n.style.position = "absolute"),
                                    (n.style.visibility = "hidden");
                                var i = n.offsetHeight;
                                return (
                                    (n.style.height = ""),
                                    (n.style.display = ""),
                                    (n.style.position = ""),
                                    (n.style.visibility = ""),
                                    i
                                );
                            })(n),
                                e = n.style;
                            (e.display = "block"),
                                (e.transition = "".concat(a, " 0.25s ease-in-out")),
                                (e.overflowY = "hidden"),
                                "" == e[a] && (e[a] = 0),
                                0 == parseInt(e[a])
                                    ? ((e[a] = "0"),
                                        setTimeout(function () {
                                            e[a] = t + "px";
                                        }, 10))
                                    : (e[a] = "0");
                        };
                    e in t ||
                        t.addEventListener("click", function (e) {
                            if ((e.preventDefault(), !o)) {
                                var l = t.closest("[data-gjs=navbar]"),
                                    c =
                                        null == l
                                            ? void 0
                                            : l.querySelector("[data-gjs=navbar-items]");
                                c && r(c),
                                    n ||
                                    (null == c ||
                                        c.addEventListener(i, function () {
                                            o = 0;
                                            var n = c.style;
                                            0 == parseInt(n[a]) &&
                                                ((n.display = ""), (n[a] = ""));
                                        }),
                                        (n = 1));
                            }
                        }),
                        (t[e] = 1);
                }).bind(items[i])();
            }
        },
    });
}


// UI Events
function fix_ui_events(modal, editor) {
    const modalEl = document.querySelector('.gjs-mdl-container');

    const loaderText = document.getElementById('writer-loading-text');

    if (loaderText !== null) {
        let dots = 0;
        const maxDots = 3;

        setInterval(() => {
            dots = (dots + 1) % (maxDots + 1); // Cycle from 0 to maxDots
            const dotStr = '.'.repeat(dots);
            loaderText.innerHTML = `Generating code ${dotStr}`;
        }, 500); // Every half second
    }

    if (!modalEl) return;
    if (modalEl.getAttribute('data-listener') === 'true') return;


    modalEl.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'fix_btn') {
            if (!target.classList.contains('clicked')) {
                target.classList.add('clicked'); // Prevent multiple clicks
                const prompt = document.querySelector('#fix').value;
                if (!prompt) return;

                element_code = get_selected_element(editor);
                canvas_code = get_canvas_code(editor);

                socket = io({
                    path: '/ws'
                });

                socket.on('connect', () => {
                    console.log('Connected to Socket server');
                });
                socket.emit('fix', { element: element_code.html, canvas: canvas_code, prompt: prompt });

                start_writing(modal);

                fixed_code = '';
                socket.on('fixed', (data) => {
                    if (data.response != "None") {
                        fixed_code += data.response
                    }
                });
                socket.on('fixing_done', (data) => {
                    console.log('target element: ')
                    console.log(element_code.html)
                    fixed_code = fixed_code.replaceAll('```html', '')
                    fixed_code = fixed_code.replaceAll('```', '')
                    console.log(fixed_code);
                    const canvas = editor.Canvas.getBody().parentElement;
                    const scrollTop = canvas.scrollTop;
                    const scrollLeft = canvas.scrollLeft;

                    let new_canvas_code = canvas_code.replace(element_code.html, fixed_code);

                    editor.DomComponents.clear();
                    editor.CssComposer.clear();
                    editor.setComponents(new_canvas_code);
                    pushJavascript(editor);

                    setTimeout(() => {
                        canvas.scrollTop = scrollTop;
                        canvas.scrollLeft = scrollLeft;
                    }, 100);

                    modal.close();
                });
            }
        }
    });



    modalEl.setAttribute('data-listener', 'true');
}

function start_writing(modal) {
    dom_elements = `<style>.writing-holder{margin-top:40px;margin-bottom:40px;display:flex;justify-content:center;align-items:center;flex-direction:column}@keyframes loader_5191{from{opacity:0}to{opacity:1}}.square{background:#ddd;width:10px;height:10px;position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-5px}#sq1{margin-top:-25px;margin-left:-25px;animation:loader_5191 675ms ease-in-out 0s infinite alternate}#sq2{margin-top:-25px;animation:loader_5191 675ms ease-in-out 75ms infinite alternate}#sq3{margin-top:-25px;margin-left:15px;animation:loader_5191 675ms ease-in-out 150ms infinite}#sq4{margin-left:-25px;animation:loader_5191 675ms ease-in-out 225ms infinite}#sq5{animation:loader_5191 675ms ease-in-out 300ms infinite}#sq6{margin-left:15px;animation:loader_5191 675ms ease-in-out 375ms infinite}#sq7{margin-top:15px;margin-left:-25px;animation:loader_5191 675ms ease-in-out 450ms infinite}#sq8{margin-top:15px;animation:loader_5191 675ms ease-in-out 525ms infinite}#sq9{margin-top:15px;margin-left:15px;animation:loader_5191 675ms ease-in-out 600ms infinite}</style><div class="writing-holder"><div class="loader" style="margin-bottom:120px"><div class="square" id="sq1"></div><div class="square" id="sq2"></div><div class="square" id="sq3"></div><div class="square" id="sq4"></div><div class="square" id="sq5"></div><div class="square" id="sq6"></div><div class="square" id="sq7"></div><div class="square" id="sq8"></div><div class="square" id="sq9"></div></div><h3 id="writer-loading-text" style="color:#ffffff;font-family: sans-serif;">Analysing requirement</h3></div>`;
    modal.setContent(dom_elements);
    fix_ui_events(modal)
}