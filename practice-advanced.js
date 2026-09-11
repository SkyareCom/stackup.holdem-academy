(() => {
  const B=window.StackupPracticeAdvancedBank;
  if(!B) return;

  const STORE='stackup-practice-advanced-v2';
  const POSITIONS=['UTG1','UTG2','MP1','MP2','LJ','HJ','CO','BTN','SB','BB'];
  const POSXY={UTG1:[50,10],UTG2:[70.5,17.6],MP1:[83.3,37.6],MP2:[83.3,62.4],LJ:[70.5,82.4],HJ:[50,90],CO:[29.5,82.4],BTN:[16.7,62.4],SB:[16.7,37.6],BB:[29.5,17.6]};
  let state={sim:{results:{}},quiz:{results:{}},math:{results:{}}};
  try{state={...state,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch(_){ }
  ['sim','quiz','math'].forEach(k=>{if(!state[k])state[k]={results:{}};if(!state[k].results)state[k].results={}});
  const current={sim:null,quiz:null,math:null};
  const history={sim:[],quiz:[],math:[]};
  const answered={sim:false,quiz:false,math:false};
  const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(state))}catch(_){}};
  const pct=(a,b)=>b?Math.round(a*100/b):0;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase();
  const num=s=>Number(String(s).replace(',','.'));
  const fmt=n=>Number.isInteger(n)?String(n):String(Math.round(n*10)/10).replace('.',',');
  const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
  const seeded=(arr,seed)=>{const a=arr.slice();let x=seed||1;for(let i=a.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const shuffleOptions=item=>seeded(item.options,item.id?hash(item.id):1);

  const style=document.createElement('style');
  style.id='stackup-practice-advanced-style-v2';
  style.textContent=`
    .card.lesson.p3x-active>.p3-shell,.card.lesson.p3x-active>.p3-simulator-table{display:none!important}
    .p3x-shell{margin-top:15px;color:#25170f}
    .p3x-counter{position:sticky;top:8px;z-index:20;margin:10px 0 14px!important;box-shadow:0 8px 18px #0004}
    .p3x-kicker{font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:#a87c32;margin-bottom:7px}
    .p3x-panel{border:1px solid #a87c3260;background:#efe4cd;border-radius:18px;padding:14px;margin-top:12px}
    .p3x-panel h3{margin:0 0 8px;font-size:21px;color:#08372d;text-transform:uppercase}
    .p3x-panel p{margin:0;color:#725f4d;font-size:16px;line-height:1.48}
    .p3x-live{width:100%;max-width:500px;margin:12px auto 14px}
    .p3x-live .positions-board{margin-inline:auto;overflow:hidden}
    .p3x-live .positions-table:after{opacity:.25}
    .p3x-live .seat{z-index:7}
    .p3x-live .seat-label{min-width:58px;padding:6px 7px}
    .p3x-live .seat.hero .seat-label{background:linear-gradient(180deg,#f0d48c,#c99539)!important;color:#2b170a!important;border-color:#fff0c8!important;box-shadow:0 0 0 2px #fff7d355,0 0 18px #d4aa58aa!important}
    .p3x-live .seat.villain .seat-label{border-color:#d58b73!important;box-shadow:0 0 0 2px #9d313155,0 0 14px #9d313166!important}
    .p3x-seat-stack{display:block;margin-top:4px;padding:3px 5px;border-radius:7px;background:#150b07e6;color:#d4aa58;font:700 10px Arial,sans-serif;text-align:center;white-space:nowrap}
    .p3x-dealer{position:absolute;z-index:8;left:30%;top:68.5%;width:28px;height:28px;transform:translate(-50%,-50%);border-radius:50%;display:grid;place-items:center;background:linear-gradient(180deg,#fff4c9,#d4aa58);border:2px solid #fff0c8;color:#2b170a;box-shadow:0 4px 10px #0009;font:700 13px Arial,sans-serif}
    .p3x-table-center{position:absolute;z-index:5;left:50%;top:49%;transform:translate(-50%,-50%);width:64%;text-align:center;color:#f8f0df;pointer-events:none}
    .p3x-phase{display:inline-block;padding:6px 9px;border:1px solid #d4aa58;border-radius:10px;background:#211008ee;color:#d4aa58;font-size:10px;letter-spacing:.05em;text-transform:uppercase;box-shadow:0 3px 12px #0007}
    .p3x-board{display:flex;justify-content:center;gap:3px;min-height:44px;margin:8px 0 5px;flex-wrap:nowrap}
    .p3x-card{display:inline-flex;align-items:center;justify-content:center;min-width:29px;height:42px;padding:0 4px;border-radius:6px;background:#fffdf7;border:1px solid #d4c6a6;color:#17120f;font:700 13px Arial,sans-serif;box-shadow:0 2px 5px #0005;animation:p3xReveal .25s ease both}.p3x-card.red{color:#a32929}
    .p3x-card.back{background:repeating-linear-gradient(45deg,#173f36,#173f36 4px,#0d2d27 4px,#0d2d27 8px);color:#d4aa58;border-color:#d4aa58}
    @keyframes p3xReveal{from{opacity:0;transform:translateY(-7px) scale(.9)}to{opacity:1;transform:none}}
    .p3x-pot{display:inline-flex;align-items:center;gap:6px;padding:5px 8px;border-radius:10px;background:#061e18e6;border:1px solid #d4aa5870;color:#f8f0df;font:700 11px Arial,sans-serif}
    .p3x-pot:before{content:'';width:12px;height:12px;border-radius:50%;background:#d4aa58;box-shadow:6px 0 0 #8b3b24,-6px 0 0 #d8c6ad}
    .p3x-action-bubble{position:absolute;z-index:9;left:50%;top:72%;transform:translateX(-50%);max-width:70%;padding:7px 9px;border-radius:10px;background:#211008ed;border:1px solid #d4aa58;color:#f8f0df;font-size:11px;line-height:1.25;text-align:center;opacity:0;transition:.25s}.p3x-action-bubble.show{opacity:1;top:69%}
    .p3x-deal-card{position:absolute;z-index:20;width:22px;height:31px;border-radius:4px;background:repeating-linear-gradient(45deg,#173f36,#173f36 3px,#0d2d27 3px,#0d2d27 6px);border:1px solid #d4aa58;pointer-events:none}
    .p3x-chip-flight{position:absolute;z-index:18;width:13px;height:13px;border-radius:50%;background:#d4aa58;border:2px solid #fff0c8;box-shadow:0 0 0 2px #8b3b24,0 3px 6px #0008;pointer-events:none}
    .p3x-info{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:9px auto 0;max-width:500px}
    .p3x-info div{padding:8px 4px;border-radius:10px;background:#2a160d;border:1px solid #d4aa5860;text-align:center;color:#f8f0df;min-width:0}.p3x-info small{display:block;font-size:9px;color:#d8c6ad;text-transform:uppercase;white-space:nowrap}.p3x-info b{display:block;margin-top:3px;color:#d4aa58;font:700 13px Arial,sans-serif;white-space:nowrap}
    .p3x-hands{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:7px}.p3x-hand{padding:8px;border-radius:10px;background:#e7dcc2;border:1px solid #a87c3255;text-align:center}.p3x-hand strong{display:block;font-size:10px;color:#725f4d;text-transform:uppercase;margin-bottom:5px}.p3x-cards{display:flex;gap:4px;justify-content:center;flex-wrap:wrap}.p3x-empty{color:#8f7b63;font-size:13px}
    .p3x-context{padding:10px 12px;border-radius:12px;background:#211008;color:#d4aa58;font-size:13px;line-height:1.4;margin-bottom:10px}
    .p3x-question{font-size:18px;line-height:1.42;margin:0 0 12px;color:#25170f}
    .p3x-options{display:grid;gap:8px}.p3x-opt{width:100%;min-height:46px;padding:10px 12px;border:1px solid #a87c32;border-radius:12px;background:#f8f0df;color:#25170f;text-align:left;font:inherit;font-size:15px;cursor:pointer}.p3x-opt:disabled{cursor:default}.p3x-opt.ok{background:#dcebdc;border-color:#487a4d}.p3x-opt.bad{background:#efd9d3;border-color:#9b5144}
    .p3x-feedback{display:none;margin-top:11px;padding:11px 12px;border-radius:12px;background:#2a160d;color:#f8f0df;font-size:14px;line-height:1.45}.p3x-feedback.show{display:block}.p3x-feedback strong{color:#d4aa58}
    .p3x-nav{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:11px}.p3x-btn{min-height:43px;border:1px solid #a87c32;border-radius:12px;background:#2a160d;color:#d4aa58;font:inherit;font-size:13px;text-transform:uppercase;cursor:pointer}.p3x-btn:disabled{opacity:.45}
    .p3x-quiz-banner{margin-bottom:10px;padding:10px 12px;border-radius:12px;background:linear-gradient(180deg,#195f4c,#08372d);border:1px solid #d4aa58;color:#f8f0df;text-align:center}.p3x-quiz-banner strong{display:block;color:#d4aa58;font-size:18px}.p3x-quiz-banner span{font-size:12px;text-transform:uppercase}
    .p3x-badge{display:inline-block;margin-bottom:9px;padding:5px 8px;border-radius:9px;background:#d4aa5826;border:1px solid #a87c32;color:#7a571f;font-size:11px;text-transform:uppercase}
    .p3x-math-grid{display:grid;gap:10px;margin-top:12px}.p3x-math-card{padding:13px;border:1px solid #a87c3260;border-radius:15px;background:#e7dcc2}.p3x-math-card h3{margin:0 0 5px;color:#08372d;font-size:19px;text-transform:uppercase}.p3x-math-card p{margin:0;color:#725f4d;font-size:15px;line-height:1.45}.p3x-math-card .formula{margin:8px 0;padding:9px;border-radius:10px;background:#211008;color:#d4aa58;font-size:14px}.p3x-tip{font-size:14px!important;color:#5f4b39!important}
    @media(max-width:390px){.p3x-table-center{width:68%}.p3x-card{min-width:25px;height:37px;font-size:11px}.p3x-info{grid-template-columns:1fr 1fr}.p3x-nav{grid-template-columns:1fr 1fr}.p3x-nav .p3x-btn:last-child{grid-column:1/-1}.p3x-seat-stack{font-size:9px}.p3x-hands{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function counter(mode,total){
    const r=state[mode].results||{};
    const done=Object.keys(r).length,correct=Object.values(r).filter(Boolean).length;
    return `<div class="fi-stats p3x-counter" data-unified-progress="1"><div class="fi-stat"><span class="fi-stat-label">CERTOS</span><strong class="fi-stat-value">${correct} · ${pct(correct,done)}%</strong></div><div class="fi-stat"><span class="fi-stat-label">REALIZADOS</span><strong class="fi-stat-value">${done} · ${pct(done,total)}%</strong></div><div class="fi-stat"><span class="fi-stat-label">TOTAL</span><strong class="fi-stat-value">${total} · 100%</strong></div></div>`;
  }

  function pick(mode,bank){
    const r=state[mode].results||{};
    const unseen=bank.filter(x=>!(x.id in r));
    const pool=unseen.length?unseen:bank;
    return pool[Math.floor(Math.random()*pool.length)];
  }
  function pushHistory(mode,item){if(current[mode])history[mode].push(current[mode]);if(history[mode].length>30)history[mode].shift();current[mode]=item;answered[mode]=false}

  const deckFor=id=>{
    const ranks=['A','K','Q','J','10','9','8','7','6','5','4','3','2'],suits=['♠','♥','♦','♣'];
    const d=[];for(const r of ranks)for(const s of suits)d.push(r+s);
    return seeded(d,hash(id));
  };
  function scenario(spot){
    const d=deckFor(spot.id||'S001');
    const game=String(spot.game||'');
    const holeCount=/PLO6/i.test(game)?6:/PLO5/i.test(game)?5:/PLO4|OMAHA/i.test(game)?4:/DRAW/i.test(game)?5:2;
    const heroCards=spot.heroCards?String(spot.heroCards).trim().split(/\s+/):d.splice(0,holeCount);
    heroCards.forEach(c=>{const i=d.indexOf(c);if(i>=0)d.splice(i,1)});
    const villainFace=spot.villainCards?String(spot.villainCards).trim().split(/\s+/):d.splice(0,holeCount);
    villainFace.forEach(c=>{const i=d.indexOf(c);if(i>=0)d.splice(i,1)});
    let board=spot.board?String(spot.board).trim().split(/\s+/):[];
    if(!board.length){const st=norm(spot.street);const n=st.includes('SHOWDOWN')||st.includes('RIVER')?5:st.includes('TURN')?4:st.includes('FLOP')?3:0;board=d.splice(0,n)}
    const context=String(spot.context||'');
    const stackM=context.match(/Stack\s+(\d+(?:[.,]\d+)?)\s*BB/i);
    const potM=context.match(/Pote antes da aposta:\s*(\d+(?:[.,]\d+)?)\s*BB/i);
    const betM=context.match(/vil[aã]o aposta\s*(\d+(?:[.,]\d+)?)\s*BB/i);
    const raiseM=context.match(/aumenta de\s*1\s*BB\s*para\s*(\d+(?:[.,]\d+)?)\s*BB/i);
    const stack=stackM?num(stackM[1]):100;
    const heroBet=spot.hero==='BB'?1:spot.hero==='SB'?0.5:0;
    const villainBet=betM?num(betM[1]):raiseM?num(raiseM[1]):(norm(spot.kind).includes('ACAO')?2.5:0);
    const basePot=potM?num(potM[1]):norm(spot.street).includes('PREFLOP')?1.5:norm(spot.street).includes('FLOP')?5:norm(spot.street).includes('TURN')?10:norm(spot.street).includes('RIVER')||norm(spot.street).includes('SHOWDOWN')?18:1.5;
    const pot=basePot+villainBet+heroBet;
    const toCall=Math.max(0,villainBet-heroBet);
    const villain=spot.villain||(['BTN','CO','HJ','LJ','UTG1'].includes(spot.hero)?'BB':'BTN');
    return {hero:spot.hero||'BB',villain,heroCards,villainFace,board,stack,heroBet,villainBet,pot,toCall,showdown:norm(spot.street).includes('SHOWDOWN')||norm(spot.kind).includes('SHOWDOWN')};
  }

  const cardHtml=(c,back=false)=>back?'<span class="p3x-card back">♠</span>':`<span class="p3x-card ${/[♥♦]/.test(c)?'red':''}">${esc(c)}</span>`;
  const cardsHtml=(a,back=false)=>a?.length?a.map(c=>cardHtml(c,back)).join(''):'<span class="p3x-empty">—</span>';
  function liveTable(spot){
    const sc=scenario(spot);
    const seats=POSITIONS.map(p=>{const special=p===sc.hero?'hero':p===sc.villain?'villain':'';const invested=p===sc.hero?sc.heroBet:(p===sc.villain?sc.villainBet:(p==='SB'?0.5:p==='BB'?1:0));const seatStack=Math.max(0,100-invested);return `<div class="seat s-${p.toLowerCase()} ${special}" data-seat="${p}"><span class="seat-label">${p}</span><span class="p3x-seat-stack">${fmt(seatStack)} BB</span></div>`}).join('');
    return `<div class="p3x-live" data-live><div class="positions-board" data-board><div class="positions-table"></div>${seats}<div class="p3x-dealer">D</div><div class="p3x-table-center"><div class="p3x-phase" data-phase>DEALER EMBARALHANDO...</div><div class="p3x-board" data-boardcards>${cardsHtml(sc.board)}</div><div class="p3x-pot">POTE <span data-pot>${fmt(sc.pot)} BB</span></div></div><div class="p3x-action-bubble" data-action></div></div><div class="p3x-info"><div><small>STACK HERÓI</small><b>${fmt(Math.max(0,sc.stack-sc.heroBet))} BB</b></div><div><small>APOSTADO</small><b>${fmt(sc.heroBet)} BB</b></div><div><small>A PAGAR</small><b>${fmt(sc.toCall)} BB</b></div><div><small>VILÃO</small><b>${fmt(sc.villainBet)} BB</b></div></div><div class="p3x-hands"><div class="p3x-hand"><strong>HERÓI · ${esc(sc.hero)}</strong><div class="p3x-cards">${cardsHtml(sc.heroCards)}</div></div><div class="p3x-hand"><strong>VILÃO · ${esc(sc.villain)}</strong><div class="p3x-cards" data-villain>${cardsHtml(sc.villainFace,!sc.showdown)}</div></div></div></div>`;
  }

  function fly(board,from,delay=0){
    const seat=board.querySelector(`[data-seat="${from}"]`);if(!seat)return;
    const chip=document.createElement('span');chip.className='p3x-chip-flight';board.appendChild(chip);
    const br=board.getBoundingClientRect(),sr=seat.getBoundingClientRect();const sx=sr.left-br.left+sr.width/2,sy=sr.top-br.top+sr.height/2,ex=br.width/2,ey=br.height/2;
    chip.style.left=(sx-6)+'px';chip.style.top=(sy-6)+'px';
    setTimeout(()=>{const a=chip.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${ex-sx}px,${ey-sy}px) scale(.75)`}],{duration:520,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});a.onfinish=()=>chip.remove()},delay);
  }
  function deal(board,to,delay=0){
    const seat=board.querySelector(`[data-seat="${to}"]`);if(!seat)return;
    const card=document.createElement('span');card.className='p3x-deal-card';board.appendChild(card);
    const br=board.getBoundingClientRect(),sr=seat.getBoundingClientRect();const sx=br.width/2,sy=br.height/2,ex=sr.left-br.left+sr.width/2,ey=sr.top-br.top+sr.height/2;
    card.style.left=(sx-11)+'px';card.style.top=(sy-15)+'px';
    setTimeout(()=>{const a=card.animate([{transform:'translate(0,0) rotate(0deg)',opacity:1},{transform:`translate(${ex-sx}px,${ey-sy}px) rotate(12deg)`,opacity:.95}],{duration:420,easing:'ease-out',fill:'forwards'});a.onfinish=()=>setTimeout(()=>card.remove(),120)},delay);
  }
  function animateHand(shell,spot){
    const board=shell.querySelector('[data-board]'),phase=shell.querySelector('[data-phase]'),bubble=shell.querySelector('[data-action]');if(!board||!phase)return;
    const sc=scenario(spot);
    setTimeout(()=>{if(!document.contains(board))return;phase.textContent='BLINDS ENTRANDO NO POTE';fly(board,'SB');fly(board,'BB',120)},350);
    setTimeout(()=>{if(!document.contains(board))return;phase.textContent='DISTRIBUINDO AS CARTAS';deal(board,sc.hero);deal(board,sc.villain,160)},900);
    setTimeout(()=>{if(!document.contains(board))return;phase.textContent=spot.phase||spot.street||'SUA AÇÃO';if(sc.villainBet>0){bubble.textContent=`${sc.villain} · ${sc.villainBet>1?'APOSTA / RAISE':'BLIND'} ${fmt(sc.villainBet)} BB`;bubble.classList.add('show');fly(board,sc.villain)}else{bubble.textContent=sc.showdown?'SHOWDOWN · CARTAS ABERTAS':'AÇÃO CHEGA ATÉ VOCÊ';bubble.classList.add('show')}if(sc.showdown){const v=shell.querySelector('[data-villain]');if(v)v.innerHTML=cardsHtml(sc.villainFace)}} ,1550);
  }

  function optionBlock(item){
    const opts=shuffleOptions(item);
    return `<div class="p3x-context">${esc(item.context||item.topic||item.game||'TREINO')}</div><p class="p3x-question">${esc(item.question)}</p><div class="p3x-options">${opts.map(o=>`<button class="p3x-opt" type="button" data-answer="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="p3x-feedback" data-feedback></div>`;
  }

  function lessonNow(){return document.querySelector('#root .card.lesson.p3x-active')}
  function shellFor(mode){return lessonNow()?.querySelector(`[data-p3x="${mode}"]`)}

  function bindExercise(shell,mode,bank,total,spot){
    const item=current[mode];
    shell.querySelectorAll('.p3x-opt').forEach(btn=>btn.addEventListener('click',()=>{
      if(answered[mode])return;answered[mode]=true;
      const selected=btn.dataset.answer,ok=selected===item.answer;state[mode].results[item.id]=ok;save();
      shell.querySelectorAll('.p3x-opt').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.answer)b.classList.add('ok');else if(b===btn&&!ok)b.classList.add('bad')});
      const fb=shell.querySelector('[data-feedback]');fb.classList.add('show');fb.innerHTML=`<strong>${ok?'CORRETO':'RESPOSTA CORRETA: '+esc(item.answer)}</strong><br>${esc(item.why)}`;
      const old=shell.querySelector('.p3x-counter');if(old)old.outerHTML=counter(mode,total);
      if(mode==='sim'&&spot){const board=shell.querySelector('[data-board]');if(board)fly(board,scenario(spot).hero);const phase=shell.querySelector('[data-phase]');if(phase)phase.textContent=ok?'AÇÃO CORRETA · MÃO CONTINUA':'REVISE A REGRA DESTE SPOT'}
    }));
    const prev=shell.querySelector('[data-prev]');if(prev)prev.disabled=!history[mode].length;
    shell.querySelector('[data-prev]')?.addEventListener('click',()=>{if(!history[mode].length)return;current[mode]=history[mode].pop();answered[mode]=false;renderMode(mode)});
    shell.querySelector('[data-redo]')?.addEventListener('click',()=>{answered[mode]=false;renderMode(mode)});
    shell.querySelector('[data-next]')?.addEventListener('click',()=>{pushHistory(mode,pick(mode,bank));renderMode(mode)});
  }

  function renderMode(mode){
    const shell=shellFor(mode);if(!shell)return;
    if(mode==='sim'){
      if(!current.sim)current.sim=pick('sim',B.sim);
      const s=current.sim;
      shell.innerHTML=`${counter('sim',B.sim.length)}<div class="p3x-kicker">${esc(s.game)} · SPOT ${esc(s.id)} · MÃO SIMULADA</div>${liveTable(s)}<div class="p3x-panel"><h3>SUA DECISÃO</h3>${optionBlock(s)}<div class="p3x-nav"><button class="p3x-btn" data-prev>ANTERIOR</button><button class="p3x-btn" data-redo>REFAZER MÃO</button><button class="p3x-btn" data-next>PRÓXIMA MÃO</button></div></div>`;
      bindExercise(shell,'sim',B.sim,B.sim.length,s);requestAnimationFrame(()=>animateHand(shell,s));
    }else if(mode==='quiz'){
      if(!current.quiz)current.quiz=pick('quiz',B.quiz);
      const q=current.quiz;
      shell.innerHTML=`${counter('quiz',B.quiz.length)}<div class="p3x-quiz-banner"><strong>${B.quiz.length} PERGUNTAS ATIVAS</strong><span>Banco geral · fundamentos + modalidades + conceitos</span></div><div class="p3x-panel"><span class="p3x-badge">${esc(q.topic||'GERAL')} · ${esc(q.id)}</span>${optionBlock(q)}<div class="p3x-nav"><button class="p3x-btn" data-prev>ANTERIOR</button><button class="p3x-btn" data-redo>REFAZER</button><button class="p3x-btn" data-next>PRÓXIMA</button></div></div>`;
      bindExercise(shell,'quiz',B.quiz,B.quiz.length);
    }else{
      if(!current.math)current.math=pick('math',B.math);
      const m=current.math;
      shell.innerHTML=`<div class="p3x-math-grid">${B.mathTheory.map(x=>`<div class="p3x-math-card"><h3>${esc(x.title)}</h3><p><strong>PARA QUE SERVE:</strong> ${esc(x.use)}</p><div class="formula">${esc(x.formula)}</div><p class="p3x-tip"><strong>DICA / ATALHO:</strong> ${esc(x.tip)}</p></div>`).join('')}</div><div class="p3x-panel"><h3>PRÁTICA DE CÁLCULO</h3>${counter('math',B.math.length)}<span class="p3x-badge">${esc(m.topic)} · ${esc(m.id)}</span>${optionBlock(m)}<div class="p3x-nav"><button class="p3x-btn" data-prev>ANTERIOR</button><button class="p3x-btn" data-redo>REFAZER</button><button class="p3x-btn" data-next>PRÓXIMO</button></div></div>`;
      bindExercise(shell,'math',B.math,B.math.length);
    }
  }

  function setTheory(lesson,mode){
    const blocks=lesson.querySelector('.blocks');if(!blocks)return;
    if(mode==='sim')blocks.innerHTML=`<div class="block"><h3>SIMULAÇÃO DE JOGO</h3><p>A mão acontece visualmente na mesa: dealer, blinds, distribuição, stacks, apostas, pote, valor a pagar, board e showdown. A pergunta aparece como decisão dentro da situação.</p></div><div class="block"><h3>250 SPOTS</h3><p><strong>175 Texas Hold’em</strong>, <strong>50 Omaha PLO4/PLO5/PLO6</strong> e <strong>25 das demais modalidades</strong>.</p></div><div class="block"><h3>NÍVEL</h3><p>Situações conceituais e reais de nível inicial para o jogador se ambientar com a sequência de uma mão.</p></div>`;
    if(mode==='quiz')blocks.innerHTML=`<div class="block"><h3>150 PERGUNTAS INÉDITAS</h3><p>Perguntas gerais sobre tudo que foi ensinado no app: conceitos, jogo, regras, terminologias, modalidades e comportamento.</p></div><div class="block"><h3>SEM REPETIR O EXERCÍCIO DO CAPÍTULO</h3><p>O Quiz reformula o conhecimento e cobra aplicação fora do contexto exato em que ele foi apresentado.</p></div>`;
    if(mode==='math')blocks.innerHTML=`<div class="block"><h3>MATEMÁTICA QUE VOCÊ USA NA MESA</h3><p>Cada cálculo explica para que serve, como usar e um atalho mental. Inclui Regra do 2 e do 4, outs, pot odds, SPR, EV, MDF, alpha e probabilidades de referência.</p></div>`;
  }

  function modeFor(title){const t=norm(title);if(t==='SIMULADOR')return'sim';if(t==='QUIZ')return'quiz';if(t==='MATEMATICA DO POKER SIMPLIFICADA')return'math';return null}
  function apply(){
    const lesson=document.querySelector('#root .card.lesson');const h=lesson?.querySelector('h2');if(!lesson||!h)return;
    const mode=modeFor(h.textContent);if(!mode)return;
    let host=lesson.querySelector('.p3x-shell');
    if(lesson.dataset.p3x==='1'&&host&&host.dataset.p3x===mode&&host.childElementCount)return;
    lesson.dataset.p3x='1';lesson.classList.add('p3x-active');setTheory(lesson,mode);
    if(host)host.remove();host=document.createElement('div');host.className='p3x-shell';host.dataset.p3x=mode;lesson.appendChild(host);renderMode(mode);
  }
  const root=document.getElementById('root');if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true});apply();
  window.StackupPracticeAdvanced={allocation:B.allocation,reset:()=>{localStorage.removeItem(STORE);location.reload()}};
})();