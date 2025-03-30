function importComponents(editor){
    hypertext=`<style>.btn{height:4em;width:12em;display:flex;align-items:center;justify-content:center;background:transparent;border:0px solid black;cursor:pointer}.wrapper{height:2em;width:8em;position:relative;background:transparent;display:flex;justify-content:center;align-items:center}.text{font-size:17px;z-index:1;color:#000;padding:4px 12px;border-radius:4px;background:rgba(255,255,255,0.7);transition:all 0.5s ease}.flower{display:grid;grid-template-columns:1em 1em;position:absolute;transition:grid-template-columns 0.8s ease}.flower1{top:-12px;left:-13px;transform:rotate(5deg)}.flower2{bottom:-5px;left:8px;transform:rotate(35deg)}.flower3{bottom:-15px;transform:rotate(0deg)}.flower4{top:-14px;transform:rotate(15deg)}.flower5{right:11px;top:-3px;transform:rotate(25deg)}.flower6{right:-15px;bottom:-15px;transform:rotate(30deg)}.petal{height:1em;width:1em;border-radius:40%70%/7%90%;background:linear-gradient(#07a6d7,#93e0ee);border:0.5px solid #96d1ec;z-index:0;transition:width 0.8s ease,height 0.8s ease}.two{transform:rotate(90deg)}.three{transform:rotate(270deg)}.four{transform:rotate(180deg)}.btn:hover.petal{background:linear-gradient(#0761d7,#93bdee);border:0.5px solid #96b4ec}.btn:hover.flower{grid-template-columns:1.5em 1.5em}.btn:hover.flower.petal{width:1.5em;height:1.5em}.btn:hover.text{background:rgba(255,255,255,0.4)}.btn:hover div.flower1{animation:15s linear 0s normal none infinite running flower1}
    @keyframes flower1{0%{transform:rotate(5deg)}
    100%{transform:rotate(365deg)}}.btn:hover div.flower2{animation:13s linear 1s normal none infinite running flower2}
    @keyframes flower2{0%{transform:rotate(35deg)}
    100%{transform:rotate(-325deg)}}.btn:hover div.flower3{animation:16s linear 1s normal none infinite running flower3}
    @keyframes flower3{0%{transform:rotate(0deg)}
    100%{transform:rotate(360deg)}}.btn:hover div.flower4{animation:17s linear 1s normal none infinite running flower4}
    @keyframes flower4{0%{transform:rotate(15deg)}
    100%{transform:rotate(375deg)}}.btn:hover div.flower5{animation:20s linear 1s normal none infinite running flower5}
    @keyframes flower5{0%{transform:rotate(25deg)}
    100%{transform:rotate(-335deg)}}.btn:hover div.flower6{animation:15s linear 1s normal none infinite running flower6}
    @keyframes flower6{0%{transform:rotate(30deg)}
    100%{transform:rotate(390deg)}}</style><button class="btn"><div class="wrapper"><p class="text">Flowers</p><div class="flower flower1"><div class="petal one"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div><div class="flower flower2"><div class="petal one"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div><div class="flower flower3"><div class="petal one"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div><div class="flower flower4"><div class="petal one"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div><div class="flower flower5"><div class="petal one"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div><div class="flower flower6"><div class="petal one"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div></div></button>`;

    editor.BlockManager.add('flower',{
        label:'Flower Text Holder',
        content:hypertext,
        category:'Extra Components',
        media:'<img src="https://uiverse.io/assets/logo-png-BXFOQKfc.png" style="width:24px;height:24px;" />'
    })

}