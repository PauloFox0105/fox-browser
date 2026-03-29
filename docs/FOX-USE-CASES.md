# fox-browser — Casos de Uso FOX Digital

Real-world use cases for the FOX ecosystem using `fb` (fox-browser CLI).

## 1. Testar landing pages

```bash
fb "acesse fox-pred-v3.vercel.app/foxshield e liste todos os botoes"
```

## 2. Verificar deploy Vercel

```bash
fb "acesse vercel.com e confirme que fox-pred-v3 esta com status Ready"
```

## 3. Testar checkout

```bash
fb "acesse fox-pred-v3.vercel.app/foxshield, clique em Start Pro e confirme que o Stripe abre"
```

## 4. Screenshot automatico

```bash
fb "tire screenshot de fox-pred-v3.vercel.app/foxreview"
```

## 5. Verificar Stripe (com Chrome real)

```bash
# Abrir Chrome primeiro: chrome --remote-debugging-port=9222
fb "acesse dashboard.stripe.com e mostre o saldo atual"
```

## 6. Testar formularios

```bash
fb "acesse centralfox.online e preencha o formulario de contato com dados de teste"
```

## Modo Chrome real (sessoes logadas)

Para acessar sites que exigem login (Stripe, Vercel, GitHub):

1. Abra Chrome com debug port:
   ```powershell
   chrome --remote-debugging-port=9222
   ```
2. Faca login normalmente no browser
3. Use `fb` — conecta automaticamente ao Chrome aberto:
   ```bash
   fb "qualquer tarefa"
   ```

## Modo headless (padrao)

Para tarefas que nao exigem login (testes, screenshots, verificacoes):

```bash
fb "acesse fox-pred-v3.vercel.app/api-landing e verifique se carrega sem erros"
```

O modo headless usa Chromium embutido — sem necessidade de Chrome instalado.
