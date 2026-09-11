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
  const navtools=document.getElementById('navtools');
  let frame=0;

  function scrollElementToTop(el,offset=0){
    if(!el){window.scrollTo({top:0,left:0,behavior:'auto'});return;}
    const y=window.scrollY+el.getBoundingClientRect().top-offset;
    window.scrollTo({top:Math.max(0,y),left:0,behavior:'auto'});
  }

  function alignScreenStart(){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      frame=requestAnimationFrame(()=>{
        const lesson=root?.querySelector('.card.lesson');
        if(lesson){
          // Nas telas de conteúdo, os botões de navegação ficam no topo da leitura.
          // Logo abaixo aparecem título e início do conteúdo, sem herdar o scroll anterior.
          const navVisible=navtools && getComputedStyle(navtools).display!=='none';
          scrollElementToTop(navVisible?navtools:lesson,0);
          return;
        }

        const menuHead=root?.querySelector('.head');
        if(menuHead){scrollElementToTop(menuHead,10);return;}
        window.scrollTo({top:0,left:0,behavior:'auto'});
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
