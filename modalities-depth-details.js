(() => {
  const DETAILS={
    "Texas Hold'em":[
      ['DISTRIBUIÇÃO — PASSO A PASSO','Antes das cartas, Small Blind e Big Blind são postados e pode haver ante. A partir do jogador à esquerda do Button, o dealer distribui 1 carta fechada por vez em sentido horário até todos terem 2 cartas. Depois da ação pré-flop: queima-se 1 carta e abre-se o Flop com 3 cartas; queima-se 1 e abre-se o Turn; queima-se 1 e abre-se o River.'],
      ['SEQUÊNCIA DAS APOSTAS','1) Pré-flop após as 2 hole cards. 2) Flop após as 3 primeiras comunitárias. 3) Turn após a quarta comunitária. 4) River após a quinta comunitária. Se ainda houver mais de um jogador depois da última ação, ocorre o showdown.'],
      ['QUEM AGE PRIMEIRO','Em mesa normal, no pré-flop a primeira decisão voluntária é do primeiro jogador ativo à esquerda do Big Blind. Do Flop em diante, começa o primeiro jogador ativo à esquerda do Button. No heads-up há uma exceção importante: o Button é também o Small Blind, age primeiro pré-flop e o Big Blind age primeiro pós-flop.'],
      ['LIMITES DE APOSTA','No No-Limit Hold’em, a aposta pode ir do mínimo permitido até todo o stack. Uma abertura normal deve respeitar pelo menos o valor mínimo da mesa; um raise completo deve aumentar pelo menos o mesmo incremento do último bet/raise completo. All-in curto pode não reabrir a ação. Em Fixed-Limit os valores são predeterminados; em Pot-Limit o máximo é limitado pelo pote. Regras de cap de raises em Limit podem variar pela casa/torneio.'],
      ['FORMAÇÃO DA MÃO E SHOWDOWN','A melhor mão final tem 5 cartas escolhidas entre até 7 disponíveis: 2 próprias + 5 do board. Você pode usar 2, 1 ou nenhuma hole card. No showdown, compara-se a melhor combinação de 5 cartas; naipes não desempatarão uma mão equivalente.'],
      ['EXEMPLO DE MÃO COMPLETA','Blinds → 2 cartas para cada jogador → ação pré-flop → burn + Flop de 3 cartas → ação → burn + Turn → ação → burn + River → ação → showdown. Se todos foldarem antes, a mão termina imediatamente e não é preciso abrir as cartas.']
    ],
    'Poker de 5 cartas':[
      ['DISTRIBUIÇÃO — PASSO A PASSO','No 5-Card Draw não existe board. Após blinds ou antes, conforme a mesa, o dealer distribui 1 carta fechada por vez em sentido horário até cada jogador ter 5 cartas. Todas permanecem privadas.'],
      ['SEQUÊNCIA DAS APOSTAS','A estrutura clássica é: distribuição de 5 cartas → primeira rodada de apostas → draw/troca → segunda rodada de apostas → showdown. Se todos menos um desistirem antes, o jogador restante leva o pote sem showdown.'],
      ['A FASE DE TROCA','Na vez de cada jogador, ele informa quantas cartas descarta e recebe o mesmo número de cartas novas do stub. É permitido stand pat, mantendo as 5 cartas. Algumas casas limitam quantas cartas podem ser trocadas; se faltarem cartas no stub, o procedimento de recomposição/reshuffle segue a regra da casa.'],
      ['QUEM AGE PRIMEIRO','Quando o jogo usa blinds, a primeira rodada normalmente começa à esquerda do Big Blind e a rodada pós-draw começa no primeiro jogador ativo à esquerda do Button. Em estruturas por ante, a ordem inicial pode ser definida por regra própria da mesa.'],
      ['LIMITES DE APOSTA','5-Card Draw pode ser Fixed-Limit, Pot-Limit ou No-Limit. Em Limit, bet e raise usam valores predeterminados e o número de raises pode ser limitado. Em Pot-Limit o máximo acompanha o pote; em No-Limit o teto prático é o stack. O formato exato deve sempre ser identificado antes da mão.'],
      ['SHOWDOWN E LEITURA','Após a segunda rodada, a melhor mão high de 5 cartas vence. Como não existe board, a quantidade de cartas trocadas e o padrão de apostas são fontes centrais de informação: stand pat indica força potencial, mas não garante uma mão pronta.']
    ],
    'PLO 4 / PLO 5 / PLO 6':[
      ['DISTRIBUIÇÃO — PASSO A PASSO','Blinds são postados como no Hold’em. O dealer distribui 1 carta fechada por vez em sentido horário até cada jogador receber 4 cartas no PLO4, 5 no PLO5 ou 6 no PLO6. O board é distribuído como no Hold’em: burn + Flop de 3, burn + Turn, burn + River.'],
      ['REGRA 2 + 3','Em qualquer PLO, a mão final usa obrigatoriamente exatamente 2 hole cards e exatamente 3 cartas do board. Ter mais cartas próprias aumenta as combinações possíveis, mas nunca muda essa regra.'],
      ['SEQUÊNCIA DAS APOSTAS','Pré-flop → Flop → Turn → River → showdown. Pré-flop começa no primeiro ativo à esquerda do BB; pós-flop começa no primeiro ativo à esquerda do Button. Cada street fecha apenas quando toda a ação pendente foi igualada ou os demais jogadores desistiram.'],
      ['COMO FUNCIONA O POT-LIMIT','O jogador pode apostar até o tamanho permitido pelo pote. Quando enfrenta uma aposta, o cálculo do raise máximo considera primeiro o call e depois o tamanho do pote resultante. Exemplo: pote 100, adversário aposta 50; depois de considerar o call de 50, o raise máximo pode levar sua ação total a 250. Em mesas digitais o valor POT costuma ser calculado automaticamente.'],
      ['MÍNIMO E REABERTURA','O raise mínimo segue o incremento do último bet/raise completo, enquanto o máximo é limitado pelo pote. Um all-in menor que um raise completo pode não reabrir a ação para quem já agiu. Não existe um cap universal de raises em Pot-Limit; o limite real vem do pote e dos stacks.'],
      ['SHOWDOWN E NUTS','Com muitas combinações disponíveis, a força relativa das mãos sobe. É comum precisar de nuts ou draws para nuts em potes grandes. No showdown, monte todas as combinações válidas de exatamente 2 hole cards + 3 board e escolha a melhor mão de 5 cartas.']
    ],
    '5 & 7 Card Stud':[
      ['7-CARD STUD — DISTRIBUIÇÃO','Todos postam ante quando a estrutura usa ante. Na Third Street, cada jogador recebe 2 cartas fechadas e 1 aberta. Depois, recebe 1 aberta na Fourth Street, 1 aberta na Fifth, 1 aberta na Sixth e a sétima carta fechada na Seventh Street. Ao final, cada jogador pode ter 7 cartas próprias, 4 visíveis e 3 fechadas.'],
      ['7-CARD STUD — APOSTAS','Há uma rodada de apostas após cada street: Third, Fourth, Fifth, Sixth e Seventh. Na Third Street existe normalmente um bring-in obrigatório. Da Fourth Street em diante, a ação começa pelo jogador com a melhor combinação exposta, conforme a regra do Stud high.'],
      ['5-CARD STUD — DISTRIBUIÇÃO','Na forma clássica, cada jogador começa com 1 carta fechada e 1 aberta. Depois recebe novas cartas abertas, uma por street, até completar 5 cartas próprias. Há variações históricas e de casa; por isso a quantidade exata de streets e regras de bring-in deve ser confirmada na mesa.'],
      ['BRING-IN E ORDEM','No Stud high, a menor door card da Third Street normalmente é obrigada a fazer o bring-in. Depois dessa street, a melhor mão exposta age primeiro. Empates de carta exposta podem usar regras específicas de naipe apenas para determinar quem inicia a ação; naipes não desempatarão a mão no showdown.'],
      ['LIMITES DE APOSTA','Stud é tradicionalmente jogado em Fixed-Limit. Em 7-Card Stud, as primeiras streets usam o limite menor e, normalmente a partir da Fifth Street, usa-se o limite maior. Algumas regras permitem aposta grande antecipada na Fourth Street quando há um par exposto. O cap de raises depende da casa/torneio.'],
      ['SHOWDOWN','No 7-Card Stud, vence a melhor combinação de 5 cartas entre as 7 recebidas. No 5-Card Stud clássico, a mão é formada pelas 5 cartas do jogador. Não existe board comunitário; por isso observar as cartas expostas e lembrar cartas mortas é parte essencial do jogo.']
    ],
    'Razz':[
      ['DISTRIBUIÇÃO — PASSO A PASSO','Razz usa a estrutura do 7-Card Stud. Após o ante, cada jogador recebe 2 cartas fechadas + 1 aberta na Third Street; depois 1 aberta na Fourth, Fifth e Sixth; a Seventh Street entrega a última carta fechada.'],
      ['OBJETIVO DA MÃO','É um jogo lowball Ace-to-Five: vence a menor mão de 5 cartas. Ás conta baixo; straights e flushes são ignorados para avaliar o low. A melhor mão possível é A-2-3-4-5. Não há exigência de “8 ou melhor” no Razz padrão.'],
      ['BRING-IN','Na Third Street, o jogador com a maior carta exposta normalmente faz o bring-in obrigatório, porque no Razz cartas altas são piores. Em empates, algumas regras formais usam naipe apenas para definir o bring-in; isso não muda o valor da mão no showdown.'],
      ['SEQUÊNCIA DAS APOSTAS','Third Street → Fourth → Fifth → Sixth → Seventh → showdown. Depois da Third Street, a ação normalmente começa com o jogador que mostra a melhor combinação baixa entre as cartas expostas.'],
      ['LIMITES DE APOSTA','Razz costuma ser Fixed-Limit. Third e Fourth Street utilizam o limite menor; Fifth, Sixth e Seventh usam o limite maior. Bring-in pode ser menor que uma aposta completa. Quantidade máxima de raises por rodada depende da estrutura da casa/torneio.'],
      ['SHOWDOWN','Cada jogador escolhe as 5 menores cartas dentre as 7 recebidas. Pares prejudicam porque você precisa de cinco ranks diferentes para a melhor mão baixa. Compare primeiro a carta mais alta do low: 7-5-4-3-2 vence 8-4-3-2-A.']
    ],
    'H.O.R.S.E.':[
      ['O QUE REALMENTE MUDA','H.O.R.S.E. não é uma única regra de distribuição: é uma rotação de cinco jogos. H = Limit Hold’em; O = Omaha Hi/Lo 8-or-Better; R = Razz; S = Seven-Card Stud; E = Seven-Card Stud Hi/Lo 8-or-Better. Ao mudar a letra, mudam distribuição, objetivo e ordem de ação.'],
      ['H — HOLD’EM','2 hole cards para cada jogador; board Flop/Turn/River; quatro rodadas de apostas. Em H.O.R.S.E. é normalmente Fixed-Limit: limite menor pré-flop/flop e limite maior turn/river.'],
      ['O — OMAHA HI/LO 8','Normalmente 4 hole cards; board de 5 comunitárias. Para high e para low é obrigatório usar exatamente 2 hole cards + 3 do board. O pote pode ser dividido entre melhor high e melhor low qualificado. O low precisa de cinco ranks distintos de 8 ou menos; se ninguém qualificar, o high leva o pote inteiro.'],
      ['R / S / E — STUD','Razz e os dois Stud usam ante, bring-in e streets sucessivas. Razz procura a melhor mão baixa. Stud high procura a melhor mão high. Stud Hi/Lo divide o pote entre high e low 8-or-Better quando houver low qualificado.'],
      ['LIMITES E ROTAÇÃO','H.O.R.S.E. é tradicionalmente Fixed-Limit. O valor da aposta menor/maior sobe conforme o nível, e caps de raises seguem a regra do evento. A troca de modalidade pode ocorrer por órbita, número de mãos, tempo ou nível; o dealer/button/placa indica qual jogo está ativo.'],
      ['COMO NÃO SE PERDER','Antes de receber cartas, confirme três coisas: letra atual, objetivo do pote (high, low ou split) e regra de formação da mão. O erro mais comum é carregar a regra do jogo anterior para o próximo, especialmente entre Hold’em e Omaha ou entre Stud high e Razz.']
    ],
    'Poker Caribenho':[
      ['DISTRIBUIÇÃO — PASSO A PASSO','Caribbean Stud é um jogo de cassino contra a casa, não contra os outros jogadores. O jogador faz o Ante; então jogador e dealer recebem 5 cartas. As cartas do jogador ficam fechadas para os demais e uma carta do dealer costuma ficar exposta, com as outras fechadas, conforme a versão da mesa.'],
      ['DECISÃO DO JOGADOR','Depois de ver as 5 cartas e a carta exposta do dealer, o jogador escolhe Fold ou continuar. Na regra clássica de cassino, continuar exige uma aposta adicional geralmente equivalente a 2× o Ante. Não existem Flop, Turn, River nem várias rodadas de raise entre jogadores.'],
      ['QUALIFICAÇÃO DO DEALER','Em muitas regras clássicas o dealer precisa de A-K ou melhor para qualificar, mas a regra exata deve ser confirmada na mesa. Quando o dealer não qualifica, o tratamento do Ante e da aposta adicional segue a paytable local.'],
      ['COMPARAÇÃO DAS MÃOS','Quando o dealer qualifica, compara-se a mão de 5 cartas do jogador com a mão de 5 cartas do dealer usando a hierarquia high tradicional. O jogador não combina cartas com o dealer e não existe board comunitário.'],
      ['LIMITES E PAGAMENTOS','O tamanho mínimo/máximo das apostas, a tabela de pagamento, a qualificação do dealer e eventuais jackpots progressivos são definidos pelo cassino e podem variar. Portanto, esses valores não devem ser tratados como universais.'],
      ['SEQUÊNCIA COMPLETA','Ante → distribuição de 5 cartas ao jogador e 5 ao dealer → exposição prevista da carta do dealer → jogador decide Fold ou Bet → dealer abre a mão → verifica qualificação → compara as mãos → aplica a paytable da mesa.']
    ],
    'Outras modalidades':[
      ['SHORT DECK / 6+ HOLD’EM','Usa baralho reduzido, normalmente sem 2, 3, 4 e 5. Cada jogador recebe 2 hole cards e o board segue Flop/Turn/River. A estrutura de antes/blinds e até a hierarquia entre Flush, Full House e Trinca podem variar, então a tabela da casa deve ser confirmada antes do jogo.'],
      ['PINEAPPLE','Cada jogador recebe 3 hole cards, mas descarta 1 antes do Flop; depois joga como Hold’em com 2 cartas. Blinds, streets e apostas seguem a lógica do Hold’em, salvo regra local.'],
      ['CRAZY PINEAPPLE','Também começa com 3 hole cards, porém o descarte normalmente ocorre depois da ação do Flop. A partir daí o jogador segue com 2 hole cards até o River e showdown.'],
      ['OMAHA HI/LO 8','Normalmente 4 hole cards e board de 5. Use exatamente 2 cartas próprias + 3 do board tanto para high quanto para low. O low precisa de cinco ranks distintos de 8 ou menos; se não houver low qualificado, o high recebe o pote inteiro.'],
      ['2-7 TRIPLE DRAW','Cada jogador recebe 5 cartas fechadas. Há quatro rodadas de apostas e três draws: aposta → draw 1 → aposta → draw 2 → aposta → draw 3 → aposta → showdown. O objetivo é a menor mão 2-to-7; Ás é alto e straights/flushes prejudicam. 7-5-4-3-2 é a melhor mão.'],
      ['BADUGI','Cada jogador recebe 4 cartas fechadas. O formato comum possui três draws e quatro rodadas de apostas. A melhor mão tem quatro ranks diferentes e quatro naipes diferentes; Ás é baixo. Pares ou naipes repetidos reduzem o número de cartas úteis da mão.'],
      ['REGRA PRÁTICA','“Outras modalidades” não compartilham um único padrão de apostas. Antes de jogar, confirme sempre: número de cartas próprias, presença ou não de board, quantos draws existem, quem inicia a ação, se é Limit/Pot-Limit/No-Limit e qual ranking de mãos está valendo.']
    ]
  };

  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  function addStyle(){
    if(document.getElementById('stackup-modalities-depth-style'))return;
    const s=document.createElement('style');
    s.id='stackup-modalities-depth-style';
    s.textContent=`
      .m2-depth-wrap{margin-top:16px}
      .m2-depth-title{margin:0 0 10px;padding:12px 14px;border-radius:12px;background:#2a160d;color:#d4aa58;border:1px solid #d4aa58;font-size:21px!important;line-height:1.15;text-transform:uppercase}
      .m2-depth-grid{display:grid;gap:12px}
      .m2-depth-card{padding:15px 16px;border-radius:17px;background:#e7dcc2;border:1px solid #a87c324d}
      .m2-depth-card h3{margin:0 0 7px;color:#08372d;font-size:21px!important;line-height:1.15;text-transform:uppercase}
      .m2-depth-card p{margin:0;color:#725f4d;font-size:16px!important;line-height:1.5}
    `;
    document.head.appendChild(s);
  }

  function apply(){
    addStyle();
    const lesson=document.querySelector('.card.lesson');
    if(!lesson)return;
    const name=lesson.querySelector('h2')?.textContent?.trim();
    const rows=DETAILS[name];
    if(!rows)return;
    const blocks=lesson.querySelector('.blocks');
    if(!blocks || blocks.querySelector(':scope > .m2-depth-wrap'))return;
    const wrap=document.createElement('div');
    wrap.className='m2-depth-wrap';
    wrap.innerHTML=`<h3 class="m2-depth-title">COMO A MÃO FUNCIONA — PASSO A PASSO</h3><div class="m2-depth-grid">${rows.map(([t,p])=>`<section class="m2-depth-card"><h3>${esc(t)}</h3><p>${esc(p)}</p></section>`).join('')}</div>`;
    blocks.appendChild(wrap);
  }

  const root=document.getElementById('root');
  if(root){
    let raf=0;
    new MutationObserver(()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(apply);
    }).observe(root,{childList:true});
  }
  apply();
})();
