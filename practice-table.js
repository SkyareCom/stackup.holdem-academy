(() => {
  const STYLE_ID='stackup-positions-table-style';

  function ensureTableStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .positions-visual{margin-top:8px}
      .positions-board{position:relative;width:100%;aspect-ratio:9/14.2;min-height:520px;border-radius:24px;overflow:hidden;background:radial-gradient(circle at 50% 38%,#083f2f 0,#03251c 48%,#01130f 100%);border:1px solid #b9873d;box-shadow:inset 0 0 45px #000b,0 12px 28px #0004}
      .positions-board:before{content:'♠';position:absolute;left:50%;top:3.5%;transform:translateX(-50%);color:#d4aa58;font:26px Arial,sans-serif;text-shadow:0 0 12px #d4aa5888}
      .positions-table{position:absolute;left:15%;right:15%;top:11%;bottom:8%;border-radius:46%/19%;background:linear-gradient(90deg,#50230f 0,#9a4d1f 12%,#6d2f12 24%,#ad5e2b 50%,#6f3013 76%,#9b4c1d 88%,#4a200e 100%);box-shadow:0 0 0 5px #111d18,0 0 0 8px #50665b,0 0 22px #0f7b4c66,inset 0 0 20px #e48b3b66}
      .positions-table:before{content:'';position:absolute;inset:7%;border-radius:46%/19%;background:radial-gradient(ellipse at center,#07603e 0,#034c34 58%,#033326 100%);border:2px solid #108052;box-shadow:inset 0 0 30px #001b14,inset 0 0 0 16px #04432f}
      .positions-table:after{content:'♠';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:82px;height:82px;border:2px solid #1a7b53;border-radius:50%;display:grid;place-items:center;color:#58a87599;font:42px Arial,sans-serif}
      .seat{position:absolute;z-index:3;transform:translate(-50%,-50%)}
      .seat-label{display:block;min-width:62px;padding:7px 10px;border-radius:12px;background:linear-gradient(180deg,#0c3c2d,#031b15);border:1.5px solid #d4aa58;color:#f8f0df;text-align:center;font-size:16px;line-height:1;box-shadow:0 4px 10px #0008,0 0 8px #0c8e5855;text-transform:uppercase;white-space:nowrap}
      .s-utg1{left:50%;top:10%}
      .s-utg2{left:70.5%;top:17.6%}
      .s-mp1{left:83.3%;top:37.6%}
      .s-mp2{left:83.3%;top:62.4%}
      .s-lj{left:70.5%;top:82.4%}
      .s-hj{left:50%;top:90%}
      .s-co{left:29.5%;top:82.4%}
      .s-btn{left:16.7%;top:62.4%}
      .s-sb{left:16.7%;top:37.6%}
      .s-bb{left:29.5%;top:17.6%}
      .dealer-button{position:absolute;z-index:4;left:30%;top:68.5%;width:30px;height:30px;transform:translate(-50%,-50%);border-radius:50%;display:grid;place-items:center;background:linear-gradient(180deg,#fff4c9,#d4aa58);border:2px solid #fff0c8;color:#2b170a;box-shadow:0 4px 10px #0009,0 0 10px #d4aa5870;font:700 14px Arial,sans-serif}
      .position-key{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
      .position-key .block{margin:0}
      .position-key .block h3{font-size:17px}
      .position-key .block p{font-size:14px}
      .position-key .dealer-info{grid-column:1/-1;background:#e6d8b9;border-color:#c99539}
      @media(max-width:390px){.positions-board{min-height:470px}.seat-label{min-width:54px;padding:6px 7px;font-size:14px}.dealer-button{width:27px;height:27px;font-size:12px}.position-key{grid-template-columns:1fr}.position-key .dealer-info{grid-column:auto}}
    `;
    document.head.appendChild(style);
  }

  function tableMarkup(){
    return `<div class="p3-simulator-table positions-visual">
      <div class="positions-board" role="img" aria-label="Mesa de poker com 10 posições de jogador: UTG1, UTG2, MP1, MP2, LJ, HJ, CO, BTN, SB e BB. O botão do dealer está junto ao BTN.">
        <div class="positions-table"></div>
        <div class="seat s-utg1"><span class="seat-label">UTG1</span></div>
        <div class="seat s-utg2"><span class="seat-label">UTG2</span></div>
        <div class="seat s-mp1"><span class="seat-label">MP1</span></div>
        <div class="seat s-mp2"><span class="seat-label">MP2</span></div>
        <div class="seat s-lj"><span class="seat-label">LJ</span></div>
        <div class="seat s-hj"><span class="seat-label">HJ</span></div>
        <div class="seat s-co"><span class="seat-label">CO</span></div>
        <div class="seat s-btn"><span class="seat-label">BTN</span></div>
        <div class="dealer-button" aria-label="Botão do dealer junto ao BTN">D</div>
        <div class="seat s-sb"><span class="seat-label">SB</span></div>
        <div class="seat s-bb"><span class="seat-label">BB</span></div>
      </div>
    </div>`;
  }

  function apply(){
    const lesson=document.querySelector('#root .card.lesson');
    const title=lesson?.querySelector('h2')?.textContent?.trim().toUpperCase();
    if(!lesson||title!=='SIMULADOR')return;
    const shell=lesson.querySelector('.p3-shell');
    if(!shell||shell.querySelector('.p3-simulator-table'))return;
    ensureTableStyles();
    const progress=shell.querySelector('.p3-progress');
    if(progress)progress.insertAdjacentHTML('afterend',tableMarkup());
    else shell.insertAdjacentHTML('afterbegin',tableMarkup());
  }

  const root=document.getElementById('root');
  if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
  apply();
})();