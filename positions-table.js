(() => {
  const STYLE_ID='stackup-positions-table-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .positions-visual{margin-top:8px}
      .positions-board{position:relative;width:100%;aspect-ratio:9/14.2;min-height:520px;border-radius:24px;overflow:hidden;background:radial-gradient(circle at 50% 38%,#083f2f 0,#03251c 48%,#01130f 100%);border:1px solid #b9873d;box-shadow:inset 0 0 45px #000b,0 12px 28px #0004}
      .positions-board:before{content:'♠';position:absolute;left:50%;top:3.5%;transform:translateX(-50%);color:#d4aa58;font:26px Arial,sans-serif;text-shadow:0 0 12px #d4aa5888}
      .positions-table{position:absolute;left:15%;right:15%;top:11%;bottom:8%;border-radius:46%/19%;background:linear-gradient(90deg,#50230f 0,#9a4d1f 12%,#6d2f12 24%,#ad5e2b 50%,#6f3013 76%,#9b4c1d 88%,#4a200e 100%);box-shadow:0 0 0 5px #111d18,0 0 0 8px #50665b,0 0 22px #0f7b4c66,inset 0 0 20px #e48b3b66}
      .positions-table:before{content:'';position:absolute;inset:7%;border-radius:46%/19%;background:radial-gradient(ellipse at center,#07603e 0,#034c34 58%,#033326 100%);border:2px solid #108052;box-shadow:inset 0 0 30px #001b14,inset 0 0 0 16px #04432f}
      .positions-table:after{content:'♠';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:82px;height:82px;border:2px solid #1a7b53;border-radius:50%;display:grid;place-items:center;color:#58a87599;font:42px Arial,sans-serif}
      .seat{position:absolute;z-index:3;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:5px}
      .seat-dot{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 45% 35%,#126443,#032d22 62%,#01140f);border:2px solid #d4aa58;box-shadow:0 0 0 3px #05271e,0 0 12px #31c67b55}
      .seat-label{min-width:66px;padding:6px 10px;border-radius:12px;background:linear-gradient(180deg,#0c3c2d,#031b15);border:1.5px solid #d4aa58;color:#f8f0df;text-align:center;font-size:17px;line-height:1;box-shadow:0 4px 10px #0008,0 0 8px #0c8e5855;text-transform:uppercase;white-space:nowrap}
      .s-utg1{left:50%;top:12%}.s-utg2{left:84%;top:21%}.s-mp1{left:88%;top:38%}.s-mp2{left:88%;top:61%}.s-hj{left:81%;top:81%}.s-lj{left:50%;top:91%}.s-co{left:19%;top:81%}.s-btn{left:12%;top:61%}.s-sb{left:12%;top:38%}.s-bb{left:16%;top:21%}
      .dealer-marker{position:absolute;z-index:4;left:7%;top:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,#176647,#05271e 65%,#01130f);border:2px solid #d4aa58;box-shadow:0 0 13px #d4aa5866;color:#f8f0df;font-size:13px;letter-spacing:.03em;text-align:center;text-transform:uppercase}
      .position-key{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
      .position-key .block{margin:0}
      .position-key .block h3{font-size:17px}
      .position-key .block p{font-size:14px}
      @media(max-width:390px){.positions-board{min-height:470px}.seat-dot{width:36px;height:36px}.seat-label{min-width:58px;padding:5px 8px;font-size:15px}.dealer-marker{width:57px;height:57px;font-size:12px}.position-key{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function renderPositionsLesson(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title || title.textContent.trim().toUpperCase()!=='POSIÇÕES NA MESA') return;
    if(lesson.querySelector('.positions-visual')) return;
    addStyles();
    const blocks=lesson.querySelector('.blocks');
    if(!blocks) return;
    blocks.innerHTML=`
      <div class="positions-visual">
        <div class="positions-board" role="img" aria-label="Mesa de poker com posições SB, BB, UTG1, UTG2, MP1, MP2, LJ, HJ, CO e BTN; dealer à esquerda entre SB e BTN">
          <div class="positions-table"></div>
          <div class="seat s-utg1"><span class="seat-label">UTG1</span><span class="seat-dot"></span></div>
          <div class="seat s-utg2"><span class="seat-label">UTG2</span><span class="seat-dot"></span></div>
          <div class="seat s-mp1"><span class="seat-label">MP1</span><span class="seat-dot"></span></div>
          <div class="seat s-mp2"><span class="seat-label">MP2</span><span class="seat-dot"></span></div>
          <div class="seat s-hj"><span class="seat-label">HJ</span><span class="seat-dot"></span></div>
          <div class="seat s-lj"><span class="seat-label">LJ</span><span class="seat-dot"></span></div>
          <div class="seat s-co"><span class="seat-label">CO</span><span class="seat-dot"></span></div>
          <div class="seat s-btn"><span class="seat-label">BTN</span><span class="seat-dot"></span></div>
          <div class="seat s-sb"><span class="seat-label">SB</span><span class="seat-dot"></span></div>
          <div class="seat s-bb"><span class="seat-label">BB</span><span class="seat-dot"></span></div>
          <div class="dealer-marker">DEALER</div>
        </div>
        <div class="position-key">
          <div class="block"><h3>BLINDS</h3><p>SB e BB são as posições das apostas obrigatórias.</p></div>
          <div class="block"><h3>INICIAIS</h3><p>UTG1 e UTG2 agem cedo e têm menos informação.</p></div>
          <div class="block"><h3>MÉDIAS</h3><p>MP1, MP2 e LJ formam a região intermediária da mesa.</p></div>
          <div class="block"><h3>FINAIS</h3><p>HJ, CO e BTN agem mais tarde. O BTN é a referência do dealer button.</p></div>
        </div>
      </div>`;
  }

  const observer=new MutationObserver(renderPositionsLesson);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  renderPositionsLesson();
})();