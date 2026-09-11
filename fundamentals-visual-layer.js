(() => {
  const BANK=window.StackupFundamentalsSpotBank;
  if(!BANK) return;

  const SUITS={s:'♠',h:'♥',d:'♦',c:'♣'};
  const card=(r,s)=>`${r}${SUITS[s]||s}`;
  const rankingCases=[
    {cards:[card('A','s'),card('K','s'),card('Q','s'),card('J','s'),card('10','s')],name:'ROYAL FLUSH',analysis:'A-K-Q-J-10 do mesmo naipe formam o Royal Flush.'},
    {cards:[card('9','h'),card('8','h'),card('7','h'),card('6','h'),card('5','h')],name:'STRAIGHT FLUSH',analysis:'Cinco cartas consecutivas do mesmo naipe formam Straight Flush.'},
    {cards:[card('Q','s'),card('Q','h'),card('Q','d'),card('Q','c'),card('2','s')],name:'QUADRA',analysis:'Quatro cartas do mesmo valor formam uma Quadra.'},
    {cards:[card('J','s'),card('J','h'),card('J','d'),card('8','c'),card('8','h')],name:'FULL HOUSE',analysis:'Uma trinca combinada com um par forma Full House.'},
    {cards:[card('A','d'),card('J','d'),card('9','d'),card('6','d'),card('3','d')],name:'FLUSH',analysis:'Cinco cartas do mesmo naipe, sem sequência, formam Flush.'},
    {cards:[card('10','s'),card('9','h'),card('8','d'),card('7','c'),card('6','s')],name:'SEQUÊNCIA',analysis:'Cinco valores consecutivos de naipes variados formam Sequência.'},
    {cards:[card('7','s'),card('7','h'),card('7','d'),card('K','c'),card('2','h')],name:'TRINCA',analysis:'Três cartas do mesmo valor formam Trinca.'},
    {cards:[card('A','s'),card('A','h'),card('5','d'),card('5','c'),card('9','s')],name:'DOIS PARES',analysis:'Dois pares diferentes mais uma quinta carta formam Dois Pares.'},
    {cards:[card('K','s'),card('K','h'),card('10','d'),card('6','c'),card('3','s')],name:'UM PAR',analysis:'Duas cartas do mesmo valor formam Um Par.'},
    {cards:[card('A','s'),card('J','h'),card('9','d'),card('6','c'),card('3','s')],name:'CARTA ALTA',analysis:'Sem combinação, vale a maior carta e os kickers seguintes.'},
    {cards:[card('A','c'),card('A','d'),card('A','h'),card('K','s'),card('K','d')],name:'FULL HOUSE',analysis:'AAA + KK é Full House: trinca de Ases com par de Reis.'},
    {cards:[card('5','c'),card('5','d'),card('5','h'),card('5','s'),card('A','d')],name:'QUADRA',analysis:'Quatro cincos formam Quadra; o Ás é kicker.'},
    {cards:[card('K','c'),card('Q','c'),card('J','c'),card('10','c'),card('9','c')],name:'STRAIGHT FLUSH',analysis:'K-Q-J-10-9 do mesmo naipe é Straight Flush.'},
    {cards:[card('A','h'),card('2','d'),card('3','c'),card('4','s'),card('5','h')],name:'SEQUÊNCIA',analysis:'A-2-3-4-5 é uma sequência válida, com o Ás atuando como carta baixa.'},
    {cards:[card('10','h'),card('10','c'),card('4','d'),card('4','s'),card('A','h')],name:'DOIS PARES',analysis:'Há um par de 10 e um par de 4; o Ás é kicker.'},
    {cards:[card('Q','h'),card('Q','c'),card('Q','s'),card('2','d'),card('9','h')],name:'TRINCA',analysis:'Três Damas formam Trinca; 9 e 2 são kickers.'},
    {cards:[card('A','c'),card('10','c'),card('8','c'),card('6','c'),card('2','c')],name:'FLUSH',analysis:'As cinco cartas são de paus e não estão em sequência: Flush.'},
    {cards:[card('J','s'),card('10','h'),card('9','s'),card('8','c'),card('7','d')],name:'SEQUÊNCIA',analysis:'J-10-9-8-7 são cinco valores consecutivos.'},
    {cards:[card('9','s'),card('9','d'),card('A','c'),card('Q','h'),card('3','s')],name:'UM PAR',analysis:'Há somente um par: dois noves.'},
    {cards:[card('K','s'),card('J','d'),card('8','c'),card('5','h'),card('2','s')],name:'CARTA ALTA',analysis:'Nenhum par, sequência ou flush: a mão é Carta Alta, Rei.'}
  ];
  const rankOptions=['ROYAL FLUSH','STRAIGHT FLUSH','QUADRA','FULL HOUSE','FLUSH','SEQUÊNCIA','TRINCA','DOIS PARES','UM PAR','CARTA ALTA'];

  function deterministicOptions(answer,i){
    const wrong=rankOptions.filter(x=>x!==answer);
    return [answer,wrong[(i*2)%wrong.length],wrong[(i*2+3)%wrong.length],wrong[(i*2+6)%wrong.length]];
  }

  function enrichRanking(){
    const spots=BANK['RANKING DE MÃOS']||[];
    for(let i=0;i<Math.min(20,spots.length);i++){
      const c=rankingCases[i]; const s=spots[i];
      s.visualMode=i<14?'visual':'mixed';
      s.visual={kind:'cards',cards:c.cards,label:i<14?'RECONHEÇA A MÃO PELAS CARTAS':'LEIA A SITUAÇÃO E CONFIRME VISUALMENTE'};
      if(s.type==='choice'){
        s.prompt=i<10?'Que mão estas cinco cartas formam?':'Identifique corretamente a combinação mostrada.';
        s.options=deterministicOptions(c.name,i); s.answer=c.name; s.analysis=c.analysis;
      }else if(s.type==='binary'){
        const truthful=i%2===0;
        const shown=truthful?c.name:rankOptions[(rankOptions.indexOf(c.name)+2)%rankOptions.length];
        s.prompt=`A mão mostrada é ${shown}.`;
        s.options=['CORRETO','INCORRETO']; s.answer=truthful?'CORRETO':'INCORRETO';
        s.analysis=truthful?c.analysis:`A afirmação está incorreta. A combinação mostrada é ${c.name}. ${c.analysis}`;
      }
    }
    const compare=[
      {a:[card('A','s'),card('A','h'),card('K','d'),card('9','c'),card('4','s')],b:[card('A','d'),card('A','c'),card('Q','h'),card('J','s'),card('8','d')],label:'PAR DE ASES: KICKER K x KICKER Q'},
      {a:[card('K','s'),card('K','h'),card('7','d'),card('7','c'),card('A','s')],b:[card('K','d'),card('K','c'),card('6','h'),card('6','s'),card('A','d')],label:'DOIS PARES: K+7 x K+6'},
      {a:[card('A','s'),card('J','s'),card('9','s'),card('6','s'),card('3','s')],b:[card('A','h'),card('10','h'),card('9','h'),card('6','h'),card('3','h')],label:'FLUSH: J x 10'},
      {a:[card('10','s'),card('9','h'),card('8','d'),card('7','c'),card('6','s')],b:[card('9','c'),card('8','c'),card('7','d'),card('6','d'),card('5','h')],label:'SEQUÊNCIA ATÉ 10 x ATÉ 9'}
    ];
    for(let i=20;i<Math.min(30,spots.length);i++){
      const x=compare[(i-20)%compare.length];
      spots[i].visualMode='mixed';
      spots[i].visual={kind:'compare',left:x.a,right:x.b,label:x.label};
    }
  }

  const seats=['UTG1','UTG2','MP1','MP2','LJ','HJ','CO','BTN','SB','BB'];
  const boardSets=[[],[card('A','s'),card('7','h'),card('2','d')],[card('K','c'),card('Q','c'),card('8','d'),card('3','s')],[card('10','h'),card('9','h'),card('8','c'),card('3','d'),card('2','s')]];
  const staff=['DEALER','FLOOR','TD','CHIP RUNNER','CAIXA','SEATING'];
  const cashFormats=[['NLH 1/2','6-MAX','100 BB'],['NLH 2/5','FULL RING','150 BB'],['PLO 5/10','6-MAX','100 BB'],['NLH 5/10','HEADS-UP','200 BB']];
  const tourFormats=[['MTT REGULAR','40 BB','NÍVEL 8'],['PKO','28 BB','ITM'],['TURBO','18 BB','BOLHA'],['SATELLITE','22 BB','5 VAGAS'],['MULTI-DAY','65 BB','DIA 1B']];
  const profileStats=[['TAG','22%','18%','7%'],['LAG','34%','28%','12%'],['NIT','13%','9%','3%'],['CALLING STATION','42%','8%','2%'],['MANIAC','58%','47%','24%']];

  function sceneFor(chapter,i,spot){
    switch(chapter){
      case 'POSIÇÕES NA MESA': return {kind:'table',highlight:seats[i%seats.length],label:'IDENTIFIQUE A POSIÇÃO DESTACADA'};
      case 'SMALL BLIND, BIG BLIND E ANTE': return {kind:'blinds',button:seats[(i+7)%seats.length],sb:'SB',bb:'BB',ante:i%3===0?'BBA':i%3===1?'ANTE':'SEM ANTE'};
      case 'STREETS': return {kind:'board',cards:boardSets[i%boardSets.length],label:['PRÉ-FLOP','FLOP','TURN','RIVER'][i%4]};
      case 'SEQUÊNCIA DE APOSTAS': return {kind:'timeline',actions:[['UTG','RAISE','2.5 BB'],['CO',i%2?'CALL':'3-BET',i%2?'2.5 BB':'8 BB'],['BTN',i%3?'FOLD':'CALL',i%3?'—':'8 BB']]};
      case 'EMBARALHANDO AS CARTAS': return {kind:'steps',steps:['RECOLHER','EMBARALHAR','QUADRAR','CORTAR','DISTRIBUIR'],active:i%5};
      case 'MISDEAL': return {kind:'scene',icon:'⚠',title:i%2?'CARTA EXPOSTA':'DISTRIBUIÇÃO IRREGULAR',lines:[i%2?'UMA CARTA FOI EXPOSTA PELO DEALER':'UM JOGADOR RECEBEU NÚMERO ERRADO DE CARTAS','DECIDA SE CORRIGE, CONTINUA OU É MISDEAL']};
      case 'FUNÇÕES DO STAFF': return {kind:'scene',icon:'♣',title:staff[i%staff.length],lines:['SITUAÇÃO DE MESA','QUEM DEVE AGIR OU SER CHAMADO?']};
      case 'TERMINOLOGIAS BÁSICAS': return {kind:'scene',icon:'◆',title:['KICKER','SNAP CALL','DRAWING DEAD','HERO CALL','BLUFF CATCHER','COOLER'][i%6],lines:['RECONHEÇA O TERMO PELA SITUAÇÃO','USE O CONTEXTO, NÃO APENAS A DEFINIÇÃO']};
      case 'PERFIS DE JOGADORES': {const p=profileStats[i%profileStats.length]; return {kind:'stats',name:p[0],vpip:p[1],pfr:p[2],three:p[3]};}
      case 'CASH GAME E TIPOS': {const x=cashFormats[i%cashFormats.length]; return {kind:'cash',title:x[0],seats:x[1],stack:x[2],buyin:i%2?'BUY-IN 50–200 BB':'BUY-IN 40–100 BB'};}
      case 'TORNEIO E TIPOS': {const x=tourFormats[i%tourFormats.length]; return {kind:'tournament',title:x[0],stack:x[1],phase:x[2],blinds:`BLINDS ${500*(i%4+1)}/${1000*(i%4+1)}`};}
      case 'BONS MODOS': return {kind:'scene',icon:['▣','☏','♠','●','!'][i%5],title:['FICHAS VISÍVEIS','CELULAR NA MÃO','MOSTRAR CARTAS','SPLASH POT','AÇÃO FORA DE VEZ'][i%5],lines:['OBSERVE A CENA','AVALIE SE O COMPORTAMENTO É CORRETO']};
      case 'OUTRAS REGRAS BÁSICAS': return {kind:'scene',icon:'§',title:['TABLE STAKES','MISSED BLIND','RUN IT TWICE','DEAD BUTTON','SHOW ONE, SHOW ALL','STRADDLE'][i%6],lines:['SITUAÇÃO PRÁTICA DE MESA','ESCOLHA O PROCEDIMENTO CORRETO']};
      default:return null;
    }
  }

  Object.keys(BANK).forEach(chapter=>{
    if(chapter==='RANKING DE MÃOS') return;
    const spots=BANK[chapter]||[];
    spots.forEach((s,i)=>{
      if(i<20){s.visualMode='visual';s.visual=sceneFor(chapter,i,s);} 
      else if(i<30){s.visualMode='mixed';s.visual=sceneFor(chapter,i,s);} 
      else s.visualMode='text';
    });
  });
  enrichRanking();

  const STYLE_ID='stackup-fundamentals-visual-style';
  function addStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const st=document.createElement('style');st.id=STYLE_ID;st.textContent=`
      .fv-wrap{margin:2px 12px 13px;padding:12px;border:1px solid #a87c3260;border-radius:14px;background:#211008;color:#f8f0df;overflow:hidden}
      .fv-label{text-align:center;color:#d4aa58;font-size:11px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:9px}
      .fv-cards{display:flex;justify-content:center;gap:5px;flex-wrap:nowrap}
      .fv-card{width:45px;height:62px;border-radius:8px;background:#fffdf7;border:1px solid #d7c8a5;box-shadow:0 3px 8px #0005;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-weight:800;color:#17120f;line-height:1}
      .fv-card.red{color:#a32929}.fv-rank{font-size:17px}.fv-suit{font-size:19px;margin-top:2px}
      .fv-compare{display:grid;grid-template-columns:1fr 1fr;gap:8px}.fv-handbox{padding:9px 5px;border:1px solid #d4aa5840;border-radius:12px;background:#2a160d}.fv-handtitle{text-align:center;color:#d8c6ad;font-size:10px;margin-bottom:7px}
      .fv-table{position:relative;height:220px;margin:auto;max-width:330px;border:12px solid #2a160d;border-radius:48%;background:#0e4b3b;box-shadow:inset 0 0 0 3px #d4aa5870}
      .fv-seat{position:absolute;transform:translate(-50%,-50%);padding:5px 7px;border-radius:8px;background:#211008;border:1px solid #d4aa5855;color:#d8c6ad;font-size:10px;white-space:nowrap}.fv-seat.on{background:#d4aa58;color:#211008;border-color:#f8f0df;font-weight:700;box-shadow:0 0 0 2px #f8f0df55}
      .fv-board{display:flex;justify-content:center;gap:6px;min-height:64px;align-items:center}.fv-empty{color:#a9947f;font-size:13px;text-align:center;padding:18px 0}
      .fv-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 9px;border-top:1px solid #d4aa582d}.fv-row:first-child{border-top:0}.fv-pill{padding:5px 7px;border-radius:8px;background:#0e4b3b;color:#f8f0df;font-size:11px}.fv-value{color:#d4aa58;font-size:12px}
      .fv-steps{display:flex;gap:5px;overflow-x:auto;padding-bottom:3px}.fv-step{min-width:78px;padding:9px 6px;border:1px solid #d4aa5840;border-radius:10px;text-align:center;font-size:10px;color:#d8c6ad}.fv-step.on{background:#0e4b3b;color:#f8f0df;border-color:#d4aa58}
      .fv-scene{text-align:center;padding:5px 4px}.fv-icon{font-family:Arial,sans-serif;font-size:38px;color:#d4aa58}.fv-scene h4{margin:5px 0 7px;color:#f8f0df;font-size:18px}.fv-scene p{margin:3px 0;color:#cfbda7;font-size:12px;line-height:1.35}
      .fv-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.fv-metric{padding:9px 4px;border:1px solid #d4aa5840;border-radius:10px;text-align:center;background:#2a160d}.fv-metric b{display:block;color:#d4aa58;font-size:17px}.fv-metric span{font-size:9px;color:#cfbda7}.fv-name{text-align:center;color:#f8f0df;font-size:18px;margin-bottom:8px}
      .fv-format{display:grid;gap:6px}.fv-format h4{margin:0;color:#d4aa58;font-size:19px}.fv-formatline{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid #d4aa582d;font-size:12px;color:#d8c6ad}
      @media(max-width:380px){.fv-card{width:39px;height:56px}.fv-rank{font-size:15px}.fv-suit{font-size:17px}.fv-table{height:205px}.fv-seat{font-size:9px;padding:4px 5px}}
    `;document.head.appendChild(st);
  }
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function renderCard(c){const suit=c.slice(-1),rank=c.slice(0,-1),red=suit==='♥'||suit==='♦';return `<span class="fv-card${red?' red':''}"><span class="fv-rank">${esc(rank)}</span><span class="fv-suit">${esc(suit)}</span></span>`;}
  function render(v){if(!v)return'';const label=v.label?`<div class="fv-label">${esc(v.label)}</div>`:'';
    if(v.kind==='cards')return `<div class="fv-wrap">${label}<div class="fv-cards">${v.cards.map(renderCard).join('')}</div></div>`;
    if(v.kind==='compare')return `<div class="fv-wrap">${label}<div class="fv-compare"><div class="fv-handbox"><div class="fv-handtitle">MÃO A</div><div class="fv-cards">${v.left.map(renderCard).join('')}</div></div><div class="fv-handbox"><div class="fv-handtitle">MÃO B</div><div class="fv-cards">${v.right.map(renderCard).join('')}</div></div></div></div>`;
    if(v.kind==='board')return `<div class="fv-wrap">${label}<div class="fv-board">${v.cards.length?v.cards.map(renderCard).join(''):'<div class="fv-empty">SEM CARTAS COMUNITÁRIAS</div>'}</div></div>`;
    if(v.kind==='table'){const pos=[[50,8],[70,16],[84,32],[86,58],[72,80],[56,91],[38,91],[21,78],[13,54],[25,24]];return `<div class="fv-wrap">${label}<div class="fv-table">${seats.map((s,i)=>`<span class="fv-seat${s===v.highlight?' on':''}" style="left:${pos[i][0]}%;top:${pos[i][1]}%">${s}</span>`).join('')}</div></div>`;}
    if(v.kind==='blinds')return `<div class="fv-wrap"><div class="fv-label">FORMAÇÃO INICIAL</div><div class="fv-row"><span>BUTTON</span><span class="fv-pill">${esc(v.button)}</span></div><div class="fv-row"><span>SMALL BLIND</span><span class="fv-value">${esc(v.sb)}</span></div><div class="fv-row"><span>BIG BLIND</span><span class="fv-value">${esc(v.bb)}</span></div><div class="fv-row"><span>ANTE</span><span class="fv-value">${esc(v.ante)}</span></div></div>`;
    if(v.kind==='timeline')return `<div class="fv-wrap"><div class="fv-label">LINHA DE AÇÃO</div>${v.actions.map(a=>`<div class="fv-row"><span class="fv-pill">${esc(a[0])}</span><span>${esc(a[1])}</span><span class="fv-value">${esc(a[2])}</span></div>`).join('')}</div>`;
    if(v.kind==='steps')return `<div class="fv-wrap"><div class="fv-label">PROCEDIMENTO DO DEALER</div><div class="fv-steps">${v.steps.map((x,i)=>`<div class="fv-step${i===v.active?' on':''}">${i+1}<br>${esc(x)}</div>`).join('')}</div></div>`;
    if(v.kind==='stats')return `<div class="fv-wrap"><div class="fv-name">${esc(v.name)}</div><div class="fv-stats"><div class="fv-metric"><b>${esc(v.vpip)}</b><span>VPIP</span></div><div class="fv-metric"><b>${esc(v.pfr)}</b><span>PFR</span></div><div class="fv-metric"><b>${esc(v.three)}</b><span>3-BET</span></div></div></div>`;
    if(v.kind==='cash')return `<div class="fv-wrap"><div class="fv-format"><h4>${esc(v.title)}</h4><div class="fv-formatline"><span>FORMATO</span><b>${esc(v.seats)}</b></div><div class="fv-formatline"><span>STACK</span><b>${esc(v.stack)}</b></div><div class="fv-formatline"><span>${esc(v.buyin)}</span></div></div></div>`;
    if(v.kind==='tournament')return `<div class="fv-wrap"><div class="fv-format"><h4>${esc(v.title)}</h4><div class="fv-formatline"><span>STACK</span><b>${esc(v.stack)}</b></div><div class="fv-formatline"><span>FASE</span><b>${esc(v.phase)}</b></div><div class="fv-formatline"><span>${esc(v.blinds)}</span></div></div></div>`;
    return `<div class="fv-wrap"><div class="fv-scene"><div class="fv-icon">${esc(v.icon||'◆')}</div><h4>${esc(v.title||'SITUAÇÃO')}</h4>${(v.lines||[]).map(x=>`<p>${esc(x)}</p>`).join('')}</div></div>`;
  }

  function currentSpotInfo(){
    const lesson=document.querySelector('.card.lesson'); const shell=lesson?.querySelector('.fi-shell'); if(!lesson||!shell)return null;
    const chapter=lesson.querySelector('h2')?.textContent.trim().toUpperCase(); const bank=BANK[chapter]; if(!bank)return null;
    const raw=shell.querySelector('.fi-spotbar span')?.textContent||''; const m=raw.match(/SPOT\s+(\d+)/i); if(!m)return null;
    const idx=Number(m[1])-1; return {shell,spot:bank[idx]};
  }
  function apply(){addStyle();const info=currentSpotInfo();if(!info||!info.spot?.visual)return;const spotEl=info.shell.querySelector('.fi-spot');const q=spotEl?.querySelector('.fi-question');if(!spotEl||!q)return;const old=spotEl.querySelector('.fv-wrap');if(old)old.remove();q.insertAdjacentHTML('afterend',render(info.spot.visual));}
  let queued=false;const obs=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply();});});obs.observe(document.documentElement,{childList:true,subtree:true});apply();
})();
