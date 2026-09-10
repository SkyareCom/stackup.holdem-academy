(() => {
  const STYLE_ID='stackup-fundamentals-details-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .detail-grid{display:grid;gap:12px}
      .detail-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .detail-card h3{margin:0 0 7px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .detail-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .detail-card p+p{margin-top:8px}
      .detail-card strong{color:var(--ink,#25170f)}
      .detail-note{background:#e6d8b9;border-color:#c99539}
      .street-flow,.action-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:4px}
      .street-chip,.action-chip{padding:12px 10px;border-radius:14px;background:#f4ecd9;border:1px solid #a87c3255}
      .street-chip{text-align:center}
      .street-chip strong,.action-chip strong{display:block;color:#08372d;font-size:17px;text-transform:uppercase}
      .street-chip span,.action-chip span{display:block;margin-top:3px;color:#725f4d;font-size:14px;line-height:1.35}
      .action-chip{min-height:88px}
      .bet-sequence{padding:13px;border-radius:15px;background:#211008;color:#f8f0df;border:1px solid #d4aa58;margin-top:8px}
      .bet-sequence strong{color:#d4aa58}
      .bet-sequence p{color:#d8c6ad;font-size:15px;line-height:1.5}
      @media(max-width:390px){.street-flow,.action-grid{grid-template-columns:1fr}.detail-card h3{font-size:19px}.detail-card p{font-size:15px}.action-chip{min-height:auto}}
    `;
    document.head.appendChild(style);
  }

  const lessons={
    'SMALL BLIND, BIG BLIND E ANTE': `
      <div class="detail-grid">
        <div class="detail-card"><h3>POR QUE EXISTEM OS BLINDS?</h3><p><strong>Blinds</strong> são apostas obrigatórias colocadas antes da distribuição das cartas. Elas criam um pote inicial e fazem com que exista algo a disputar em toda mão, evitando que todos simplesmente esperem cartas muito fortes sem custo.</p></div>
        <div class="detail-card"><h3>SMALL BLIND — SB</h3><p>O <strong>Small Blind</strong> é a aposta obrigatória menor. Fica imediatamente à esquerda do Button. Em muitas estruturas vale metade do Big Blind, mas o valor exato é definido pela mesa ou pelo nível do torneio.</p><p>Exemplo: blinds 500/1.000 significam <strong>SB 500</strong> e <strong>BB 1.000</strong>.</p></div>
        <div class="detail-card"><h3>BIG BLIND — BB</h3><p>O <strong>Big Blind</strong> é a aposta obrigatória maior e fica imediatamente à esquerda do Small Blind. Ele serve como unidade de referência para stacks, tamanhos de aposta e profundidade da mesa.</p><p>Exemplo: um stack de 40.000 fichas com BB de 1.000 equivale a <strong>40 BB</strong>.</p></div>
        <div class="detail-card"><h3>O QUE É ANTE?</h3><p>O <strong>Ante</strong> é uma contribuição obrigatória adicional colocada antes da mão. Diferente dos blinds, sua função principal é aumentar o pote inicial e estimular mais disputa pelas fichas já disponíveis.</p><p>O ante é dinheiro morto no pote: ele não funciona como uma aposta que o jogador “completa” para continuar na mão.</p></div>
        <div class="detail-card"><h3>ANTE TRADICIONAL</h3><p>No <strong>Traditional Ante</strong>, cada jogador da mesa coloca uma pequena quantia antes da mão. Era muito comum em estruturas antigas de torneio e ainda pode aparecer em algumas regras e modalidades.</p></div>
        <div class="detail-card"><h3>BIG BLIND ANTE — BBA</h3><p>No <strong>Big Blind Ante</strong>, apenas o jogador no BB coloca, além do Big Blind, um ante que representa a contribuição da mesa inteira. É hoje um formato muito comum em torneios porque acelera o jogo e simplifica a cobrança.</p><p>O tamanho do BBA depende da estrutura; frequentemente é igual a 1 BB, mas a regra do torneio sempre prevalece.</p></div>
        <div class="detail-card"><h3>BUTTON ANTE</h3><p>No <strong>Button Ante</strong>, o jogador no BTN é quem coloca o ante coletivo da mesa. É menos comum que o Big Blind Ante, mas existe em algumas estruturas e jogos.</p></div>
        <div class="detail-card detail-note"><h3>IMPORTANTE</h3><p><strong>Blinds e antes giram junto com as posições</strong> ao longo das mãos. Em torneios, os valores normalmente aumentam conforme os níveis avançam. Em cash games, os blinds costumam permanecer fixos enquanto o jogador estiver naquela mesa.</p><p><strong>Straddle não é ante.</strong> É uma aposta voluntária adicional usada em alguns cash games e será tratada separadamente.</p></div>
      </div>`,
    'STREETS': `
      <div class="detail-grid">
        <div class="detail-card"><h3>O QUE SÃO STREETS?</h3><p><strong>Streets</strong> são as etapas de uma mão de poker. No Texas Hold'em, elas organizam quando as cartas comunitárias aparecem e dividem a mão em quatro momentos: <strong>Pré-flop, Flop, Turn e River</strong>.</p></div>
        <div class="detail-card"><h3>VISÃO GERAL</h3><div class="street-flow"><div class="street-chip"><strong>PRÉ-FLOP</strong><span>0 cartas no board</span></div><div class="street-chip"><strong>FLOP</strong><span>3 cartas no board</span></div><div class="street-chip"><strong>TURN</strong><span>4 cartas no board</span></div><div class="street-chip"><strong>RIVER</strong><span>5 cartas no board</span></div></div></div>
        <div class="detail-card"><h3>PRÉ-FLOP</h3><p>É a fase que começa depois que cada jogador recebe suas cartas fechadas e <strong>antes de qualquer carta comunitária ser aberta</strong>. Portanto, no pré-flop o board ainda está vazio.</p></div>
        <div class="detail-card"><h3>FLOP</h3><p>O <strong>Flop</strong> revela as <strong>três primeiras cartas comunitárias</strong> de uma só vez. A partir daqui já existe um board visível para todos os jogadores que continuam na mão.</p></div>
        <div class="detail-card"><h3>TURN</h3><p>O <strong>Turn</strong> adiciona a <strong>quarta carta comunitária</strong> ao board. Ela pode mudar completamente a força relativa das mãos e as possibilidades de combinações.</p></div>
        <div class="detail-card"><h3>RIVER</h3><p>O <strong>River</strong> adiciona a <strong>quinta e última carta comunitária</strong>. Depois dele não surgem novas cartas no board.</p></div>
        <div class="detail-card"><h3>O QUE É O BOARD?</h3><p>O <strong>Board</strong> é o conjunto das cartas comunitárias abertas no centro da mesa. No Texas Hold'em pode chegar a cinco cartas: 3 no Flop, 1 no Turn e 1 no River.</p><p>Todos os jogadores usam o mesmo board como parte da construção de sua melhor mão de cinco cartas.</p></div>
        <div class="detail-card"><h3>COMO LER O BOARD</h3><p>Além dos valores das cartas, observe como elas se relacionam. Um board pode ser <strong>pareado</strong> quando repete um valor, <strong>conectado</strong> quando possui cartas próximas que favorecem sequências, <strong>monotone</strong> quando as três cartas do flop são do mesmo naipe, ou <strong>two-tone</strong> quando dois naipes aparecem no flop.</p><p>Essas características são chamadas de <strong>textura do board</strong> e serão importantes mais adiante para entender força de mão e possibilidades de draw.</p></div>
        <div class="detail-card detail-note"><h3>SHOWDOWN</h3><p>O <strong>Showdown</strong> pode acontecer depois do River quando ainda há dois ou mais jogadores disputando o pote. Ele é a etapa de comparação das mãos, mas <strong>não é uma street de cartas comunitárias</strong>.</p></div>
      </div>`,
    'SEQUÊNCIA DE APOSTAS': `
      <div class="detail-grid">
        <div class="detail-card"><h3>COMO FUNCIONA UMA RODADA DE APOSTAS?</h3><p>Em cada street, os jogadores ainda ativos agem <strong>um de cada vez, em sentido horário</strong>. Quando chega sua vez, o jogador escolhe uma ação permitida pela situação atual. A ordem continua até que a rodada esteja fechada.</p><p>Se todos os adversários desistirem, a mão termina imediatamente e o último jogador restante vence o pote sem precisar mostrar as cartas.</p></div>

        <div class="detail-card"><h3>QUEM AGE PRIMEIRO?</h3><p><strong>Pré-flop:</strong> normalmente a primeira ação voluntária começa no primeiro jogador ativo à esquerda do Big Blind — em uma mesa cheia, geralmente o UTG — e segue no sentido horário. O Big Blind pode ter a última decisão pré-flop se ninguém aumentar a aposta antes dele.</p><p><strong>Flop, Turn e River:</strong> a ação começa no primeiro jogador ativo à esquerda do Button e segue no sentido horário. Por isso o Button costuma ter a vantagem de agir por último pós-flop quando continua na mão.</p></div>

        <div class="detail-card"><h3>AÇÕES BÁSICAS</h3><div class="action-grid">
          <div class="action-chip"><strong>CHECK</strong><span>Passar a vez sem apostar. Só é possível quando não existe uma aposta pendente para pagar.</span></div>
          <div class="action-chip"><strong>BET</strong><span>Fazer a primeira aposta voluntária daquela rodada quando ainda ninguém apostou.</span></div>
          <div class="action-chip"><strong>CALL</strong><span>Igualar o valor da aposta ou aumento atual para continuar na mão.</span></div>
          <div class="action-chip"><strong>FOLD</strong><span>Desistir da mão. O jogador abandona qualquer direito ao pote atual.</span></div>
          <div class="action-chip"><strong>RAISE</strong><span>Aumentar uma aposta que já existe. O próximo jogador deverá pagar o novo valor, aumentar novamente ou desistir.</span></div>
          <div class="action-chip"><strong>ALL-IN</strong><span>Colocar todas as fichas disponíveis. Pode funcionar como bet, call ou raise, dependendo do momento.</span></div>
        </div></div>

        <div class="detail-card"><h3>BET × RAISE</h3><p><strong>Bet</strong> é a primeira aposta voluntária de uma street. <strong>Raise</strong> acontece quando já existe uma aposta e alguém aumenta esse valor.</p><p>Exemplo no flop: todos dão check até o CO, que aposta 500. Isso é uma <strong>bet</strong>. O BTN aumenta para 1.500. Isso é um <strong>raise</strong>.</p></div>

        <div class="detail-card"><h3>CALL</h3><p>Dar <strong>call</strong> significa pagar exatamente o valor necessário para igualar a maior aposta atual. O jogador continua na mão, mas não aumenta a pressão sobre os adversários.</p><p>Exemplo: alguém aposta 1.000 e você ainda não colocou fichas nessa rodada. Para dar call, precisa colocar 1.000.</p></div>

        <div class="detail-card"><h3>FOLD</h3><p>Dar <strong>fold</strong> significa desistir da mão. Suas cartas deixam de disputar o pote e as fichas já colocadas permanecem no pote.</p><p>Depois de um fold, não existe retorno àquela mão.</p></div>

        <div class="detail-card"><h3>CHECK</h3><p>Dar <strong>check</strong> é permanecer na mão sem colocar fichas adicionais naquele momento. Só pode ser feito quando ninguém fez uma aposta que precise ser paga.</p><p>Se alguém aposta depois do seu check e a ação retorna até você, será necessário escolher entre call, raise ou fold.</p></div>

        <div class="detail-card"><h3>RAISE</h3><p>Um <strong>raise</strong> aumenta o preço para continuar na mão. No No-Limit Hold'em, o jogador pode escolher diversos tamanhos de aumento até o limite de todas as suas fichas, respeitando o aumento mínimo exigido pelas regras.</p><p>O raise pode buscar valor com uma mão forte, gerar folds como blefe ou cumprir objetivos estratégicos mistos.</p></div>

        <div class="detail-card"><h3>3-BET</h3><p>A <strong>3-bet</strong> é um novo aumento sobre um raise anterior. Na nomenclatura moderna pré-flop, a blind é a aposta inicial, o primeiro raise é tratado como a segunda aposta e o re-raise seguinte é chamado de <strong>3-bet</strong>.</p><div class="bet-sequence"><p><strong>EXEMPLO:</strong> blinds 500/1.000 → CO aumenta para 2.500 → BTN aumenta para 8.000. A ação do BTN é uma <strong>3-bet</strong>.</p></div></div>

        <div class="detail-card"><h3>4-BET</h3><p>A <strong>4-bet</strong> é um novo aumento feito sobre uma 3-bet. A sequência de agressão continua podendo receber nomes como 5-bet e assim por diante, embora isso seja bem menos frequente.</p><div class="bet-sequence"><p><strong>EXEMPLO:</strong> CO abre para 2.500 → BTN faz 3-bet para 8.000 → CO aumenta novamente para 21.000. Esse novo aumento é a <strong>4-bet</strong>.</p></div></div>

        <div class="detail-card"><h3>SQUEEZE</h3><p>O <strong>Squeeze</strong> é normalmente uma 3-bet feita depois de um jogador abrir raise e um ou mais jogadores apenas pagarem esse raise.</p><p>O nome vem da ideia de “espremer” o raiser original e os callers entre uma nova aposta maior, criando pressão sobre vários jogadores ao mesmo tempo.</p><div class="bet-sequence"><p><strong>EXEMPLO:</strong> HJ abre para 2,5 BB → CO paga → BTN aumenta para 11 BB. O BTN realizou um <strong>squeeze</strong>.</p></div></div>

        <div class="detail-card"><h3>DONK BET</h3><p>A <strong>Donk Bet</strong> é uma aposta feita fora de posição por um jogador que apenas pagou a agressão na street anterior e então toma a iniciativa na street seguinte, apostando antes que o agressor anterior tenha a chance de agir.</p><div class="bet-sequence"><p><strong>EXEMPLO:</strong> BTN abre pré-flop → BB paga → no flop o BB aposta primeiro em vez de dar check para o agressor pré-flop. Essa liderança do BB é uma <strong>donk bet</strong>.</p></div></div>

        <div class="detail-card"><h3>ALL-IN</h3><p><strong>All-in</strong> significa colocar todas as fichas que restam no seu stack. Não é, por si só, um tipo único de ação: um all-in pode ser uma <strong>bet all-in</strong>, um <strong>call all-in</strong> ou um <strong>raise all-in</strong>.</p><p>Um jogador all-in continua disputando o pote, mas não pode mais realizar novas ações. Se outros jogadores tiverem fichas adicionais e continuarem apostando entre si, pode ser criado um <strong>side pot</strong>.</p></div>

        <div class="detail-card"><h3>QUANDO A RODADA TERMINA?</h3><p>A rodada de apostas termina quando todos os jogadores que ainda podem agir tiveram oportunidade de responder e, entre os que continuam na mão, todos igualaram a maior aposta válida ou deram check quando não havia aposta.</p><p>Jogadores que deram fold saem da ação. Jogadores já all-in permanecem concorrendo ao pote, mas não recebem novas decisões.</p></div>

        <div class="detail-card detail-note"><h3>RESUMO DA LÓGICA</h3><p><strong>Sem aposta:</strong> você normalmente pode dar check ou bet.</p><p><strong>Com aposta:</strong> você normalmente pode dar call, raise ou fold.</p><p><strong>Depois de um raise:</strong> os jogadores que ainda têm ação devem responder ao novo valor. A sequência continua até não haver nenhuma ação pendente.</p></div>
      </div>`
  };

  function renderDetails(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson||!title) return;
    const key=title.textContent.trim().toUpperCase();
    if(!lessons[key]) return;
    addStyles();
    const blocks=lesson.querySelector('.blocks');
    if(!blocks||blocks.dataset.detailExpanded==='1') return;
    blocks.innerHTML=lessons[key];
    blocks.dataset.detailExpanded='1';
  }

  const observer=new MutationObserver(renderDetails);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  renderDetails();
})();