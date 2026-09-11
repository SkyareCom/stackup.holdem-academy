(() => {
  const FUNDAMENTALS_ORDER = [
    'Ranking de mãos',
    'Terminologias básicas',
    'Posições na mesa',
    'Small Blind, Big Blind e Ante',
    'Streets',
    'Sequência de apostas',
    'Cash game e tipos',
    'Torneio e tipos',
    'Funções do staff',
    'Embaralhando as cartas',
    'Misdeal',
    'Outras regras básicas',
    'Bons modos',
    'Perfis de jogadores'
  ];

  function reorderFundamentals(){
    try{
      if(typeof D==='undefined' || !D?.fundamentos?.i) return;
      const current=D.fundamentos.i;
      const byTitle=new Map(current.map(item=>[item[0],item]));
      const ordered=FUNDAMENTALS_ORDER.map(title=>byTitle.get(title)).filter(Boolean);
      current.forEach(item=>{if(!FUNDAMENTALS_ORDER.includes(item[0])) ordered.push(item);});
      D.fundamentos.i=ordered;
    }catch(_){ }
  }

  if('scrollRestoration' in history) history.scrollRestoration='manual';

  const root=document.getElementById('root');
  let frame=0;
  function alignScreenStart(){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      frame=requestAnimationFrame(()=>{
        const lessonTitle=root?.querySelector('.card.lesson h2');
        const menuTitle=root?.querySelector('.head h2');
        const target=lessonTitle||menuTitle;
        if(target){
          const y=window.scrollY+target.getBoundingClientRect().top-10;
          window.scrollTo({top:Math.max(0,y),left:0,behavior:'auto'});
        }else{
          window.scrollTo({top:0,left:0,behavior:'auto'});
        }
      });
    });
  }

  reorderFundamentals();

  if(root){
    new MutationObserver(()=>alignScreenStart()).observe(root,{childList:true});
  }
  window.addEventListener('popstate',alignScreenStart,{passive:true});
  window.addEventListener('pageshow',alignScreenStart,{passive:true});
  alignScreenStart();
})();
