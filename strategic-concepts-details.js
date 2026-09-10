(() => {
  const STYLE_ID='stackup-strategic-concepts-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .strategy-intro{margin:0 0 11px;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .strategy-list{display:grid;gap:10px;margin-top:9px}
      .strategy-item{padding:13px 14px;border-radius:15px;background:#f4ecd9;border:1px solid #a87c3255}
      .strategy-item h4{margin:0 0 7px;color:#08372d;font-size:18px;text-transform:uppercase}
      .strategy-item p{margin:0;color:#725f4d;font-size:15px;line-height:1.48}
      .strategy-item p+p{margin-top:7px}
      .strategy-item b{color:#25170f}
      .strategy-example{margin-top:8px!important;padding:9px 10px;border-radius:11px;background:#211008;color:#d8c6ad!important}
      .strategy-example b{color:#d4aa58}
      .strategy-summary{margin-top:11px;padding:12px 13px;border-radius:14px;background:#e6d8b9;border:1px solid #c99539;color:#725f4d;font-size:15px;line-height:1.48}
      @media(max-width:390px){.strategy-intro{font-size:15px}.strategy-item h4{font-size:17px}.strategy-item p,.strategy-summary{font-size:14px}}
    `;
    document.head.appendChild(s);
  }

  const detailed=`
    <h3>CONCEITOS ESTRATÉGICOS ESSENCIAIS</h3>
    <p class="strategy-intro">Esses conceitos ajudam a transformar uma decisão de poker em algo mais objetivo. Em vez de pensar apenas “minha mão é boa ou ruim?”, você passa a considerar <strong>quais mãos são possíveis, quanto pode ganhar, quanto precisa pagar, qual é a profundidade e como as cartas alteram as combinações disponíveis</strong>.</p>
    <div class="strategy-list">

      <div class="strategy-item">
        <h4>RANGE</h4>
        <p><b>O que é:</b> conjunto de mãos que um jogador pode plausivelmente ter em determinada situação, e não apenas uma mão específica.</p>
        <p><b>Para que serve:</b> evita tentar “adivinhar duas cartas exatas”. Você compara sua mão contra um grupo de combinações coerentes com posição, ações anteriores, tamanho das apostas e perfil do adversário.</p>
        <p><b>Quando usar:</b> praticamente em toda decisão estratégica, pré-flop ou pós-flop. É especialmente importante depois que um jogador abre raise, paga uma 3-bet, dá check-raise ou realiza uma aposta grande, porque cada ação modifica o range provável.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> BTN abre raise. Em vez de assumir “ele tem A-K”, pense que o BTN pode abrir muitos pares, ases, broadways e mãos suited. Sua decisão no BB deve responder a esse <b>range</b>, não a uma única mão imaginada.</p>
      </div>

      <div class="strategy-item">
        <h4>EQUITY</h4>
        <p><b>O que é:</b> parcela do pote que sua mão ou range tende a ganhar se considerarmos todos os resultados futuros possíveis.</p>
        <p><b>Para que serve:</b> mede sua chance relativa de ganhar e permite comparar essa chance com o preço oferecido pelo pote. Também ajuda a entender por que uma mão que ainda não está pronta, como um draw forte, pode ter bastante valor.</p>
        <p><b>Quando usar:</b> ao avaliar calls, all-ins, draws, confrontos de ranges e decisões nas quais ainda podem surgir cartas no Turn ou River.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> um flush draw no flop pode estar atrás naquele instante, mas ainda possui equity porque várias cartas futuras podem completar o flush e transformar a mão em vencedora.</p>
      </div>

      <div class="strategy-item">
        <h4>POT ODDS</h4>
        <p><b>O que é:</b> relação entre o valor que você precisa pagar e o tamanho do pote que estará disputando após o call.</p>
        <p><b>Para que serve:</b> mostra qual é a <strong>equity mínima</strong> necessária para que um call seja justificável apenas pelo dinheiro que já está no pote.</p>
        <p><b>Quando usar:</b> sempre que enfrentar uma aposta e estiver decidindo entre call e fold, principalmente com draws ou bluff-catchers.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> o pote tem 1.000 e o adversário aposta 500. Você paga 500 para disputar um pote final de 2.000. Seu call precisa ganhar mais de aproximadamente <b>25%</b> das vezes para empatar no longo prazo, desconsiderando fatores futuros.</p>
      </div>

      <div class="strategy-item">
        <h4>SPR — STACK-TO-POT RATIO</h4>
        <p><b>O que é:</b> relação entre o stack efetivo restante e o tamanho do pote, normalmente observada no início de uma street.</p>
        <p><b>Para que serve:</b> indica quanto espaço ainda existe para apostar. SPR baixo significa que poucas apostas podem colocar todo o stack em jogo; SPR alto cria decisões mais profundas e exige mais força para jogar potes enormes.</p>
        <p><b>Quando usar:</b> ao planejar uma mão pós-flop, decidir tamanhos de aposta, avaliar compromisso com o pote e entender quanto valor uma mão como top pair pode suportar.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> pote 10 BB e stack efetivo 20 BB = <b>SPR 2</b>. Há pouco espaço até o all-in. Pote 10 BB e stack 100 BB = <b>SPR 10</b>, permitindo muito mais apostas e raises antes de colocar tudo em jogo.</p>
      </div>

      <div class="strategy-item">
        <h4>BLOCKER</h4>
        <p><b>O que é:</b> carta que você possui e que reduz a quantidade de combinações específicas que o adversário pode ter.</p>
        <p><b>Para que serve:</b> melhora a leitura combinatória. Um blocker pode tornar menos provável que o vilão tenha uma mão muito forte ou, em outros casos, tornar menos provável que ele tenha os draws que você gostaria que ele usasse para pagar.</p>
        <p><b>Quando usar:</b> principalmente em decisões de blefe, bluff-catch, 3-bet/4-bet e grandes apostas no River, quando pequenas diferenças na quantidade de combinações importam muito.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> em um board com três espadas, ter o <b>Ás de espadas</b> impede o adversário de possuir qualquer flush que contenha esse Ás. Isso pode tornar sua mão candidata melhor a certos blefes porque você bloqueia parte das mãos mais fortes dele.</p>
      </div>

      <div class="strategy-item">
        <h4>RANGE POLARIZADO</h4>
        <p><b>O que é:</b> range concentrado nos extremos: mãos muito fortes para valor e mãos fracas usadas como blefe, deixando menos mãos médias.</p>
        <p><b>Para que serve:</b> permite usar apostas grandes de forma coerente. As mãos fortes querem extrair muito valor e os blefes aproveitam o mesmo tamanho para pressionar mãos intermediárias.</p>
        <p><b>Quando usar:</b> frequentemente em bets e raises grandes, especialmente no River, quando você representa “muito forte ou blefe”. Também aparece em algumas linhas de 3-bet e 4-bet.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> no River você aposta 150% do pote com seus melhores flushes e com alguns draws que erraram. Evita usar esse sizing com muitas mãos médias. Esse conjunto é mais <b>polarizado</b>.</p>
      </div>

      <div class="strategy-item">
        <h4>MERGED / LINEAR</h4>
        <p><b>O que é:</b> range construído de forma mais contínua, começando pelas melhores mãos e incluindo progressivamente outras mãos fortes ou médias fortes, sem separar tanto valor e blefes.</p>
        <p><b>Para que serve:</b> captura valor contra ranges que pagam com muitas mãos piores e permite pressionar usando uma concentração maior de mãos que já possuem boa força.</p>
        <p><b>Quando usar:</b> muito comum em ranges de raise ou 3-bet contra jogadores que pagam demais ou contra ranges de abertura amplos, e em apostas onde várias mãos de força intermediária ainda conseguem receber call de mãos piores.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> contra um jogador que abre muitas mãos e raramente folda para 3-bet, você pode 3-betar A-A, K-K, Q-Q, J-J, A-K, A-Q e outras mãos fortes em sequência, em vez de separar apenas monstros e blefes.</p>
      </div>

      <div class="strategy-item">
        <h4>EXPLOIT</h4>
        <p><b>O que é:</b> ajuste feito para aproveitar uma tendência ou erro recorrente de um adversário.</p>
        <p><b>Para que serve:</b> aumenta o valor esperado quando você possui informação confiável de que alguém está se desviando bastante de uma estratégia equilibrada.</p>
        <p><b>Quando usar:</b> quando existe evidência suficiente de uma tendência — por exemplo, alguém folda demais, paga demais, blefa pouco, 3-beta pouco ou aposta grande apenas com mãos fortes.</p>
        <p class="strategy-example"><b>EXEMPLO:</b> se um adversário paga apostas no River com mãos muito fracas, você pode reduzir seus blefes e apostar por valor com uma faixa maior de mãos. Se ele folda demais, pode aumentar a frequência de blefes em situações adequadas.</p>
      </div>
    </div>
    <div class="strategy-summary"><strong>COMO JUNTAR OS CONCEITOS:</strong> primeiro estime o <strong>range</strong> do adversário; compare sua <strong>equity</strong> com as <strong>pot odds</strong>; observe o <strong>SPR</strong> para saber quanto do stack pode entrar; use <strong>blockers</strong> para refinar as combinações; escolha se sua linha deve representar um range <strong>polarizado ou linear</strong>; e faça um <strong>exploit</strong> apenas quando houver uma tendência confiável a explorar.</div>`;

  function apply(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title || title.textContent.trim().toUpperCase()!=='TERMINOLOGIAS BÁSICAS') return;
    const cards=[...lesson.querySelectorAll('.tp-card')];
    const target=cards.find(card=>card.querySelector('h3')?.textContent.trim().toUpperCase()==='CONCEITOS ESTRATÉGICOS ESSENCIAIS');
    if(!target || target.dataset.strategyExpanded==='1') return;
    addStyles();
    target.innerHTML=detailed;
    target.dataset.strategyExpanded='1';
  }

  const observer=new MutationObserver(apply);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  apply();
})();