(() => {
  const root=document.getElementById('root');
  if(!root)return;

  // Shared narrow-screen guard for progress/stat cards used across Academy modules.
  // Keep the existing palette/radii while ensuring every counter can shrink safely.
  if(!document.getElementById('stackup-progress-card-fit')){
    const style=document.createElement('style');
    style.id='stackup-progress-card-fit';
    style.textContent=`
      .fi-stats{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:0!important;
        overflow:hidden!important;
        border:1px solid #d4aa5860!important;
        border-radius:14px!important;
        background:#2a160d!important;
      }
      .fi-stat{
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        min-width:0!important;
        min-height:64px!important;
        padding:8px 2px!important;
        overflow:hidden!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        text-align:center!important;
      }
      .fi-stat+.fi-stat{border-left:1px solid #d4aa5840!important}
      .fi-stat .fi-stat-label{
        display:block!important;
        width:100%!important;
        margin:0 0 5px!important;
        color:#d8c6ad!important;
        font-size:clamp(8px,2.25vw,9px)!important;
        line-height:1.05!important;
        letter-spacing:.015em!important;
        text-transform:uppercase!important;
        white-space:nowrap!important;
      }
      .fi-stat .fi-stat-value{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        color:var(--gold,#d4aa58)!important;
        font-size:clamp(12px,3.45vw,14px)!important;
        line-height:1.05!important;
        letter-spacing:-.045em!important;
        white-space:nowrap!important;
        font-variant-numeric:tabular-nums!important;
      }
      .p3-progress{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      .p3-stat{min-width:0!important;overflow:hidden!important;padding:9px 4px!important}
      .p3-stat b{display:block!important;max-width:100%!important;font-size:clamp(13px,3.6vw,18px)!important;line-height:1.05!important;white-space:nowrap!important;font-variant-numeric:tabular-nums!important}
      .p3-stat span{display:flex!important;align-items:center!important;justify-content:center!important;min-height:2.1em!important;max-width:100%!important;font-size:clamp(8px,2.35vw,10px)!important;line-height:1.05!important;letter-spacing:.01em!important;overflow-wrap:anywhere!important;text-align:center!important}
      @media(max-width:390px){
        .p3-progress{gap:5px!important}
        .p3-stat{padding:8px 2px!important}
        .p3-stat b{font-size:clamp(12px,3.45vw,14px)!important}
        .p3-stat span{font-size:clamp(8px,2.2vw,9px)!important}
      }
      @media(max-width:340px){
        .fi-stat{padding-inline:1px!important}
        .fi-stat .fi-stat-label{font-size:8px!important}
        .fi-stat .fi-stat-value{font-size:12px!important}
        .p3-progress{gap:4px!important}
        .p3-stat{padding-inline:1px!important}
        .p3-stat b{font-size:12px!important}
        .p3-stat span{font-size:8px!important}
      }
    `;
    document.head.appendChild(style);
  }

  const loaded=new Set();
  for(const s of document.scripts){
    const src=s.getAttribute('src')||'';
    const name=src.split('/').pop()?.split('?')[0];
    if(name)loaded.add(name);
  }

  const loading=new Map();
  const groups={
    fundamentos:[
      ['other-rules-details.js',2],
      ['fundamentals-interactive-bank.js',1],
      ['fundamentals-visual-layer.js',2],
      ['fundamentals-interactive.js',5],
      ['fundamentals-progress-panel.js',4]
    ],
    modalidades:[
      ['modalities-module.js',1],
      ['modalities-depth-details.js',1],
      ['mixed-games-module.js',2]
    ],
    pratica:[
      ['practice-module.js',1],
      ['practice-table.js',3],
      ['practice-advanced-bank.js',1],
      ['practice-advanced.js',3],
      ['practice-progress-layout.js',1],
      ['table-rotation-guard.js',3],
      ['math-card-structure.js',2],
      ['practice-math-odds.js',2]
    ]
  };

  function load(name,version){
    if(loaded.has(name))return Promise.resolve();
    if(loading.has(name))return loading.get(name);
    const task=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=`./${name}?v=${version}`;
      script.async=false;
      script.onload=()=>{loaded.add(name);loading.delete(name);resolve();};
      script.onerror=()=>{loading.delete(name);reject(new Error(`Failed to load ${name}`));};
      document.body.appendChild(script);
    });
    loading.set(name,task);
    return task;
  }

  const groupTasks=new Map();
  function ensure(stage){
    const files=groups[stage];
    if(!files||groupTasks.has(stage))return groupTasks.get(stage)||Promise.resolve();
    // async=false preserves execution order while requests download together.
    const task=Promise.all(files.map(([name,version])=>load(name,version)))
      .catch(err=>{groupTasks.delete(stage);throw err;});
    groupTasks.set(stage,task);
    return task;
  }

  function currentStage(){
    const state=history.state;
    if(state?.stage&&groups[state.stage])return state.stage;
    const marker=(root.querySelector('.eyebrow,.badge')?.textContent||'').toUpperCase();
    if(marker.includes('ETAPA 01'))return 'fundamentos';
    if(marker.includes('ETAPA 02'))return 'modalidades';
    if(marker.includes('ETAPA 03'))return 'pratica';
    return '';
  }

  let idleId=0;
  function schedule(){
    if(idleId)return;
    const run=()=>{
      idleId=0;
      const stage=currentStage();
      if(stage)ensure(stage).catch(err=>console.error('[STACKUP] Lazy module load failed.',err));
    };
    idleId=1;
    queueMicrotask(run);
  }

  const LESSON_LOAD_TIMEOUT_MS=6000;
  function bounded(task,label){
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>reject(new Error(`${label} timed out`)),LESSON_LOAD_TIMEOUT_MS);
      task.then(
        value=>{clearTimeout(timer);resolve(value);},
        err=>{clearTimeout(timer);reject(err);}
      );
    });
  }

  // Fetch on menu entry. A missing/slow enhancement must never leave a tap frozen:
  // after the bounded wait, open the base lesson and let any late module finish later.
  const nativeLesson=window.lesson;
  let navigation=0;
  window.lesson=function(stage,index,push=0){
    const ticket=++navigation;
    const screen=root.firstElementChild;
    let opened=false;
    const open=()=>{
      if(opened||ticket!==navigation||root.firstElementChild!==screen)return;
      opened=true;
      nativeLesson(stage,index,push);
    };
    return bounded(ensure(stage),`Lesson modules for ${stage}`)
      .then(open)
      .catch(err=>{
        console.error('[STACKUP] Lesson modules were not ready; opening base lesson.',err);
        open();
      });
  };
  new MutationObserver(schedule).observe(root,{childList:true});
  window.addEventListener('popstate',schedule,{passive:true});
  schedule();
})();