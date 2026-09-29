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

  function streetScene(spot){
    const prompt=String(spot?.prompt||'');
    const p=prompt.toUpperCase();
    const answer=Array.isArray(spot?.answer)?spot.answer.join(' → '):String(spot?.answer??'');
    const a=answer.toUpperCase();
    const exactCards=prompt.match(/(?:10|[2-9AKQJ])[♠♥♦♣]/g)||[];
    const boardByCount=cards=>({kind:'board',cards,label:cards.length===3?'FLOP':cards.length===4?'TURN':'RIVER'});
    const preflop={kind:'board',cards:boardSets[0],label:'PRÉ-FLOP'};
    const flop={kind:'board',cards:boardSets[1],label:'FLOP'};
    const turn={kind:'board',cards:boardSets[2],label:'TURN'};
    const river={kind:'board',cards:boardSets[3],label:'RIVER'};

    if(/\bBOARD\b/i.test(prompt)&&[3,4,5].includes(exactCards.length))return boardByCount(exactCards);
    if(spot?.type==='sequence'||(a.includes('PRÉ-FLOP')&&a.includes('FLOP')&&a.includes('TURN')&&a.includes('RIVER')&&a.includes('→')))return {kind:'streetflow',steps:['PRÉ-FLOP','FLOP','TURN','RIVER']};
    if(p.includes('MONOTONE'))return {kind:'board',cards:[card('A','s'),card('7','s'),card('2','s')],label:'FLOP · MONOTONE'};
    if(p.includes('TWO-TONE'))return {kind:'board',cards:[card('A','s'),card('7','s'),card('2','d')],label:'FLOP · TWO-TONE'};
    if(p.includes('PAIRED')||p.includes('PAREADO'))return {kind:'board',cards:[card('K','c'),card('8','d'),card('8','s')],label:'FLOP · PAIRED'};

    if(a==='PRÉ-FLOP'||a==='PRE-FLOP')return preflop;
    if(a==='FLOP')return flop;
    if(a==='TURN')return turn;
    if(a==='RIVER')return river;
    if(a==='SHOWDOWN')return {kind:'board',cards:boardSets[3],label:'SHOWDOWN · BOARD COMPLETO'};

    if(p.includes('PRÉ-FLOP')||p.includes('PRE-FLOP')||p.includes('SEM CARTAS COMUNITÁRIAS'))return preflop;
    if(p.includes('SHOWDOWN'))return {kind:'board',cards:boardSets[3],label:'SHOWDOWN · BOARD COMPLETO'};
    if(p.includes('RIVER'))return river;
    if(p.includes('TURN'))return turn;
    if(p.includes('FLOP'))return flop;
    if(p.includes('CINCO CARTAS')||p.includes('5 CARTAS')||p.includes('BOARD MÁXIMO')||p.includes('BOARD COMPLETO'))return river;
    if(p.includes('SEQUÊNCIA')||p.includes('ORDEM'))return {kind:'streetflow',steps:['PRÉ-FLOP','FLOP','TURN','RIVER']};
    return {kind:'board',cards:boardSets[1],label:'FLOP · EXEMPLO'};
  }

  function sceneFor(chapter,i,spot){
    switch(chapter){
      case 'POSIÇÕES NA MESA': return null;
      case 'SMALL BLIND, BIG BLIND E ANTE': return null;
      case 'STREETS': return streetScene(spot);
      case 'SEQUÊNCIA DE APOSTAS': return null;
      case 'EMBARALHANDO AS CARTAS': return null;
      case 'MISDEAL': return null;
      case 'FUNÇÕES DO STAFF': return null;
      case 'TERMINOLOGIAS BÁSICAS': return null;
      case 'PERFIS DE JOGADORES': {const p=profileStats[i%profileStats.length]; return {kind:'stats',name:p[0],vpip:p[1],pfr:p[2],three:p[3]};}
      case 'CASH GAME E TIPOS': {const x=cashFormats[i%cashFormats.length]; return {kind:'cash',title:x[0],seats:x[1],stack:x[2],buyin:i%2?'BUY-IN 50–200 BB':'BUY-IN 40–100 BB'};}
      case 'TORNEIO E TIPOS': {const x=tourFormats[i%tourFormats.length]; return {kind:'tournament',title:x[0],stack:x[1],phase:x[2],blinds:`BLINDS ${500*(i%4+1)}/${1000*(i%4+1)}`};}
      case 'BONS MODOS': {
        const text=(String(spot?.prompt||'')+' '+String(spot?.answer||'')).toUpperCase();
        const scenes=[
          [/FICHA|STACK|EMPILH|DENOMINA/,['▣','FICHAS / STACK']],
          [/CELULAR|TELEFONE|DISPOSITIVO|SOLVER|ASSISTÊNCIA/,['☏','DISPOSITIVOS NA MESA']],
          [/MOSTRAR|EXPOR|CARTA.*AÇÃO|MÃO.*ATIVA/,['♠','CARTAS EXPOSTAS']],
          [/SPLASH|POTE/,['●','FICHAS NO POTE']],
          [/FORA DE VEZ|AÇÃO PENDENTE|ANTES DA VEZ/,['!','ORDEM DA AÇÃO']],
          [/STALL|ATRASAR|DEMORAR|TEMPO/,['◷','RITMO DE JOGO']],
          [/ÁLCOOL|AGRESSIV|AMEAÇA|INSULTO|RESPEIT/,['!','CONDUTA À MESA']],
          [/DEALER|FLOOR|STAFF|RULING|PENAL/,['♣','DEALER / FLOOR']],
          [/FOLD|MUCK|DESCART/,['♠','DESCARTE DE CARTAS']],
          [/ANGLE|COLLUSION|SOFT PLAY|CHIP DUMP/,['!','INTEGRIDADE DO JOGO']],
          [/CONSELHO|COMENTAR|INFORMAÇÃO|OUTS/,['◆','INFORMAÇÃO DA MÃO']],
          [/LEVANTAR|AUSENTE|MESA/,['◇','PRESENÇA À MESA']]
        ];
        const hit=scenes.find(([re])=>re.test(text));
        return hit?{kind:'scene',icon:hit[1][0],title:hit[1][1],lines:['CENÁRIO RELACIONADO À PERGUNTA','AVALIE A CONDUTA DESCRITA']}:null;
      }
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
      .fv-position-board{position:relative;width:100%;max-width:330px;aspect-ratio:9/12.2;min-height:360px;margin:0 auto;border-radius:22px;overflow:hidden;background:radial-gradient(circle at 50% 38%,#083f2f 0,#03251c 48%,#01130f 100%);border:1px solid #b9873d;box-shadow:inset 0 0 45px #000b,0 12px 28px #0004}
      .fv-position-board:before{content:'♠';position:absolute;left:50%;top:3.5%;transform:translateX(-50%);color:#d4aa58;font:22px Arial,sans-serif;text-shadow:0 0 12px #d4aa5888}
      .fv-position-felt{position:absolute;left:15%;right:15%;top:11%;bottom:8%;border-radius:46%/19%;background:linear-gradient(90deg,#50230f 0,#9a4d1f 12%,#6d2f12 24%,#ad5e2b 50%,#6f3013 76%,#9b4c1d 88%,#4a200e 100%);box-shadow:0 0 0 5px #111d18,0 0 0 8px #50665b,0 0 22px #0f7b4c66,inset 0 0 20px #e48b3b66}
      .fv-position-felt:before{content:'';position:absolute;inset:7%;border-radius:46%/19%;background:radial-gradient(ellipse at center,#07603e 0,#034c34 58%,#033326 100%);border:2px solid #108052;box-shadow:inset 0 0 30px #001b14,inset 0 0 0 16px #04432f}
      .fv-position-felt:after{content:'♠';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:66px;height:66px;border:2px solid #1a7b53;border-radius:50%;display:grid;place-items:center;color:#58a87599;font:34px Arial,sans-serif}
      .fv-position-seat{position:absolute;z-index:3;transform:translate(-50%,-50%)}
      .fv-position-seat-label{display:block;min-width:54px;padding:6px 7px;border-radius:10px;background:linear-gradient(180deg,#0c3c2d,#031b15);border:1.5px solid #d4aa58;color:#f8f0df;text-align:center;font-size:11px;line-height:1;box-shadow:0 4px 10px #0008,0 0 8px #0c8e5855;text-transform:uppercase;white-space:nowrap}
      .fv-position-seat.on .fv-position-seat-label{background:linear-gradient(180deg,#ffe8a8,#d4aa58);color:#211008;border-color:#fff0c8;font-weight:800;box-shadow:0 0 0 2px #fff0c855,0 5px 12px #0007}
      .fv-position-dealer{position:absolute;z-index:4;left:29.5%;top:68.5%;width:25px;height:25px;transform:translate(-50%,-50%);border-radius:50%;display:grid;place-items:center;background:linear-gradient(180deg,#fff4c9,#d4aa58);border:2px solid #fff0c8;color:#2b170a;box-shadow:0 4px 10px #0009,0 0 10px #d4aa5870;font:700 11px Arial,sans-serif}
      .fv-board{display:flex;justify-content:center;gap:6px;min-height:64px;align-items:center}.fv-empty{color:#a9947f;font-size:13px;text-align:center;padding:18px 0}
      .fv-streetflow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.fv-streetstage{position:relative;min-width:0;padding:9px 4px;border:1px solid #d4aa5840;border-radius:10px;background:#2a160d;color:#f8f0df;text-align:center;font-size:10px;line-height:1.15}.fv-streetstage:not(:last-child):after{content:'›';position:absolute;right:-7px;top:50%;transform:translateY(-50%);z-index:2;color:#d4aa58;font-size:16px}.fv-streetstage b{display:block;color:#d4aa58;font-size:11px}
      .fv-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 9px;border-top:1px solid #d4aa582d}.fv-row:first-child{border-top:0}.fv-pill{padding:5px 7px;border-radius:8px;background:#0e4b3b;color:#f8f0df;font-size:11px}.fv-value{color:#d4aa58;font-size:12px}
      .fv-steps{display:flex;gap:5px;overflow-x:auto;padding-bottom:3px}.fv-step{min-width:78px;padding:9px 6px;border:1px solid #d4aa5840;border-radius:10px;text-align:center;font-size:10px;color:#d8c6ad}.fv-step.on{background:#0e4b3b;color:#f8f0df;border-color:#d4aa58}
      .fv-scene{text-align:center;padding:5px 4px}.fv-icon{font-family:Arial,sans-serif;font-size:38px;color:#d4aa58}.fv-scene h4{margin:5px 0 7px;color:#f8f0df;font-size:18px}.fv-scene p{margin:3px 0;color:#cfbda7;font-size:12px;line-height:1.35}
      .fv-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.fv-metric{padding:9px 4px;border:1px solid #d4aa5840;border-radius:10px;text-align:center;background:#2a160d}.fv-metric b{display:block;color:#d4aa58;font-size:17px}.fv-metric span{font-size:9px;color:#cfbda7}.fv-name{text-align:center;color:#f8f0df;font-size:18px;margin-bottom:8px}
      .fv-format{display:grid;gap:6px}.fv-format h4{margin:0;color:#d4aa58;font-size:19px}.fv-formatline{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid #d4aa582d;font-size:12px;color:#d8c6ad}
      @media(max-width:380px){.fv-card{width:39px;height:56px}.fv-rank{font-size:15px}.fv-suit{font-size:17px}.fv-position-board{min-height:330px}.fv-position-seat-label{min-width:48px;padding:5px 5px;font-size:10px}.fv-position-dealer{width:23px;height:23px;font-size:10px}}
    `;document.head.appendChild(st);
  }
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function renderCard(c){const suit=c.slice(-1),rank=c.slice(0,-1),red=suit==='♥'||suit==='♦';return `<span class="fv-card${red?' red':''}"><span class="fv-rank">${esc(rank)}</span><span class="fv-suit">${esc(suit)}</span></span>`;}
  function render(v){if(!v)return'';const label=v.label?`<div class="fv-label">${esc(v.label)}</div>`:'';
    if(v.kind==='cards')return `<div class="fv-wrap">${label}<div class="fv-cards">${v.cards.map(renderCard).join('')}</div></div>`;
    if(v.kind==='compare')return `<div class="fv-wrap">${label}<div class="fv-compare"><div class="fv-handbox"><div class="fv-handtitle">MÃO A</div><div class="fv-cards">${v.left.map(renderCard).join('')}</div></div><div class="fv-handbox"><div class="fv-handtitle">MÃO B</div><div class="fv-cards">${v.right.map(renderCard).join('')}</div></div></div></div>`;
    if(v.kind==='board')return `<div class="fv-wrap">${label}<div class="fv-board">${v.cards.length?v.cards.map(renderCard).join(''):'<div class="fv-empty">SEM CARTAS COMUNITÁRIAS</div>'}</div></div>`;
    if(v.kind==='streetflow')return `<div class="fv-wrap"><div class="fv-label">ORDEM DAS STREETS</div><div class="fv-streetflow">${v.steps.map((x,i)=>`<div class="fv-streetstage"><b>${i+1}</b>${esc(x)}</div>`).join('')}</div></div>`;
    if(v.kind==='table'){const pos={UTG1:[50,10],UTG2:[70.5,17.6],MP1:[83.3,37.6],MP2:[83.3,62.4],LJ:[70.5,82.4],HJ:[50,90],CO:[29.5,82.4],BTN:[16.7,62.4],SB:[16.7,37.6],BB:[29.5,17.6]};return `<div class="fv-wrap">${label}<div class="fv-position-board" data-table-visual="canonical" role="img" aria-label="Mesa de poker oval com 10 posições distribuídas uniformemente">${'<div class="fv-position-felt"></div>'}${seats.map(s=>{const p=pos[s];return `<span class="fv-position-seat${s===v.highlight?' on':''}" data-seat="${s}" style="left:${p[0]}%;top:${p[1]}%"><span class="fv-position-seat-label">${s}</span></span>`;}).join('')}<span class="fv-position-dealer" aria-label="Dealer">D</span></div></div>`;}
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
    const idx=Number(m[1])-1; const spot=bank[idx]; if(!spot)return null;
    return {shell,spot,key:`${chapter}:${spot.id||idx}`};
  }
  function apply(){
    addStyle();
    const info=currentSpotInfo();
    if(!info)return;
    const spotEl=info.shell.querySelector('.fi-spot');
    const q=spotEl?.querySelector('.fi-question');
    if(!spotEl||!q)return;
    const old=spotEl.querySelector('.fv-wrap');
    if(!info.spot?.visual){if(old)old.remove();return;}
    if(old?.dataset.fvKey===info.key)return;
    if(old)old.remove();
    q.insertAdjacentHTML('afterend',render(info.spot.visual));
    const fresh=q.nextElementSibling;
    if(fresh?.classList?.contains('fv-wrap'))fresh.dataset.fvKey=info.key;
  }
  let queued=false;
  const root=document.getElementById('root');
  if(root){
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;apply();});
    }).observe(root,{childList:true,subtree:true});
  }
  requestAnimationFrame(apply);
})();
