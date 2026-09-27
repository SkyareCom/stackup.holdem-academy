(() => {
  const KEY='stackup-academy-entry-seen-v1';
  const css=`
  #stackup-entry{position:fixed;inset:0;z-index:2147483000;overflow:auto;background:radial-gradient(circle at 50% 8%,#174f39 0,#09291f 34%,#03110d 72%,#010504 100%);color:#f5ead2;padding:24px 16px 34px}
  #stackup-entry *{box-sizing:border-box;font-family:'Coming Soon',cursive!important;font-weight:700!important;font-style:italic!important}
  #stackup-entry .se-wrap{width:min(430px,100%);margin:auto}
  #stackup-entry .se-hero{text-align:center;padding:8px 8px 20px}
  #stackup-entry .se-logo{width:108px;height:108px;object-fit:contain;display:block;margin:0 auto 10px}
  #stackup-entry h1{font-family:'Road Rage','Coming Soon',cursive!important;font-weight:400!important;font-style:normal!important;color:#e3bd69;font-size:32px;line-height:1;margin:0}
  #stackup-entry .se-sub{margin:7px 0 0;font-size:13px;letter-spacing:.6px;color:#e7dcc8;text-transform:uppercase}
  #stackup-entry .se-card{margin:10px 0;border:1px solid #d6ad5d80;border-radius:17px;background:linear-gradient(145deg,#10291fdd,#071711ee);box-shadow:0 10px 28px #0008;overflow:hidden}
  #stackup-entry .se-head{width:100%;min-height:70px;border:0;background:transparent;color:#f7efdf;display:grid;grid-template-columns:44px 1fr 24px;gap:10px;align-items:center;text-align:left;padding:12px 14px;cursor:pointer}
  #stackup-entry .se-icon{font-size:25px;color:#e3bd69;text-align:center}.se-title{display:block;color:#e3bd69;font-size:14px;text-transform:uppercase}.se-note{display:block;font-size:11px;color:#cfc5b3;margin-top:3px}.se-chevron{font-size:18px;color:#e3bd69}
  #stackup-entry .se-body{display:none;border-top:1px solid #d6ad5d45;padding:14px}#stackup-entry .se-card.open .se-body{display:block}
  #stackup-entry label{display:block;font-size:11px;color:#d8c8ad;margin:7px 0 5px;text-transform:uppercase}
  #stackup-entry input,#stackup-entry select{width:100%;min-height:46px;border:1px solid #d6ad5d80;border-radius:11px;background:#020a07;color:#fff;padding:10px 12px;font-size:15px;outline:none}
  #stackup-entry .se-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}
  #stackup-entry button.se-action{min-height:45px;border:1px solid #d6ad5d;border-radius:11px;background:#d6ad5d;color:#07130e;padding:9px 10px;text-transform:uppercase;cursor:pointer}
  #stackup-entry button.se-ghost{background:transparent;color:#e3bd69}
  #stackup-entry .se-msg{min-height:18px;margin-top:8px;font-size:10px;color:#d8c8ad;text-align:center}
  #stackup-entry .se-footer{text-align:center;margin-top:18px;font-size:10px;line-height:1.55;color:#c9baa1;text-transform:uppercase}.se-footer b{color:#e3bd69}
  `;
  function mount(){
    if(document.getElementById('stackup-entry'))return;
    const style=document.createElement('style');style.id='stackup-entry-style';style.textContent=css;document.head.appendChild(style);
    const gate=document.createElement('section');gate.id='stackup-entry';
    gate.innerHTML=`<div class="se-wrap"><div class="se-hero"><img class="se-logo" src="./header-logo-transparent.webp?v=2" alt="StackUp Hold'em Academy"><h1>STACKUP HOLD'EM ACADEMY</h1><p class="se-sub">Aprenda a jogar poker em 3 etapas</p></div>
    <div class="se-card"><button class="se-head" data-open><span class="se-icon">◎</span><span><b class="se-title">Idioma</b><small class="se-note">Português (Brasil)</small></span><span class="se-chevron">›</span></button><div class="se-body"><select data-lang><option value="pt-BR">Português (Brasil)</option><option value="en-US">English (US)</option></select><div class="se-row"><button class="se-action se-ghost" data-close>Cancelar</button><button class="se-action" data-save-lang>Confirmar</button></div></div></div>
    <div class="se-card"><button class="se-head" data-open><span class="se-icon">◉</span><span><b class="se-title">Acesso rápido</b><small class="se-note">Biometria ou Google</small></span><span class="se-chevron">›</span></button><div class="se-body"><div class="se-row"><button class="se-action se-ghost" data-unavailable>Biometria</button><button class="se-action se-ghost" data-unavailable>Google</button></div><div class="se-msg">Será ativado com o STACKUP ID.</div></div></div>
    <div class="se-card"><button class="se-head" data-open><span class="se-icon">◌</span><span><b class="se-title">Login com WhatsApp</b><small class="se-note">Código temporário de verificação</small></span><span class="se-chevron">›</span></button><div class="se-body"><label>Número do WhatsApp</label><input data-phone inputmode="tel" autocomplete="tel" placeholder="+55 (__) _____-____"><button class="se-action" style="width:100%;margin-top:9px" data-send>Enviar código</button><label>Código de verificação</label><input data-code inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="_ _ _ _ _ _"><label><input data-stay type="checkbox" checked style="width:auto;min-height:0;margin-right:6px"> Permanecer conectado</label><div class="se-row"><button class="se-action se-ghost" data-close>Cancelar</button><button class="se-action" data-confirm>Confirmar</button></div><div class="se-msg" data-msg>O envio real será habilitado pelo serviço seguro do STACKUP ID.</div></div></div>
    <div class="se-row"><button class="se-action se-ghost" data-preview>Continuar no Academy</button><button class="se-action" data-login-open>Entrar</button></div>
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