# Como contribuir

## Fluxo de trabalho
1. Escolher uma tarefa no Planner e anotar o ID que ela tem na Matriz de Acompanhamento.
2. Atualizar o ramo principal: `git switch main` e `git pull`.
3. Criar um ramo por tarefa: `git switch -c tipo/ID-descricao-curta` (exemplo: `feat/T12-lista-cursos`). Tipos: feat, fix, docs, test, chore.
4. Fazer commits pequenos e claros, no formato `tipo: descrição (ID)`.
5. Enviar o ramo: `git push -u origin nome-do-ramo`.
6. Abrir um Pull Request, preencher o modelo e pedir revisão a outro elemento do grupo.
7. Só se integra depois de aprovado por outro elemento. Preferir "Create a merge commit", para manter os commits individuais no histórico.
8. Apagar o ramo e atualizar o estado da tarefa no Planner e na Matriz.

## Regras
- Nunca fazer commit de palavras-passe, chaves ou ficheiros `.env`.
- Nada entra no ramo `main` sem Pull Request revisto.
- Não reescrever o histórico (sem `git push --force`).
- Conflitos resolvem-se localmente, antes de pedir a integração.

## Uma tarefa está concluída quando
- Foi testada localmente.
- A documentação afetada foi atualizada.
- Outro elemento reviu o código.