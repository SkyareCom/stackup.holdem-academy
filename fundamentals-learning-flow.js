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

  reorderFundamentals();
})();
