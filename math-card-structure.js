(() => {
  const STYLE_ID='stackup-math-card-structure-style';
  const root=document.getElementById('root');
  if(!root)return;

  const practical={
    'OUTS':'Conte apenas as cartas ainda disponíveis que realmente melhoram sua mão. Depois use o total de outs para estimar sua chance de completar o draw.',
    'REGRA DO 2 E DO 4':'No flop, multiplique os outs por 4 para estimar a chance até o river. No turn, multiplique por 2 para estimar a chance na última carta.',
    'PROBABILIDADE EXATA DE 1 CARTA':'Divida seus outs pelo número de cartas desconhecidas quando quiser uma estimativa mais precisa da próxima carta.',
    'POT ODDS':'Compare a equity exigida pelo call com a equity estimada da sua mão. Se sua equity for maior, o call tende a ser justificável pelo preço direto.',
    'SPR':'Calcule no início da street usando o menor stack efetivo. Use o resultado para entender quanto espaço ainda existe para apostas em relação ao pote.',
    'EV':'Liste os resultados possíveis da decisão, pese cada um pela sua probabilidade e subtraia os custos. Compare o EV das opções disponíveis.',
    'MDF':'Use como referência para saber quanto do seu range precisa continuar contra uma aposta para não permitir bluffs automáticos do adversário.',
    'ALPHA DO BLUFF':'Compare a frequência de folds que você espera gerar com o alpha necessário. Se os folds esperados superarem o ponto de equilíbrio, o bluff pode ser lucrativo sem equity.',
    'FLUSH DRAW NO FLOP':'Conte 9 outs apenas quando forem limpos. Compare aproximadamente 19% para a próxima carta ou 35% até o river com o preço oferecido pelo pote.',
    'OESD — STRAIGHT DRAW':'Conte os 8 outs das duas pontas da sequência quando todos forem limpos. Use essa chance contra as pot odds antes de pagar uma aposta.',
    'GUTSHOT':'Conte os 4 outs internos que completam a sequência. Como a chance é menor, exija preço melhor ou implied odds suficientes antes de continuar.',
    'PAR DE MÃO → TRINCA NO FLOP':'Use a frequência de cerca de 11,8% para avaliar set mining junto com stack efetivo, posição e quanto você precisa investir pré-flop.',
    'DUAS CARTAS DO MESMO NAIPE':'Não valorize a mão apenas por ser suited. Use a probabilidade de flush como um componente adicional junto com força dos ranks, posição e jogabilidade.',
    'RECEBER AA':'Use a frequência para calibrar expectativa e volume. Não espere que mãos premium apareçam em intervalos regulares durante uma sessão curta.',
    'RECEBER QUALQUER POCKET PAIR':'Use a frequência para entender quantas vezes pares de mão aparecem e avaliar oportunidades de set mining ao longo de muitas mãos.',
    'AA × KK PRÉ-FLOP':'Use a equity como referência para decisões all-in e para entender variância: mesmo muito favorito, AA ainda perde uma parcela relevante das vezes.'
  };

  function normalize(value){
    return String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
  }

  function addStyle(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .p3x-math-card .p3x-practice{margin-top:8px!important}
      .p3x-math-card .formula{display:grid;gap:4px}
      .p3x-math-card .formula strong{display:block;color:#d4aa58;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
      .p3x-math-card .formula span{display:block;color:inherit;font-size:14px;line-height:1.4}
      .p3x-math-card>p strong{color:#08372d}
    `;
    document.head.appendChild(style);
  }

  function structure(){
    const shell=root.querySelector('.p3x-shell[data-p3x="math"]');
    if(!shell)return;
    addStyle();
    shell.querySelectorAll('.p3x-math-card').forEach(card=>{
      if(card.dataset.mathStructure==='1')return;
      const title=normalize(card.querySelector('h3')?.textContent);
      const first=card.querySelector(':scope > p:not(.p3x-tip)');
      const formula=card.querySelector(':scope > .formula');
      const tip=card.querySelector(':scope > .p3x-tip');
      if(!first||!formula||!tip)return;

      const practice=document.createElement('p');
      practice.className='p3x-practice';
      practice.innerHTML=`<strong>COMO USAR NA PRÁTICA:</strong> ${practical[title]||'Identifique os valores do spot, aplique a relação indicada na fórmula e compare o resultado com a decisão disponível.'}`;
      first.insertAdjacentElement('afterend',practice);

      if(!formula.querySelector('strong')){
        const text=formula.textContent.trim();
        formula.textContent='';
        const label=document.createElement('strong');
        label.textContent='FÓRMULA:';
        const value=document.createElement('span');
        value.textContent=text;
        formula.append(label,value);
      }

      if(!/^PARA QUE SERVE[:\s]/i.test(first.textContent.trim())){
        const text=first.textContent.trim();
        first.innerHTML=`<strong>PARA QUE SERVE:</strong> ${text}`;
      }
      if(!/^DICA\s*\/\s*ATALHO[:\s]/i.test(tip.textContent.trim())){
        const text=tip.textContent.trim();
        tip.innerHTML=`<strong>DICA / ATALHO:</strong> ${text}`;
      }
      card.dataset.mathStructure='1';
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
