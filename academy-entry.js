(() => {
  const KEY='stackup-academy-entry-seen-v1';
  const css=`
  #stackup-entry{position:fixed;inset:0;z-index:2147483000;overflow:auto;background:linear-gradient(#0b5a45 0 305px,#d3a54b 305px 310px,#251007 310px);color:#f7f0dc;padding-bottom:40px}
  #stackup-entry *{box-sizing:border-box;font-family:'Coming Soon',cursive!important;font-weight:700!important;font-style:italic!important}
  #stackup-entry .se-wrap{width:min(430px,100%);margin:auto}
  #stackup-entry .se-hero{height:150px;padding:24px 22px 12px;display:flex;align-items:center;gap:16px;text-align:left}
  #stackup-entry .se-logo{width:86px;height:86px;object-fit:contain;display:block;margin:0}
  #stackup-entry h1{font-family:'Road Rage','Coming Soon',cursive!important;font-weight:400!important;font-style:normal!important;color:#fff7df;font-size:29px;line-height:1;margin:0}
  #stackup-entry .se-sub{margin:7px 0 0;font-size:11px;letter-spacing:.4px;color:#fff7df;text-transform:uppercase}
  #stackup-entry .se-intro{text-align:center;padding:22px 24px 24px}
  #stackup-entry .se-intro strong{display:block;font-family:'Road Rage','Coming Soon',cursive!important;font-weight:400!important;font-style:normal!important;font-size:38px;line-height:1.04;color:#fff8e7}
  #stackup-entry .se-intro span{display:block;font-size:15px;line-height:1.7;color:#d8c8b6;margin-top:14px}
  #stackup-entry .se-card{margin:0 17px 16px;border:1.5px solid #d7aa50;border-radius:28px;background:linear-gradient(145deg,#fff8df,#f2e7c9);box-shadow:0 3px 0 #0003;overflow:hidden;color:#21130d}
  #stackup-entry .se-head{width:100%;min-height:164px;border:0;background:transparent;color:#21130d;display:grid;grid-template-columns:1fr 24px;gap:10px;align-items:end;text-align:left;padding:20px 21px;cursor:pointer}
  #stackup-entry .se-icon{display:none}.se-title{display:block;font-family:'Road Rage','Coming Soon',cursive!important;font-weight:400!important;font-style:normal!important;color:#21130d;font-size:32px;text-transform:uppercase}.se-note{display:block;font-size:13px;line-height:1.6;color:#76675a;margin-top:12px}.se-chevron{font-size:22px;color:#b1843c}
  #stackup-entry .se-body{display:none;border-top:1px solid #d9c9a6;margin:0 21px;padding:14px 0 20px}#stackup-entry .se-card.open .se-body{display:block}
  #stackup-entry label{display:block;font-size:10px;color:#a77b39;margin:8px 0 5px;text-transform:uppercase}
  #stackup-entry input,#stackup-entry select{width:100%;min-height:46px;border:1px solid #d4bc8c;border-radius:12px;background:#fffaf0;color:#332117;padding:10px 12px;font-size:13px;outline:none}
  #stackup-entry .se-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}
  #stackup-entry button.se-action{min-height:43px;border:1px solid #b98a3b;border-radius:12px;background:#b98a3b;color:#fff9e9;padding:9px 10px;text-transform:uppercase;cursor:pointer}
  #stackup-entry button.se-ghost{background:transparent;color:#8d672c}
  #stackup-entry .se-msg{min-height:18px;margin-top:8px;font-size:9px;color:#8d7b68;text-align:center}
  #stackup-entry .se-footer{text-align:center;margin:12px 20px 0;font-size:9px;line-height:1.6;color:#cdbb9e;text-transform:uppercase}.se-footer b{color:#d9ad55}
  `;
  function mount(){
    if(document.getElementById('stackup-entry'))return;
    const style=document.createElement('style');style.id='stackup-entry-style';style.textContent=css;document.head.appendChild(style);
    const gate=document.createElement('section');gate.id='stackup-entry';
    gate.innerHTML=`<div class="se-wrap"><div class="se-hero"><img class="se-logo" src="./header-logo-transparent.webp?v=2" alt="StackUp Hold'em Academy"><div><h1>STACKUP HOLD'EM</h1><p class="se-sub">ACADEMY<br>CURSO INTERATIVO DE POKER</p></div></div><div class="se-intro"><strong>APRENDA POKER<br>EM 3 ETAPAS.</strong><span>Estude de forma interativa, seguindo uma sequência lógica e progressiva.</span></div>
    <div class="se-card"><button class="se-head" data-open><span class="se-icon">◎</span><span><small style="display:block;color:#b1843c;font-size:11px;text-transform:uppercase;margin-bottom:7px">Configuração</small><b class="se-title">Idioma</b><small class="se-note">Escolha Português ou Inglês para usar o aplicativo.<br><br>PORTUGUÊS</small></span><span class="se-chevron">›</span></button><div class="se-body"><select data-lang><option value="pt-BR">Português (Brasil)</option><option value="en-US">English (US)</option></select><div class="se-row"><button class="se-action se-ghost" data-close>Cancelar</button><button class="se-action" data-save-lang>Confirmar</button></div></div></div>
    <div class="se-card"><button class="se-head" data-open><span class="se-icon">◉</span><span><small style="display:block;color:#b1843c;font-size:11px;text-transform:uppercase;margin-bottom:7px">Acesso</small><b class="se-title">Acesso rápido</b><small class="se-note">Use biometria ou Google para acessar novamente neste dispositivo.<br><br>BIOMETRIA OU GOOGLE</small></span><span class="se-chevron">›</span></button><div class="se-body"><div class="se-row"><button class="se-action se-ghost" data-unavailable>Biometria</button><button class="se-action se-ghost" data-unavailable>Google</button></div><div class="se-msg">Será ativado com o STACKUP ID.</div></div></div>
    <div class="se-card"><button class="se-head" data-open><span class="se-icon">◌</span><span><small style="display:block;color:#b1843c;font-size:11px;text-transform:uppercase;margin-bottom:7px">StackUp ID</small><b class="se-title">Login com WhatsApp</b><small class="se-note">Entre com seu número e confirme o código temporário enviado pelo WhatsApp.<br><br>ENTRAR COM WHATSAPP</small></span><span class="se-chevron">›</span></button><div class="se-body"><label>Número do WhatsApp</label><input data-phone inputmode="tel" autocomplete="tel" placeholder="+55 (__) _____-____"><button class="se-action" style="width:100%;margin-top:9px" data-send>Enviar código</button><label>Código de verificação</label><input data-code inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="_ _ _ _ _ _"><label><input data-stay type="checkbox" checked style="width:auto;min-height:0;margin-right:6px"> Permanecer conectado</label><div class="se-row"><button class="se-action se-ghost" data-close>Cancelar</button><button class="se-action" data-confirm>Confirmar</button></div><div class="se-msg" data-msg>O envio real será habilitado pelo serviço seguro do STACKUP ID.</div></div></div>
    <div class="se-row" style="margin:8px 17px 0"><button class="se-action se-ghost" data-preview>Continuar no Academy</button><button class="se-action" data-login-open>Entrar</button></div>
    <div class="se-footer"><b>Compra única • acesso permanente</b><br>STACKUP ID • progresso preparado para sincronização</div></div>`;
    document.body.appendChild(gate);
    const cards=[...gate.querySelectorAll('.se-card')];
    const open=c=>{cards.forEach(x=>x.classList.toggle('open',x===c))};
    gate.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.closest('.se-card')));
    gate.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('.se-card').classList.remove('open'));
    gate.querySelector('[data-login-open]').onclick=()=>open(cards[2]);
    gate.querySelector('[data-preview]').onclick=()=>{sessionStorage.setItem(KEY,'1');gate.remove();window.StackupPlatform?.analytics?.track('academy_entry_skipped',{mode:'preview'})};
    gate.querySelector('[data-send]').onclick=()=>{gate.querySelector('[data-msg]').textContent='WhatsApp OTP ainda não está conectado ao backend. Nenhum código foi enviado.';window.StackupPlatform?.analytics?.track('whatsapp_otp_requested',{configured:false})};
    gate.querySelector('[data-confirm]').onclick=()=>{gate.querySelector('[data-msg]').textContent='Conecte o backend STACKUP ID antes de habilitar o login obrigatório.'};
    gate.querySelectorAll('[data-unavailable]').forEach(b=>b.onclick=()=>{b.closest('.se-body').querySelector('.se-msg').textContent='Acesso rápido será ativado após a autenticação STACKUP ID.'});
    gate.querySelector('[data-save-lang]').onclick=()=>{const v=gate.querySelector('[data-lang]').value;window.StackupPlatform?.analytics?.track('language_selected',{language:v});gate.querySelector('.se-card.open')?.classList.remove('open')};
    window.StackupPlatform?.analytics?.track('academy_entry_viewed');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();