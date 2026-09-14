(() => {
  const STYLE_ID='stackup-math-card-structure-style';
  const root=document.getElementById('root');
  if(!root)return;

  const summaries={
    'OUTS':'Estima quantas cartas ainda podem melhorar sua mão. Conte somente os outs realmente limpos e use o total para calcular sua chance de completar o draw.',
    'REGRA DO 2 E DO 4':'Estima rapidamente a chance de completar um draw. No flop multiplique os outs por 4 até o river; no turn multiplique por 2 para a próxima carta.',
    'PROBABILIDADE EXATA DE 1 CARTA':'Dá uma estimativa mais precisa para a próxima carta. Divida os outs pelo número de cartas desconhecidas.',
    'POT ODDS':'Mostra a equity mínima necessária para pagar uma aposta. Compare o resultado com a equity estimada da sua mão antes de decidir o call.',
    'SPR':'Mostra a relação entre o stack efetivo e o pote. Calcule no início da street para entender quanto espaço ainda existe para apostar ou se comprometer com a mão.',
    'EV':'Compara decisões pelo resultado médio esperado no longo prazo. Considere ganhos, perdas e probabilidades e escolha a opção com maior valor esperado.',
    'MDF':'Indica quanto do seu range precisa continuar como referência teórica contra uma aposta. Use para evitar folds excessivos, sem tratar o número como obrigação para cada mão.',
    'ALPHA DO BLUFF':'Mostra quantos folds um bluff sem equity precisa gerar para empatar. Compare esse ponto de equilíbrio com a frequência de folds que você espera do adversário.',
    'FLUSH DRAW NO FLOP':'Com 9 outs limpos, estime cerca de 19% para a próxima carta e 35% até o river. Compare essa chance com o preço oferecido pelo pote.',
    'OESD — STRAIGHT DRAW':'Um open-ended straight draw normalmente tem 8 outs. Compare a chance de completar a sequência com as pot odds antes de pagar.',
    'GUTSHOT':'Um gutshot normalmente tem 4 outs. Como a chance é menor, procure um preço melhor ou implied odds suficientes para continuar.',
    'PAR DE MÃO → TRINCA NO FLOP':'Um pocket pair melhora para trinca ou melhor no flop em cerca de 11,8%. Use essa frequência junto com stack efetivo, posição e custo do call para avaliar set mining.',
    'DUAS CARTAS DO MESMO NAIPE':'Ser suited acrescenta possibilidade de flush, mas não torna a mão forte sozinho. Considere também os ranks, posição e jogabilidade.',
    'RECEBER AA':'AA aparece em cerca de 0,45% das mãos. Use essa frequência para calibrar expectativas e não esperar mãos premium em intervalos regulares.',
    'RECEBER QUALQUER POCKET PAIR':'Um pocket pair aparece em cerca de 5,88% das mãos. Essa referência ajuda a entender frequência e oportunidades de set mining ao longo do volume.',
    'AA × KK PRÉ-FLOP':'AA tem aproximadamente 81–82% contra KK pré-flop. Use como referência de equity e para entender que mesmo grande favoritismo ainda envolve variância.'
  };

  function normalize(value){
    return String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
  }

  function stripLabel(value){
    return String(value||'')
      .replace(/^PARA QUE SERVE:\s*/i,'')
      .replace(/^COMO USAR NA PRÁTICA:\s*/i,'')
      .replace(/^DICA\s*\/\s*ATALHO:\s*/i,'')
      .trim();
  }

  function addStyle(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .p3x-math-card>p{margin-top:0!important}
      .p3x-math-card .formula{margin:8px 0!important;font-size:14px!important;line-height:1.4!important}
      .p3x-math-card .p3x-tip{margin-top:0!important}
    `;
    document.head.appendChild(style);
  }

  function structure(){
    const shell=root.querySelector('.p3x-shell[data-p3x="math"]');
    if(!shell)return;
    addStyle();
    shell.querySelectorAll('.p3x-math-card').forEach(card=>{
      if(card.dataset.mathStructure==='2')return;
      const title=normalize(card.querySelector('h3')?.textContent);
      const first=card.querySelector(':scope > p:not(.p3x-tip)');
      const formula=card.querySelector(':scope > .formula');
      const tip=card.querySelector(':scope > .p3x-tip');
      if(!first||!formula||!tip)return;

      first.textContent=summaries[title]||stripLabel(first.textContent);
      formula.textContent=stripLabel(formula.textContent).replace(/^FÓRMULA:\s*/i,'');
      tip.textContent=stripLabel(tip.textContent);

      card.querySelectorAll(':scope > .p3x-practice').forEach(node=>node.remove());
      card.dataset.mathStructure='2';
    });
  }

  let observedShell=null;
  let shellObserver=null;
  function attach(){
    const shell=root.querySelector('.p3x-shell[data-p3x="math"]');
    if(shell&&shell!==observedShell){
      shellObserver?.disconnect();
      observedShell=shell;
      shellObserver=new MutationObserver(()=>requestAnimationFrame(structure));
      shellObserver.observe(shell,{childList:true});
    }
    requestAnimationFrame(structure);
  }

  new MutationObserver(attach).observe(root,{childList:true});
  attach();
})();
