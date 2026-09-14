(() => {
  const root=document.getElementById('root');
  if(!root)return;

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
      ['fundamentals-progress-panel.js',3]
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
    const task=(async()=>{
      for(const [name,version] of files)await load(name,version);
    })().catch(err=>console.error('[STACKUP] Lazy module load failed.',err));
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
      if(stage)ensure(stage);
    };
    if('requestIdleCallback' in window)idleId=requestIdleCallback(run,{timeout:700});
    else idleId=setTimeout(run,32);
  }

  new MutationObserver(schedule).observe(root,{childList:true});
  window.addEventListener('popstate',schedule,{passive:true});
  schedule();
})();