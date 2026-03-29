#!/bin/bash
# fox-browser — Comando unificado FOX Digital
# Uso: fox-browser [tarefa em linguagem natural]
# Exemplo: fox-browser "acesse fox-pred-v3.vercel.app e tire screenshot"

TASK="$*"

if [ -z "$TASK" ]; then
  echo "Uso: fox-browser <tarefa>"
  echo "Exemplos:"
  echo "  fox-browser 'acesse fox-pred-v3.vercel.app e tire screenshot'"
  echo "  fox-browser 'teste o checkout do FoxShield Pro'"
  echo "  fox-browser 'abra o Stripe dashboard e mostre o saldo'"
  exit 1
fi

# Verifica modo de conexao
if curl -s http://127.0.0.1:9222/json >/dev/null 2>&1; then
  MODE="--connect"
  echo "[fox-browser] Conectando ao Chrome real..."
else
  MODE="--headless"
  echo "[fox-browser] Usando modo headless (Chromium)..."
fi

# Log de auditoria
LOGFILE="$HOME/.fox-browser/audit.log"
mkdir -p "$HOME/.fox-browser"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] TASK: $TASK | MODE: $MODE" >> "$LOGFILE"

# Executa via dev-browser
dev-browser $MODE << SCRIPT
const page = await browser.getPage("main");
console.log("[fox-browser] Iniciando tarefa: $TASK");
console.log("[fox-browser] Modo: $MODE");
SCRIPT
