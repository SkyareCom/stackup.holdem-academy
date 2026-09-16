(() => {
  if(window.__stackupPortugueseCorrections)return;
  window.__stackupPortugueseCorrections=1;

  const CORRECTIONS=[
    ['SMALL BLIND, BIG BLIND E ANTE','SMALL, BIG E ANTE'],
    ['Small Blind, Big Blind e Ante','Small, Big e Ante'],
    ['QUALQUER 5 CARTAS','QUAISQUER 5 CARTAS'],
    ['Compare as melhores 5 cartas.','Compare as cinco melhores cartas.'],
    ['No poker padrão a mão final avaliada tem 5 cartas.','No poker padrão, a mão final avaliada tem 5 cartas.'],
    ['Pós-flop, começa o primeiro ativo à esquerda do Button.','Pós-flop, a ação começa com o primeiro jogador ativo à esquerda do Button.'],
    ['Como as cartas são fechadas e não existe board, informação vem principalmente','Como as cartas são fechadas e não existe board, a informação vem principalmente'],
    ['No 5-Card Draw high usa-se a hierarquia tradicional.','No 5-Card Draw high, usa-se a hierarquia tradicional.'],
    ['Depois da primeira aposta vem o draw.','Depois da primeira rodada de apostas, vem o draw.'],
    ['Depois do draw há uma segunda rodada de apostas.','Depois do draw, há uma segunda rodada de apostas.'],
    ['No showdown vence a melhor mão de 5 cartas.','No showdown, vence a melhor mão de 5 cartas.'],
    ['Se ninguém melhora o board, jogadores empatados dividem o pote.','Se ninguém melhora o board, os jogadores empatados dividem o pote.'],
    ['No PLO são usadas exatamente 3 cartas do board.','No PLO, são usadas exatamente 3 cartas do board.'],
    ['No PLO é obrigatório usar exatamente 2 cartas próprias.','No PLO, é obrigatório usar exatamente 2 cartas próprias.'],
    ['Blinds e antes giram junto com as posições ao longo das mãos.','Os blinds e os antes acompanham a rotação das posições ao longo das mãos.'],
    ['Depois que blinds e antes estão posicionados','Depois que os blinds e os antes estão posicionados'],
    ['nunca permitir que o dealer ou jogadores vejam cartas durante o processo.','nunca permitir que o dealer ou os jogadores vejam as cartas durante o processo.'],
    ['quando a regra da casa prevê corte','quando a regra da casa prevê o corte'],
    ['Em mesa normal, no pré-flop','Em uma mesa normal, no pré-flop'],
    ['Regras de cap de raises em Limit podem variar pela casa/torneio.','As regras de limite de raises em Fixed-Limit podem variar conforme a casa ou o torneio.'],
    ['naipes não desempatarão uma mão equivalente.','os naipes não são usados para desempatar mãos equivalentes.'],
    ['Após blinds ou antes, conforme a mesa','Após os blinds ou os antes, conforme a estrutura da mesa'],
    ['Em estruturas por ante,','Em estruturas com ante,'],
    ['exatamente 2 hole cards + 3 board','exatamente 2 hole cards + 3 cartas do board'],
    ['Quantidade máxima de raises por rodada depende','A quantidade máxima de raises por rodada depende'],
    ['Ao mudar a letra, mudam distribuição, objetivo e ordem de ação.','Ao mudar a letra, mudam a distribuição, o objetivo e a ordem de ação.'],
    ['então jogador e dealer recebem 5 cartas.','então, o jogador e o dealer recebem 5 cartas.'],
    ['Em Mixed Games, regras de distribuição, limite e avaliação mudam;','Em Mixed Games, as regras de distribuição, limite e avaliação mudam;'],
    ['Qual o máximo de uma aposta?','Qual é o máximo de uma aposta?'],
    ['No No-Limit o jogador pode comprometer até todo o stack.','No No-Limit, o jogador pode comprometer até todo o stack.']
  ];

  function fixText(text){
    let out=text;
    for(const [from,to] of CORRECTIONS){
      if(out.includes(from))out=out.split(from).join(to);
    }
    return out;
  }

  function fixAttributes(el){
    for(const attr of ['aria-label','title','placeholder']){
      if(!el.hasAttribute(attr))continue;
      const old=el.getAttribute(attr)||'';
      const fixed=fixText(old);
      if(fixed!==old)el.setAttribute(attr,fixed);
    }
  }

  function fixElement(el){
    fixAttributes(el);
    if(el.matches?.('.ttitle')&&(el.textContent||'').trim()==='Matemática do poker simplificada'){
      el.textContent='Matemática do poker';
      return;
    }
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;
      const fixed=fixText(node.nodeValue||'');
      if(fixed!==node.nodeValue)node.nodeValue=fixed;
    }
    el.querySelectorAll?.('[aria-label],[title],[placeholder]').forEach(fixAttributes);
    el.querySelectorAll?.('.ttitle').forEach(title=>{
      if((title.textContent||'').trim()==='Matemática do poker simplificada')title.textContent='Matemática do poker';
    });
  }

  function fixNode(node){
    if(node.nodeType===Node.TEXT_NODE){
      const fixed=fixText(node.nodeValue||'');
      if(fixed!==node.nodeValue)node.nodeValue=fixed;
      return;
    }
    if(node.nodeType===Node.ELEMENT_NODE)fixElement(node);
  }

  const root=document.getElementById('root');
  if(!root)return;

  fixElement(root);

  let queued=false;
  const pending=[];
  new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes)pending.push(node);
    }
    if(queued||!pending.length)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      const batch=pending.splice(0,pending.length);
      for(const node of batch)fixNode(node);
    });
  }).observe(root,{childList:true,subtree:true});
})();
