(() => {
  const STYLE_ID='stackup-other-rules-style';
  const PROGRESS_KEY='stackup-fundamentals-progress-v1';
  const OLD_RULES='OUTRAS REGRAS BÁSICAS';
  const RULES='REGRAS BÁSICAS';
  const SHUFFLE='EMBARALHANDO AS CARTAS';
  const MISDEAL='MISDEAL';

  function mergeCurriculum(){
    try{
      if(typeof D!=='undefined'&&D?.fundamentos?.i){
        const items=D.fundamentos.i;
        if(!items.some(x=>String(x[0]).toUpperCase()===RULES)){
          const merged=[];
          for(const item of items){
            const title=String(item[0]).toUpperCase();
            if(title===SHUFFLE||title===MISDEAL) continue;
            if(title===OLD_RULES){
              merged.push(['Regras básicas','Embaralhamento, misdeal, showdown, muck, ação verbal, fichas e situações comuns.']);
            }else merged.push(item);
          }
          D.fundamentos.i=merged;
        }
      }
      if(typeof L!=='undefined'){
        const base=L['Outras regras básicas']||[['REGRAS','Procedimentos essenciais para manter o jogo correto e organizado.']];
        L['Regras básicas']=base;
      }
    }catch(_){ }
  }

  function migrateProgress(){
    try{
      const data=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};
      const current=data[RULES]||{answers:{}};
      current.answers={
        ...(data[OLD_RULES]?.answers||{}),
        ...(data[SHUFFLE]?.answers||{}),
        ...(data[MISDEAL]?.answers||{}),
        ...(current.answers||{})
      };
      data[RULES]=current;
      delete data[OLD_RULES];
      delete data[SHUFFLE];
      delete data[MISDEAL];
      localStorage.setItem(PROGRESS_KEY,JSON.stringify(data));
    }catch(_){ }
  }

  function mergeBank(bank){
    if(!bank||typeof bank!=='object') return bank;
    const rules=bank[RULES]||bank[OLD_RULES]||[];
    const shuffle=bank[SHUFFLE]||[];
    const misdeal=bank[MISDEAL]||[];
    if(rules.length||shuffle.length||misdeal.length){
      bank[RULES]=[...rules,...shuffle,...misdeal];
      delete bank[OLD_RULES];
      delete bank[SHUFFLE];
      delete bank[MISDEAL];
    }
    return bank;
  }

  function interceptBank(){
    try{
      if(window.StackupFundamentalsSpotBank){
        window.StackupFundamentalsSpotBank=mergeBank(window.StackupFundamentalsSpotBank);
        return;
      }
      let value;
      Object.defineProperty(window,'StackupFundamentalsSpotBank',{
        configurable:true,
        enumerable:true,
        get(){return value;},
        set(next){value=mergeBank(next);}
      });
    }catch(_){ }
  }

  function refreshCurrentScreen(){
    try{
      const state=history.state;
      if(state?.type==='home'&&typeof home==='function') home();
      else if(state?.type==='stage'&&state.stage==='fundamentos'&&typeof stage==='function') stage('fundamentos');
      else if(state?.type==='lesson'&&state.stage==='fundamentos'){
        const title=document.querySelector('.card.lesson h2')?.textContent.trim().toUpperCase();
        if(title===SHUFFLE||title===MISDEAL||title===OLD_RULES) stage('fundamentos');
      }
    }catch(_){ }
  }

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .rules-grid{display:grid;gap:12px}
      .rules-section-title{margin:8px 0 0;padding:12px 14px;border-radius:14px;background:#211008;color:#d4aa58;border:1px solid #d4aa58;font-size:22px;line-height:1.05;text-transform:uppercase;text-align:center}
      .rules-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .rules-card h3{margin:0 0 8px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .rules-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .rules-card p+p{margin-top:8px}.rules-card strong{color:var(--ink,#25170f)}
      .rules-example{margin-top:9px;padding:10px 12px;border-radius:12px;background:#211008;color:#d8c6ad;border:1px solid #d4aa58;font-size:15px;line-height:1.45}
      .rules-example strong{color:#d4aa58}
      .rules-note{background:#e6d8b9;border-color:#c99539}
      .rules-alert{background:#ead8c5;border-color:#a86b3c}
      .rules-steps{display:grid;gap:8px;margin-top:9px}
      .rules-step{display:flex;gap:10px;align-items:flex-start;padding:10px 11px;border-radius:13px;background:#f4ecd9;border:1px solid #a87c3255;color:#725f4d;font-size:15px;line-height:1.4}
      .rules-n{width:28px;height:28px;flex:none;border-radius:9px;background:#211008;color:#d4aa58;display:grid;place-items:center;font-size:14px}
      @media(max-width:390px){.rules-section-title{font-size:20px}.rules-card h3{font-size:19px}.rules-card p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  const shuffling=`
      <div class="rules-section-title">EMBARALHANDO AS CARTAS</div>
      <div class="rules-card"><h3>OBJETIVO DO EMBARALHAMENTO</h3><p>O dealer precisa deixar a ordem das 52 cartas <strong>imprevisível</strong> antes de cada mão. Um embaralhamento correto protege a integridade do jogo e reduz a possibilidade de prever quais cartas serão distribuídas.</p></div>
      <div class="rules-card"><h3>QUEM EMBARALHA?</h3><p>Em mesas profissionais, o <strong>dealer ou crupiê</strong> é responsável por preparar o baralho. Em alguns cassinos existe uma máquina automática de embaralhamento, mas o dealer continua responsável por conferir o baralho, realizar o corte quando previsto e iniciar a distribuição corretamente.</p></div>
      <div class="rules-card"><h3>SEQUÊNCIA BÁSICA DO DEALER</h3><div class="rules-steps"><div class="rules-step"><span class="rules-n">01</span><span><strong>RECOLHER:</strong> juntar todas as cartas da mão anterior e manter o baralho completo sob controle.</span></div><div class="rules-step"><span class="rules-n">02</span><span><strong>MISTURAR:</strong> realizar a sequência de embaralhamento usada pela casa, combinando técnicas para quebrar a ordem anterior das cartas.</span></div><div class="rules-step"><span class="rules-n">03</span><span><strong>QUADRAR:</strong> alinhar o baralho em um único bloco, sem deixar cartas expostas.</span></div><div class="rules-step"><span class="rules-n">04</span><span><strong>CORTAR:</strong> quando a regra da casa prevê corte, dividir o baralho com a cut card e recompor as duas partes sem revelar cartas.</span></div><div class="rules-step"><span class="rules-n">05</span><span><strong>DISTRIBUIR:</strong> iniciar o deal a partir da posição correta e entregar as cartas na ordem determinada pela modalidade.</span></div></div></div>
      <div class="rules-card"><h3>RIFFLE SHUFFLE</h3><p>No <strong>riffle shuffle</strong>, o baralho é dividido aproximadamente em duas metades e as cartas das duas partes são intercaladas. É uma das técnicas mais usadas para randomizar o baralho.</p><p>O movimento deve manter as faces das cartas protegidas e nunca permitir que o dealer ou jogadores vejam cartas durante o processo.</p></div>
      <div class="rules-card"><h3>STRIP SHUFFLE</h3><p>No <strong>strip shuffle</strong>, pequenos grupos de cartas são retirados sucessivamente de uma parte do baralho e colocados sobre a outra. Ele ajuda a quebrar blocos de cartas que poderiam permanecer juntos depois de outros tipos de embaralhamento.</p></div>
      <div class="rules-card"><h3>SCRAMBLE OU WASH</h3><p>O <strong>wash</strong>, também chamado de scramble, é a mistura das cartas abertas para baixo sobre a mesa, movimentando-as em várias direções antes de reuni-las novamente. É comum em determinadas situações, como na abertura de uma mesa ou após a necessidade de uma randomização mais ampla, conforme o procedimento da casa.</p></div>
      <div class="rules-card"><h3>CUT CARD</h3><p>A <strong>cut card</strong> é uma carta plástica opaca usada para realizar ou proteger o corte e para impedir que a última carta do baralho fique visível. Ela não faz parte das 52 cartas de jogo.</p></div>
      <div class="rules-card"><h3>DISTRIBUIÇÃO NO HOLD'EM</h3><p>Depois que blinds e antes estão posicionados e o baralho está preparado, o dealer distribui <strong>uma carta por vez</strong> para cada jogador, repetindo a volta até que cada participante ativo tenha duas cartas fechadas. Em uma mesa normal, a distribuição começa no jogador à esquerda do Button e segue em sentido horário.</p></div>
      <div class="rules-card rules-note"><h3>SEGURANÇA DO BARALHO</h3><p>Durante todo o processo, as cartas devem permanecer protegidas. O dealer evita expor faces, mantém o baralho dentro da área de controle da mesa e segue o procedimento padronizado da casa. Se uma carta for exposta ou houver erro relevante na distribuição, aplicam-se as regras de <strong>misdeal</strong> ou de carta exposta conforme a situação.</p></div>`;

  const misdeal=`
      <div class="rules-section-title">MISDEAL</div>
      <div class="rules-card"><h3>O QUE É MISDEAL?</h3><p><strong>Misdeal</strong> é uma distribuição inicial inválida. Quando o erro é detectado a tempo, a mão é anulada antes de prosseguir e as cartas são distribuídas novamente.</p><p>Nem todo erro do dealer cancela a mão. Depois que ocorre <strong>ação substancial</strong>, vários erros deixam de permitir misdeal e passam a ser corrigidos com a mão em andamento.</p></div>
      <div class="rules-card"><h3>EXEMPLOS DE MISDEAL</h3><p>Em regras de torneio como as da Poker TDA, exemplos incluem: primeiro cartão distribuído ao assento errado; cartas para jogador sem direito à mão; jogador com direito à mão não receber cartas; quantidade errada de cartas; duas ou mais cartas viradas/boxed no deal inicial; carta que não pertence ao baralho da modalidade; e certas exposições causadas pelo dealer.</p></div>
      <div class="rules-card"><h3>CARTA EXPOSTA PELO DEALER</h3><p>No Hold'em, se <strong>uma das duas primeiras cartas retiradas do baralho</strong> for exposta por erro do dealer, isso caracteriza misdeal quando ainda é possível declará-lo. Também é misdeal se <strong>duas cartas fechadas</strong> forem expostas durante a distribuição inicial.</p><p>Uma única carta exposta mais tarde na distribuição <strong>não significa automaticamente que toda a mão será anulada</strong>. O procedimento exato pode variar conforme a casa; normalmente o dealer interrompe a correção improvisada e chama o Floor quando houver dúvida.</p></div>
      <div class="rules-card"><h3>O QUE É A CARTA QUEIMADA?</h3><p>A <strong>burn card</strong>, ou carta queimada, é uma carta retirada do topo do baralho e colocada fechada no muck antes de abrir cada nova street comunitária. No Hold'em há normalmente uma burn antes do Flop, uma antes do Turn e uma antes do River.</p><p>Ela existe para <strong>proteger o topo do baralho</strong>, e não para tentar manter uma sequência “predestinada” de cartas.</p></div>
      <div class="rules-card"><h3>CARTA “QUEIMADA” OU EXPOSTA SEM QUERER</h3><p>Se o dealer expõe ou retira uma carta por engano, a mão <strong>não deve ser automaticamente cancelada</strong>. O tratamento depende de quando ocorreu o erro, se houve ação e se a identidade/ordem das cartas foi comprometida.</p><p>Em procedimentos comuns de Hold'em, uma única carta fechada exposta durante o deal, fora das situações que exigem misdeal, pode ser substituída ao final da distribuição e a carta exposta passa a cumprir função de burn. Como regras locais podem variar, o <strong>Floor deve decidir</strong> em caso de irregularidade real.</p></div>
      <div class="rules-card"><h3>AÇÃO SUBSTANCIAL — O PONTO DE CORTE</h3><p>Segundo o padrão Poker TDA, há <strong>ação substancial</strong> quando ocorre: <strong>(A)</strong> qualquer sequência de 2 ações em ordem, sendo que pelo menos uma coloca fichas no pote; ou <strong>(B)</strong> qualquer combinação de 3 ações em ordem, como check, bet, raise, call ou fold. Os blinds postados não contam para essa definição.</p><p>Depois desse ponto, um misdeal normalmente <strong>não pode mais ser declarado</strong>.</p></div>
      <div class="rules-card rules-note"><h3>ANTES DA AÇÃO SUBSTANCIAL</h3><p>Se existe uma condição válida de misdeal e ela é identificada <strong>antes</strong> da ação substancial, o deal é cancelado e ocorre uma nova distribuição.</p><p>O re-deal é uma repetição da mesma mão: <strong>o Button não avança, os limites/blinds permanecem e não entram novos jogadores</strong> apenas por causa do misdeal.</p></div>
      <div class="rules-card rules-alert"><h3>DEPOIS DA AÇÃO SUBSTANCIAL</h3><p>Depois da ação substancial, a regra geral é: <strong>a mão continua</strong>. Um jogador que descubra ter quantidade inválida de cartas pode ter sua própria mão morta, mas isso não cancela automaticamente a mão dos demais.</p><p>O dealer não deve queimar cartas extras para tentar “voltar à ordem original”. Nas streets seguintes, mantém-se o procedimento normal de <strong>uma burn por street</strong>.</p></div>
      <div class="rules-card"><h3>EXEMPLO PRÁTICO</h3><div class="rules-steps"><div class="rules-step"><span class="rules-n">01</span><span>As cartas são distribuídas.</span></div><div class="rules-step"><span class="rules-n">02</span><span>UTG dá fold.</span></div><div class="rules-step"><span class="rules-n">03</span><span>O próximo jogador dá call, colocando fichas no pote.</span></div><div class="rules-step"><span class="rules-n">04</span><span>Já ocorreram 2 ações em ordem, uma delas com fichas: há <strong>ação substancial</strong>.</span></div><div class="rules-step"><span class="rules-n">05</span><span>Outro jogador percebe que recebeu 3 cartas. A mão geral não volta ao início; o Floor trata a mão irregular daquele jogador e o jogo prossegue.</span></div></div></div>
      <div class="rules-card"><h3>FLOP COM 4 CARTAS</h3><p>Um flop com quatro cartas é uma irregularidade, mas <strong>não significa refazer toda a mão</strong>. O Floor deve ser chamado. No padrão TDA, as quatro cartas são embaralhadas fechadas; uma é escolhida aleatoriamente para ser a próxima burn e as outras três formam o flop.</p></div>
      <div class="rules-card"><h3>FLOP SEM BURN</h3><p>Se o dealer abriu três cartas de flop sem queimar antes e <strong>ainda não houve ação</strong>, o erro pode ser corrigido pelo procedimento do Floor. Se <strong>qualquer ação já ocorreu, até mesmo um check</strong>, o flop original permanece e o jogo continua; depois, usa-se apenas uma burn normal para o Turn.</p></div>
      <div class="rules-card"><h3>TURN OU RIVER ABERTO ANTES DA HORA</h3><p>Uma carta comunitária aberta prematuramente também não é automaticamente um misdeal. É uma <strong>carta prematura</strong> e deve ser tratada pelo Floor com o procedimento aplicável, preservando a aleatoriedade do restante do baralho.</p></div>
      <div class="rules-card"><h3>MÃO RECOLHIDA POR ENGANO</h3><p>Se o dealer recolhe uma mão viva por engano e ela <strong>não pode mais ser identificada com 100% de certeza</strong>, ela pode ser declarada morta. Isso é diferente de misdeal: não significa anular todas as outras mãos.</p><p>Por isso o jogador também tem responsabilidade de <strong>proteger suas cartas</strong> até o fim da mão.</p></div>
      <div class="rules-card"><h3>BARALHO VICIADO / FOULED DECK</h3><p>Se o baralho estiver realmente inválido — por exemplo, com duas cartas exatamente do mesmo valor e naipe — a situação é mais grave. No padrão TDA, um <strong>fouled deck</strong> pode interromper a mão mesmo depois de ação substancial, e as apostas são devolvidas conforme a decisão oficial.</p></div>
      <div class="rules-card rules-note"><h3>REGRA DE OURO</h3><p><strong>Dealer não deve improvisar uma correção importante.</strong> Em misdeal, carta exposta, burn incorreta, flop irregular, carta prematura ou dúvida sobre mão morta, pare a ação e chame o <strong>Floor</strong>. A regra da casa e a decisão do responsável prevalecem.</p></div>`;

  const other=`
      <div class="rules-section-title">OUTRAS REGRAS</div>
      <div class="rules-card rules-note"><h3>REGRAS DA CASA SEMPRE PREVALECEM</h3><p>Além das regras universais do poker, cada cassino, clube, aplicativo ou torneio pode ter procedimentos próprios. Antes de jogar, confirme limites de buy-in, straddle, chopping, uso de dispositivos, tempo de ação, promoções e procedimentos de mesa.</p><p>Quando houver dúvida durante uma mão, <strong>não improvise</strong>: pare a ação e peça a decisão do Dealer ou Floor.</p></div>
      <div class="rules-card"><h3>TABLE STAKES</h3><p>Em cash game, normalmente só podem ser apostadas as fichas que estavam legitimamente na mesa <strong>antes do início da mão</strong>. Dinheiro ou fichas adicionados no meio da mão não passam a fazer parte daquele stack retroativamente.</p><div class="rules-example"><strong>EXEMPLO:</strong> você começa a mão com 30 BB e percebe no flop que queria ter 100 BB. Não pode completar o stack para disputar aquela mão; o top-up vale a partir da próxima, conforme a regra da casa.</div></div>
      <div class="rules-card"><h3>GOING SOUTH</h3><p>Retirar parte das fichas do próprio stack e continuar jogando na mesma mesa é conhecido como <strong>going south</strong> e normalmente é proibido. O jogador não pode ganhar um pote grande, guardar parte das fichas e seguir jogando artificialmente mais curto.</p><p>Para retirar fichas, em geral é necessário encerrar a sessão ou seguir o procedimento específico da casa.</p></div>
      <div class="rules-card"><h3>BUY-IN, REBUY E TOP-UP</h3><p>Em cash, a casa define buy-in mínimo e máximo. Rebuy ou top-up normalmente deve ser feito <strong>entre mãos</strong>. Em torneios, rebuy, re-entry e add-on dependem exclusivamente da estrutura anunciada e dos períodos permitidos.</p><p>Fichas de torneio não têm valor de cash-out e não podem ser compradas, vendidas ou transferidas entre jogadores.</p></div>
      <div class="rules-card"><h3>MISSED BLINDS</h3><p>Em cash games, um jogador que se ausenta e perde os blinds pode precisar <strong>postar os blinds perdidos</strong> ou esperar o Big Blind chegar naturalmente antes de voltar a receber cartas. O procedimento varia por sala.</p><p>Em torneios, blinds e antes continuam sendo retirados do stack do jogador ausente; não é possível “escapar” deles levantando da mesa.</p></div>
      <div class="rules-card"><h3>HEADS-UP MUDA A ORDEM DOS BLINDS</h3><p>Quando restam apenas dois jogadores, o <strong>Button é também o Small Blind</strong> e o outro jogador é o Big Blind. Pré-flop, o Button/SB age primeiro. Depois do flop, o Big Blind age primeiro e o Button age por último.</p><div class="rules-example"><strong>MEMORIZE:</strong> heads-up = BTN/SB primeiro pré-flop e último pós-flop.</div></div>
      <div class="rules-card"><h3>DEAD BUTTON</h3><p>Algumas salas e torneios usam procedimento de <strong>dead button</strong> quando assentos ficam vazios ou jogadores são eliminados. O Button pode permanecer em uma posição sem jogador por uma mão para preservar a sequência correta de blinds.</p><p>O objetivo é impedir que alguém receba vantagem injusta pulando um blind obrigatório.</p></div>
      <div class="rules-card"><h3>MUDANÇA DE ASSENTO</h3><p>Em cash, mudar de lugar pode exigir autorização do Dealer/Floor e pode afetar quando você deve postar blinds. Em torneios, a mudança de mesa ou assento é determinada pela organização; o jogador não escolhe uma posição mais favorável.</p><p>Ao chegar à nova mesa, siga a instrução do staff sobre quando sua mão fica ativa.</p></div>
      <div class="rules-card"><h3>MESA QUEBRADA E BALANCEAMENTO</h3><p>Em MTTs, jogadores são movidos para manter as mesas equilibradas. Quando uma mesa é quebrada, todos os participantes recebem novos assentos conforme o procedimento do torneio.</p><p>O jogador deve transportar apenas suas fichas, cartão de assento e itens autorizados; não deve escolher outra mesa por conta própria.</p></div>
      <div class="rules-card"><h3>STRADDLE</h3><p>Straddle é uma aposta voluntária feita antes das cartas ou da ação normal, geralmente maior que o Big Blind. Ela <strong>não é ante</strong>. Pode alterar quem age primeiro e o tamanho efetivo dos stacks em BB.</p><p>Há formatos como UTG straddle e Mississippi straddle, mas só existem quando a casa permite. Antes de jogar, confirme valor, posição e ordem de ação.</p></div>
      <div class="rules-card"><h3>CHOPPING DOS BLINDS</h3><p>Em alguns cash games, quando todos foldam até SB e BB, os dois jogadores podem concordar em <strong>chopar os blinds</strong>: recuperam suas apostas obrigatórias e a mão termina sem disputa.</p><p>Isso é costume de algumas salas, não uma regra universal. Torneios normalmente não usam chopping de blinds.</p></div>
      <div class="rules-card"><h3>ACCEPTED ACTION</h3><p>Ao pagar uma aposta, o jogador também tem responsabilidade de acompanhar a ação e entender o valor que está enfrentando. Dizer “call” sem saber corretamente o valor pode, em certas regras, obrigá-lo a completar a quantia legal.</p><p>Se o valor não estiver claro, <strong>pergunte antes de anunciar call ou colocar fichas</strong>.</p></div>
      <div class="rules-card"><h3>SHOW ONE, SHOW ALL</h3><p>Em muitas salas, se um jogador mostra voluntariamente suas cartas a outro participante depois da mão, os demais podem ter direito de ver a mesma informação. É o princípio conhecido como <strong>show one, show all</strong>.</p><p>A aplicação exata varia por casa, mas a ideia é impedir que informação estratégica seja compartilhada seletivamente.</p></div>
      <div class="rules-card"><h3>RABBIT HUNTING</h3><p>Depois que uma mão termina antes do river, alguns jogadores pedem para ver quais cartas teriam vindo. Isso é chamado de <strong>rabbit hunting</strong>. Muitas salas não permitem porque atrasa o jogo e pode influenciar emocionalmente decisões futuras.</p><p>Mesmo quando permitido, essas cartas não alteram o resultado da mão já encerrada.</p></div>
      <div class="rules-card"><h3>RUN IT TWICE</h3><p>Alguns cash games permitem completar o board duas vezes depois que toda a ação está encerrada, normalmente quando os jogadores estão all-in. O pote é dividido em partes e cada board decide sua parcela.</p><p>Run it twice reduz a variância daquele resultado, mas <strong>não altera a equity matemática</strong> das mãos. Em torneios, normalmente não é permitido.</p></div>
      <div class="rules-card"><h3>DECK CHANGE</h3><p>Um jogador não deve exigir troca de baralho simplesmente porque perdeu várias mãos. A troca segue o cronograma ou procedimento da casa. Se houver carta marcada, danificada ou suspeita, avise o Dealer imediatamente.</p></div>
      <div class="rules-card"><h3>DINHEIRO E FICHAS EM TRÂNSITO</h3><p>Em alguns cash games, fichas compradas que ainda estão sendo trazidas pelo staff podem ser consideradas “em jogo” após confirmação da compra. Em outras salas, só passam a valer quando chegam fisicamente à mesa.</p><p>Por isso, nunca assuma: confirme com o Dealer/Floor antes da mão começar.</p></div>
      <div class="rules-card"><h3>FICHAS NÃO PODEM SER TRANSFERIDAS</h3><p>Em torneios, é proibido dar, emprestar ou vender fichas para outro participante. Em cash, transferências entre jogadores também podem ser limitadas pela casa para proteger contabilidade e integridade da mesa.</p><p>Se alguém precisa de fichas, use caixa, chip runner ou procedimento oficial.</p></div>
      <div class="rules-card"><h3>CHIP RACE E COLOR-UP</h3><p>Em torneios, denominações pequenas deixam de ser usadas conforme os blinds aumentam. O <strong>color-up</strong> troca essas fichas por valores maiores. Restos que não formam uma ficha completa podem ser resolvidos por chip race ou pelo procedimento anunciado.</p><p>Não esconda fichas pequenas para tentar preservá-las depois da retirada oficial.</p></div>
      <div class="rules-card"><h3>HAND-FOR-HAND</h3><p>Na bolha de premiação ou em outro ponto determinado pela organização, o torneio pode entrar em <strong>hand-for-hand</strong>. Cada mesa joga uma mão e espera as demais terminarem antes de iniciar a próxima.</p><p>Isso evita que jogadores ou mesas obtenham vantagem simplesmente atrasando o ritmo.</p></div>
      <div class="rules-card"><h3>REGRAS DE REENTRADA NA MESA</h3><p>Em cash, algumas salas exigem que quem sai e retorna em pouco tempo volte com pelo menos o mesmo valor que tinha ao sair, evitando contornar a proibição de going south. Outras aplicam um período mínimo para novo buy-in.</p><p>Conheça a regra antes de levantar com intenção de voltar logo depois.</p></div>
      <div class="rules-card"><h3>FICHAS E OBJETOS FORA DA MESA</h3><p>As fichas em jogo devem permanecer na área designada e visíveis. Não transporte grandes stacks nas mãos abertas se a casa fornecer racks ou procedimentos específicos. Em torneios, ocultar fichas durante uma mudança de mesa pode gerar penalidade severa.</p></div>
      <div class="rules-card"><h3>PROMOÇÕES, JACKPOTS E REGRAS ESPECIAIS</h3><p>Bad beat jackpot, high hand, splash pots promocionais e outras campanhas possuem regras próprias sobre mão mínima, quantidade de jogadores, rake, showdown e elegibilidade.</p><p>Uma mão pode ganhar o pote normalmente e ainda assim não qualificar para a promoção se algum requisito específico não for cumprido.</p></div>
      <div class="rules-card rules-alert"><h3>NUNCA PRESUMA UMA REGRA LOCAL</h3><p>Os maiores erros de jogadores iniciantes acontecem quando eles conhecem uma regra de outro cassino ou aplicativo e presumem que vale igual em toda parte. <strong>Straddle, chopping, missed blinds, run it twice, show one/show all, buy-in e tempo de ação podem variar.</strong></p><p>Regra prática: antes de colocar fichas ou cartas em movimento, esclareça qualquer dúvida procedural com o Dealer.</p></div>`;

  const content=`<div class="rules-grid">${shuffling}${misdeal}${other}</div>`;

  function apply(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson||!title) return;
    const canonical=title.textContent.trim().toUpperCase();
    if(canonical!==RULES&&canonical!==OLD_RULES) return;
    title.textContent='REGRAS BÁSICAS';
    lesson.dataset.basicRulesMerged='1';
    const lead=lesson.querySelector('.lead');
    if(lead) lead.textContent='Embaralhamento, misdeal, showdown, muck, ação verbal, fichas e situações comuns.';
    const blocks=lesson.querySelector('.blocks');
    if(!blocks||blocks.dataset.otherRulesExpanded==='1') return;
    addStyles();
    blocks.innerHTML=content;
    blocks.dataset.otherRulesExpanded='1';
  }

  mergeCurriculum();
  migrateProgress();
  interceptBank();
  refreshCurrentScreen();

  let queued=false;
  const observer=new MutationObserver(()=>{
    if(queued) return;
    queued=true;
    queueMicrotask(()=>{queued=false;apply();});
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  apply();
})();