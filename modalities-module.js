(() => {
  const LESSONS={
    "Texas Hold'em":{
      sections:[
        ['O QUE É','Texas Hold’em é a modalidade de poker mais difundida. Cada jogador recebe 2 cartas fechadas e compartilha um board de até 5 cartas comunitárias.'],
        ['OBJETIVO','Vencer o pote formando a melhor mão de 5 cartas no showdown ou fazendo todos os adversários desistirem antes dele.'],
        ['DISTRIBUIÇÃO','Depois dos blinds, cada jogador recebe 2 hole cards. O board é aberto em Flop (3 cartas), Turn (1) e River (1), com rodadas de apostas entre as streets.'],
        ['COMO FORMAR A MÃO','A mão final tem exatamente 5 cartas. Você pode usar as 2 cartas próprias, apenas 1 ou nenhuma delas, combinando-as livremente com o board.'],
        ['APOSTAS','No No-Limit Hold’em, o jogador pode apostar qualquer valor permitido até todo o stack. As ações básicas são check, bet, call, raise e fold.'],
        ['ORDEM DE AÇÃO','Pré-flop, a ação voluntária começa à esquerda do Big Blind. Pós-flop, começa no primeiro jogador ativo à esquerda do Button.'],
        ['EXEMPLO','Você tem A♠ K♠ e o board é Q♠ J♠ 10♠ 4♦ 2♣. Sua melhor mão é Royal Flush usando as duas cartas próprias e três do board.'],
        ['PONTO-CHAVE','Hold’em não exige usar carta da mão. Se o board já formar a melhor combinação de 5 cartas para todos, o pote pode ser dividido.']
      ],
      facts:[
        ['Quantas cartas próprias cada jogador recebe no Hold’em?','2',['4','5','7'],'Cada jogador recebe exatamente 2 hole cards.','Cada jogador recebe 2 cartas próprias.','Cada jogador recebe 4 cartas próprias.'],
        ['Quantas cartas comunitárias podem formar o board completo?','5',['3','4','7'],'Flop, Turn e River totalizam 5 cartas comunitárias.','O board completo pode ter 5 cartas.','O board completo pode ter apenas 3 cartas.'],
        ['Quantas cartas compõem a mão final avaliada?','5',['2','7','9'],'No poker padrão a mão final avaliada tem 5 cartas.','A mão final do Hold’em tem 5 cartas.','A mão final do Hold’em tem 7 cartas.'],
        ['É obrigatório usar as duas cartas próprias?','NÃO',['SIM','SÓ NO RIVER','SÓ EM HEADS-UP'],'No Hold’em você pode usar 0, 1 ou 2 cartas próprias.','Você pode jogar o board sem usar nenhuma carta própria.','É obrigatório usar exatamente 2 cartas próprias.'],
        ['Quantas cartas são abertas no Flop?','3',['1','2','4'],'O Flop revela três cartas comunitárias de uma vez.','O Flop revela 3 cartas.','O Flop revela apenas 1 carta.'],
        ['Qual street adiciona a quarta carta comunitária?','TURN',['FLOP','RIVER','PRÉ-FLOP'],'O Turn é a quarta carta do board.','O Turn adiciona a quarta carta comunitária.','O River adiciona a quarta carta comunitária.'],
        ['Qual street adiciona a quinta carta comunitária?','RIVER',['TURN','FLOP','PRÉ-FLOP'],'O River completa o board com a quinta carta.','O River completa o board de 5 cartas.','O Turn é a última carta do board.'],
        ['Quem normalmente inicia a ação voluntária pré-flop?','PRIMEIRO ATIVO À ESQUERDA DO BB',['BUTTON','SMALL BLIND SEMPRE','DEALER'],'A ação pré-flop segue a partir do primeiro ativo à esquerda do BB.','Pré-flop, a ação voluntária normalmente começa à esquerda do BB.','Pré-flop, o Button sempre age primeiro.'],
        ['Quem normalmente age primeiro pós-flop?','PRIMEIRO ATIVO À ESQUERDA DO BUTTON',['BIG BLIND SEMPRE','BUTTON','UTG SEMPRE'],'Flop, Turn e River começam no primeiro ativo à esquerda do Button.','Pós-flop, começa o primeiro ativo à esquerda do Button.','Pós-flop, o Button sempre age primeiro.'],
        ['O que pode vencer um pote sem showdown?','TODOS OS ADVERSÁRIOS FOLDAREM',['TER UM ÁS','TER PAR','SER O BUTTON'],'Se todos foldarem, o último jogador restante vence sem mostrar.','É possível vencer sem showdown se todos os adversários foldarem.','Só é possível vencer um pote no showdown.'],
        ['No No-Limit, qual o máximo de uma aposta?','ATÉ O STACK DISPONÍVEL',['1 BB','O TAMANHO DO POTE SEMPRE','10 BB'],'No No-Limit o jogador pode comprometer até todo o stack.','No No-Limit, o jogador pode apostar até todo o stack.','No No-Limit, nunca se pode apostar mais que o pote.'],
        ['Se o board sozinho for a melhor mão para todos, o que pode ocorrer?','SPLIT POT',['MISDEAL','POTE MORTO','NOVO FLOP'],'Se ninguém melhora o board, jogadores empatados dividem o pote.','O board pode jogar para todos e gerar split pot.','Cada jogador é obrigado a usar ao menos uma hole card.']
      ],
      seqs:[
        ['Ordene as streets do Hold’em.',['PRÉ-FLOP','FLOP','TURN','RIVER']],
        ['Ordene a construção do board.',['FLOP: 3 CARTAS','TURN: +1 CARTA','RIVER: +1 CARTA']],
        ['Ordene o fluxo básico de uma mão.',['POSTAR BLINDS','DISTRIBUIR 2 CARTAS','AÇÃO PRÉ-FLOP','ABRIR FLOP','AÇÃO PÓS-FLOP']],
        ['Ordene uma decisão de ação.',['OBSERVAR A AÇÃO ANTERIOR','ESCOLHER CHECK/BET/CALL/RAISE/FOLD','DECLARAR OU COLOCAR FICHAS','AGUARDAR PRÓXIMO JOGADOR']],
        ['Ordene até o showdown.',['RIVER','ÚLTIMA RODADA DE APOSTAS','SHOWDOWN','ENTREGA DO POTE']]
      ]
    },
    'Poker de 5 cartas':{
      sections:[
        ['O QUE É','Aqui o foco é o 5-Card Draw: cada jogador recebe 5 cartas fechadas e não existe board comunitário.'],
        ['OBJETIVO','Formar a melhor mão de 5 cartas após a fase de troca, ou vencer fazendo os adversários desistirem.'],
        ['DISTRIBUIÇÃO','Cada jogador recebe 5 cartas próprias fechadas. A estrutura de blinds ou antes depende da regra da mesa.'],
        ['PRIMEIRA RODADA','Depois da distribuição ocorre uma rodada de apostas. Quem continua decide então quais cartas deseja trocar.'],
        ['DRAW — TROCA','O jogador descarta a quantidade permitida e recebe novas cartas do baralho. Regras da casa podem limitar a quantidade de trocas.'],
        ['SEGUNDA RODADA','Após a troca acontece nova rodada de apostas. Se restarem dois ou mais jogadores, há showdown.'],
        ['MÃOS','A hierarquia tradicional de mãos é a mesma do Hold’em: Straight Flush, Quadra, Full House, Flush, Sequência, Trinca, Dois Pares, Par e Carta Alta.'],
        ['LEITURA','Como as cartas são fechadas e não existe board, informação vem principalmente do padrão de apostas e da quantidade de cartas trocadas.']
      ],
      facts:[
        ['Quantas cartas próprias um jogador recebe no 5-Card Draw?','5',['2','4','7'],'Cada jogador recebe 5 cartas fechadas.','No 5-Card Draw cada jogador recebe 5 cartas próprias.','No 5-Card Draw cada jogador recebe apenas 2 cartas.'],
        ['Existe board comunitário no 5-Card Draw?','NÃO',['SIM','SÓ NO RIVER','SÓ NO HEADS-UP'],'Cada jogador trabalha com suas próprias cartas.','Não existe board comunitário no 5-Card Draw.','O 5-Card Draw usa Flop, Turn e River.'],
        ['O que significa draw nessa modalidade?','TROCAR CARTAS',['ABRIR O FLOP','DIVIDIR O POTE','AUMENTAR O BLIND'],'Draw é a fase de descarte e reposição de cartas.','O draw permite descartar e receber novas cartas.','Draw significa obrigatoriamente aumentar a aposta.'],
        ['Quantas cartas formam a mão final?','5',['2','7','10'],'As cinco cartas próprias após o draw formam a mão final.','A mão final é composta por 5 cartas.','A mão final usa 7 cartas.'],
        ['A hierarquia de mãos muda em relação ao Hold’em high?','NÃO',['SIM','SÓ PARA FLUSH','SÓ PARA FULL HOUSE'],'No 5-Card Draw high usa-se a hierarquia tradicional.','A hierarquia high padrão é a mesma do Hold’em.','Um Flush perde para uma Sequência no 5-Card Draw padrão.'],
        ['O que acontece depois da primeira rodada de apostas?','FASE DE TROCA',['RIVER','SHOWDOWN IMEDIATO','NOVO ANTE'],'Depois da primeira aposta vem o draw.','Depois da primeira rodada ocorre a troca de cartas.','Depois da primeira rodada sempre ocorre showdown.'],
        ['O que acontece normalmente depois do draw?','NOVA RODADA DE APOSTAS',['NOVO FLOP','MISDEAL','A MÃO TERMINA AUTOMATICAMENTE'],'Após o draw há uma segunda rodada de apostas.','Depois do draw há nova rodada de apostas.','Depois do draw a mão termina sem apostas.'],
        ['Qual informação visual pode ajudar a leitura dos adversários?','QUANTIDADE DE CARTAS TROCADAS',['TEXTURA DO BOARD','NAIPE DO FLOP','TURN'],'Sem board, a quantidade de cartas trocadas é um sinal importante.','A quantidade de cartas trocadas pode fornecer informação.','A textura do flop é central no 5-Card Draw.'],
        ['É obrigatório trocar pelo menos uma carta?','NÃO',['SIM','SÓ COM PAR','SÓ NO BUTTON'],'Um jogador pode ficar pat, mantendo as 5 cartas, conforme a estrutura padrão.','Um jogador pode manter todas as cartas e não trocar.','Todo jogador é obrigado a trocar ao menos uma carta.'],
        ['Como se chama manter as 5 cartas sem trocar?','STAND PAT',['LIMP','STRADDLE','MUCK'],'Stand pat significa não pedir cartas novas.','Stand pat significa manter a mão sem troca.','Stand pat significa descartar todas as cinco cartas.'],
        ['A quantidade máxima de cartas que pode ser trocada é universal?','NÃO',['SIM','É SEMPRE 1','É SEMPRE 5'],'Regras da casa podem limitar quantas cartas podem ser trocadas.','O limite de troca pode variar conforme a regra da casa.','Toda mesa permite obrigatoriamente trocar as cinco cartas.'],
        ['No showdown, o que decide o vencedor?','MELHOR MÃO DE 5 CARTAS',['MAIOR STACK','MAIS CARTAS TROCADAS','POSIÇÃO'],'A melhor combinação de cinco cartas vence na versão high.','No showdown vence a melhor mão de 5 cartas.','No showdown vence quem trocou menos cartas.']
      ],
      seqs:[
        ['Ordene o fluxo do 5-Card Draw.',['DISTRIBUIR 5 CARTAS','PRIMEIRA RODADA DE APOSTAS','DRAW / TROCA','SEGUNDA RODADA DE APOSTAS','SHOWDOWN']],
        ['Ordene uma troca de cartas.',['ESCOLHER DESCARTES','ENTREGAR DESCARTES','RECEBER NOVAS CARTAS','REAVALIAR A MÃO']],
        ['Ordene a leitura básica.',['OBSERVAR APOSTA','OBSERVAR QUANTAS CARTAS TROCOU','COMBINAR AS INFORMAÇÕES','TOMAR DECISÃO']],
        ['Ordene uma mão que chega ao fim.',['DRAW','SEGUNDA RODADA','CALL FINAL','SHOWDOWN']],
        ['Ordene a preparação da mão.',['POSTAR APOSTAS OBRIGATÓRIAS','DISTRIBUIR 5 CARTAS FECHADAS','INICIAR PRIMEIRA RODADA']]
      ]
    },
    'PLO 4 / PLO 5 / PLO 6':{
      sections:[
        ['O QUE É','Pot-Limit Omaha usa board comunitário como o Hold’em, mas cada jogador recebe 4, 5 ou 6 cartas próprias conforme PLO4, PLO5 ou PLO6.'],
        ['REGRA MAIS IMPORTANTE','Para formar a mão final é obrigatório usar exatamente 2 cartas próprias e exatamente 3 cartas do board. Nem mais, nem menos.'],
        ['BOARD','Flop, Turn e River formam o mesmo board de até 5 cartas comunitárias usado no Hold’em.'],
        ['APOSTAS POT-LIMIT','O tamanho máximo do raise é limitado pelo tamanho do pote calculado após o call. A mesa ou software normalmente exibe o máximo permitido.'],
        ['PLO4, PLO5 E PLO6','Quanto mais hole cards, mais combinações de duas cartas existem. Isso aumenta a frequência de draws fortes e mãos muito conectadas.'],
        ['NUTS','Como há muitas combinações, mãos não-nut podem perder valor rapidamente. É essencial identificar a melhor combinação possível no board.'],
        ['EXEMPLO','Se você tem A♠ K♠ 9♦ 8♦ e o board é Q♠ J♠ 10♠ 2♣ 3♥, pode usar A♠ K♠ + Q♠ J♠ 10♠ para formar Royal Flush.'],
        ['ERRO CLÁSSICO','Ter apenas um Ás de copas na mão com quatro copas no board não forma flush em Omaha: é obrigatório usar exatamente 2 hole cards.']
      ],
      facts:[
        ['Quantas cartas próprias você deve usar em qualquer PLO?','EXATAMENTE 2',['1','ATÉ 2','3'],'Omaha exige exatamente duas hole cards.','No PLO é obrigatório usar exatamente 2 cartas próprias.','No PLO você pode usar apenas 1 carta própria.'],
        ['Quantas cartas do board você deve usar?','EXATAMENTE 3',['2','4','5'],'A mão final usa exatamente três cartas comunitárias.','No PLO são usadas exatamente 3 cartas do board.','No PLO você pode usar as 5 cartas do board.'],
        ['Quantas hole cards recebe um jogador no PLO4?','4',['2','5','6'],'PLO4 distribui quatro cartas próprias.','PLO4 significa 4 cartas próprias.','PLO4 significa quatro cartas no board.'],
        ['Quantas hole cards recebe um jogador no PLO5?','5',['4','6','7'],'PLO5 distribui cinco cartas próprias.','PLO5 significa 5 cartas próprias.','PLO5 usa apenas duas hole cards recebidas.'],
        ['Quantas hole cards recebe um jogador no PLO6?','6',['4','5','8'],'PLO6 distribui seis cartas próprias.','PLO6 significa 6 cartas próprias.','PLO6 significa board de seis cartas.'],
        ['O board de PLO tem até quantas cartas?','5',['4','6','7'],'O board continua sendo Flop, Turn e River.','O board do PLO completo tem 5 cartas.','O board do PLO6 tem 6 cartas.'],
        ['É permitido jogar apenas o board em Omaha?','NÃO',['SIM','SÓ NO RIVER','SÓ EM PLO4'],'Você precisa usar exatamente duas hole cards.','Não é possível jogar somente o board no PLO.','No PLO você pode usar zero hole cards.'],
        ['O que limita o tamanho máximo da aposta/raise em Pot-Limit?','O TAMANHO DO POTE',['O STACK DO ADVERSÁRIO MAIS CURTO SEMPRE','1 BB','10 BB'],'Pot-Limit usa cálculo baseado no pote.','No Pot-Limit o máximo é determinado pelo tamanho do pote.','Pot-Limit permite sempre qualquer aposta até todo o stack.'],
        ['Com mais hole cards, o número de combinações de pares de cartas tende a...','AUMENTAR',['DIMINUIR','FICAR IDÊNTICO','ZERAR'],'Mais hole cards criam mais combinações possíveis de duas cartas.','PLO5 e PLO6 geram mais combinações de duas hole cards.','PLO6 oferece menos combinações que PLO4.'],
        ['Em boards muito conectados, qual conceito ganha importância?','NUTS',['DEALER BUTTON APENAS','ANTE','RABBIT HUNTING'],'A melhor combinação possível é crucial em Omaha.','Identificar o nuts é especialmente importante em PLO.','Em PLO, mãos não-nut têm sempre o mesmo valor que o nuts.'],
        ['Quatro copas no board e apenas uma copa na mão formam flush para você?','NÃO',['SIM','SE O ÁS FOR DE COPAS','SE ESTIVER NO BUTTON'],'Você precisa de duas cartas próprias, então uma única copa na mão não basta.','Uma única carta do naipe na mão não completa flush em Omaha.','Uma única copa na mão basta para usar quatro copas do board.'],
        ['PLO usa as mesmas streets comunitárias do Hold’em?','SIM',['NÃO','SÓ FLOP E TURN','SÓ RIVER'],'O board segue Flop, Turn e River.','PLO usa Flop, Turn e River.','PLO não possui River.']
      ],
      seqs:[
        ['Ordene as streets do PLO.',['PRÉ-FLOP','FLOP','TURN','RIVER']],
        ['Ordene a formação correta da mão.',['SELECIONAR EXATAMENTE 2 HOLE CARDS','SELECIONAR EXATAMENTE 3 DO BOARD','COMPARAR A MÃO DE 5 CARTAS']],
        ['Ordene um cálculo conceitual de pot raise.',['IDENTIFICAR O POTE','CONSIDERAR O CALL','CALCULAR O MÁXIMO POT','DECLARAR O RAISE']],
        ['Ordene a leitura de força.',['LER O BOARD','IDENTIFICAR NUTS POSSÍVEIS','COMBINAR EXATAMENTE 2+3','AVALIAR DRAWS E REDRAWS']],
        ['Ordene do menor para o maior número de hole cards.',['PLO4','PLO5','PLO6']]
      ]
    },
    '5 & 7 Card Stud':{
      sections:[
        ['O QUE É STUD','Stud não usa board comunitário. Cada jogador constrói sua própria mão com cartas fechadas e cartas expostas.'],
        ['5-CARD STUD','Na forma tradicional, cada jogador recebe 5 cartas ao longo da mão, normalmente uma fechada e quatro expostas. Regras de distribuição podem variar por casa.'],
        ['7-CARD STUD','Começa normalmente com duas cartas fechadas e uma exposta; depois vêm três cartas expostas e, por fim, a sétima carta fechada.'],
        ['MÃO FINAL','No 7-Card Stud você recebe até 7 cartas, mas o showdown considera a melhor combinação de 5.'],
        ['BRING-IN','Stud costuma usar ante e bring-in. A carta exposta inicial determina quem deve fazer a aposta obrigatória conforme a variante.'],
        ['ORDEM DE AÇÃO','Depois da rodada inicial, a ordem pode ser definida pela melhor mão exposta na mesa, e não por um Button fixo.'],
        ['MEMÓRIA VISUAL','As cartas expostas que depois foldam são informação valiosa: ajudam a estimar quais outs ainda podem estar vivos.'],
        ['APOSTAS','Stud é frequentemente jogado em Fixed Limit, com tamanhos de aposta predefinidos por street, embora regras da casa possam variar.']
      ],
      facts:[
        ['Stud usa board comunitário como Hold’em?','NÃO',['SIM','SÓ NO RIVER','SÓ NO 5-CARD STUD'],'Cada jogador recebe seu próprio conjunto de cartas.','Stud não utiliza board comunitário.','Stud usa um flop comunitário de três cartas.'],
        ['No 7-Card Stud, quantas cartas um jogador pode receber até o fim?','7',['5','2','9'],'O nome da modalidade reflete as sete cartas distribuídas ao jogador.','No 7-Card Stud um jogador pode receber 7 cartas.','No 7-Card Stud a mão para no quinto cartão recebido.'],
        ['Quantas cartas formam a mão final no 7-Card Stud?','5',['7','2','3'],'Escolhem-se as melhores cinco entre as sete recebidas.','A avaliação final usa a melhor mão de 5 cartas.','As sete cartas são avaliadas como uma única mão de 7 cartas.'],
        ['Como começa normalmente o 7-Card Stud?','2 FECHADAS + 1 EXPOSTA',['3 FECHADAS','2 EXPOSTAS + 1 FECHADA','5 FECHADAS'],'A terceira street começa com duas downcards e uma upcard.','O 7-Card Stud normalmente começa com 2 fechadas e 1 exposta.','O 7-Card Stud normalmente começa com três cartas expostas.'],
        ['Como é chamada a aposta obrigatória inicial associada à carta exposta?','BRING-IN',['STRADDLE','SQUEEZE','C-BET'],'O bring-in inicia a ação em muitas estruturas de Stud.','Stud normalmente utiliza bring-in na rodada inicial.','Stud nunca utiliza aposta obrigatória além do ante.'],
        ['Há antes em estruturas tradicionais de Stud?','SIM',['NÃO','SÓ NO RIVER','SÓ NO HEADS-UP'],'Antes são comuns no Stud.','Stud tradicional frequentemente utiliza ante.','Stud obrigatoriamente usa blinds idênticos ao Hold’em.'],
        ['Depois da primeira rodada, o primeiro a agir pode depender de quê?','DAS CARTAS EXPOSTAS',['DO BUTTON SEMPRE','DO BIG BLIND','DO STACK MAIOR'],'A mão exposta pode determinar a ordem.','A ordem pós-inicial pode depender da força mostrada nas upcards.','O Button fixo sempre define a ordem em Stud.'],
        ['Cartas expostas de jogadores que foldaram ainda são informação útil?','SIM',['NÃO','SÓ SE FOREM ASES','SÓ NO RIVER'],'Elas ajudam a estimar cartas vivas e outs.','Memorizar cartas expostas foldadas é útil no Stud.','Cartas expostas foldadas não fornecem nenhuma informação.'],
        ['Stud é comumente jogado em qual estrutura de apostas?','FIXED LIMIT',['NO-LIMIT OBRIGATÓRIO','POT-LIMIT OBRIGATÓRIO','SEM APOSTAS'],'Muitos jogos de Stud usam limites fixos.','Stud é frequentemente jogado em Fixed Limit.','Stud é obrigatoriamente No-Limit.'],
        ['No 5-Card Stud tradicional, as cartas são todas fechadas?','NÃO',['SIM','SÓ A ÚLTIMA É ABERTA','NÃO HÁ CARTAS PRÓPRIAS'],'A modalidade combina cartas fechadas e expostas.','5-Card Stud tradicional combina cartas fechadas e abertas.','5-Card Stud tradicional mantém todas as cinco cartas fechadas.'],
        ['A sexta street do 7-Card Stud costuma ser exposta?','SIM',['NÃO','É COMUNITÁRIA','NÃO EXISTE'],'A quarta, quinta e sexta streets adicionam upcards.','A sexta street normalmente é uma carta exposta.','A sexta street é uma carta comunitária no centro da mesa.'],
        ['A sétima street costuma ser distribuída como?','FECHADA',['EXPOSTA','COMUNITÁRIA','DESCARTADA'],'A última carta do 7-Card Stud é normalmente downcard.','A sétima carta normalmente é fechada.','A sétima carta normalmente é um river comunitário.']
      ],
      seqs:[
        ['Ordene a distribuição inicial do 7-Card Stud.',['PRIMEIRA CARTA FECHADA','SEGUNDA CARTA FECHADA','TERCEIRA CARTA EXPOSTA']],
        ['Ordene as streets finais do 7-Card Stud.',['QUARTA STREET EXPOSTA','QUINTA STREET EXPOSTA','SEXTA STREET EXPOSTA','SÉTIMA STREET FECHADA']],
        ['Ordene uma leitura de cartas vivas.',['OBSERVAR UPCARDS','MEMORIZAR CARTAS QUE FOLDARAM','COMPARAR COM SUA MÃO','REAVALIAR OUTS']],
        ['Ordene o início tradicional.',['POSTAR ANTE','DISTRIBUIR TERCEIRA STREET','IDENTIFICAR BRING-IN','INICIAR AÇÃO']],
        ['Ordene a avaliação final.',['REUNIR AS CARTAS RECEBIDAS','ESCOLHER AS MELHORES 5','COMPARAR COM OS ADVERSÁRIOS']]
      ]
    },
    'Razz':{
      sections:[
        ['O QUE É','Razz é uma variante de Seven Card Stud em que vence a melhor mão baixa. Não há board comunitário.'],
        ['OBJETIVO','Formar a menor mão possível de 5 cartas usando as cartas recebidas. A melhor mão clássica é A-2-3-4-5, chamada wheel.'],
        ['O ÁS','No Razz padrão, o Ás joga como carta baixa. Straights e flushes não prejudicam a mão baixa.'],
        ['PARES','Pares são ruins porque reduzem a qualidade da mão low. Uma mão sem par e com cartas baixas tende a ser mais forte.'],
        ['DISTRIBUIÇÃO','Segue a estrutura do Seven Card Stud: duas fechadas e uma exposta no início, mais cartas por streets até a sétima.'],
        ['BRING-IN','Na rodada inicial, a maior carta exposta normalmente faz o bring-in, pois o objetivo é formar low. Empates seguem a regra de naipes/procedimento da casa.'],
        ['ORDEM DE AÇÃO','Nas streets seguintes, a melhor mão baixa exposta normalmente age primeiro.'],
        ['EXEMPLO','A♣ 2♦ 3♠ 4♥ 5♣ é 5-high e representa a melhor mão padrão de Razz. 6-4-3-2-A perde para 5-4-3-2-A.']
      ],
      facts:[
        ['Qual é o objetivo do Razz?','FORMAR A MELHOR MÃO BAIXA',['FORMAR O MAIOR FLUSH','FAZER A MAIOR TRINCA','USAR O BOARD'],'Razz premia a menor mão low válida.','Razz é uma modalidade lowball.','Razz premia sempre a maior mão high.'],
        ['Qual é a melhor mão padrão no Razz?','A-2-3-4-5',['10-J-Q-K-A','A-A-2-3-4','2-3-4-5-6'],'A wheel é 5-high e é a melhor mão.','A-2-3-4-5 é a melhor mão padrão de Razz.','Royal Flush é a melhor mão de Razz.'],
        ['O Ás é considerado baixo no Razz?','SIM',['NÃO','SÓ NO RIVER','SÓ SE FOR DE ESPADAS'],'Ás conta como low.','O Ás joga como carta baixa no Razz.','O Ás é sempre a carta mais alta no Razz.'],
        ['Straights prejudicam uma mão de Razz?','NÃO',['SIM','SÓ A WHEEL','SÓ NO SHOWDOWN'],'Sequências não contam contra a mão low.','Straights não prejudicam a mão no Razz.','Uma sequência invalida automaticamente uma mão de Razz.'],
        ['Flushes prejudicam uma mão de Razz?','NÃO',['SIM','SÓ DE ESPADAS','SÓ COM ÁS'],'Naipe não piora a classificação low padrão.','Flushes não prejudicam a mão no Razz.','Um flush é sempre pior que qualquer mão não-flush no Razz.'],
        ['Pares são desejáveis no Razz?','NÃO',['SIM','SÓ PARES BAIXOS','SÓ NO INÍCIO'],'Pares pioram a mão low.','Pares são indesejáveis no Razz.','Um par de Ases melhora uma mão low.'],
        ['Razz usa board comunitário?','NÃO',['SIM','SÓ FLOP','SÓ RIVER'],'É uma modalidade de Stud.','Razz não usa board comunitário.','Razz usa cinco cartas comunitárias.'],
        ['Quantas cartas podem ser recebidas até o fim?','7',['5','2','10'],'Razz segue a estrutura de Seven Card Stud.','Um jogador pode receber até 7 cartas no Razz.','Razz distribui apenas 5 cartas no total.'],
        ['Quantas cartas entram na mão final?','5',['7','2','3'],'A melhor combinação low usa cinco cartas.','A mão final de Razz usa 5 cartas.','As sete cartas recebidas são todas obrigatórias na mão final.'],
        ['Quem costuma fazer o bring-in na terceira street?','A MAIOR CARTA EXPOSTA',['A MENOR CARTA EXPOSTA','BUTTON','BIG BLIND'],'Como é lowball, a carta exposta mais alta normalmente traz o bring-in.','A maior upcard normalmente faz o bring-in no Razz.','A menor upcard normalmente é obrigada ao bring-in no Razz.'],
        ['Nas streets seguintes, quem tende a agir primeiro?','A MELHOR MÃO LOW EXPOSTA',['A PIOR MÃO EXPOSTA','BUTTON','MAIOR STACK'],'A melhor combinação exposta low recebe a iniciativa.','A melhor mão baixa exposta normalmente age primeiro.','O Button fixo define sempre a ação no Razz.'],
        ['Qual mão vence: 5-4-3-2-A ou 6-4-3-2-A?','5-4-3-2-A',['6-4-3-2-A','EMPATE','DEPENDE DO NAIPE'],'Compara-se pela carta mais alta: 5-high vence 6-high.','5-high vence 6-high no Razz.','6-high vence 5-high no Razz.']
      ],
      seqs:[
        ['Ordene da melhor para a pior mão low.',['5-4-3-2-A','6-4-3-2-A','7-4-3-2-A','8-4-3-2-A']],
        ['Ordene o início do Razz.',['POSTAR ANTE','RECEBER 2 FECHADAS + 1 EXPOSTA','IDENTIFICAR A MAIOR UPCARD','FAZER BRING-IN']],
        ['Ordene uma leitura low.',['REMOVER PARES DA MELHOR COMBINAÇÃO','ESCOLHER 5 VALORES BAIXOS','COMPARAR A CARTA MAIS ALTA','DESEMPATAR PELAS SEGUINTES']],
        ['Ordene as cartas finais.',['QUARTA STREET','QUINTA STREET','SEXTA STREET','SÉTIMA STREET']],
        ['Ordene a decisão sobre cartas vivas.',['OBSERVAR UPCARDS','NOTAR LOW CARDS MORTAS','REAVALIAR CHANCES','DECIDIR A AÇÃO']]
      ]
    },
    'H.O.R.S.E.':{
      sections:[
        ['O QUE É','H.O.R.S.E. é um mixed game em que cinco modalidades se alternam em rotação. Exige adaptação constante de regras e leitura.'],
        ['H — HOLD’EM','Limit Hold’em: duas hole cards, board comunitário e apostas em tamanhos fixos.'],
        ['O — OMAHA HI/LO','Omaha Eight-or-Better: exatamente 2 hole cards + 3 do board; o pote pode ser dividido entre melhor high e low qualificado.'],
        ['R — RAZZ','Seven Card Stud lowball: vence a melhor mão baixa, com A-2-3-4-5 como referência máxima.'],
        ['S — SEVEN CARD STUD','Stud high: cartas próprias abertas e fechadas; melhor mão high de 5 cartas.'],
        ['E — STUD HI/LO','Seven Card Stud Eight-or-Better: o pote pode ser dividido entre high e low qualificado de 8 ou melhor.'],
        ['APOSTAS','H.O.R.S.E. é tradicionalmente jogado em Fixed Limit. A modalidade muda após um período/órbita definido pela estrutura.'],
        ['HABILIDADE CENTRAL','Antes de agir, identifique qual jogo está ativo. Um erro de regra — como esquecer 2+3 no Omaha — é mais grave que uma pequena imprecisão estratégica.']
      ],
      facts:[
        ['O que significa a letra H em H.O.R.S.E.?','HOLD’EM',['HIGH DRAW','HEADS-UP','HILO STUD'],'H representa Hold’em.','A letra H representa Hold’em.','A letra H representa Heads-Up Stud.'],
        ['O que significa a letra O?','OMAHA HI/LO',['OMAHA HIGH APENAS','OPEN FACE','ORIENTAL POKER'],'O é Omaha Hi/Lo, geralmente Eight-or-Better.','A letra O representa Omaha Hi/Lo.','A letra O representa Omaha High apenas.'],
        ['O que significa a letra R?','RAZZ',['RIVER','RING GAME','ROYAL'],'R é Razz.','A letra R representa Razz.','A letra R representa River Hold’em.'],
        ['O que significa a letra S?','SEVEN CARD STUD',['SHORT DECK','SIT & GO','SPLIT DRAW'],'S é Seven Card Stud high.','A letra S representa Seven Card Stud.','A letra S representa Short Deck.'],
        ['O que significa a letra E?','STUD EIGHT-OR-BETTER',['EXOTIC HOLD’EM','EXTRA DRAW','EQUITY GAME'],'E representa Seven Card Stud Hi/Lo Eight-or-Better.','A letra E representa Stud Hi/Lo Eight-or-Better.','A letra E representa um jogo chamado Extra Draw.'],
        ['H.O.R.S.E. é um único jogo com uma regra fixa?','NÃO',['SIM','SÓ EM CASH','SÓ EM TORNEIO'],'É uma rotação de cinco jogos.','H.O.R.S.E. alterna diferentes modalidades.','H.O.R.S.E. mantém Hold’em durante toda a sessão.'],
        ['Qual estrutura de apostas é tradicional no H.O.R.S.E.?','FIXED LIMIT',['NO-LIMIT OBRIGATÓRIO','POT-LIMIT OBRIGATÓRIO','SEM LIMITES'],'A rotação clássica usa Fixed Limit.','H.O.R.S.E. tradicionalmente usa Fixed Limit.','H.O.R.S.E. é obrigatoriamente No-Limit em todos os jogos.'],
        ['No Omaha Hi/Lo do H.O.R.S.E., quantas hole cards devem ser usadas?','EXATAMENTE 2',['1','3','TODAS'],'A regra 2+3 continua valendo.','O Omaha Hi/Lo exige exatamente 2 hole cards.','No Omaha Hi/Lo pode-se jogar apenas o board.'],
        ['O que significa Eight-or-Better no low?','LOW DE 8 OU MENOR QUALIFICA',['PRECISA TER PAR DE 8','SÓ 8 CARTAS','STACK DE 8 BB'],'A mão low precisa ter cinco valores distintos até 8, conforme a regra da variante.','Eight-or-Better define a qualificação da mão low.','Qualquer mão com par de 8 qualifica automaticamente para low.'],
        ['O pote de Omaha Hi/Lo pode ser dividido?','SIM',['NÃO','SÓ ENTRE TRÊS JOGADORES','SÓ NO RIVER'],'High e low qualificado podem dividir o pote.','Omaha Hi/Lo pode gerar split entre high e low.','Omaha Hi/Lo entrega sempre 100% do pote à mão high.'],
        ['O Razz dentro do H.O.R.S.E. é high ou low?','LOW',['HIGH','HI/LO OBRIGATÓRIO','DRAW'],'Razz é lowball.','Razz premia a melhor mão baixa.','Razz premia a maior mão high.'],
        ['Antes de tomar uma decisão, qual informação é crítica?','QUAL JOGO ESTÁ ATIVO',['APENAS O STACK','APENAS O NAIPE','APENAS O BUTTON'],'As regras mudam a cada modalidade da rotação.','É essencial identificar a modalidade ativa.','As regras são idênticas durante toda a rotação.']
      ],
      seqs:[
        ['Ordene a rotação H.O.R.S.E.',['HOLD’EM','OMAHA HI/LO','RAZZ','SEVEN CARD STUD','STUD HI/LO']],
        ['Ordene a checagem antes de agir.',['IDENTIFICAR O JOGO ATIVO','RELEMBRAR A REGRA DE FORMAÇÃO DA MÃO','RELEMBRAR A ORDEM DE AÇÃO','TOMAR A DECISÃO']],
        ['Ordene as letras.',['H','O','R','S','E']],
        ['Ordene uma troca de modalidade.',['ENCERRAR A MÃO/ÓRBITA PREVISTA','ANUNCIAR/INDICAR NOVO JOGO','AJUSTAR REGRAS E LIMITES','INICIAR A NOVA MODALIDADE']],
        ['Ordene a avaliação de um jogo split-pot.',['FORMAR A MÃO HIGH','VERIFICAR SE HÁ LOW QUALIFICADO','DETERMINAR VENCEDOR HIGH','DETERMINAR VENCEDOR LOW','DIVIDIR O POTE QUANDO APLICÁVEL']]
      ]
    },
    'Poker Caribenho':{
      sections:[
        ['O QUE É','Caribbean Stud Poker é um jogo de cassino inspirado no poker. Cada jogador compete contra a mão da casa/dealer, e não contra os outros jogadores.'],
        ['DISTRIBUIÇÃO','Jogador e dealer recebem 5 cartas. Normalmente as cartas do jogador ficam fechadas para os demais; uma carta do dealer pode ficar exposta, conforme a regra da mesa.'],
        ['ANTE','A mão começa com uma aposta Ante. Depois de ver suas 5 cartas, o jogador decide desistir ou continuar.'],
        ['RAISE','Para continuar, a regra clássica exige uma aposta Raise adicional, frequentemente igual a 2× o Ante. A mesa deve sempre ser consultada porque procedimentos e limites podem variar.'],
        ['QUALIFICAÇÃO DO DEALER','Na forma clássica, o dealer precisa de A-K ou melhor para qualificar. Se não qualificar, o tratamento de Ante e Raise segue a tabela da casa.'],
        ['COMPARAÇÃO','Quando o dealer qualifica, as mãos são comparadas pela hierarquia tradicional de poker.'],
        ['PAGAMENTOS','Pagamentos de Ante, Raise, bônus e jackpot variam entre cassinos. O app não fixa paytable: sempre vale a tabela exposta na mesa.'],
        ['DIFERENÇA ESSENCIAL','Não há bluff contra outros jogadores nem pote disputado coletivamente. A decisão é matemática contra a mão da casa e a tabela de pagamento.']
      ],
      facts:[
        ['Contra quem o jogador compete no Poker Caribenho?','DEALER / CASA',['OUTROS JOGADORES','BUTTON','BIG BLIND'],'É um jogo de cassino contra a casa.','No Caribbean Stud o jogador enfrenta o dealer.','No Caribbean Stud os jogadores disputam um pote entre si.'],
        ['Quantas cartas o jogador recebe normalmente?','5',['2','4','7'],'A modalidade clássica distribui cinco cartas.','O jogador normalmente recebe 5 cartas.','O jogador recebe apenas 2 hole cards.'],
        ['Qual aposta inicia a mão?','ANTE',['BIG BLIND','STRADDLE','3-BET'],'A entrada padrão é o Ante.','A mão começa com uma aposta Ante.','A mão começa obrigatoriamente com Small Blind e Big Blind.'],
        ['Depois de ver as cartas, quais decisões básicas existem?','FOLD OU RAISE',['CHECK OU FLOP','DRAW OU TURN','STRADDLE OU MUCK'],'O jogador abandona ou continua com a aposta adicional.','Após ver a mão, o jogador decide fold ou raise.','O jogador pode pedir um flop comunitário.'],
        ['Na regra clássica, o Raise costuma ser de quanto em relação ao Ante?','2× O ANTE',['METADE DO ANTE','10× O ANTE SEMPRE','1 BB'],'O padrão clássico usa Raise de duas vezes o Ante, mas a mesa prevalece.','O Raise clássico costuma ser 2× o Ante.','O Raise clássico é sempre igual a metade do Ante.'],
        ['Na forma clássica, qual mão mínima costuma qualificar o dealer?','A-K',['PAR DE ASES','Q-J','10-9'],'A-K high ou melhor é a qualificação clássica.','O dealer clássico qualifica com A-K ou melhor.','O dealer precisa sempre de pelo menos um par para qualificar.'],
        ['Existe board comunitário?','NÃO',['SIM','SÓ FLOP','SÓ RIVER'],'Cada lado recebe uma mão de cinco cartas.','Caribbean Stud não utiliza board comunitário.','Caribbean Stud usa Flop, Turn e River.'],
        ['O jogador pode blefar outro jogador?','NÃO',['SIM','SÓ O BUTTON','SÓ EM HEADS-UP'],'A competição é contra a casa.','Não há bluff contra adversários humanos no formato clássico.','O objetivo principal é fazer outros jogadores foldarem.'],
        ['A paytable é universal em todos os cassinos?','NÃO',['SIM','SÓ O ANTE MUDA','SÓ O JACKPOT MUDA'],'Pagamentos e bônus podem variar por casa.','A tabela de pagamentos deve ser conferida na mesa.','A paytable é obrigatoriamente idêntica em todo cassino.'],
        ['Quando o dealer qualifica, como as mãos são comparadas?','HIERARQUIA TRADICIONAL DE POKER',['PELO STACK','PELO NAIPE MAIS ALTO','PELO VALOR DO ANTE'],'A comparação segue a força das mãos.','Quando há qualificação, usa-se a hierarquia tradicional de poker.','Quem apostou mais vence independentemente das cartas.'],
        ['Há pote coletivo disputado entre jogadores?','NÃO',['SIM','SÓ NO JACKPOT','SÓ EM TORNEIO'],'Cada aposta é resolvida contra a casa.','Não existe pote coletivo entre jogadores no formato clássico.','Todos os jogadores disputam entre si o mesmo pote.'],
        ['Qual regra prevalece sobre qualificação e pagamentos?','A REGRA / PAYTABLE DA CASA',['UMA TABELA UNIVERSAL','A ESCOLHA DO JOGADOR','A REGRA DO HOLD’EM'],'Cassinos podem adotar detalhes diferentes.','A regra e a paytable expostas pela casa prevalecem.','O jogador pode escolher livremente a paytable.']
      ],
      seqs:[
        ['Ordene o fluxo básico do Caribbean Stud.',['FAZER ANTE','RECEBER 5 CARTAS','ANALISAR A MÃO','FOLD OU RAISE','DEALER REVELA / QUALIFICA','RESOLVER PAGAMENTOS']],
        ['Ordene a decisão do jogador.',['VER AS 5 CARTAS','AVALIAR FORÇA','CONSIDERAR A CARTA/REGRA DO DEALER','FOLD OU RAISE']],
        ['Ordene a resolução quando continua.',['COLOCAR RAISE','DEALER ABRIR A MÃO','VERIFICAR QUALIFICAÇÃO','COMPARAR MÃOS SE APLICÁVEL','PAGAR/RECOLHER CONFORME PAYTABLE']],
        ['Ordene a checagem da mesa.',['LER REGRA DE QUALIFICAÇÃO','LER VALOR DO RAISE','LER PAYTABLE','SÓ ENTÃO APOSTAR']],
        ['Ordene a comparação.',['VERIFICAR SE DEALER QUALIFICA','CLASSIFICAR MÃO DO JOGADOR','CLASSIFICAR MÃO DO DEALER','APLICAR PAYTABLE DA CASA']]
      ]
    },
    'Outras modalidades':{
      sections:[
        ['SHORT DECK / 6+ HOLD’EM','Usa baralho reduzido, normalmente retirando 2, 3, 4 e 5. A hierarquia de algumas mãos pode mudar conforme a regra da casa; confirme sempre antes de jogar.'],
        ['OMAHA HI/LO 8-OR-BETTER','O pote pode ser dividido entre high e low qualificado. Continua obrigatório usar exatamente 2 hole cards e 3 do board para cada lado da mão.'],
        ['2-7 TRIPLE DRAW','Lowball com três fases de troca. A melhor mão é 7-5-4-3-2 sem flush; Ás é alto e sequências/flushes contam contra você.'],
        ['BADUGI','Lowball de quatro cartas que busca quatro valores e quatro naipes diferentes, sem pares. Mãos de quatro cartas completas superam mãos incompletas.'],
        ['PINEAPPLE / CRAZY PINEAPPLE','Jogadores recebem 3 hole cards e descartam uma. O momento do descarte muda conforme a variante. Depois, a lógica se aproxima do Hold’em.'],
        ['2-7 SINGLE DRAW','Lowball com uma única troca, frequentemente jogado No-Limit. A força da mão segue a lógica 2-7: 7-5-4-3-2 é a referência máxima.'],
        ['MIXED GAMES','Mesas de mixed games alternam modalidades. O primeiro passo é identificar exatamente qual jogo e qual estrutura de apostas estão ativos.'],
        ['REGRA DE OURO','Variantes menos comuns possuem muitas regras locais. Antes da primeira mão, confirme deck, formação da mão, estrutura de apostas, qualificação low e hierarquia.']
      ],
      facts:[
        ['O Short Deck usa um baralho reduzido?','SIM',['NÃO','SÓ NO RIVER','SÓ EM TORNEIO'],'Cartas baixas são removidas na forma comum da variante.','Short Deck utiliza um baralho reduzido.','Short Deck utiliza dois baralhos completos.'],
        ['A hierarquia de mãos do Short Deck é universal em toda casa?','NÃO',['SIM','SÓ MUDA O PAR','NUNCA MUDA'],'Casas podem adotar diferenças como Flush versus Full House.','É preciso confirmar a hierarquia específica do Short Deck.','Toda mesa de Short Deck usa obrigatoriamente a mesma hierarquia.'],
        ['No Omaha Hi/Lo, qual regra de hole cards continua valendo?','EXATAMENTE 2',['1','3','TODAS'],'Omaha sempre usa exatamente duas hole cards.','Omaha Hi/Lo exige exatamente 2 hole cards.','Omaha Hi/Lo permite jogar apenas o board.'],
        ['Qual é a mão de referência máxima no 2-7 lowball?','7-5-4-3-2',['A-2-3-4-5','ROYAL FLUSH','2-3-4-5-6'],'Em 2-7, A é alto e straight/flush prejudicam.','7-5-4-3-2 é a melhor mão clássica de 2-7.','A-2-3-4-5 é a melhor mão de 2-7.'],
        ['No 2-7, o Ás é baixo?','NÃO',['SIM','SÓ NO DRAW FINAL','SÓ EM BADUGI'],'O Ás é alto no 2-7.','No 2-7 lowball o Ás conta alto.','No 2-7 o Ás é sempre a menor carta.'],
        ['Straights e flushes prejudicam no 2-7?','SIM',['NÃO','SÓ FLUSH','SÓ STRAIGHT'],'Diferente do Razz, sequências e flushes contam contra a mão.','No 2-7, straights e flushes prejudicam.','No 2-7, straights e flushes são ignorados.'],
        ['Quantas cartas formam um Badugi completo?','4',['5','2','7'],'Badugi busca quatro cartas de valores e naipes diferentes.','Um Badugi completo possui 4 cartas.','Badugi exige cinco cartas para ser completo.'],
        ['Um Badugi completo quer repetir naipes?','NÃO',['SIM','SÓ ESPADAS','SÓ COPAS'],'O objetivo é ter quatro naipes diferentes.','Badugi busca quatro naipes diferentes.','Badugi exige que todas as cartas sejam do mesmo naipe.'],
        ['Pineapple normalmente distribui quantas hole cards inicialmente?','3',['2','4','5'],'A variante começa com três cartas próprias e exige descarte.','Pineapple começa com 3 hole cards.','Pineapple começa exatamente como Hold’em com 2 cartas.'],
        ['Crazy Pineapple se diferencia pelo momento de quê?','DESCARTE',['ANTE','SHOWDOWN','CHIP RACE'],'A diferença central é quando a terceira hole card é descartada.','O momento do descarte diferencia variantes Pineapple.','Crazy Pineapple não possui descarte.'],
        ['2-7 Triple Draw possui quantas fases de troca?','3',['1','2','5'],'Triple Draw, como o nome indica, oferece três draws.','2-7 Triple Draw possui três fases de troca.','2-7 Triple Draw possui apenas uma troca.'],
        ['Em mixed games, qual é a primeira checagem essencial?','QUAL MODALIDADE ESTÁ ATIVA',['QUAL O NAIPE DO DEALER','QUAL O CELULAR DO FLOOR','QUAL A COR DA MESA'],'Cada modalidade muda regras e estrutura.','Em mixed games, identifique primeiro o jogo ativo.','Em mixed games as regras são iguais em toda a rotação.']
      ],
      seqs:[
        ['Ordene a lógica antes de entrar numa variante nova.',['IDENTIFICAR A MODALIDADE','CONFIRMAR FORMAÇÃO DA MÃO','CONFIRMAR ESTRUTURA DE APOSTAS','CONFIRMAR REGRAS LOCAIS','COMEÇAR A JOGAR']],
        ['Ordene a referência 2-7 da melhor para mãos piores próximas.',['7-5-4-3-2','7-6-4-3-2','8-5-4-3-2','9-5-4-3-2']],
        ['Ordene o Pineapple básico.',['RECEBER 3 HOLE CARDS','AVALIAR AS 3','DESCARTAR 1 NO MOMENTO DA VARIANTE','CONTINUAR COM 2']],
        ['Ordene o Triple Draw conceitualmente.',['PRIMEIRO DRAW','SEGUNDO DRAW','TERCEIRO DRAW','SHOWDOWN APÓS APOSTAS FINAIS']],
        ['Ordene a construção de um Badugi.',['EVITAR PARES','EVITAR NAIPE REPETIDO','BUSCAR 4 CARTAS VÁLIDAS','COMPARAR PELA MAIOR CARTA LOW']]
      ]
    }
  };

  const alias={'5 & 7 Card Stud':'5 & 7 Card Stud'};
  const STORAGE='stackup-modalities-progress-v1';
  const runtimes={};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};
  const seeded=(a,t)=>{let s=0;for(const c of t)s=(s*31+c.charCodeAt(0))>>>0;const x=[...a];for(let i=x.length-1;i>0;i--){s=(1664525*s+1013904223)>>>0;const j=s%(i+1);[x[i],x[j]]=[x[j],x[i]];}return x;};

  function addStyles(){if(document.getElementById('stackup-modalities-style'))return;const st=document.createElement('style');st.id='stackup-modalities-style';st.textContent=`
    .m2-grid{display:grid;gap:12px}.m2-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}.m2-card h3{margin:0 0 7px;font-size:var(--type-card-title,21px);color:var(--gd,#08372d);text-transform:uppercase}.m2-card p{margin:0;color:var(--m,#725f4d);font-size:var(--type-body,16px);line-height:1.5}.m2-card strong{color:var(--ink,#25170f)}
    .m2-training{margin-top:20px;border:2px solid var(--gold,#d4aa58);border-radius:20px;overflow:hidden;background:var(--b2,#2a160d);box-shadow:0 12px 28px #0003;color:var(--w,#f8f0df)}.m2-head{padding:17px 16px 14px;background:linear-gradient(180deg,#2f1a10,#211008);border-bottom:1px solid #d4aa5850}.m2-kicker{display:block;color:var(--gold,#d4aa58);font-size:var(--type-meta,12px);letter-spacing:.09em;text-transform:uppercase;margin-bottom:3px}.m2-head h3{margin:0;color:var(--w,#f8f0df);font-size:var(--type-section,24px);line-height:1.08;text-transform:uppercase}.m2-head p{margin:7px 0 0;color:#cfbda7;font-size:var(--type-small,14px);line-height:1.45}.m2-modes{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.m2-mode{padding:5px 8px;border:1px solid #d4aa5866;border-radius:9px;color:#d8c6ad;font-size:var(--type-micro,11px);background:#211008}
    .m2-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin:11px 12px;border:1px solid #d4aa5860;border-radius:14px;overflow:hidden;background:#2a160d}.m2-stat{min-height:68px;padding:9px 5px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.m2-stat+.m2-stat{border-left:1px solid #d4aa5840}.m2-stat span{font-size:var(--type-micro,11px);color:#d8c6ad}.m2-stat strong{font-size:var(--type-question,18px);color:var(--gold,#d4aa58);margin-top:5px}
    .m2-body{padding:14px}.m2-spot{background:var(--c,#f2ead8);border:1px solid var(--gold2,#a87c32);border-radius:17px;color:var(--ink,#25170f);overflow:hidden}.m2-spotbar{display:flex;justify-content:space-between;gap:8px;padding:9px 11px;background:#e7dcc2;border-bottom:1px solid #a87c3244}.m2-spotbar span{font-size:var(--type-meta,12px);color:#725f4d}.m2-type{padding:5px 7px;border-radius:8px;background:#211008!important;color:#d4aa58!important}.m2-question{padding:15px 14px 10px;font-size:var(--type-question,18px);line-height:1.42}.m2-options{display:grid;gap:8px;padding:4px 12px 14px}.m2-option{width:100%;min-height:46px;border:1px solid #a87c3266;border-radius:12px;background:#f8f0df;color:#25170f;text-align:left;padding:10px 12px;font:inherit;font-size:var(--type-body,16px);cursor:pointer}.m2-option.picked{border:2px solid #725f4d;background:#eadfc8}.m2-option.correct{border:2px solid #0e4b3b;background:#dce9df;color:#08372d}.m2-option.wrong{border:2px solid #a87c32;background:#ead8c5}.m2-seqnum{display:inline-grid;place-items:center;width:25px;height:25px;border-radius:8px;background:#211008;color:#d4aa58;margin-right:8px;font-size:var(--type-meta,12px)}
    .m2-visual{margin:12px;padding:12px;border-radius:14px;background:#211008;color:#f8f0df;border:1px solid #d4aa5860}.m2-visual-label{text-align:center;color:#d4aa58;font-size:var(--type-micro,11px);letter-spacing:.06em;margin-bottom:9px}.m2-cards{display:flex;justify-content:center;gap:5px;flex-wrap:wrap}.m2-pc{width:42px;height:58px;border-radius:8px;background:#fffdf7;border:1px solid #d7c8a5;display:grid;place-items:center;font-family:Arial,sans-serif;font-weight:800;font-size:17px;color:#17120f}.m2-pc.red{color:#a32929}.m2-flow{display:flex;gap:6px;overflow-x:auto}.m2-chip{min-width:78px;padding:9px 7px;border-radius:10px;border:1px solid #d4aa5840;background:#2a160d;text-align:center;font-size:12px;color:#d8c6ad}.m2-chip.on{background:#0e4b3b;color:#f8f0df;border-color:#d4aa58}
    .m2-feedback{margin:0 12px 14px;border-radius:13px;border:1px solid #a87c3260;overflow:hidden;background:#f4ecd9}.m2-result{padding:10px 12px;font-size:var(--type-body,16px);text-transform:uppercase}.m2-result.ok{background:#0e4b3b;color:#f8f0df}.m2-result.no{background:#211008;color:#d4aa58}.m2-analysis{padding:11px 12px;color:#725f4d;font-size:var(--type-small,14px);line-height:1.45}.m2-analysis strong{color:#25170f}.m2-nav{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-top:11px}.m2-btn{min-height:43px;border:1px solid #d4aa5866;border-radius:12px;background:#211008;color:#d4aa58;font:inherit;font-size:var(--type-meta,12px);padding:8px;cursor:pointer}.m2-btn.primary{background:#0e4b3b;color:#f8f0df;border-color:#d4aa58}.m2-btn:disabled{opacity:.38}.m2-complete{margin-top:10px;padding:10px 12px;border-radius:12px;background:#0e4b3b;color:#f8f0df;font-size:var(--type-small,14px);text-align:center}
  `;document.head.appendChild(st);}

  function buildBank(name){const d=LESSONS[name],out=[];if(!d)return out;for(let i=0;i<17;i++){const f=d.facts[i%d.facts.length];out.push({id:`M2-${slug(name)}-C${i+1}`,type:'choice',prompt:f[0],options:[f[1],...f[2]],answer:f[1],analysis:f[3],visual:i});}for(let i=0;i<17;i++){const f=d.facts[i%d.facts.length],truth=i%2===0;out.push({id:`M2-${slug(name)}-B${i+1}`,type:'binary',prompt:truth?f[4]:f[5],options:['CORRETO','INCORRETO'],answer:truth?'CORRETO':'INCORRETO',analysis:f[3],visual:i+17});}for(let i=0;i<16;i++){const q=d.seqs[i%d.seqs.length];out.push({id:`M2-${slug(name)}-S${i+1}`,type:'sequence',prompt:q[0],items:q[1],answer:q[1],analysis:'A ordem correta representa o fluxo procedural desta modalidade. Leia cada etapa e conecte-a à regra do jogo.',visual:i+34});}return out;}
  const BANK={};Object.keys(LESSONS).forEach(k=>BANK[k]=buildBank(k));window.StackupModalitiesSpotBank=BANK;window.StackupModalitiesMeta={version:1,lessons:Object.keys(BANK).length,spotsPerLesson:50,totalSpots:Object.keys(BANK).length*50,interactionTypes:['choice','binary','sequence']};
  function slug(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'').toUpperCase();}
  function read(){try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')||{};}catch(_){return {};}}function write(x){try{localStorage.setItem(STORAGE,JSON.stringify(x));}catch(_){}}
  function progress(n){return read()[n]||{answers:{}};}function save(n,s,sel,ok){const all=read(),p=all[n]||{answers:{}};const old=p.answers[s.id];p.answers[s.id]={selected:sel,correct:ok,attempts:(old?.attempts||0)+1};all[n]=p;write(all);}
  function stats(n){const a=Object.values(progress(n).answers||{}),r=a.length,c=a.filter(x=>x.correct).length;return{r,c,cp:r?Math.round(c/r*100):0,rp:Math.round(r/50*100)};}
  function runtime(n){if(!runtimes[n])runtimes[n]={q:queue(n),history:[],cursor:-1,redo:false,seq:[]};return runtimes[n];}function queue(n){const a=progress(n).answers||{},spots=BANK[n]||[];return[...shuffle(spots.filter(s=>!a[s.id])),...shuffle(spots.filter(s=>a[s.id]))];}
  function next(rt,n){if(rt.cursor<rt.history.length-1){rt.cursor++;rt.redo=false;rt.seq=[];return;}let s=rt.q.shift();if(!s){rt.q=shuffle(BANK[n]);s=rt.q.shift();}rt.history.push(s.id);rt.cursor=rt.history.length-1;rt.redo=false;rt.seq=[];}function current(rt,n){return BANK[n].find(s=>s.id===rt.history[rt.cursor]);}
  function visual(name,i){const sets={
    "Texas Hold'em":['A♠','K♠','Q♠','J♠','10♠'],
    'Poker de 5 cartas':['A♣','A♦','7♠','4♥','2♣'],
    'PLO 4 / PLO 5 / PLO 6':['A♠','K♠','9♦','8♦','Q♠','J♠','10♠'],
    '5 & 7 Card Stud':['🂠','🂠','K♣','9♦','7♠','5♥','🂠'],
    'Razz':['A♣','2♦','3♠','4♥','5♣'],
    'H.O.R.S.E.':['H','O','R','S','E'],
    'Poker Caribenho':['PLAYER','5 CARTAS','×','DEALER','5 CARTAS'],
    'Outras modalidades':['SHORT DECK','2-7','BADUGI','PINEAPPLE']
  };const a=sets[name]||[];if(name==='H.O.R.S.E.'||name==='Poker Caribenho'||name==='Outras modalidades')return `<div class="m2-visual"><div class="m2-visual-label">LEITURA VISUAL DA MODALIDADE</div><div class="m2-flow">${a.map((x,j)=>`<div class="m2-chip ${j===i%a.length?'on':''}">${esc(x)}</div>`).join('')}</div></div>`;return `<div class="m2-visual"><div class="m2-visual-label">RECONHEÇA A ESTRUTURA VISUAL</div><div class="m2-cards">${a.map(x=>`<span class="m2-pc ${/[♥♦]/.test(x)?'red':''}">${esc(x)}</span>`).join('')}</div></div>`;}
  function feedback(s,a){const sel=Array.isArray(a.selected)?a.selected.join(' → '):a.selected,ans=Array.isArray(s.answer)?s.answer.join(' → '):s.answer;return `<div class="m2-feedback"><div class="m2-result ${a.correct?'ok':'no'}">${a.correct?'✓ RESULTADO: ACERTO':'✕ RESULTADO: REVISAR'}</div><div class="m2-analysis"><strong>SUA RESPOSTA:</strong> ${esc(sel)}<br><strong>RESPOSTA CORRETA:</strong> ${esc(ans)}<br><br><strong>ANÁLISE:</strong> ${esc(s.analysis)}</div></div>`;}
  function renderTraining(shell,n){const rt=runtime(n);if(rt.cursor<0)next(rt,n);const s=current(rt,n),p=progress(n).answers||{},saved=p[s.id],locked=!!saved&&!rt.redo,st=stats(n);let opts='';if(s.type==='choice'||s.type==='binary'){opts=seeded(s.options,s.id).map(o=>{let c='m2-option';if(locked){if(o===s.answer)c+=' correct';if(saved.selected===o&&o!==s.answer)c+=' wrong';if(saved.selected===o)c+=' picked';}return `<button class="${c}" data-m2-answer="${esc(o)}" ${locked?'disabled':''}>${esc(o)}</button>`;}).join('');}else{const items=seeded(s.items,s.id),sel=locked?(Array.isArray(saved.selected)?saved.selected:[]):rt.seq;opts=items.map(o=>{const x=sel.indexOf(o);return `<button class="m2-option ${x>=0?'picked':''}" data-m2-seq="${esc(o)}" ${locked?'disabled':''}>${x>=0?`<span class="m2-seqnum">${x+1}</span>`:''}${esc(o)}</button>`;}).join('');}
    const pos=BANK[n].findIndex(x=>x.id===s.id)+1;shell.innerHTML=`<div class="m2-head"><span class="m2-kicker">PRÁTICA INTERATIVA · 50 SPOTS</span><h3>TREINE ESTA MODALIDADE</h3><p>Reconheça regras, estrutura, formação de mãos, ordem de ação e procedimentos. Os spots ainda não realizados têm prioridade.</p><div class="m2-modes"><span class="m2-mode">ESCOLHA</span><span class="m2-mode">CERTO / ERRADO</span><span class="m2-mode">ORDEM</span></div></div><div class="m2-stats"><div class="m2-stat"><span>CERTOS</span><strong>${st.c} · ${st.cp}%</strong></div><div class="m2-stat"><span>REALIZADOS</span><strong>${st.r} · ${st.rp}%</strong></div><div class="m2-stat"><span>TOTAL</span><strong>50 · 100%</strong></div></div><div class="m2-body"><div class="m2-spot"><div class="m2-spotbar"><span>SPOT ${String(pos).padStart(2,'0')} / 50</span><span class="m2-type">${s.type==='choice'?'ESCOLHA':s.type==='binary'?'CERTO / ERRADO':'COLOQUE EM ORDEM'}</span></div>${visual(n,s.visual)}<div class="m2-question">${esc(s.prompt)}</div><div class="m2-options">${opts}</div>${locked?feedback(s,saved):''}</div><div class="m2-nav"><button class="m2-btn" data-m2-prev ${rt.cursor<=0?'disabled':''}>‹ ANTERIOR</button><button class="m2-btn" data-m2-redo ${!saved?'disabled':''}>↻ REFAZER</button><button class="m2-btn primary" data-m2-next>PRÓXIMO ›</button></div>${st.r===50?'<div class="m2-complete">MODALIDADE TREINADA: 50/50 SPOTS REALIZADOS. Continue em PRÓXIMO para revisar em nova ordem.</div>':''}</div>`;bind(shell,n);}
  function grade(shell,n,s,sel){const ok=Array.isArray(s.answer)?Array.isArray(sel)&&s.answer.length===sel.length&&s.answer.every((v,i)=>v===sel[i]):sel===s.answer;save(n,s,sel,ok);const rt=runtime(n);rt.redo=false;rt.seq=[];renderTraining(shell,n);}
  function bind(shell,n){const rt=runtime(n),s=current(rt,n);shell.querySelectorAll('[data-m2-answer]').forEach(b=>b.onclick=()=>grade(shell,n,s,b.dataset.m2Answer));shell.querySelectorAll('[data-m2-seq]').forEach(b=>b.onclick=()=>{const v=b.dataset.m2Seq,x=rt.seq.indexOf(v);if(x>=0)rt.seq.splice(x,1);else rt.seq.push(v);if(rt.seq.length===s.answer.length)grade(shell,n,s,[...rt.seq]);else renderTraining(shell,n);});const p=shell.querySelector('[data-m2-prev]');if(p)p.onclick=()=>{if(rt.cursor>0){rt.cursor--;rt.redo=false;rt.seq=[];renderTraining(shell,n);}};const r=shell.querySelector('[data-m2-redo]');if(r)r.onclick=()=>{rt.redo=true;rt.seq=[];renderTraining(shell,n);};const nx=shell.querySelector('[data-m2-next]');if(nx)nx.onclick=()=>{next(rt,n);renderTraining(shell,n);shell.scrollIntoView({behavior:'smooth',block:'start'});};}
  function renderTheory(n,lesson){const d=LESSONS[n];if(!d)return;const blocks=lesson.querySelector('.blocks');if(blocks&&blocks.dataset.m2!=='1'){blocks.dataset.m2='1';blocks.innerHTML=`<div class="m2-grid">${d.sections.map(x=>`<div class="m2-card"><h3>${esc(x[0])}</h3><p>${x[1]}</p></div>`).join('')}</div>`;}let shell=lesson.querySelector(':scope > .m2-training');if(!shell){shell=document.createElement('section');shell.className='m2-training';lesson.appendChild(shell);renderTraining(shell,n);}}
  function apply(){addStyles();const lesson=document.querySelector('.card.lesson');if(!lesson)return;const h=lesson.querySelector('h2');const n=h?.textContent?.trim();if(LESSONS[n])renderTheory(n,lesson);}
  const root=document.getElementById('root');if(root){new MutationObserver(()=>queueMicrotask(apply)).observe(root,{childList:true});}apply();
})();