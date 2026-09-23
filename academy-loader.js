(() => {
  const root=document.getElementById('root');
  if(!root)return;

  // The Academy visual system is the final layout authority. Feature modules may
  // inject their own presentation styles, but they must not reintroduce overflow,
  // clipped text or competing spacing/progress patterns.
  let restackQueued=false;
  function restackVisualSystem(){
    const style=document.getElementById('stackup-academy-visual-system');
    if(!style||style.parentNode!==document.head||style===document.head.lastElementChild)return;
    document.head.appendChild(style);
  }
  function queueRestack(){
    if(restackQueued)return;
    restackQueued=true;
    queueMicrotask(()=>{restackQueued=false;restackVisualSystem();});
  }
  new MutationObserver(records=>{
    if(records.some(record=>[...record.addedNodes].some(node=>node.nodeType===1&&node.tagName==='STYLE')))queueRestack();
  }).observe(document.head,{childList:true});
  queueRestack();

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
      ['fundamentals-interactive.js',8],
      ['fundamentals-progress-panel.js',4]
    ],
    modalidades:[
      ['modalities-module.js',5],
      ['modalities-depth-details.js',1],
      ['mixed-games-module.js',6]
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
      script.onload=()=>{
        loaded.add(name);
        loading.delete(name);
        queueRestack();
        resolve();
      };
      script.onerror=()=>{
        loading.delete(name);
        reject(new Error(`Failed to load ${name}`));
      };
      document.body.appendChild(script);
    });
    loading.set(name,task);
    return task;
  }

  const groupTasks=new Map();
  function ensure(stage){
    const files=groups[stage];
    if(!files||groupTasks.has(stage))return groupTasks.get(stage)||Promise.resolve();
    const task=files.reduce(
      (chain,[name,version])=>chain.then(()=>load(name,version)),
      Promise.resolve()
    )
      .then(value=>{queueRestack();return value;})
      .catch(err=>{groupTasks.delete(stage);throw err;});
    groupTasks.set(stage,task);
    return task;
  }

  function currentStage(){
    const state=history.state;
    if(state?.type==='lesson'&&state.stage&&groups[state.stage])return state.stage;
    return '';
  }

  let idleId=0;
  let lastScheduledStage='';
  function schedule(){
    const stage=currentStage();
    if(!stage||groupTasks.has(stage)||stage===lastScheduledStage)return;
    lastScheduledStage=stage;
    if(idleId)return;
    const run=()=>{
      idleId=0;
      const target=lastScheduledStage;
      lastScheduledStage='';
      if(!target||groupTasks.has(target))return;
      ensure(target).catch(err=>console.error('[STACKUP] Lazy module load failed.',err));
    };
    if('requestIdleCallback' in window){
      idleId=requestIdleCallback(run,{timeout:900});
    }else{
      idleId=setTimeout(run,16);
    }
  }

  // Navigation paints immediately. Heavy stage enhancement is scheduled once,
  // after the base lesson is visible, and never retriggered by its own DOM work.
  const nativeLesson=window.lesson;
  window.lesson=function(stage,index,push=0){
    nativeLesson(stage,index,push);
    queueRestack();
    schedule();
  };

  window.addEventListener('popstate',schedule,{passive:true});
  schedule();
})();
