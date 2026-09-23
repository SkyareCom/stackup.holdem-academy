(() => {
  const KEY='stackup-academy-xp-v1';
  const LEVELS=[
    {name:'INICIANTE',xp:0},{name:'APRENDIZ',xp:500},{name:'RECREATIVO',xp:1500},
    {name:'COMPETIDOR',xp:3500},{name:'GRINDER',xp:7500},{name:'AVANÇADO',xp:15000},{name:'ELITE',xp:30000}
  ];
  const XP={basic:10,intermediate:20,advanced:35,challenge:50};
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(_){return {}}};
  const write=s=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch(_){}};
  const level=xp=>{let out=LEVELS[0];for(const x of LEVELS)if(xp>=x.xp)out=x;return out};
  const difficulty=(meta={})=>{
    if(meta.difficulty&&XP[meta.difficulty])return meta.difficulty;
    const stage=String(meta.stage||meta.mode||'').toLowerCase();
    if(stage.includes('math'))return 'advanced';
    if(stage.includes('sim'))return 'challenge';
    if(stage.includes('quiz'))return 'intermediate';
    return 'basic';
  };
  function award(meta={}){
    const id=String(meta.id||'').trim(); if(!id)return {awarded:0,...snapshot()};
    const s=read();s.xp=Number(s.xp)||0;s.correct=Number(s.correct)||0;s.attempts=Number(s.attempts)||0;s.mastery=s.mastery||{};s.awards=s.awards||{};s.areas=s.areas||{};s.history=s.history||{};
    s.attempts++;
    const ok=!!meta.correct;
    if(ok)s.correct++;
    const d=difficulty(meta),base=XP[d],first=!s.awards[id];
    let gained=0;
    if(ok&&first){gained=base;s.xp+=gained;s.awards[id]={xp:gained,difficulty:d,at:Date.now()};}
    const m=s.mastery[id]||{attempts:0,correct:0};m.attempts++;if(ok)m.correct++;s.mastery[id]=m;
    const area=String(meta.area||meta.stage||meta.mode||'GERAL').toUpperCase();
    const ar=s.areas[area]||{attempts:0,correct:0,xp:0};ar.attempts++;if(ok)ar.correct++;ar.xp+=gained;s.areas[area]=ar;
    const now=new Date(),day=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');const h=s.history[day]||{attempts:0,correct:0,xp:0};h.attempts++;if(ok)h.correct++;h.xp+=gained;s.history[day]=h;
    write(s);window.dispatchEvent(new CustomEvent('stackup:xp',{detail:{gained,...snapshot(s)}}));
    return {awarded:gained,...snapshot(s)};
  }
  function snapshot(source){
    const s=source||read(),xp=Number(s.xp)||0,l=level(xp),next=LEVELS[LEVELS.indexOf(l)+1]||null;
    const mastery=s.attempts?Math.round((Number(s.correct)||0)*100/(Number(s.attempts)||1)):0;
    const areas=Object.entries(s.areas||{}).map(([name,v])=>({name,attempts:Number(v.attempts)||0,correct:Number(v.correct)||0,xp:Number(v.xp)||0,mastery:v.attempts?Math.round((Number(v.correct)||0)*100/Number(v.attempts)):0})).sort((a,b)=>b.attempts-a.attempts);
    const history=s.history||{},today=new Date();today.setHours(0,0,0,0);
    const sumDays=(from,to)=>Object.entries(history).reduce((a,[day,v])=>{const d=new Date(day+'T00:00:00');if(d>=from&&d<to){a.attempts+=Number(v.attempts)||0;a.correct+=Number(v.correct)||0;a.xp+=Number(v.xp)||0}return a},{attempts:0,correct:0,xp:0});
    const tomorrow=new Date(today);tomorrow.setDate(today.getDate()+1);const recentStart=new Date(today);recentStart.setDate(today.getDate()-6);const previousStart=new Date(today);previousStart.setDate(today.getDate()-13);
    const recent=sumDays(recentStart,tomorrow),previous=sumDays(previousStart,recentStart);
    recent.mastery=recent.attempts?Math.round(recent.correct*100/recent.attempts):0;previous.mastery=previous.attempts?Math.round(previous.correct*100/previous.attempts):0;
    return {xp,level:l.name,nextLevel:next?.name||null,nextXP:next?.xp||null,mastery,correct:Number(s.correct)||0,attempts:Number(s.attempts)||0,areas,recent,previous};
  }
  window.StackupAcademyProgression={award,snapshot,levels:LEVELS,xpTable:XP};
})();