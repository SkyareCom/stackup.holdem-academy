(() => {
  const STYLE_ID='stackup-learning-navigation-style';
  const root=document.getElementById('root');
  if(!root)return;

  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase();

  function addStyle(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
      .sln-tools{margin:14px 0 8px;padding:10px;border:1px solid #a87c3255;border-radius:15px;background:#efe4cd}
      .sln-tabs{display:grid;grid-template-columns:1fr 1fr;gap:7px}
      .sln-btn,.sln-foot button{min-height:42px;border:1px solid #a87c3270;border-radius:11px;background:#e7dcc2;color:#5f4b39;font:inherit;font-size:12px;font-weight:700;text-transform:uppercase;cursor:pointer}
      .sln-btn.active{background:#08372d;color:#d4aa58;border-color:#d4aa58}
      .sln-search{width:100%;box-sizing:border-box;margin-top:8px;min-height:43px;padding:9px 12px;border:1px solid #a87c3260;border-radius:11px;background:#f8f0df;color:#25170f;font:inherit;font-size:14px}
      .sln-search::placeholder{color:#8f7b63}
      .sln-count{display:block;margin-top:7px;color:#725f4d;font-size:11px;text-align:center;text-transform:uppercase}
      .sln-foot{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin:16px 0 4px}
      .sln-foot button{background:#2a160d;color:#d4aa58}
      .sln-hidden{display:none!important}
      @media(max-width:390px){.sln-foot{grid-template-columns:1fr 1fr}.sln-foot button:nth-child(2){grid-column:1/-1;grid-row:2}.sln-search{font-size:16px}}
    `;document.head.appendChild(s);
  }

  function titleOf(el){return norm(el.querySelector('strong,h3,h4')?.textContent)}
  function setupTerminology(lesson){
    const blocks=lesson.querySelector('.blocks[data-tp-expanded="1"]');if(!blocks||blocks.dataset.learningNav==='1')return false;
    const groups=[...blocks.querySelectorAll(':scope > .tp-card')].filter(x=>x.querySelector('.term'));
    const items=[...blocks.querySelectorAll('.term')];if(!items.length)return false;
    enhance(lesson,blocks,groups,items,'terminology');
    return true;
  }
  function setupMath(lesson){
    const shell=lesson.querySelector('.p3x-shell[data-p3x="math"]');if(!shell||shell.dataset.learningNav==='1')return false;
    const groups=[...shell.querySelectorAll('.p3x-math-grid,.p3m-group')];
    const items=[...shell.querySelectorAll('.p3x-math-card,.p3m-row')];if(!items.length)return false;
    enhance(lesson,shell,groups,items,'math');
    return true;
  }

  function enhance(lesson,host,groups,items,type){
    addStyle();host.dataset.learningNav='1';
    const tools=document.createElement('div');tools.className='sln-tools';
    tools.innerHTML=`<div class="sln-tabs"><button type="button" class="sln-btn active" data-order="learn">APRENDER EM ORDEM</button><button type="button" class="sln-btn" data-order="az">A–Z</button></div><input class="sln-search" type="search" inputmode="search" autocomplete="off" placeholder="BUSCAR ${type==='math'?'CONCEITO':'TERMO'}…" aria-label="Buscar ${type==='math'?'conceito matemático':'terminologia'}"><span class="sln-count"></span>`;
    host.insertBefore(tools,host.firstChild);

    const foot=document.createElement('div');foot.className='sln-foot';
    foot.innerHTML='<button type="button" data-prev>‹ ANTERIOR</button><button type="button" data-index>ÍNDICE</button><button type="button" data-next>PRÓXIMO ›</button>';
    host.appendChild(foot);

    const original=new Map(groups.map(g=>[g,[...g.children]]));
    let ordered=items.slice(),focus=-1;

    function searchable(el){return norm(el.textContent)}
    function updateCount(){const visible=items.filter(x=>!x.classList.contains('sln-hidden')).length;tools.querySelector('.sln-count').textContent=`${visible} DE ${items.length} ITENS`}
    function restore(){
      groups.forEach(g=>{(original.get(g)||[]).forEach(x=>g.appendChild(x))});
      ordered=items.slice();
    }
    function alpha(){
      if(type==='terminology'){
        groups.forEach(g=>{
          const terms=[...g.querySelectorAll(':scope .term')].sort((a,b)=>titleOf(a).localeCompare(titleOf(b),'pt-BR'));
          const grid=g.querySelector('.term-grid');terms.forEach(x=>grid?.appendChild(x));
        });
        ordered=items.slice().sort((a,b)=>titleOf(a).localeCompare(titleOf(b),'pt-BR'));
      }else{
        const theory=host.querySelector('.p3x-math-grid');
        if(theory){[...theory.querySelectorAll('.p3x-math-card')].sort((a,b)=>titleOf(a).localeCompare(titleOf(b),'pt-BR')).forEach(x=>theory.appendChild(x))}
        host.querySelectorAll('.p3m-group').forEach(g=>[...g.querySelectorAll('.p3m-row')].sort((a,b)=>titleOf(a).localeCompare(titleOf(b),'pt-BR')).forEach(x=>g.appendChild(x)));
        ordered=items.slice().sort((a,b)=>titleOf(a).localeCompare(titleOf(b),'pt-BR'));
      }
    }
    function filter(){
      const q=norm(tools.querySelector('.sln-search').value);
      items.forEach(x=>x.classList.toggle('sln-hidden',!!q&&!searchable(x).includes(q)));
      groups.forEach(g=>{
        const contained=[...g.querySelectorAll(type==='terminology'?'.term':'.p3x-math-card,.p3m-row')];
        if(contained.length)g.classList.toggle('sln-hidden',contained.every(x=>x.classList.contains('sln-hidden')));
      });
      updateCount();focus=-1;
    }
    tools.querySelectorAll('[data-order]').forEach(btn=>btn.addEventListener('click',()=>{
      tools.querySelectorAll('[data-order]').forEach(x=>x.classList.toggle('active',x===btn));
      btn.dataset.order==='az'?alpha():restore();filter();
    }));
    tools.querySelector('.sln-search').addEventListener('input',filter);
    function visible(){return ordered.filter(x=>!x.classList.contains('sln-hidden'))}
    function jump(delta){
      const a=visible();if(!a.length)return;
      focus=(focus+delta+a.length)%a.length;
      a[focus].scrollIntoView({behavior:'smooth',block:'center'});
    }
    foot.querySelector('[data-prev]').addEventListener('click',()=>jump(-1));
    foot.querySelector('[data-next]').addEventListener('click',()=>jump(1));
    foot.querySelector('[data-index]').addEventListener('click',()=>tools.scrollIntoView({behavior:'smooth',block:'start'}));
    updateCount();
  }

  let queued=false;
  function apply(){
    queued=false;
    const lesson=root.querySelector('.card.lesson');if(!lesson)return;
    const t=norm(lesson.querySelector('h2')?.textContent);
    if(t==='TERMINOLOGIAS BASICAS')setupTerminology(lesson);
    if(t==='MATEMATICA DO POKER SIMPLIFICADA'||t==='MATEMATICA DO POKER')setupMath(lesson);
  }
  new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(apply)}).observe(root,{childList:true,subtree:true});
  apply();
})();