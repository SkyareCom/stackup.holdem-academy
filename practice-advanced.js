(() => {
  const B=window.StackupPracticeAdvancedBank;
  if(!B) return;
  const STORE='stackup-practice-advanced-v1';
  const TITLES=['SIMULADOR','QUIZ','MATEMÁTICA DO POKER SIMPLIFICADA'];
  let state={sim:{results:{}},quiz:{results:{}},math:{results:{}}};
  try{state={...state,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch(_){ }
  ['sim','quiz','math'].forEach(k=>{if(!state[k])state[k]={results:{}};if(!state[k].results)state[k].results={}});
  const current={sim:null,quiz:null,math:null};
  const history={sim:[],quiz:[],math:[]};
  const answered={sim:false,quiz:false,math:false};
  const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(state))}catch(_){}};
  const pct=(a,b)=>b?Math.round(a*100/b):0;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
  const seatClass=p=>'s-'+String(p||'').toLowerCase();
  const cardHtml=c=>`<span class="p3x-card ${/[♥♦]/.test(c)?'red':''}">${esc(c)}</span>`;
  const cardsHtml=s=>String(s||'').trim()?String(s).trim().split(/\s+/).map(cardHtml).join(''):'<span class="p3x-empty">—</span>';

  const style=document.createElement('style');
  style.id='stackup-practice-advanced-style';
  style.textContent=`
    .card.lesson.p3x-active>.p3-shell,.card.lesson.p3x-active .p3-simulator-table{display:none!important}
    .p3x-shell{margin-top:15px;color:#25170f}
    .p3x-counter{position:sticky;top:8px;z-index:15;margin:10px 0 14px!important;box-shadow:0 8px 18px #0004}
    .p3x-kicker{font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:#a87c32;margin-bottom:6px}
    .p3x-panel{border:1px solid #a87c3260;background:#efe4cd;border-radius:18px;padding:14px;margin-top:12px}
    .p3x-panel h3{margin:0 0 8px;font-size:21px;color:#08372d;text-transform:uppercase}
    .p3x-panel p{margin:0;color:#725f4d;font-size:16px;line-height:1.48}
    .p3x-table-wrap{margin:13px auto 14px;width:100%;max-width:500px}
    .p3x-table-wrap .positions-board{margin-inline:auto}
    .p3x-table-wrap .seat.hero .seat-label{background:linear-gradient(180deg,#f0d48c,#c99539)!important;color:#2b170a!important;border-color:#fff0c8!important;box-shadow:0 0 0 2px #fff7d355,0 0 18px #d4aa58aa!important}
    .p3x-table-wrap .seat.villain .seat-label{box-shadow:0 0 0 2px #9d313155,0 0 16px #9d313166!important}
    .p3x-dealer{position:absolute;z-index:5;left:28%;top:78%;width:31px;height:31px;border-radius:50%;display:grid;place-items:center;background:#f4d98f;border:2px solid #fff0c8;color:#2b170a;font:700 14px Arial,sans-serif;box-shadow:0 3px 9px #0007}
    .p3x-center{position:absolute;z-index:4;left:50%;top:50%;transform:translate(-50%,-50%);width:62%;text-align:center;color:#f8f0df}
    .p3x-phase{display:inline-block;padding:6px 9px;border:1px solid #d4aa58;border-radius:10px;background:#211008e8;color:#d4aa58;font-size:11px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
    .p3x-line{margin:6px 0}.p3x-line b{display:block;color:#d8c6ad;font-size:10px;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px}
    .p3x-cards{display:flex;justify-content:center;gap:4px;flex-wrap:wrap}
    .p3x-card{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:42px;padding:0 5px;border-radius:6px;background:#fffdf7;border:1px solid #d4c6a6;color:#17120f;font:700 13px Arial,sans-serif;box-shadow:0 2px 5px #0004}.p3x-card.red{color:#a32929}.p3x-empty{color:#aa9a82}
    .p3x-context{padding:10px 12px;border-radius:12px;background:#211008;color:#d4aa58;font-size:13px;line-height:1.4;margin-bottom:10px}
    .p3x-question{font-size:18px;line-height:1.42;margin:0 0 12px;color:#25170f}
    .p3x-options{display:grid;gap:8px}.p3x-opt{width:100%;min-height:46px;padding:10px 12px;border:1px solid #a87c32;border-radius:12px;background:#f8f0df;color:#25170f;text-align:left;font:inherit;font-size:15px;cursor:pointer}.p3x-opt:disabled{cursor:default}.p3x-opt.ok{background:#dcebdc;border-color:#487a4d}.p3x-opt.bad{background:#efd9d3;border-color:#9b5144}
    .p3x-feedback{display:none;margin-top:11px;padding:11px 12px;border-radius:12px;background:#2a160d;color:#f8f0df;font-size:14px;line-height:1.45}.p3x-feedback.show{display:block}.p3x-feedback strong{color:#d4aa58}
    .p3x-nav{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:11px}.p3x-btn{min-height:43px;border:1px solid #a87c32;border-radius:12px;background:#2a160d;color:#d4aa58;font:inherit;font-size:13px;text-transform:uppercase;cursor:pointer}.p3x-btn:disabled{opacity:.45}
    .p3x-theory{display:grid;gap:10px}.p3x-math-grid{display:grid;gap:10px;margin-top:12px}.p3x-math-card{padding:13px;border:1px solid #a87c3260;border-radius:15px;background:#e7dcc2}.p3x-math-card h3{margin:0 0 5px;color:#08372d;font-size:19px;text-transform:uppercase}.p3x-math-card .formula{margin:8px 0;padding:9px;border-radius:10px;background:#211008;color:#d4aa58;font-size:14px}.p3x-tip{font-size:14px!important;color:#5f4b39!important}.p3x-badge{display:inline-block;margin-bottom:9px;padding:5px 8px;border-radius:9px;background:#d4aa5826;border:1px solid #a87c32;color:#7a571f;font-size:11px;text-transform:uppercase}
    @media(max-width:390px){.p3x-center{width:68%}.p3x-card{min-width:26px;height:38px;font-size:12px}.p3x-nav{grid-template-columns:1fr 1fr}.p3x-nav .p3x-btn:last-child{grid-column:1/-1}}
  `;
  document.head.appendChild(style);

  function counter(mode,total){
    const r=state[mode].results||{};
    const ids=Object.keys(r), done=ids.length, correct=ids.filter(id=>r[id]===true).length;
    const efficiency=pct(correct,done), coverage=pct(done,total);
    return `<div class="fi-stats p3x-counter" data-unified-progress="1">
      <div class="fi-stat"><span class="fi-stat-label">CERTOS</span><strong class="fi-stat-value">${correct} · ${efficiency}%</strong></div>
      <div class="fi-stat"><span class="fi-stat-label">REALIZADOS</span><strong class="fi-stat-value">${done} · ${coverage}%</strong></div>
      <div class="fi-stat"><span class="fi-stat-label">TOTAL</span><strong class="fi-stat-value">${total} · 100%</strong></div>
    </div>`;
  }

  function pick(mode,bank){
    const r=state[mode].results||{};
    const unseen=bank.filter(x=>!(x.id in r));
    const pool=unseen.length?unseen:bank;
    return pool[Math.floor(Math.random()*pool.length)];
  }
  function pushHistory(mode,item){if(current[mode])history[mode].push(current[mode]);if(history[mode].length>30)history[mode].shift();current[mode]=item;answered[mode]=false;}

  function table(spot){
    const seats=['UTG1','UTG2','MP1','MP2','LJ','HJ','CO','BTN','SB','BB'];
    return `<div class="p3x-table-wrap"><div class="positions-board" aria-label="Mesa de treino com dez posições">
      <div class="positions-table"></div>${seats.map(p=>`<div class="seat ${seatClass(p)} ${p===spot.hero?'hero':''} ${p===spot.villain?'villain':''}"><span class="seat-label">${p}</span></div>`).join('')}
      <div class="p3x-dealer">D</div>
      <div class="p3x-center">
        <div class="p3x-phase" data-phase>DEALER EMBARALHANDO...</div>
        <div class="p3x-line"><b>HERÓI ${spot.hero?`· ${esc(spot.hero)}`:''}</b><div class="p3x-cards">${cardsHtml(spot.heroCards)}</div></div>
        ${spot.villainCards?`<div class="p3x-line"><b>VILÃO ${spot.villain?`· ${esc(spot.villain)}`:''}</b><div class="p3x-cards">${cardsHtml(spot.villainCards)}</div></div>`:''}
        ${spot.board?`<div class="p3x-line"><b>BOARD</b><div class="p3x-cards">${cardsHtml(spot.board)}</div></div>`:''}
      </div>
    </div></div>`;
  }

  function optionBlock(mode,item){
    return `<div class="p3x-context">${esc(item.context||item.topic||item.game||'TREINO')}</div><p class="p3x-question">${esc(item.question)}</p><div class="p3x-options">${item.options.map(o=>`<button class="p3x-opt" type="button" data-answer="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="p3x-feedback" data-feedback></div>`;
  }

  function bindExercise(shell,mode,bank,total,hasTable){
    const item=current[mode];
    shell.querySelectorAll('.p3x-opt').forEach(btn=>btn.addEventListener('click',()=>{
      if(answered[mode])return;
      answered[mode]=true;
      const selected=btn.dataset.answer, ok=selected===item.answer;
      state[mode].results[item.id]=ok;save();
      shell.querySelectorAll('.p3x-opt').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.answer)b.classList.add('ok');else if(b===btn&&!ok)b.classList.add('bad')});
      const fb=shell.querySelector('[data-feedback]');fb.classList.add('show');fb.innerHTML=`<strong>${ok?'CORRETO':'RESPOSTA CORRETA: '+esc(item.answer)}</strong><br>${esc(item.why)}`;
      const old=shell.querySelector('.p3x-counter');old.outerHTML=counter(mode,total);
    }));
    const prev=shell.querySelector('[data-prev]'); if(prev)prev.disabled=!history[mode].length;
    shell.querySelector('[data-prev]')?.addEventListener('click',()=>{if(!history[mode].length)return;current[mode]=history[mode].pop();answered[mode]=false;renderMode(mode)});
    shell.querySelector('[data-redo]')?.addEventListener('click',()=>{answered[mode]=false;renderMode(mode)});
    shell.querySelector('[data-next]')?.addEventListener('click',()=>{pushHistory(mode,pick(mode,bank));renderMode(mode)});
    if(hasTable){
      const phase=shell.querySelector('[data-phase]');
      if(phase){setTimeout(()=>{if(document.contains(phase))phase.textContent='DISTRIBUINDO AS CARTAS...'},350);setTimeout(()=>{if(document.contains(phase))phase.textContent=item.phase||item.street||'SUA AÇÃO'},850)}
    }
  }

  function lessonNow(){return document.querySelector('#root .card.lesson.p3x-active')}
  function shellFor(mode){return lessonNow()?.querySelector(`[data-p3x="${mode}"]`)}

  function renderMode(mode){
    const shell=shellFor(mode);if(!shell)return;
    if(mode==='sim'){
      if(!current.sim)current.sim=pick('sim',B.sim);
      const s=current.sim;
      shell.innerHTML=`${counter('sim',B.sim.length)}<div class="p3x-kicker">${esc(s.game)} · SPOT ${esc(s.id)}</div>${table(s)}<div class="p3x-panel">${optionBlock('sim',s)}<div class="p3x-nav"><button class="p3x-btn" data-prev>ANTERIOR</button><button class="p3x-btn" data-redo>REFAZER</button><button class="p3x-btn" data-next>PRÓXIMO</button></div></div>`;
      bindExercise(shell,'sim',B.sim,B.sim.length,true);
    }else if(mode==='quiz'){
      if(!current.quiz)current.quiz=pick('quiz',B.quiz);
      const q=current.quiz;
      shell.innerHTML=`${counter('quiz',B.quiz.length)}<div class="p3x-panel"><span class="p3x-badge">${esc(q.topic)} · ${esc(q.id)}</span>${optionBlock('quiz',q)}<div class="p3x-nav"><button class="p3x-btn" data-prev>ANTERIOR</button><button class="p3x-btn" data-redo>REFAZER</button><button class="p3x-btn" data-next>PRÓXIMA</button></div></div>`;
      bindExercise(shell,'quiz',B.quiz,B.quiz.length,false);
    }else{
      if(!current.math)current.math=pick('math',B.math);
      const m=current.math;
      shell.innerHTML=`<div class="p3x-math-grid">${B.mathTheory.map(x=>`<div class="p3x-math-card"><h3>${esc(x.title)}</h3><p><strong>PARA QUE SERVE:</strong> ${esc(x.use)}</p><div class="formula">${esc(x.formula)}</div><p class="p3x-tip"><strong>DICA:</strong> ${esc(x.tip)}</p></div>`).join('')}</div><div class="p3x-panel"><h3>PRÁTICA DE CÁLCULO</h3>${counter('math',B.math.length)}<span class="p3x-badge">${esc(m.topic)} · ${esc(m.id)}</span>${optionBlock('math',m)}<div class="p3x-nav"><button class="p3x-btn" data-prev>ANTERIOR</button><button class="p3x-btn" data-redo>REFAZER</button><button class="p3x-btn" data-next>PRÓXIMO</button></div></div>`;
      bindExercise(shell,'math',B.math,B.math.length,false);
    }
  }

  function setTheory(lesson,title){
    const blocks=lesson.querySelector('.blocks');if(!blocks)return;
    if(title==='SIMULADOR') blocks.innerHTML=`<div class="block"><h3>SIMULAÇÃO DE JOGO</h3><p>A mesa reproduz situações reais e conceituais de nível inicial: distribuição, ordem de ação, apostas mínimas, re-raises, showdown e regras de cada modalidade.</p></div><div class="block"><h3>DISTRIBUIÇÃO DOS 250 SPOTS</h3><p><strong>70% Texas Hold’em (175)</strong>, <strong>20% Omaha PLO4/PLO5/PLO6 (50)</strong> e <strong>10% demais modalidades (25)</strong>.</p></div><div class="block"><h3>COMO USAR</h3><p>Observe posição, cartas, board, street e ação anterior. Responda como se estivesse sentado na mesa. A análise aparece imediatamente depois da decisão.</p></div>`;
    if(title==='QUIZ') blocks.innerHTML=`<div class="block"><h3>150 PERGUNTAS INÉDITAS</h3><p>O Quiz mistura Fundamentos, Modalidades, terminologias, regras, comportamento e leitura conceitual. As formulações são novas em relação aos exercícios dos capítulos.</p></div><div class="block"><h3>OBJETIVO</h3><p>Verificar se o conhecimento aprendido em todo o app consegue ser recuperado fora do contexto exato em que foi ensinado.</p></div>`;
    if(title==='MATEMÁTICA DO POKER SIMPLIFICADA') blocks.innerHTML=`<div class="block"><h3>MATEMÁTICA QUE VOCÊ REALMENTE USA</h3><p>Aprenda o cálculo, para que ele serve, quando usar e um atalho mental para chegar rapidamente a uma boa aproximação durante o jogo.</p></div><div class="block"><h3>NÚMEROS DE REFERÊNCIA</h3><p>Inclui Regra do 2 e do 4, outs, pot odds, SPR, EV, MDF, alpha e probabilidades prontas de draws e mãos iniciais.</p></div>`;
  }

  function apply(){
    const lesson=document.querySelector('#root .card.lesson');
    const h=lesson?.querySelector('h2');if(!lesson||!h)return;
    const title=h.textContent.trim().toUpperCase();if(!TITLES.includes(title))return;
    if(lesson.dataset.p3x==='1')return;
    lesson.dataset.p3x='1';lesson.classList.add('p3x-active');setTheory(lesson,title);
    const mode=title==='SIMULADOR'?'sim':title==='QUIZ'?'quiz':'math';
    const host=document.createElement('div');host.className='p3x-shell';host.dataset.p3x=mode;lesson.appendChild(host);renderMode(mode);
  }
  const root=document.getElementById('root');if(root)new MutationObserver(apply).observe(root,{childList:true});apply();
  window.StackupPracticeAdvanced={allocation:B.allocation,reset:()=>{localStorage.removeItem(STORE);location.reload()}};
})();