# Migrations arquivadas (até 2026-08-27)

Estas 27 migrations **não são mais executadas**. Elas foram substituídas pelo
`drizzle/0000_baseline.sql`, gerado a partir do schema em 27/08/2026 e validado
contra a produção — 63 colunas, 21 índices e 21 constraints idênticos.

Ficam aqui como documentação de como o banco chegou onde chegou. Não devolva
nenhuma delas para `drizzle/`.

## Por que precisaram sair

A cadeia **não reconstruía o banco**. Quem rodasse o migrator num banco vazio
falhava na `0010_loose_jackal`:

```
error: relation "user_settings" does not exist
```

A tabela `user_settings` existe em produção mas nunca foi criada por migration
nenhuma — apareceu à mão. Como o migrator roda cada migration em transação, a
falha derrubava tudo: o banco de teste terminava com zero tabelas.

O NotesAPP caiu no mesmo ponto e pelo mesmo motivo que o MoneyAPP e o TodoAPP:
os tres tinham `user_settings` criada a mao.

Havia mais um defeito no caminho:

- **11 arquivos fora do journal.** Havia 27 `.sql` no diretório para 16
  entradas no journal. Os 11 restantes eram correções pontuais aplicadas à mão
  e nunca registradas — inertes para o migrator, mas suficientes para fazer
  qualquer pessoa achar que o diretório era a verdade.

## A regra que faltava

1. **Migration aplicada não se edita.** Precisa mudar? Gera uma nova.
2. **Limpeza de dados pontual não é migration.** Vai para script avulso, fora
   de `drizzle/`, com o nome de quem rodou e quando.
3. **Mudança de schema não se faz à mão no psql.** Foi assim que `user_settings`
   e o índice `telegram_link_tokens_expira_idx` passaram a existir sem que o
   repositório soubesse — e é o que quebrou a cadeia.
