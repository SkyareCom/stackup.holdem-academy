(() => {
  const STORE='stackup-practice-progress-v1';

  const THEORY={
    'Simulador':[
      ['OBJETIVO','Aplicar Fundamentos e Modalidades em situações práticas. Cada spot apresenta contexto, pergunta, resposta e análise imediata.'],
      ['COMO TREINAR','Leia primeiro modalidade, street, cartas, posição e ação. Só depois escolha a resposta. O foco é entender a regra antes de decorar padrões.'],
      ['O QUE É COBERTO','Ranking de mãos, posições, ordem de ação, blinds, streets, apostas, showdown, Hold’em, Omaha, Stud, Razz, H.O.R.S.E. e Mixed Games.'],
      ['CORREÇÃO','Após responder, o simulador mostra resultado, resposta correta e a razão da decisão. Você pode refazer o spot antes de avançar.']
    ],
    'Quiz':[
      ['OBJETIVO','Testar retenção dos Módulos 1 e 2 sem depender de uma única modalidade.'],
      ['FORMATO','As perguntas misturam regras, terminologias, ranking, distribuição, ordem de apostas e características das modalidades.'],
      ['PROGRESSÃO','O banco prioriza perguntas ainda não respondidas e mantém o histórico local de acertos e tentativas.'],
      ['USO','Quando errar, leia a análise antes de seguir. O erro faz parte do diagnóstico do aprendizado.']
    ],
    'Matemática do poker simplificada':[
      ['OUTS','Outs são cartas ainda disponíveis que melhoram sua mão para uma condição definida. Eles devem ser contados sem duplicidade e considerando se o out realmente é limpo.'],
      ['ODDS E PROBABILIDADE','Com uma carta por vir, a probabilidade exata depende das cartas desconhecidas. A regra de 2 é uma aproximação rápida; com duas cartas por vir, a regra de 4 é uma aproximação prática.'],
      ['POT ODDS','Pot odds compara o valor do call com o pote final após o call. Equity mínima = call ÷ (pote antes do call + aposta adversária + call).'],
      ['SPR','SPR = stack efetivo restante ÷ pote no início da street. Ele ajuda a medir quanto dinheiro ainda existe em relação ao pote.'],
      ['EV','Valor esperado mede o resultado médio de uma decisão. Em uma decisão simples de call: EV = equity × pote ganho − probabilidade de perder × custo do call, ajustado ao cenário analisado.'],
      ['MDF','Minimum Defense Frequency é uma referência contra uma aposta: MDF = pote ÷ (pote + aposta). Não significa que toda mão individual deva defender nessa frequência.'],
      ['ALPHA','Alpha, ou frequência de folds necessária para um bluff sem equity empatar, pode ser expressa como aposta ÷ (pote + aposta).'],
      ['IMPLIED ODDS','Implied odds considera fichas adicionais que podem ser ganhas depois de completar o draw. Reverse implied odds considera perdas adicionais quando você melhora para uma mão ainda dominada.']
    ]
  };

  const SIM=[
    ['HOLD’EM · PREFLOP','Você está no BTN. Todos foldaram. Quem age depois de você antes do flop?',['SB E BB','APENAS BB','NINGUÉM'],'SB E BB','O Button age antes dos blinds no pré-flop quando a ação chega limpa até ele.'],
    ['HOLD’EM · FLOP','Board A♠ K♦ 7♣. Você tem Q♠ J♠. Quantas cartas próprias são obrigatórias na mão final?',['0, 1 OU 2','EXATAMENTE 2','EXATAMENTE 1'],'0, 1 OU 2','No Hold’em você pode usar zero, uma ou duas hole cards.'],
    ['HOLD’EM · BOARD','O board completo já forma a melhor mão de 5 cartas para todos. O que pode ocorrer?',['SPLIT POT','MISDEAL','GANHA O BUTTON'],'SPLIT POT','Se ninguém consegue melhorar as cinco melhores cartas do board, jogadores empatados dividem o pote.'],
    ['OMAHA · REGRA 2+3','Você tem A♠ K♠ 9♦ 8♦. Quantas hole cards entram obrigatoriamente na mão final?',['EXATAMENTE 2','ATÉ 2','APENAS 1'],'EXATAMENTE 2','Omaha sempre exige exatamente duas cartas próprias e exatamente três do board.'],
    ['OMAHA · FLUSH','Há quatro copas no board e você tem apenas uma copa na mão. Você forma flush?',['NÃO','SIM','SÓ NO RIVER'],'NÃO','Uma única carta de copas na mão não basta em Omaha, pois você deve usar exatamente duas hole cards.'],
    ['STUD · ESTRUTURA','Seven-Card Stud usa Flop, Turn e River comunitários?',['NÃO','SIM','SÓ O RIVER'],'NÃO','Stud não usa board comunitário. Cada jogador recebe suas próprias cartas abertas e fechadas.'],
    ['STUD · THIRD STREET','Na distribuição inicial do Seven-Card Stud, cada jogador recebe normalmente:',['2 FECHADAS + 1 ABERTA','2 ABERTAS + 1 FECHADA','3 ABERTAS'],'2 FECHADAS + 1 ABERTA','A Third Street começa com duas cartas down e uma door card aberta.'],
    ['RAZZ · OBJETIVO','Qual mão é melhor no Razz?',['A-2-3-4-5','K-Q-J-10-9','A-K-Q-J-10'],'A-2-3-4-5','Razz usa lowball Ace-to-Five; A-2-3-4-5 é a melhor mão possível.'],
    ['RAZZ · AVALIAÇÃO','Sequências e flushes prejudicam a mão no Razz?',['NÃO','SIM','APENAS FLUSH'],'NÃO','Na avaliação Ace-to-Five do Razz, straights e flushes são ignorados.'],
    ['H.O.R.S.E.','O que representa a letra O?',['OMAHA HI/LO 8-OR-BETTER','PLO HIGH','OMAHA 5-CARD'],'OMAHA HI/LO 8-OR-BETTER','No H.O.R.S.E., O corresponde a Omaha Hi/Lo 8-or-Better.'],
    ['MIXED GAMES · TRANSIÇÃO','Antes de uma nova mão em rotação mixed, qual a primeira checagem?',['QUAL JOGO ESTÁ ATIVO','QUAL FOI O VENCEDOR ANTERIOR','COR DAS FICHAS'],'QUAL JOGO ESTÁ ATIVO','A modalidade ativa define distribuição, limite, ordem de ação e avaliação da mão.'],
    ['FIXED-LIMIT','Em Fixed-Limit, o tamanho de bet/raise é normalmente:',['PREDETERMINADO PELA ESTRUTURA','QUALQUER VALOR ATÉ O STACK','SEMPRE O POTE'],'PREDETERMINADO PELA ESTRUTURA','Fixed-Limit trabalha com incrementos definidos pela estrutura da mesa ou torneio.'],
    ['POT-LIMIT','No Pot-Limit, o raise máximo depende principalmente de quê?',['TAMANHO DO POTE','STACK DO DEALER','QUANTIDADE DE JOGADORES INICIAL'],'TAMANHO DO POTE','O máximo é calculado em função do pote após considerar o call.'],
    ['NO-LIMIT','No No-Limit, qual o máximo que um jogador pode comprometer?',['ATÉ O STACK DISPONÍVEL','EXATAMENTE O POTE','4 BB'],'ATÉ O STACK DISPONÍVEL','No-Limit permite apostar até todo o stack disponível.'],
    ['SHOWDOWN','Dois jogadores têm exatamente as mesmas melhores 5 cartas. O naipe desempata?',['NÃO','SIM','SÓ EM CASH'],'NÃO','No poker padrão, naipes não são usados para desempatar mãos iguais.'],
    ['RANKING','Qual mão vence?',['FULL HOUSE','FLUSH','SEQUÊNCIA'],'FULL HOUSE','Full House está acima de Flush e Sequência no ranking tradicional.'],
    ['RANKING','Qual mão vence?',['QUADRA','FULL HOUSE','FLUSH'],'QUADRA','Quadra vence Full House e Flush.'],
    ['POSIÇÃO','Em Hold’em, quem normalmente age por último pós-flop?',['BUTTON, SE AINDA ESTIVER ATIVO','BIG BLIND SEMPRE','UTG'],'BUTTON, SE AINDA ESTIVER ATIVO','O Button é a posição mais tardia pós-flop entre jogadores ainda ativos.'],
    ['AÇÃO','Você não enfrenta aposta na street. Qual ação não exige colocar fichas?',['CHECK','CALL','RAISE'],'CHECK','Check passa a ação sem apostar quando não há aposta pendente.'],
    ['AÇÃO','Há uma aposta pendente e você iguala exatamente o valor necessário. Isso é:',['CALL','CHECK','BET'],'CALL','Call iguala a aposta necessária para continuar na mão.']
  ];

  const QUIZ=[
    ['Qual é a mão mais forte do ranking tradicional?',['ROYAL FLUSH','FULL HOUSE','QUADRA'],'ROYAL FLUSH','Royal Flush é o topo do ranking apresentado no curso.'],
    ['Qual posição posta o Small Blind?',['SB','BB','BTN'],'SB','SB é a posição que posta o Small Blind.'],
    ['Qual posição posta o Big Blind?',['BB','SB','CO'],'BB','BB é a posição que posta o Big Blind.'],
    ['Flop revela quantas cartas comunitárias?',['3','1','2'],'3','O Flop abre três cartas comunitárias.'],
    ['Turn adiciona quantas cartas ao board?',['1','2','3'],'1','O Turn adiciona uma carta.'],
    ['River adiciona quantas cartas ao board?',['1','2','3'],'1','O River completa o board com uma carta.'],
    ['O que significa fold?',['DESISTIR DA MÃO','IGUALAR APOSTA','PASSAR SEM APOSTAR'],'DESISTIR DA MÃO','Fold encerra sua participação naquela mão.'],
    ['O que significa call?',['IGUALAR APOSTA','AUMENTAR APOSTA','DESISTIR'],'IGUALAR APOSTA','Call iguala o valor exigido.'],
    ['O que significa raise?',['AUMENTAR A APOSTA','PASSAR','MOSTRAR CARTAS'],'AUMENTAR A APOSTA','Raise aumenta o valor da aposta atual.'],
    ['No Hold’em, quantas hole cards cada jogador recebe?',['2','4','5'],'2','Hold’em distribui duas cartas próprias.'],
    ['No PLO4, quantas hole cards cada jogador recebe?',['4','2','5'],'4','PLO4 distribui quatro cartas próprias.'],
    ['No PLO5, quantas hole cards cada jogador recebe?',['5','4','6'],'5','PLO5 distribui cinco cartas próprias.'],
    ['No PLO6, quantas hole cards cada jogador recebe?',['6','4','5'],'6','PLO6 distribui seis cartas próprias.'],
    ['No Omaha, quantas cartas do board entram na mão final?',['EXATAMENTE 3','ATÉ 3','5'],'EXATAMENTE 3','Omaha exige exatamente três cartas do board.'],
    ['Razz procura uma mão high ou low?',['LOW','HIGH','AMBAS SEMPRE'],'LOW','Razz é uma modalidade lowball.'],
    ['Stud usa board comunitário?',['NÃO','SIM','SÓ NO RIVER'],'NÃO','Stud usa cartas próprias abertas e fechadas.'],
    ['H.O.R.S.E. é uma única modalidade?',['NÃO','SIM','SÓ EM TORNEIO'],'NÃO','H.O.R.S.E. é uma rotação de cinco variantes.'],
    ['Mixed Games exige qual habilidade central?',['ADAPTAR-SE ENTRE REGRAS','JOGAR APENAS HOLD’EM','MEMORIZAR UM ÚNICO LIMITE'],'ADAPTAR-SE ENTRE REGRAS','A principal exigência é trocar corretamente de regras entre jogos.'],
    ['Em Omaha Hi/Lo 8-or-Better, o low precisa ter cinco ranks distintos de:',['8 OU MENOS','9 OU MENOS','10 OU MENOS'],'8 OU MENOS','O qualifier padrão é cinco ranks distintos de 8 ou menos.'],
    ['Se não existe low qualificado no Omaha Hi/Lo, quem leva o pote?',['O HIGH LEVA TUDO','DIVIDE-SE MESMO ASSIM','O LOW É SORTEADO'],'O HIGH LEVA TUDO','Sem low qualificado, a melhor mão high recebe o pote inteiro.'],
    ['No 2-7 Triple Draw, o Ás é considerado:',['ALTO','BAIXO','CORINGA'],'ALTO','No Deuce-to-Seven, o Ás joga alto.'],
    ['No 2-7 Triple Draw, straights e flushes:',['PREJUDICAM','SÃO IGNORADOS','GANHAM AUTOMATICAMENTE'],'PREJUDICAM','No 2-7, sequência e flush tornam a mão low pior.'],
    ['Em Badugi, a mão ideal busca:',['4 RANKS E 4 NAIPES DIFERENTES','UM FLUSH','UMA SEQUÊNCIA'],'4 RANKS E 4 NAIPES DIFERENTES','Badugi busca quatro cartas de ranks e naipes diferentes.'],
    ['Quem resolve uma decisão de regra em ambiente organizado?',['FLOOR','BUTTON','BIG BLIND'],'FLOOR','O floor interpreta e aplica regras quando necessário.'],
    ['No showdown, o pote pode ser dividido em empate real?',['SIM','NÃO','SÓ EM TORNEIO'],'SIM','Mãos exatamente empatadas dividem o pote.']
  ];

  function loadProgress(){
    try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(_){return {}}
  }
  function saveProgress(v){try{localStorage.setItem(STORE,JSON.stringify(v))}catch(_){}}
  function shuffle(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
  function pct(a,b){return b?Math.round(a*100/b):0}

  const style=document.createElement('style');
  style.id='stackup-practice-style';
  style.textContent=`
    .p3-shell{margin-top:18px;border:1px solid #a87c3270;background:#efe4cd;border-radius:18px;padding:15px;color:#25170f}
    .p3-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:12px}
    .p3-head h3{margin:0;color:#08372d;text-transform:uppercase;font-size:21px}
    .p3-meta{font-size:12px;color:#725f4d;text-transform:uppercase;text-align:right}
    .p3-progress{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:10px 0 14px}
    .p3-stat{background:#2a160d;color:#f8f0df;border:1px solid #d4aa58;border-radius:12px;padding:9px;text-align:center}
    .p3-stat b{display:block;color:#d4aa58;font-size:18px}.p3-stat span{font-size:11px;text-transform:uppercase}
    .p3-context{background:#211008;color:#d4aa58;border-radius:12px;padding:10px 12px;font-size:12px;text-transform:uppercase;margin-bottom:10px}
    .p3-q{font-size:18px;line-height:1.4;margin:0 0 12px;color:#25170f}
    .p3-options{display:grid;gap:8px}.p3-option,.p3-btn{border:1px solid #a87c32;border-radius:12px;background:#f8f0df;color:#25170f;padding:11px 12px;text-align:left;cursor:pointer}
    .p3-option:active,.p3-btn:active{transform:scale(.99)}.p3-option[disabled]{opacity:.72;cursor:default}
    .p3-result{margin-top:12px;border-radius:12px;padding:12px;background:#2a160d;color:#f8f0df;line-height:1.45}
    .p3-result strong{color:#d4aa58;text-transform:uppercase}.p3-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.p3-btn{text-align:center;text-transform:uppercase;font-size:12px;background:#211008;color:#d4aa58}
    .p3-math-grid{display:grid;gap:9px}.p3-math-card{background:#f8f0df;border:1px solid #a87c3255;border-radius:14px;padding:12px}.p3-math-card h4{margin:0 0 7px;color:#08372d;font-size:18px;text-transform:uppercase}.p3-form{display:grid;grid-template-columns:1fr 1fr;gap:8px}.p3-input{width:100%;border:1px solid #a87c32;border-radius:10px;padding:10px;background:#fffdf7;color:#25170f;font:inherit}.p3-calc{margin-top:9px;width:100%;border:1px solid #d4aa58;border-radius:10px;padding:10px;background:#211008;color:#d4aa58;font:inherit;text-transform:uppercase}.p3-output{margin-top:9px;color:#725f4d;font-size:14px;line-height:1.45}.p3-note{font-size:13px;color:#725f4d;line-height:1.45;margin-top:10px}
  `;
  if(!document.getElementById(style.id))document.head.appendChild(style);

  try{
    if(typeof L!=='undefined'){
      Object.entries(THEORY).forEach(([k,v])=>{L[k]=v});
    }
  }catch(_){ }

  function lessonTitle(){return document.querySelector('#root .card.lesson h2')?.textContent?.trim()||''}
  function isPractice(){return (document.querySelector('#root .card.lesson .badge')?.textContent||'').includes('ETAPA 03')}

  function mountChoice(title,bank,key){
    const lesson=document.querySelector('#root .card.lesson');
    if(!lesson||lesson.querySelector('.p3-shell'))return;
    const progress=loadProgress();
    progress[key]=progress[key]||{seen:{},correct:0,attempts:0};
    let order=shuffle(bank.map((_,i)=>i));
    let cursor=0,current=null,answered=false,lastChoice='';

    const shell=document.createElement('div');shell.className='p3-shell';lesson.appendChild(shell);
    function next(preferUnseen=true){
      const p=progress[key];
      if(preferUnseen){const unseen=order.filter(i=>!p.seen[i]);if(unseen.length)current=unseen[Math.floor(Math.random()*unseen.length)];else current=order[cursor++%order.length]}
      else current=order[cursor++%order.length];
      answered=false;lastChoice='';render();
    }
    function render(){
      const p=progress[key],q=bank[current];
      const seenCount=Object.keys(p.seen).length;
      shell.innerHTML=`<div class="p3-head"><h3>${title}</h3><div class="p3-meta">SPOT ${seenCount+1 > bank.length ? bank.length : seenCount+1} / ${bank.length}</div></div><div class="p3-progress"><div class="p3-stat"><b>${p.correct}</b><span>Certos</span></div><div class="p3-stat"><b>${seenCount}</b><span>Realizados</span></div><div class="p3-stat"><b>${pct(p.correct,Math.max(1,p.attempts))}%</b><span>Aproveitamento</span></div></div><div class="p3-context">${q[0]}</div><p class="p3-q">${q[1]}</p><div class="p3-options">${shuffle(q[2]).map(o=>`<button class="p3-option" data-a="${String(o).replace(/"/g,'&quot;')}" ${answered?'disabled':''}>${o}</button>`).join('')}</div>${answered?`<div class="p3-result"><strong>${lastChoice===q[3]?'CORRETO':'INCORRETO'}</strong><br>Sua resposta: ${lastChoice}<br>Resposta correta: ${q[3]}<br><br>${q[4]}</div><div class="p3-actions"><button class="p3-btn" data-act="redo">REFAZER</button><button class="p3-btn" data-act="random">ALEATÓRIO</button><button class="p3-btn" data-act="next">PRÓXIMO</button></div>`:''}`;
      shell.querySelectorAll('.p3-option').forEach(btn=>btn.onclick=()=>answer(btn.dataset.a));
      shell.querySelector('[data-act="redo"]')?.addEventListener('click',()=>{answered=false;lastChoice='';render()});
      shell.querySelector('[data-act="random"]')?.addEventListener('click',()=>next(false));
      shell.querySelector('[data-act="next"]')?.addEventListener('click',()=>next(true));
    }
    function answer(choice){
      if(answered)return;answered=true;lastChoice=choice;
      const p=progress[key],q=bank[current];p.attempts++;if(choice===q[3])p.correct++;p.seen[current]=true;saveProgress(progress);render();
    }
    next(true);
  }

  function mountMath(){
    const lesson=document.querySelector('#root .card.lesson');
    if(!lesson||lesson.querySelector('.p3-shell'))return;
    const shell=document.createElement('div');shell.className='p3-shell';lesson.appendChild(shell);
    shell.innerHTML=`<div class="p3-head"><h3>CALCULADORAS DE TREINO</h3><div class="p3-meta">CÁLCULO DETERMINÍSTICO</div></div>
      <div class="p3-math-grid">
        <div class="p3-math-card"><h4>POT ODDS / EQUITY MÍNIMA</h4><div class="p3-form"><input class="p3-input" id="p3pot" type="number" min="0" step="0.01" placeholder="Pote antes da aposta"><input class="p3-input" id="p3bet" type="number" min="0" step="0.01" placeholder="Aposta a pagar"></div><button class="p3-calc" id="p3potbtn">CALCULAR</button><div class="p3-output" id="p3potout">Informe o pote existente antes da aposta adversária e o valor que você precisa pagar.</div></div>
        <div class="p3-math-card"><h4>SPR</h4><div class="p3-form"><input class="p3-input" id="p3stack" type="number" min="0" step="0.01" placeholder="Stack efetivo"><input class="p3-input" id="p3sprpot" type="number" min="0.01" step="0.01" placeholder="Pote"></div><button class="p3-calc" id="p3sprbtn">CALCULAR</button><div class="p3-output" id="p3sprout">SPR = stack efetivo ÷ pote.</div></div>
        <div class="p3-math-card"><h4>MDF E ALPHA</h4><div class="p3-form"><input class="p3-input" id="p3mdfpot" type="number" min="0" step="0.01" placeholder="Pote"><input class="p3-input" id="p3mdfbet" type="number" min="0" step="0.01" placeholder="Aposta"></div><button class="p3-calc" id="p3mdfbtn">CALCULAR</button><div class="p3-output" id="p3mdfout">MDF = pote ÷ (pote + aposta). Alpha = aposta ÷ (pote + aposta).</div></div>
        <div class="p3-math-card"><h4>OUTS — APROXIMAÇÃO</h4><div class="p3-form"><input class="p3-input" id="p3outs" type="number" min="0" max="47" step="1" placeholder="Outs"><select class="p3-input" id="p3cards"><option value="1">1 carta por vir</option><option value="2">2 cartas por vir</option></select></div><button class="p3-calc" id="p3outsbtn">CALCULAR</button><div class="p3-output" id="p3outsout">Regra de 2 para uma carta por vir e regra de 4 para duas cartas por vir.</div></div>
      </div><div class="p3-note">As calculadoras explicam a matemática básica do cenário informado. Elas não substituem equity completa de ranges nem regras específicas da mesa.</div>`;

    const num=id=>Number(shell.querySelector('#'+id)?.value||0);
    shell.querySelector('#p3potbtn').onclick=()=>{const pot=num('p3pot'),bet=num('p3bet');const finalPot=pot+bet+bet;const eq=finalPot>0?bet/finalPot*100:0;shell.querySelector('#p3potout').textContent=`Pote final após o call: ${finalPot.toFixed(2)}. Equity mínima para o call empatar: ${eq.toFixed(2)}%.`};
    shell.querySelector('#p3sprbtn').onclick=()=>{const st=num('p3stack'),pot=num('p3sprpot');shell.querySelector('#p3sprout').textContent=pot>0?`SPR = ${(st/pot).toFixed(2)}.`:'O pote deve ser maior que zero.'};
    shell.querySelector('#p3mdfbtn').onclick=()=>{const pot=num('p3mdfpot'),bet=num('p3mdfbet'),d=pot+bet;const mdf=d>0?pot/d*100:0,alpha=d>0?bet/d*100:0;shell.querySelector('#p3mdfout').textContent=`MDF: ${mdf.toFixed(2)}%. Alpha: ${alpha.toFixed(2)}%.`};
    shell.querySelector('#p3outsbtn').onclick=()=>{const outs=num('p3outs'),cards=Number(shell.querySelector('#p3cards').value);const approx=Math.min(100,outs*(cards===1?2:4));shell.querySelector('#p3outsout').textContent=`Aproximação rápida: ${approx.toFixed(1)}%. ${cards===1?'Regra de 2':'Regra de 4'}.`};
  }

  function apply(){
    if(!isPractice())return;
    const title=lessonTitle();
    if(title==='Simulador')mountChoice('SIMULADOR',SIM,'sim');
    else if(title==='Quiz')mountChoice('QUIZ CUMULATIVO',QUIZ,'quiz');
    else if(title==='Matemática do poker simplificada')mountMath();
  }

  const root=document.getElementById('root');
  if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true});
  apply();
})();