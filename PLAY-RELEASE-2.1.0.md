# StackUp Hold'em Academy — Google Play 2.1.0 (210)

Produção oficial: `SkyareCom/stackup.holdem-academy`

## Identidade Android
- applicationId: `com.skyare.stackupacademy`
- versionName: `2.1.0`
- versionCode: `210`
- minSdk: 24
- targetSdk / compileSdk: 36
- distribuição: Android App Bundle (AAB)
- shell: Android nativo + WebView restrito ao domínio oficial
- URL do conteúdo: `https://skyarecom.github.io/stackup.holdem-academy/`

## Segurança e funcionamento
- apenas permissão INTERNET
- tráfego HTTP bloqueado
- acesso a file:// e content:// desativado no WebView
- Safe Browsing ativado quando suportado
- links externos saem do WebView e abrem no navegador
- recuperação de renderer do WebView sem encerrar o processo do app
- migração de cache/service worker da versão anterior para a 2.1.0
- botão Voltar do Android usa o histórico do WebView
- barras do sistema permanecem disponíveis ao usuário
- assinatura de upload vem somente de GitHub Actions secrets

## Play Console
- Categoria: Educação
- Público-alvo: 18+
- Sem anúncios
- Poker exclusivamente educacional; sem apostas, depósitos, saques ou prêmios em dinheiro real
- Política de privacidade: https://skyarecom.github.io/stackup.holdem-academy/privacy.html
- Dados de perfil/progresso do front 2.1.0 permanecem no aparelho; rever a declaração de Segurança dos dados sempre que analytics, login remoto, backend, anúncios ou pagamentos forem adicionados.
- Recursos digitais pagos, quando ativados, devem usar Google Play Billing.

## Futuro iOS
O conteúdo principal permanece desacoplado da casca Android. A mesma aplicação web pode ser reutilizada numa casca iOS (WKWebView/Capacitor), mantendo autenticação, billing e integrações específicas de cada loja na camada nativa.
