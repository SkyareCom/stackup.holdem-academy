(() => {
  const TEST_KEYS = [
    'stackup-fundamentals-progress-v1',
    'stackup-modalities-progress-v1',
    'stackup-mixed-games-progress-v2',
    'stackup-practice-progress-v1',
    'stackup-practice-advanced-v2'
  ];
  const SESSION_FLAG='stackup-test-session-active-v1';
  const RETURN_FLAG='stackup-test-return-pending-v1';
  let reloading=false;

  function isTestKey(key){
    if(!key)return false;
    if(TEST_KEYS.includes(key))return true;
    return /^stackup-(fundamentals|modalities|mixed-games|practice)-.*(progress|quiz|test|result|advanced)/i.test(key);
  }

  function clearTestProgress(){
    try{
      for(let i=localStorage.length-1;i>=0;i--){
        const key=localStorage.key(i);
        if(isTestKey(key))localStorage.removeItem(key);
      }
    }catch(_){ }
  }

  function resetAndReload(){
    if(reloading)return;
    reloading=true;
    clearTestProgress();
    try{sessionStorage.removeItem(RETURN_FLAG);}catch(_){ }
    const url=new URL(location.href);
    url.hash='';
    url.searchParams.set('_fresh',Date.now().toString(36));
    location.replace(url.href);
  }

  try{
    const returning=sessionStorage.getItem(RETURN_FLAG)==='1';
    const active=sessionStorage.getItem(SESSION_FLAG)==='1';
    if(!active || returning)clearTestProgress();
    sessionStorage.setItem(SESSION_FLAG,'1');
    sessionStorage.removeItem(RETURN_FLAG);
  }catch(_){
    clearTestProgress();
  }

  const markAway=()=>{
    try{sessionStorage.setItem(RETURN_FLAG,'1');}catch(_){ }
  };

  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'){
      markAway();
      return;
    }
    let shouldReset=false;
    try{shouldReset=sessionStorage.getItem(RETURN_FLAG)==='1';}catch(_){shouldReset=true;}
    if(shouldReset)resetAndReload();
  });

  window.addEventListener('pagehide',markAway,{passive:true});
  window.addEventListener('pageshow',event=>{
    if(!event.persisted)return;
    let shouldReset=false;
    try{shouldReset=sessionStorage.getItem(RETURN_FLAG)==='1';}catch(_){shouldReset=true;}
    if(shouldReset)resetAndReload();
  },{passive:true});
})();