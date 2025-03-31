let socket;
let stage="prompt"  // ["prompt","adjustment"]
let agent_response=""
let init_prompt=""
let language="English"
let color_scheme="auto"
let code=""
function ai_generate(editor) {
  // 1. Add a custom editor
  const modal = editor.Modal;
  let summarisation = '';
  editor.Panels.addButton('options', [{
    id: 'custom-button',
    className: 'fa fa-terminal',  
    command: 'open-custom-modal', 
    attributes: { title: 'Open Custom Popup' },
  }]);

  // Understanding
  const understandings = (response) =>{ 
    action_loader=`<h5 style="color:#ffffff">Adjusting</h5>`
    return lang_color_picker+`
  <style>
  .understandings-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }

  .understanding-text {
    height: auto;
    border-radius: 12px;
    padding: 15px;
    font-family: sans-serif;
    box-sizing: content-box;
    font-size: 15px;
    line-height: 1.6;
    background-color: #292524;
    color: #cfcfcf;
    width:98%;
  }
  .action-holder {
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
  }
  .action-loader {
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
  }
  .approve-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .approve-btn:hover {
    background-color: #43a047;
  }

  .approve-btn i {
    font-size: 16px;
  }

  .change-question {
    color: #cfcfcf;
    font-size: 13px;
    font-family: sans-serif;
  }
</style>

<div class="understandings-holder">
  <div class="understanding-text">
    ${response}
  </div>
  <div id="typingArea" style="color:white; font-family:sans-serif;"></div>

  <!-- Action Row -->
  <div class="action-holder">
    <button id="approve" class="approve-btn">
      <i class="fa fa-check"></i> Approve
    </button>
    <div style="margin-bottom:20px" class="change-question">Do you want any changes?</div>
  </div>
  <div class="action-loader" style="display:none">
    ${action_loader}
  </div>
</div>`+ prompt_input }



  editor.Commands.add('open-custom-modal', {
    run(editor, sender) {
      sender.set('active');
      const modal = editor.Modal;

      init_ai(modal);
      modal.open();

      socket = io({
        path: '/ws'
      });

      socket.on('connect', () => {
        console.log('Connected to Socket server');
      });

      started = false
      socket.on('understandings', (data) => {
        if (data.response != "None") {
          renderUnderstandings(data.response)
        }
      });

      socket.on('done_understandings', (data) => {
        if (data.response == 'done') {
          document.querySelector('.action-loader').style.display="none"
          document.querySelector('.action-holder').style.display="flex"
        }
      })

      nd=1
      socket.on('code', (data) => {
        message=data.response
        code+=message
        
        nd=(nd==3)?1:(nd+1)
      })

      socket.on('complete_code', (data) => {
        let hypertext = code
                        .replace(/```html\n/, '')
                        .replace(/```None\n?$/, '')
                        .replace(/```$/, '')
                        .trim();
        
        console.log(code);

        code=code.replaceAll('```html','')
        code=code.replaceAll('```','')


        const matches = hypertext.match(/```([\s\S]*?)```/);
        if (matches) {
          raw=matches[0];
          console.log(matches[0]); 
        }
        
        

        const newCss = code.replace(/url\((['"]?)(.*?)\1\)/g, (match, quote, url) => {
          return `url(${quote}${set_image(color_scheme)}${quote})`;
        });
        
        console.log(newCss);
        
        editor.addComponents(newCss);
        pushJavascript(editor);
        modal.close()
      })
    },
  });
  editor.on('load', () => {
    const button = editor.Panels.getButton('options', 'custom-button');
    if (button) {
      button.set('active', true); 
    }
  });
  
  
  let loading_finished = false;
  
  let queue = [];
  let typing = false;
  let typingEndCallback = null;

  function renderUnderstandings(res) {
    queue.push(res);
    if (!typing) {
      startTyping(() => {
        if (typingEndCallback) typingEndCallback();
        queue=[res]
        summarisation=''
      });

    }
    document.getElementById("lang").value=language
    document.getElementById("colorMode").value=color_scheme
  }

  function startTyping(onComplete) {
    if (queue.length === 0) {
      typing = false;
      if (onComplete) onComplete();
      return;
    }

    typing = true;
    if (!loading_finished) {
      modal.setContent(understandings(`<b style="color:#ffffff">Here are my plan:</b><div id="summarisation"></div>`));
      loading_finished = true;
    }

    const target = document.getElementById("summarisation");
    let currentChunk = queue.shift();
    let index = 0;

    function typeNext() {
      if (index < currentChunk.length) {
        summarisation += currentChunk.charAt(index);
        summarisation=summarisation.replace(/^[\s\S]*?(1\.)/, '1.');
        target.innerText = summarisation
        index++;
        agent_response=summarisation
        setTimeout(typeNext, 30);
      } else {
        startTyping(onComplete);
      }
    }
    
    typeNext();
  }
  const backdrop = document.querySelector('.gjs-mdl-container');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => e.stopPropagation(), false);
  }
}
// Screen 1
function init_ai(modal) {
  suggestions = `<style>.category-badges{display:flex;flex-wrap:wrap;gap:10px;padding:8px 0}.badge.active{background-color:#3c3c3c;border-color:#569cd6;color:#ffffff}.badge{padding:6px 12px;font-size:13px;color:#cfcfcf;background-color:#252526;border:1px solid #3c3c3c;border-radius:16px;font-family:'Segoe UI',sans-serif;cursor:default;transition:background-color 0.3s,color 0.3s,border-color 0.3s}.badge:hover{background-color:#3c3c3c;border-color:#569cd6;color:#ffffff;cursor:pointer}</style><div class="category-badges"><span class="badge" prompt="Design a health and fitness tips website with clean, energizing interface with organic color palettes, and wellness-focused typography.">Health & Fitness</span><span class="badge" prompt="Create a travel website with intuitive navigation, and adventure-inspired accents.">Travel</span><span class="badge" prompt="Generate a catchy website for a finance company">Finance</span><span class="badge" prompt="Develop a website for online courses.">Education</span><span class="badge" prompt="Design a website for a tech startup company">Technology</span><span class="badge" prompt="Develop a website for skin care product selling">Lifestyle</span></div>`
  lang_color_picker = `<style>.config-options-holder{margin-bottom:15px;display:flex;justify-content:space-between;align-items:center;width:100%}.config-option{display:flex;align-items:center;gap:6px;padding:5px;margin-top:10px}.config-option label{font-size:12px;color:#cccccc;font-family:'Segoe UI',sans-serif}.config-option select,.config-option input[type="color"]{font-size:12px;font-family:'Segoe UI',sans-serif;padding:4px 8px;border-radius:6px;border:1px solid #3c3c3c;background-color:#1e1e1e;color:#dddddd;cursor:pointer;transition:border-color 0.2s,background-color 0.2s}.config-option select:hover,.config-option input[type="color"]:hover{border-color:#569cd6}.config-option select:focus,.config-option input[type="color"]:focus{outline:none;border-color:#569cd6;background-color:#252526}.config-option input[type="color"]{width:32px;height:32px;padding:0;border-radius:50%;display:none}</style><div class="config-options-holder"><!-- Left(flex-start)--><div class="config-option"><label for="lang">Language:</label><select id="lang">
      <option value="English">🇬🇧 English</option>
      <option value="French">🇫🇷 French</option>
      <option value="Bengali">🇧🇩 Bengali</option>
      <option value="Hindi">🇮🇳 Hindi</option>
      <option value="Japanese">🇯🇵 Japanese</option>
      <option value="Korean">🇰🇷 Korean</option>
    </select></div><!-- Right(flex-end)--><div class="config-option"><label for="colorMode">Color:</label><select id="colorMode"><option value="auto">Auto</option><option value="dark">⚫ Dark</option><option value="blue">🔵 Blue</option><option value="red">🔴 Red</option><option value="green">🟢 Green</option><option value="yellow">🟡 Yellow</option></select><input type="color" id="colorPicker"/></div></div><script>const colorMode=document.getElementById('colorMode');const colorPicker=document.getElementById('colorPicker');colorMode.addEventListener('change',(e)=>{if(e.target.value==='custom'){colorPicker.style.display='block'}else{colorPicker.style.display='none'}});</script>`
  prompt_input = `<style>.input-wrapper{width:fit-content;height:45px;border-radius:12px;padding:5px;box-sizing:content-box;display:flex;align-items:center;background-color:#292524}.icon{width:30px;fill:rgb(255,255,255);margin-left:8px;transition:all 0.3s}.input{width:410px;height:100%;border:none;outline:none;padding-left:15px;background-color:#292524;color:white;font-size:1em}.input:-webkit-autofill{-webkit-box-shadow:0 0 0px 1000px #292524 inset;-webkit-text-fill-color:#ffffff}.Subscribe-btn{height:100%;width:95px;border:none;border-radius:15px;color:rgb(0,0,0);cursor:pointer;background-color:#ffffff;font-weight:500;overflow:hidden;display:flex;align-items:center;justify-content:center;position:relative;transition:all 0.3s}.arrow{position:absolute;margin-right:150px;transition:all 0.3s}.input-wrapper:active.icon{transform:scale(1.3)}.Subscribe-btn:hover{color:#c2c2c2}.Subscribe-btn:hover.arrow{margin-right:0;animation:jello-vertical 0.9s both;transform-origin:right}@keyframes jello-vertical{0%{transform:scale3d(1,1,1)}30%{transform:scale3d(0.75,1.25,1)}40%{transform:scale3d(1.25,0.75,1)}50%{transform:scale3d(0.85,1.15,1)}65%{transform:scale3d(1.05,0.95,1)}75%{transform:scale3d(0.95,1.05,1)}100%{transform:scale3d(1,1,1)}}.Subscribe-btn:active{transform:scale(0.9)}</style><div class="input-wrapper"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="inbox"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect><path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z"></path></g></g></svg><input type="text" id="prompt" name="prompt" placeholder="Create a course-selling website" class="input"/><button class="Subscribe-btn" id="generate"><svg 
  xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 38 15" class="arrow"><path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"></path></svg>Generate</button></div>`;
  const init_ui=(suggestions)=>`<style>.parent{display:flex;justify-content:center;margin-top:30px;margin-bottom:20px;align-items:center;flex-direction:column;height:100%}.spinner{background-image:linear-gradient(rgb(186,66,255)35%,rgb(0,225,255));width:100px;height:100px;animation:spinning82341 1.7s linear infinite;text-align:center;border-radius:50px;filter:blur(1px);box-shadow:0px-5px 20px 0px rgb(186,66,255),0px 5px 20px 0px rgb(0,225,255)}.spinner1{background-color:rgb(36,36,36);width:100px;height:100px;border-radius:50px;filter:blur(10px)}@keyframes spinning82341{to{transform:rotate(360deg)}}</style><div class="parent"><div class="spinner"><div class="spinner1"></div></div><h2 style="color:#f5f5f5;font-family: sans-serif;margin-top:35px;">What Will You Create Today?</h2>${suggestions}</div>`
  form_code = init_ui(suggestions) + prompt_input + lang_color_picker
  modal.setContent(form_code);
  ui_events(modal)
}

// Thinking
function start_thinking(modal){
  dom_elements = `<style>.loader-holder{margin-top:40px;margin-bottom:40px;display:flex;justify-content:center;align-items:center;flex-direction:column}.loader{display:flex;align-items:center}.bar{display:inline-block;width:3px;height:20px;background-color:rgba(255,255,255,.5);border-radius:10px;animation:scale-up4 1s linear infinite}.bar:nth-child(2){height:35px;margin:0 5px;animation-delay:.25s}.bar:nth-child(3){animation-delay:.5s}@keyframes scale-up4{20%{background-color:#ffff;transform:scaleY(1.5)}40%{transform:scaleY(1)}}</style><div class="loader-holder"><div class="loader"><span class="bar"></span><span class="bar"></span><span class="bar"></span></div><h3 style="color:#ffffff">Thinking</h3></div>`;
  modal.setContent(dom_elements);
  ui_events(modal)
}

// Writing
function start_writing(modal){
  dom_elements = `<style>.writing-holder{margin-top:40px;margin-bottom:40px;display:flex;justify-content:center;align-items:center;flex-direction:column}@keyframes loader_5191{from{opacity:0}to{opacity:1}}.square{background:#ddd;width:10px;height:10px;position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-5px}#sq1{margin-top:-25px;margin-left:-25px;animation:loader_5191 675ms ease-in-out 0s infinite alternate}#sq2{margin-top:-25px;animation:loader_5191 675ms ease-in-out 75ms infinite alternate}#sq3{margin-top:-25px;margin-left:15px;animation:loader_5191 675ms ease-in-out 150ms infinite}#sq4{margin-left:-25px;animation:loader_5191 675ms ease-in-out 225ms infinite}#sq5{animation:loader_5191 675ms ease-in-out 300ms infinite}#sq6{margin-left:15px;animation:loader_5191 675ms ease-in-out 375ms infinite}#sq7{margin-top:15px;margin-left:-25px;animation:loader_5191 675ms ease-in-out 450ms infinite}#sq8{margin-top:15px;animation:loader_5191 675ms ease-in-out 525ms infinite}#sq9{margin-top:15px;margin-left:15px;animation:loader_5191 675ms ease-in-out 600ms infinite}</style><div class="writing-holder"><div class="loader" style="margin-bottom:120px"><div class="square" id="sq1"></div><div class="square" id="sq2"></div><div class="square" id="sq3"></div><div class="square" id="sq4"></div><div class="square" id="sq5"></div><div class="square" id="sq6"></div><div class="square" id="sq7"></div><div class="square" id="sq8"></div><div class="square" id="sq9"></div></div><h3 id="writer-loading-text" style="color:#ffffff;font-family: sans-serif;">Analysing requirement</h3></div>`;
  modal.setContent(dom_elements);
  loader_text = document.getElementById('writer-loading-text')
  ui_events(modal)
}



// UI Events
function ui_events(modal) {
  const modalEl = document.querySelector('.gjs-mdl-container'); 
  const loaderText = document.getElementById('writer-loading-text');
  handleSuggestions()
  if (loaderText !== null) {
      let dots = 0;
      const maxDots = 3;
      setInterval(() => {
          dots = (dots + 1) % (maxDots + 1); 
          const dotStr = '.'.repeat(dots);
          loaderText.innerHTML = `Generating code ${dotStr}`;
      }, 500); 
  }

  if (!modalEl) return;
  if (modalEl.getAttribute('data-listener') === 'true') return;

  modalEl.addEventListener('change', (e) => {
    const target = e.target;
    if (target.id === 'lang') {
      language=target.value
    }
    if (target.id === 'colorMode') {
      color_scheme=target.value
    }
  })

  modalEl.addEventListener('click', (e) => {
    const target = e.target;
    if (target.id === 'approve') {
      if (!target.classList.contains('clicked')) {
        target.classList.add('clicked'); 
        approvePlan(modal);
      }
    }
    if (target.id === 'generate') {
      prompt_field = document.getElementById('prompt').value;
      if (prompt_field.length != 0) {
        init_prompt = (init_prompt.length == 0) ? prompt_field : init_prompt;
        socket.emit('analyse_requirement', { message: prompt_field, reference: agent_response });
        if (stage == "prompt") {
          start_thinking(modal);
        } else {
          document.querySelector('.action-loader').style.display = "flex";
          document.querySelector('.action-holder').style.display = "none";
        }
        document.getElementById('prompt').value = "";
      }
      stage = "adjustment";
    }
    if (target.classList.contains('badge')) {
      console.log('Suggestion badge clicked:', target.getAttribute('prompt'));
    }
  });
  
  modalEl.setAttribute('data-listener', 'true');
  document.getElementById("lang").value=language
  document.getElementById("colorMode").value=color_scheme
  
}

// UI Functionality
function handleSuggestions(){
  const suggestions = document.getElementsByClassName("badge");
  Array.from(suggestions).forEach(el => {
    el.addEventListener('click', function (e) {
      const prompt = e.target.getAttribute("prompt");
      prompt_field = document.getElementById('prompt');
      Array.from(suggestions).forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      handleTypingAnimation(prompt, prompt_field, 15);
    });
  });
}

function handleTypingAnimation(text, inputEl, speed = 20) {
  let index = 0;
  let cursorVisible = true;
  inputEl.value = '';
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.animation = 'blink 1s step-start 0s infinite';
  cursor.style.marginLeft = '2px';
  inputEl.insertAdjacentElement('afterend', cursor);

  function type() {
    if (index < text.length) {
      inputEl.value += text.charAt(index);
      index++;
      typingInterval = setTimeout(type, speed);
    } else {
      clearInterval(blinkInterval);
    }
  }
  type();

  const blinkInterval = setInterval(() => {
    cursor.style.visibility = cursorVisible ? 'hidden' : 'visible';
    cursorVisible = !cursorVisible;
  }, 500);

  setTimeout(() => {
    clearInterval(blinkInterval);
    cursor.remove();
  }, text.length * speed + 1000); 
}

gen_count=1;
is_coding=false
function approvePlan(modal) {
  if(!is_coding){
    req = {
      language, color: color_scheme, instruction: agent_response, command: init_prompt
    }
    start_writing(modal);
    socket.emit('generate_code', req);
    console.log(req);
    const approveBtn = document.getElementById('approve');
    if (approveBtn) approveBtn.classList.remove('clicked');
    is_coding=true
    gen_count++;
    console.log('gen count is '+gen_count)
  }  
}

function pushJavascript(editor){
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




