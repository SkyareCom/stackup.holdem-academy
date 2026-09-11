(() => {
  const choice=(a,b,c)=>[a,b,c];
  const SIM=[];
  const POS=['UTG1','UTG2','MP1','MP2','LJ','HJ','CO','BTN','SB','BB'];
  const NEXT={UTG1:'UTG2',UTG2:'MP1',MP1:'MP2',MP2:'LJ',LJ:'HJ',HJ:'CO',CO:'BTN',BTN:'SB',SB:'BB',BB:'UTG1'};
  const add=(game,spot)=>SIM.push({id:`S${String(SIM.length+1).padStart(3,'0')}`,game,...spot});

  const showdowns=[
    {hero:'A♠ 2♦',villain:'A♥ 7♣',board:'A♦ 5♣ 10♠ J♥ 3♦',answer:'VILÃO',why:'Ambos têm um par de ases. O 7 do vilão entra como kicker e supera o 5 que completa a melhor mão do herói.'},
    {hero:'K♠ Q♦',villain:'K♥ J♣',board:'K♦ 9♣ 6♠ 4♥ 2♦',answer:'HERÓI',why:'Ambos têm um par de reis. A dama do herói é o melhor kicker e vence o valete.'},
    {hero:'8♠ 8♦',villain:'A♥ K♣',board:'8♥ A♣ K♦ 2♠ 3♣',answer:'HERÓI',why:'O herói tem trinca de oitos; o vilão tem dois pares, ases e reis. Trinca vence dois pares.'},
    {hero:'Q♠ J♦',villain:'9♥ 9♣',board:'10♥ K♣ A♦ 2♠ 3♣',answer:'HERÓI',why:'QJ completa A-K-Q-J-10, uma sequência. O par de noves não supera a sequência.'},
    {hero:'2♠ 2♦',villain:'A♥ 5♣',board:'2♥ 5♦ 5♠ K♣ A♦',answer:'VILÃO',why:'O vilão forma full house de cincos com ases; o herói forma full house de dois com cincos. O trio mais alto decide.'},
    {hero:'A♠ K♦',villain:'A♥ Q♣',board:'A♦ 9♣ 8♠ 7♥ 4♦',answer:'HERÓI',why:'Ambos têm um par de ases; o rei do herói é kicker superior à dama.'},
    {hero:'10♠ 9♠',villain:'A♥ A♣',board:'J♠ Q♠ K♦ 2♥ 3♣',answer:'HERÓI',why:'10-9 com J-Q-K completa sequência até rei; o par de ases do vilão perde para a sequência.'},
    {hero:'6♠ 6♦',villain:'K♥ Q♣',board:'6♥ 6♣ K♦ Q♠ 2♣',answer:'HERÓI',why:'O herói tem quadra de seis. O vilão tem dois pares; quadra é superior.'},
    {hero:'A♠ 4♠',villain:'K♥ K♣',board:'2♠ 3♠ 5♦ 9♣ J♥',answer:'HERÓI',why:'A-2-3-4-5 forma sequência de cinco alto. A sequência vence o par de reis.'},
    {hero:'Q♠ Q♦',villain:'J♥ J♣',board:'A♦ K♣ 8♠ 7♥ 2♦',answer:'HERÓI',why:'Sem melhora no board, o par de damas vence o par de valetes.'}
  ];

  // 175 spots de Texas Hold'em: 7 famílias x 25.
  for(let i=0;i<25;i++){
    const hero=POS[i%8];
    add("Texas Hold'em",{kind:'sequencia',hero,street:'PRÉ-FLOP',context:`Mão ${i+1}: o dealer terminou de embaralhar. Você está em ${hero}.`,question:'Qual é a próxima etapa antes da primeira decisão dos jogadores?',options:choice('DISTRIBUIR AS CARTAS','ABRIR O FLOP','FAZER O SHOWDOWN'),answer:'DISTRIBUIR AS CARTAS',why:'Depois de embaralhar e preparar a mão, o dealer distribui as cartas próprias antes da ação pré-flop.',phase:'EMBARALHANDO'});
  }
  for(let i=0;i<25;i++){
    const hero=POS[i%8], stack=40+(i%5)*20;
    add("Texas Hold'em",{kind:'aposta',hero,street:'PRÉ-FLOP',context:`Blinds 0,5/1 BB. A ação chega limpa até você em ${hero}. Stack ${stack} BB.`,question:'Se você quiser abrir com raise, qual é o menor total permitido em uma estrutura No-Limit padrão?',options:choice('2 BB','1,5 BB','3 BB'),answer:'2 BB',why:'Sem straddle ou regra especial, o Big Blind é 1 BB e o menor raise deve aumentar a aposta em pelo menos mais 1 BB, totalizando 2 BB.',phase:'AÇÃO PRÉ-FLOP'});
  }
  const opens=[2,2.5,3,3.5,4];
  for(let i=0;i<25;i++){
    const open=opens[i%opens.length], raiser=['UTG1','LJ','HJ','CO','BTN'][i%5], hero=NEXT[raiser];
    const min=(open+(open-1)).toFixed(open%1?1:0)+' BB';
    add("Texas Hold'em",{kind:'reraise',hero,villain:raiser,street:'PRÉ-FLOP',context:`${raiser} aumenta de 1 BB para ${open} BB. Você está em ${hero} e quer reaumentar.`,question:'Qual é o menor total permitido para o seu re-raise?',options:choice(min,(open*2).toFixed(open%1?1:0)+' BB',(open+1).toFixed(open%1?1:0)+' BB'),answer:min,why:`O aumento anterior foi de ${(open-1).toFixed(open%1?1:0)} BB. O próximo raise precisa aumentar pelo menos o mesmo incremento: ${open} + ${(open-1).toFixed(open%1?1:0)} = ${min}.`,phase:'AÇÃO PRÉ-FLOP'});
  }
  const actions=[
    ['igualar exatamente a aposta feita','CALL','CHECK','FOLD','Call é a ação de igualar a aposta pendente.'],
    ['sair da mão sem investir mais fichas','FOLD','CALL','RAISE','Fold encerra sua participação na mão.'],
    ['aumentar a aposta atual','RAISE','CALL','CHECK','Raise aumenta uma aposta já existente.'],
    ['passar a ação sem apostar quando ninguém apostou','CHECK','CALL','FOLD','Check só é possível quando não existe aposta pendente.'],
    ['colocar a primeira aposta da street','BET','CALL','RAISE','Bet é a primeira aposta de uma street quando ainda não houve aposta.']
  ];
  for(let i=0;i<25;i++){
    const a=actions[i%actions.length], hero=POS[(i+3)%8];
    add("Texas Hold'em",{kind:'acao',hero,street:['FLOP','TURN','RIVER','PRÉ-FLOP','FLOP'][i%5],context:`Você está em ${hero}. A mesa para e espera sua decisão.`,question:`Você quer ${a[0]}. Qual ação deve anunciar?`,options:choice(a[1],a[2],a[3]),answer:a[1],why:a[4],phase:'SUA AÇÃO'});
  }
  for(let i=0;i<25;i++){
    const hero=['SB','BB','UTG1','HJ','CO','BTN'][i%6];
    const post=i%2===0;
    add("Texas Hold'em",{kind:'ordem',hero,street:post?'FLOP':'PRÉ-FLOP',context:post?'Todos os jogadores ativos chegaram ao flop.':'Blinds postados e cartas distribuídas.',question:post?'Em uma mão com 3 ou mais jogadores, quem normalmente age primeiro pós-flop?':'Quem inicia a ação voluntária pré-flop?',options:post?choice('PRIMEIRO ATIVO À ESQUERDA DO BUTTON','BUTTON','BIG BLIND SEMPRE'):choice('PRIMEIRO ATIVO À ESQUERDA DO BB','BUTTON','SMALL BLIND'),answer:post?'PRIMEIRO ATIVO À ESQUERDA DO BUTTON':'PRIMEIRO ATIVO À ESQUERDA DO BB',why:post?'No pós-flop, a ação começa no primeiro jogador ativo à esquerda do Button.':'No pré-flop, depois das apostas obrigatórias, a ação voluntária começa no primeiro jogador ativo à esquerda do Big Blind.',phase:post?'FLOP':'PRÉ-FLOP'});
  }
  for(let i=0;i<25;i++){
    const s=showdowns[i%showdowns.length], hero=['BB','UTG1','HJ','CO','BTN'][i%5], villain=['BTN','CO','LJ','HJ','SB'][i%5];
    add("Texas Hold'em",{kind:'showdown',hero,villain,street:'SHOWDOWN',context:`Você está em ${hero}; o adversário em ${villain}. Compare as melhores 5 cartas.`,heroCards:s.hero,villainCards:s.villain,board:s.board,question:'Quem vence esta mão no showdown?',options:choice('HERÓI','VILÃO','EMPATE'),answer:s.answer,why:s.why,phase:'SHOWDOWN'});
  }
  const streets=[['PRÉ-FLOP','FLOP'],['FLOP','TURN'],['TURN','RIVER'],['RIVER','SHOWDOWN'],['BLINDS','DISTRIBUIÇÃO']];
  for(let i=0;i<25;i++){
    const st=streets[i%streets.length], hero=POS[(i+5)%8];
    add("Texas Hold'em",{kind:'sequencia',hero,street:st[0],context:`A mão está na etapa ${st[0]}. Você está em ${hero}.`,question:'Qual é a próxima etapa normal do fluxo da mão?',options:choice(st[1],st[0],i%2?'FLOP':'RIVER'),answer:st[1],why:`No fluxo padrão desta situação, depois de ${st[0]} vem ${st[1]}.`,phase:st[0]});
  }

  // 50 spots de Omaha (PLO4/PLO5/PLO6).
  const plos=['PLO4','PLO5','PLO6','PLO4','PLO5'];
  for(let i=0;i<25;i++){
    const game=plos[i%plos.length], holes=game==='PLO4'?4:game==='PLO5'?5:6, hero=['UTG1','HJ','CO','BTN','BB'][i%5];
    add(game,{kind:'omaha-regra',hero,street:['FLOP','TURN','RIVER'][i%3],context:`Você joga ${game} e recebeu ${holes} cartas próprias.`,question:'Quantas cartas próprias e quantas do board devem formar sua mão final?',options:choice('EXATAMENTE 2 DA MÃO + 3 DO BOARD','1 DA MÃO + 4 DO BOARD','QUALQUER 5 CARTAS'),answer:'EXATAMENTE 2 DA MÃO + 3 DO BOARD',why:'Em qualquer Omaha, inclusive PLO4, PLO5 e PLO6, a mão final usa exatamente 2 hole cards e exatamente 3 cartas comunitárias.',phase:'OMAHA'});
  }
  const pots=[6,8,10,12,15], bets=[2,3,4,5,6];
  for(let i=0;i<25;i++){
    const game=plos[(i+2)%plos.length], p=pots[i%5], b=bets[i%5], hero=['CO','BTN','BB','HJ','LJ'][i%5];
    const max=p+3*b;
    add(game,{kind:'pot-limit',hero,street:['FLOP','TURN'][i%2],context:`Pote antes da aposta: ${p} BB. O vilão aposta ${b} BB. Você ainda não investiu nesta street.`,question:'Qual é o maior total aproximado que você pode colocar ao fazer um raise de pote?',options:choice(`${max} BB`,`${p+2*b} BB`,`${p+b} BB`),answer:`${max} BB`,why:`No heads-up desta street: você chama ${b}, o pote passa a ${p+2*b}; pode aumentar mais esse valor. Total colocado = ${b} + ${p+2*b} = ${max} BB.`,phase:'POT-LIMIT'});
  }

  // 25 spots nas demais modalidades.
  const others=[
    ['Seven-Card Stud','THIRD STREET','Você recebe duas cartas fechadas e uma aberta.','Qual é o nome desta etapa inicial?','THIRD STREET',['FLOP','DRAW'],'No Seven-Card Stud, a distribuição inicial de 3 cartas é chamada Third Street.'],
    ['Razz','OBJETIVO','Você compara A-2-3-4-5 com 6-5-4-3-2.','Qual mão é melhor?','A-2-3-4-5',['6-5-4-3-2','EMPATE'],'Razz usa Ace-to-Five low; A-2-3-4-5 é a melhor mão possível.'],
    ['5-Card Draw','DRAW','Após a primeira rodada de apostas, você quer trocar cartas.','Qual etapa vem agora?','DRAW / TROCA',['FLOP','TURN'],'No 5-Card Draw, a troca ocorre entre as duas rodadas de apostas.'],
    ['H.O.R.S.E.','ROTAÇÃO','A mesa muda de Hold’em para a letra O da rotação.','Qual jogo entra?','OMAHA HI/LO 8-OR-BETTER',['PLO HIGH','BADUGI'],'A letra O de H.O.R.S.E. representa Omaha Hi/Lo 8-or-Better.'],
    ['Mixed Games','TRANSIÇÃO','Uma nova rodada começa e a modalidade mudou.','Qual deve ser sua primeira checagem?','IDENTIFICAR O JOGO E O LIMITE ATIVOS',['REPETIR A REGRA ANTERIOR','JOGAR COMO HOLD’EM'],'Em Mixed Games, regras de distribuição, limite e avaliação mudam; confirme o jogo antes da mão.']
  ];
  for(let i=0;i<25;i++){
    const o=others[i%others.length], hero=POS[(i+1)%8];
    add(o[0],{kind:'outras',hero,street:o[1],context:o[2],question:o[3],options:choice(o[4],o[5][0],o[5][1]),answer:o[4],why:o[6],phase:o[1]});
  }

  // Quiz: 30 conceitos x 5 formulações = 150 questões, sem copiar literalmente os exercícios dos capítulos.
  const FACTS=[
    ['Em um showdown, qual destas mãos supera um flush?','FULL HOUSE',['SEQUÊNCIA','TRINCA'],'Full House está acima de Flush no ranking tradicional.'],
    ['Se ninguém apostou na street, qual ação mantém você na mão sem investir fichas?','CHECK',['CALL','RAISE'],'Check passa a ação sem aposta quando não há valor pendente.'],
    ['Se há uma aposta de 8 BB e você coloca exatamente 8 BB para continuar, que ação executou?','CALL',['BET','FOLD'],'Igualar a aposta pendente é call.'],
    ['Qual posição costuma ter a última decisão pós-flop quando permanece ativa?','BTN',['UTG1','BB'],'O Button é a posição mais tardia no pós-flop.'],
    ['O que as blinds fazem antes mesmo das cartas serem jogadas?','CRIAR UM POTE INICIAL',['ESCOLHER O DEALER','DEFINIR O VENCEDOR'],'SB e BB colocam fichas obrigatórias e criam ação desde o início.'],
    ['Quando existe ante, qual é seu efeito principal?','ADICIONAR FICHAS OBRIGATÓRIAS AO POTE',['TROCAR CARTAS','ENCERRAR A MÃO'],'Ante aumenta o pote antes da ação.'],
    ['Em uma dúvida de regra numa mesa organizada, quem dá a decisão final operacional?','FLOOR',['BUTTON','CO'],'O floor interpreta e aplica a regra no ambiente de jogo.'],
    ['Um jogador expõe informação de uma mão ainda ativa sem necessidade. Isso é boa etiqueta?','NÃO',['SIM','SÓ NO BUTTON'],'Não revelar informação da mão ativa protege a integridade do jogo.'],
    ['Em cash game, as fichas normalmente representam o quê?','DINHEIRO / VALOR DE CAIXA',['PONTOS DE TORNEIO','APENAS POSIÇÃO'],'No cash, fichas têm valor monetário direto conforme a mesa.'],
    ['Em torneios, o que normalmente acontece com os blinds ao longo do tempo?','AUMENTAM',['DIMINUEM','FICAM SEMPRE IGUAIS'],'Estruturas de torneio elevam blinds por níveis.'],
    ['No Hold’em, quantas cartas próprias você é obrigado a usar na mão final?','NENHUMA, UMA OU DUAS',['EXATAMENTE DUAS','EXATAMENTE UMA'],'Hold’em permite usar 0, 1 ou 2 hole cards.'],
    ['No Omaha, qual regra evita jogar apenas o board?','USAR EXATAMENTE 2 HOLE CARDS',['USAR PELO MENOS 1','USAR TODAS AS HOLE CARDS'],'Omaha exige exatamente 2 cartas próprias e 3 do board.'],
    ['Em PLO, o limite máximo de raise depende principalmente de quê?','DO TAMANHO DO POTE',['DA POSIÇÃO','DO NÚMERO DA MÃO'],'Pot-Limit limita o raise pelo tamanho do pote calculado.'],
    ['No Razz, qual direção de mão é desejada?','A MAIS BAIXA',['A MAIS ALTA','A MAIOR SEQUÊNCIA'],'Razz é lowball Ace-to-Five.'],
    ['No Razz, uma sequência torna a mão automaticamente pior?','NÃO',['SIM','SÓ NO RIVER'],'Straights e flushes são ignorados na avaliação Ace-to-Five.'],
    ['No Seven-Card Stud, o board é compartilhado por todos?','NÃO',['SIM','SÓ NA SEVENTH STREET'],'Cada jogador recebe suas próprias cartas abertas e fechadas.'],
    ['No 5-Card Draw, qual informação pode ser observada sem ver as cartas do adversário?','QUANTAS CARTAS ELE TROCA',['TEXTURA DO FLOP','COR DO BUTTON'],'A quantidade de cartas pedidas no draw é informação pública relevante.'],
    ['Em H.O.R.S.E., o H representa qual jogo?','LIMIT HOLD’EM',['NO-LIMIT HOLD’EM','HILO DRAW'],'H.O.R.S.E. tradicional começa por Limit Hold’em.'],
    ['Em Omaha Hi/Lo 8-or-Better, quando não há low qualificado, quem recebe a metade low?','NINGUÉM; O HIGH LEVA O POTE TODO',['O BUTTON','O MENOR PAR'],'Sem low qualificado, o high recebe o pote inteiro.'],
    ['No 2-7 lowball, o Ás joga normalmente como carta baixa?','NÃO',['SIM','SÓ EMPATADO'],'No 2-7, Ás é alto e straights/flushes prejudicam a mão.'],
    ['Em Badugi completo, o objetivo é ter quantas cartas de ranks e naipes diferentes?','4',['3','5'],'Um Badugi completo usa quatro ranks e quatro naipes diferentes.'],
    ['Em Fixed-Limit, os tamanhos de bet/raise são normalmente:','PREDETERMINADOS',['QUALQUER VALOR','SEMPRE ALL-IN'],'Fixed-Limit usa incrementos definidos pela estrutura.'],
    ['Em No-Limit, o maior valor que você pode comprometer numa ação é limitado por:','SEU STACK DISPONÍVEL',['O POTE SEMPRE','10 BB'],'No-Limit permite apostar até o stack disponível.'],
    ['Um empate exato das melhores cinco cartas é resolvido pelo naipe?','NÃO',['SIM','SÓ EM TORNEIO'],'Naipes não desempatatam mãos iguais no poker padrão.'],
    ['O que caracteriza um jogador tight em termos gerais?','JOGA MENOS MÃOS',['JOGA TODAS AS MÃOS','NUNCA APOSTA'],'Tight descreve seleção mais restrita de mãos.'],
    ['O que caracteriza agressividade no poker?','APOSTAR E AUMENTAR COM FREQUÊNCIA',['APENAS DAR CALL','SEMPRE FOLDAR'],'Agressividade se manifesta por bets e raises.'],
    ['Quando o dealer declara misdeal conforme a regra aplicável, o objetivo é:','CORRIGIR UMA DISTRIBUIÇÃO INVÁLIDA',['AUMENTAR BLINDS','PUNIR QUEM ESTÁ NO BTN'],'Misdeal trata uma distribuição inválida segundo regra da casa/torneio.'],
    ['Qual street vem imediatamente depois do flop?','TURN',['RIVER','SHOWDOWN'],'A sequência normal é Flop → Turn → River.'],
    ['Se todos os adversários foldam, é obrigatório mostrar sua mão para ganhar o pote?','NÃO',['SIM','SÓ COM ÁS'],'O último jogador restante vence sem showdown obrigatório, salvo regra específica da casa.'],
    ['Em Mixed Games, qual habilidade evita erros na transição entre mãos?','CONFIRMAR MODALIDADE E LIMITE ATIVOS',['MEMORIZAR APENAS HOLD’EM','IGNORAR A ROTAÇÃO'],'Identificar o jogo ativo é essencial antes de aplicar regras e avaliar mãos.']
  ];
  const WRAP=[
    q=>`Cenário de mesa: ${q}`,
    q=>`Durante uma revisão de mão, responda: ${q}`,
    q=>`Um jogador iniciante pergunta: ${q}`,
    q=>`Em uma simulação prática: ${q}`,
    q=>`Para confirmar que você entendeu o conceito: ${q}`
  ];
  const QUIZ=[];
  FACTS.forEach((f,fi)=>WRAP.forEach((w,wi)=>QUIZ.push({id:`Q${String(QUIZ.length+1).padStart(3,'0')}`,question:w(f[0]),options:[f[1],...f[2]],answer:f[1],why:f[3],topic:fi<10?'FUNDAMENTOS':fi<24?'MODALIDADES':'CONCEITOS'})));

  const MATH_THEORY=[
    {title:'OUTS',use:'Serve para estimar quantas cartas ainda podem melhorar sua mão para o resultado que você procura.',formula:'OUTS = cartas limpas que completam sua mão',tip:'Não conte a mesma carta duas vezes e elimine outs que podem completar uma mão ainda melhor para o adversário.'},
    {title:'REGRA DO 2 E DO 4',use:'Serve para estimar rapidamente a chance de completar um draw sem calculadora.',formula:'No flop, até o river ≈ outs × 4. No turn, uma carta por vir ≈ outs × 2.',tip:'Ex.: 9 outs de flush no flop ≈ 36% pela regra do 4; o valor exato é cerca de 35%.'},
    {title:'PROBABILIDADE EXATA DE 1 CARTA',use:'Serve quando você quer uma aproximação mais precisa para a próxima carta.',formula:'chance ≈ outs ÷ cartas desconhecidas',tip:'No turn de Hold’em há 46 cartas desconhecidas. Com 9 outs: 9/46 ≈ 19,6%.'},
    {title:'POT ODDS',use:'Serve para saber a equity mínima necessária para pagar uma aposta.',formula:'equity mínima = call ÷ (pote antes do call + aposta rival + call)',tip:'Pote 100, vilão aposta 50: você paga 50 para disputar 200. Precisa de 25%.'},
    {title:'SPR',use:'Serve para medir quanto stack efetivo resta em relação ao pote e orientar o compromisso da mão.',formula:'SPR = stack efetivo ÷ pote no início da street',tip:'Pote 20 BB e stack efetivo 60 BB → SPR 3.'},
    {title:'EV',use:'Serve para comparar decisões pelo resultado médio esperado no longo prazo.',formula:'EV simples do call = equity × pote final − custo do call',tip:'Use apenas quando o modelo do cenário estiver claro; futuras apostas mudam o cálculo.'},
    {title:'MDF',use:'Serve como referência teórica de frequência mínima de defesa contra uma aposta.',formula:'MDF = pote ÷ (pote + aposta)',tip:'Aposta de 50 em pote 100 → MDF ≈ 66,7%. Isso não obriga cada mão individual a defender.'},
    {title:'ALPHA DO BLUFF',use:'Serve para estimar quantos folds um bluff sem equity precisa gerar para empatar.',formula:'alpha = aposta ÷ (pote + aposta)',tip:'Aposta 50 em pote 100 → precisa de cerca de 33,3% de folds.'},
    {title:'FLUSH DRAW NO FLOP',use:'Serve como referência pronta quando você tem 9 outs limpos para flush.',formula:'9 outs: próxima carta ≈ 19%; até o river ≈ 35%',tip:'Regra rápida: 9×2 = 18% em uma carta; 9×4 = 36% até o river.'},
    {title:'OESD — STRAIGHT DRAW',use:'Serve para reconhecer o valor de um open-ended straight draw de 8 outs.',formula:'8 outs: próxima carta ≈ 17%; até o river ≈ 31,5%',tip:'Regra rápida: 8×2 = 16%; 8×4 = 32%.'},
    {title:'GUTSHOT',use:'Serve para avaliar uma sequência interna com 4 outs.',formula:'4 outs: próxima carta ≈ 8,5%; até o river ≈ 16,5%',tip:'Regra rápida: 4×2 = 8%; 4×4 = 16%.'},
    {title:'PAR DE MÃO → TRINCA NO FLOP',use:'Serve para saber com que frequência um pocket pair melhora forte já no flop.',formula:'Chance de flopar trinca ou melhor ≈ 11,8%',tip:'Regra prática: cerca de 1 vez a cada 8,5 flops.'},
    {title:'DUAS CARTAS DO MESMO NAIPE',use:'Serve como referência pré-flop para suited hands.',formula:'Com duas hole cards do mesmo naipe, chance de formar flush até o river ≈ 6,4%',tip:'Flopar o flush diretamente é raro: cerca de 0,84%. A maior parte dos flushes chega depois.'},
    {title:'RECEBER AA',use:'Serve para calibrar expectativas sobre mãos premium.',formula:'AA pré-flop ≈ 0,45% das mãos = cerca de 1 em 221',tip:'Não confunda frequência de receber AA com chance de AA vencer uma mão.'},
    {title:'RECEBER QUALQUER POCKET PAIR',use:'Serve para entender frequência de pares iniciais.',formula:'Qualquer par de mão ≈ 5,88% = cerca de 1 em 17',tip:'São 78 combinações de pocket pairs entre 1.326 combinações iniciais possíveis.'},
    {title:'AA × KK PRÉ-FLOP',use:'Serve como referência de equity em confronto premium heads-up antes do flop.',formula:'AA costuma ter cerca de 81–82% contra KK',tip:'O valor exato varia ligeiramente conforme os naipes. Use como referência, não como garantia de resultado.'}
  ];

  const MATH=[];
  const madd=(topic,q,options,answer,why)=>MATH.push({id:`M${String(MATH.length+1).padStart(3,'0')}`,topic,question:q,options,answer,why});
  const potCases=[[60,20],[80,40],[100,50],[120,30],[150,50],[40,20],[90,30],[200,100],[75,25],[140,70]];
  potCases.forEach(([p,b])=>{const eq=Math.round((b/(p+2*b))*100);madd('POT ODDS',`Pote ${p}. Vilão aposta ${b}. Você paga ${b}. Qual equity mínima aproximada?`,[`${eq}%`,`${eq+10}%`,`${Math.max(1,eq-8)}%`],`${eq}%`,`Equity mínima = call ÷ pote final após o call.`)});
  [[20,60],[25,100],[30,90],[40,80],[50,150]].forEach(([p,s])=>{const v=s/p;madd('SPR',`No início da street o pote é ${p} BB e o stack efetivo é ${s} BB. Qual o SPR?`,[String(v),String(v+1),String(Math.max(1,v-1))],String(v),'SPR = stack efetivo ÷ pote.')} );
  [[100,50],[80,40],[120,60],[90,30],[150,75]].forEach(([p,b])=>{const v=Math.round(b/(p+b)*100);madd('ALPHA',`Você blefa ${b} em um pote de ${p}, sem equity. Quantos folds aproximadamente precisa para empatar?`,[`${v}%`,`${Math.round(p/(p+b)*100)}%`,`${v+10}%`],`${v}%`,'Alpha = aposta ÷ (pote + aposta).')} );
  [[100,50],[80,40],[120,60],[90,30],[150,75]].forEach(([p,b])=>{const v=Math.round(p/(p+b)*100);madd('MDF',`Vilão aposta ${b} em pote ${p}. Qual MDF aproximada como referência teórica?`,[`${v}%`,`${Math.round(b/(p+b)*100)}%`,`${Math.max(1,v-10)}%`],`${v}%`,'MDF = pote ÷ (pote + aposta).')} );
  [[4,'FLOP'],[8,'FLOP'],[9,'FLOP'],[12,'TURN'],[6,'TURN']].forEach(([o,st])=>{const mult=st==='FLOP'?4:2, v=o*mult;const distractors=st==='FLOP'?[o*2,o*3]:[o*3,o*4];madd('REGRA 2/4',`${o} outs limpos no ${st}. Pela regra rápida, qual chance aproximada ${st==='FLOP'?'até o river':'na próxima carta'}?`,[`${v}%`,...distractors.map(n=>`${n}%`)],`${v}%`,`A regra prática usa outs × ${mult} neste contexto.`)} );

  window.StackupPracticeAdvancedBank={sim:SIM,quiz:QUIZ,math:MATH,mathTheory:MATH_THEORY,allocation:{simTotal:SIM.length,holdem:SIM.filter(x=>x.game==="Texas Hold'em").length,omaha:SIM.filter(x=>/^PLO/.test(x.game)).length,others:SIM.filter(x=>x.game!=="Texas Hold'em"&&!/^PLO/.test(x.game)).length,quizTotal:QUIZ.length,mathTotal:MATH.length}};
})();