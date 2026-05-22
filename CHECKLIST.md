# EPI System — Checklist de desenvolvimento

## Bugs críticos
- [ ] Policy INSERT em `profiles` para authenticated (SQL já passado — confirmar se foi rodado)
- [ ] Policies para role `docente` nas tabelas principais (SQL já passado — confirmar se docente consegue logar e ver EPIs)

## Sidebar
- [ ] Adicionar link "Cadastro de funcionário" visível só para admin (rota `/cadastro-funcionario` já existe)
- [ ] Mostrar nome e role do usuário logado na sidebar (buscar profile no onMounted)

## Login
- [ ] Redirect por role pós-login — aluno → `/estoque`, admin e docente → `/dashboard` (código já passado, só aplicar no `Login.vue`)

## Banco de dados — alterações necessárias
- [ ] Adicionar coluna `status` (pendente / aprovado / rejeitado) na tabela `aluno_has_epis`
- [ ] Adicionar coluna `status` na tabela `funcionario_has_epis` também

SQL para rodar no editor:
```sql
ALTER TABLE aluno_has_epis ADD COLUMN status text DEFAULT 'pendente';
ALTER TABLE funcionario_has_epis ADD COLUMN status text DEFAULT 'pendente';
```

## Estoque — solicitações
- [ ] Aprovar solicitação faz UPDATE no campo `status` (hoje só recarrega a lista)
- [ ] Rejeitar solicitação faz UPDATE em vez de DELETE (preservar histórico)
- [ ] Aluno vê status das suas solicitações na aba "Minhas solicitações" (pendente / aprovado / entregue)
- [ ] Docente vê solicitações dos alunos com botão de aprovar/rejeitar funcionando

## Estoque — EPIs
- [ ] Campo de busca/filtro por nome ou tipo na tabela de EPIs (filtro local no array)
- [ ] Decrementar quantidade no estoque ao aprovar uma solicitação (UPDATE em `epis`)
- [ ] Validar se EPI tem estoque disponível antes de permitir solicitação

## Dashboard
- [ ] Cards de stats diferenciados por role:
  - Admin: totais gerais do sistema (como está hoje)
  - Docente: EPIs ativos com ele + solicitações pendentes dos alunos
  - Aluno: EPIs com ele + solicitações pendentes + avisos de validade
- [ ] Seção "Atividade recente" para aluno (últimas solicitações)
- [ ] Adicionar action-card "Cadastro de funcionário" nas ações rápidas do admin

## Perfil
- [ ] Carregar e exibir EPIs recebidos pelo aluno (seção hoje vazia)
- [ ] Carregar e exibir EPIs ativos do docente/funcionário
- [ ] Botão de editar dados pessoais (nome, telefone) com save no Supabase

## Cadastro de funcionário
- [ ] Testar fluxo completo: criar conta → inserir em `funcionario` → inserir em `profiles` com role `docente`
- [ ] Listar funcionários já cadastrados na mesma página (tabela abaixo do formulário)

## Melhorias de UX (baseadas no Figma)
- [ ] Filtro por tipo de EPI no catálogo (aluno/docente) — dropdown "Todos os tipos"
- [ ] Filtro por disponibilidade no catálogo — dropdown "Todas as disponibilidades"
- [ ] Badge de quantidade pendente na sidebar quando há solicitações esperando aprovação
- [ ] Toast de feedback após ações (salvar EPI, aprovar, rejeitar, solicitar) em vez de alert()
- [ ] Loading skeleton nas tabelas enquanto carrega dados do Supabase
- [ ] Página 404 personalizada

## Deploy (quando tudo estiver pronto)
- [ ] Atualizar `Site URL` no Supabase para o domínio de produção
- [ ] Atualizar `Redirect URLs` no Supabase
- [ ] Variáveis de ambiente configuradas no serviço de deploy
- [ ] Build de produção testada (`npm run build && npm run preview`)
