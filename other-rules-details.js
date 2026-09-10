(() => {
  const STYLE_ID='stackup-other-rules-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .rules-grid{display:grid;gap:12px}
      .rules-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .rules-card h3{margin:0 0 8px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .rules-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .rules-card p+p{margin-top:8px}.rules-card strong{color:var(--ink,#25170f)}
      .rules-example{margin-top:9px;padding:10px 12px;border-radius:12px;background:#211008;color:#d8c6ad;border:1px solid #d4aa58;font-size:15px;line-height:1.45}
      .rules-example strong{color:#d4aa58}
      .rules-note{background:#e6d8b9;border-color:#c99539}
      .rules-alert{background:#ead8c5;border-color:#a86b3c}
      @media(max-width:390px){.rules-card h3{font-size:19px}.rules-card p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  const content=`
    <div class="rules-grid">
      <div class="rules-card rules-note"><h3>REGRAS DA CASA SEMPRE PREVALECEM</h3><p>Além das regras universais do poker, cada cassino, clube, aplicativo ou torneio pode ter procedimentos próprios. Antes de jogar, confirme limites de buy-in, straddle, chopping, uso de dispositivos, tempo de ação, promoções e procedimentos de mesa.</p><p>Quando houver dúvida durante uma mão, <strong>não improvise</strong>: pare a ação e peça a decisão do Dealer ou Floor.</p></div>

      <div class="rules-card"><h3>TABLE STAKES</h3><p>Em cash game, normalmente só podem ser apostadas as fichas que estavam legitimamente na mesa <strong>antes do início da mão</strong>. Dinheiro ou fichas adicionados no meio da mão não passam a fazer parte daquele stack retroativamente.</p><div class="rules-example"><strong>EXEMPLO:</strong> você começa a mão com 30 BB e percebe no flop que queria ter 100 BB. Não pode completar o stack para disputar aquela mão; o top-up vale a partir da próxima, conforme a regra da casa.</div></div>

      <div class="rules-card"><h3>GOING SOUTH</h3><p>Retirar parte das fichas do próprio stack e continuar jogando na mesma mesa é conhecido como <strong>going south</strong> e normalmente é proibido. O jogador não pode ganhar um pote grande, guardar parte das fichas e seguir jogando artificialmente mais curto.</p><p>Para retirar fichas, em geral é necessário encerrar a sessão ou seguir o procedimento específico da casa.</p></div>

      <div class="rules-card"><h3>BUY-IN, REBUY E TOP-UP</h3><p>Em cash, a casa define buy-in mínimo e máximo. Rebuy ou top-up normalmente deve ser feito <strong>entre mãos</strong>. Em torneios, rebuy, re-entry e add-on dependem exclusivamente da estrutura anunciada e dos períodos permitidos.</p><p>Fichas de torneio não têm valor de cash-out e não podem ser compradas, vendidas ou transferidas entre jogadores.</p></div>

      <div class="rules-card"><h3>MISSed BLINDS</h3><p>Em cash games, um jogador que se ausenta e perde os blinds pode precisar <strong>postar os blinds perdidos</strong> ou esperar o Big Blind chegar naturalmente antes de voltar a receber cartas. O procedimento varia por sala.</p><p>Em torneios, blinds e antes continuam sendo retirados do stack do jogador ausente; não é possível “escapar” deles levantando da mesa.</p></div>

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

      <div class="rules-card rules-alert"><h3>NUNCA PRESUMA UMA REGRA LOCAL</h3><p>Os maiores erros de jogadores iniciantes acontecem quando eles conhecem uma regra de outro cassino ou aplicativo e presumem que vale igual em toda parte. <strong>Straddle, chopping, missed blinds, run it twice, show one/show all, buy-in e tempo de ação podem variar.</strong></p><p>Regra prática: antes de colocar fichas ou cartas em movimento, esclareça qualquer dúvida procedural com o Dealer.</p></div>
    </div>`;

  function apply(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title || title.textContent.trim().toUpperCase()!=='OUTRAS REGRAS BÁSICAS') return;
    const blocks=lesson.querySelector('.blocks');
    if(!blocks || blocks.dataset.otherRulesExpanded==='1') return;
    addStyles();
    blocks.innerHTML=content;
    blocks.dataset.otherRulesExpanded='1';
  }

  const observer=new MutationObserver(apply);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  apply();
})();