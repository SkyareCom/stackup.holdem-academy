(() => {
  const PRODUCT='academy', EVENT_KEY='stackup-academy-event-queue-v1', MAX_EVENTS=500;
  const safeParse=(raw,fallback)=>{try{return JSON.parse(raw)}catch(_){return fallback}};
  const storage={
    getJSON(key,fallback={}){try{return safeParse(localStorage.getItem(key)||'',fallback)}catch(_){return fallback}},
    setJSON(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch(_){return false}},
    remove(key){try{localStorage.removeItem(key);return true}catch(_){return false}}
  };
  function track(name,properties={}){
    if(!name)return;
    const event={event:String(name),product:PRODUCT,event_id:(globalThis.crypto?.randomUUID?.()||('evt_'+Date.now()+'_'+Math.random().toString(36).slice(2))),occurred_at:new Date().toISOString(),app_version:'web',properties:{...properties}};
    const queue=storage.getJSON(EVENT_KEY,[]);queue.push(event);
    if(queue.length>MAX_EVENTS)queue.splice(0,queue.length-MAX_EVENTS);
    storage.setJSON(EVENT_KEY,queue);
    window.dispatchEvent(new CustomEvent('stackup:analytics',{detail:event}));
    return event;
  }
  function pendingEvents(){return storage.getJSON(EVENT_KEY,[])}
  function acknowledgeEvents(ids=[]){const done=new Set(ids),next=pendingEvents().filter(event=>!done.has(event.event_id));storage.setJSON(EVENT_KEY,next);return next.length}
  window.StackupPlatform={product:PRODUCT,schemaVersion:1,storage,analytics:{track,pendingEvents,acknowledgeEvents},identity:{status:'local',userId:null},sync:{status:'local-only',readyForCloud:true}};
})();