# Arquivo Militar — Plano final para aprovação

Aplicação privada, em português brasileiro (pt-BR), apresentada como um arquivo militar histórico pertencente ao universo do RPG. Sua finalidade é reunir dossiês, personagens, lore, habilidades, informações confidenciais, diretório de jogadores e fórum comunitário. As sessões, cenas e conversas de interpretação acontecerão fora da plataforma.

O sistema narrativo permanece integralmente descritivo: não haverá dados, HP, dano automático, porcentagens, cálculos de combate ou escala numérica de poder.

## 1. Arquitetura geral e portabilidade

- TanStack Start com React e renderização no servidor, rotas organizadas por módulo e um sistema de componentes reutilizáveis.
- PostgreSQL com segurança em nível de linha, autenticação por convite e armazenamento de arquivos compatível com S3.
- Durante o desenvolvimento, esses serviços podem ser fornecidos pelo Lovable Cloud, mas o código não dependerá de recursos exclusivos da Lovable.
- Aplicação preparada para implantação externa, inclusive na Vercel, com segredos em variáveis de ambiente e serviços substituíveis.
- Migrações SQL versionadas recriarão estrutura, políticas, funções e índices em outro ambiente.
- Uma camada de acesso a dados separará a interface dos provedores de autenticação, banco e armazenamento.
- Módulos independentes: autenticação, soldados, dossiês, NPCs, Figuras Icônicas, lore, habilidades, fórum, conteúdo confidencial e administração.
- Textos, mensagens, datas e formatos da interface serão integralmente pt-BR.

## 2. Papéis, ramos e grupos secretos

### Papéis da plataforma

- **Jogador** — acessa somente o que suas permissões permitem e participa do fórum.
- **Administrador** — também é o Mestre do RPG e possui controle narrativo e administrativo completo.

Não existe papel separado de Mestre. Papéis ficam em uma tabela própria e nunca podem ser alterados por jogadores.

### Ramos militares

- **Divisão de Reconhecimento** — jogável.
- **Polícia Militar** — jogável.
- **Guarnição** — apenas elemento narrativo para lore, NPCs e Figuras Icônicas; nunca atribuível a um jogador.

Pertencer a um ramo não concede acesso irrestrito aos documentos desse ramo. O ramo é apenas uma possível condição de acesso, avaliada junto à visibilidade do registro, aos grupos secretos e às concessões individuais.

### Grupos narrativos secretos

Marley, Reiss, Ackermann e outros grupos futuros serão totalmente separados dos papéis da plataforma. Ser membro de um grupo pode liberar conteúdo narrativo desse grupo, mas nunca concede poderes administrativos.

## 3. Estrutura de páginas

### Área pública

- `/` — capa do Arquivo Central, selo institucional e entrada.
- Não haverá cadastro público.

### Área autenticada

- `/meu-dossie` — dossiê do único personagem vinculado ao jogador, respeitando as permissões definidas pelo Administrador.
- `/soldados` — diretório de jogadores mostrando apenas nome, idade, facecard/retrato e ramo.
- `/soldados/$id` — exibe esses mesmos quatro dados para outros jogadores; demais campos obedecem às permissões e não são liberados automaticamente.
- `/npcs` — seção própria para NPCs.
- `/figuras-iconicas` — seção própria para Figuras Icônicas.
- `/arquivo` — mundo, história, localidades, organizações e demais lore.
- `/habilidades` — catálogo descritivo.
- `/habilidades/arvore` — progressões e relações narrativas entre habilidades.
- `/forum/ic` — fórum temático organizado em quadros, tópicos e publicações; não hospeda as cenas reais do RPG.
- `/forum/ooc` — discussões, anúncios e comunicação comunitária.
- `/confidencial` — índice somente do conteúdo para o qual o usuário possui autorização.
- `/comando` — painel visual exclusivo do Administrador.

## 4. Autenticação e contas

- Contas exclusivamente por convite enviado por e-mail.
- Somente o Administrador cria e ativa contas, vincula cada conta ao seu único personagem e envia o convite.
- O jogador define sua própria senha pelo link seguro recebido; senhas iniciais não serão compartilhadas pelo Discord.
- Cadastro público ficará desativado no serviço de autenticação, não apenas escondido na interface.
- Suspender uma conta impedirá o login e o acesso aos dados.
- Recuperação de senha acontecerá por fluxo seguro de e-mail.

## 5. Modelo de autorização e visibilidade

A visibilidade é requisito central. O Administrador controlará, por campo ou registro, exatamente quem pode ver cada informação usando controles simples no painel:

- **Público**
- **Próprio jogador**
- **Ramo** — com seleção do ramo permitido
- **Grupo secreto** — com seleção de um ou mais grupos
- **Usuário específico** — com seleção de uma ou mais pessoas
- **Administrador**

O Administrador poderá alterar essas regras a qualquer momento sem código, SQL ou acesso ao banco. Uma biografia pode pertencer somente ao jogador; uma linhagem, ao grupo Reiss; um documento, a um usuário específico; e outro, apenas ao Administrador.

### Garantias de segurança

- As permissões serão verificadas no servidor e no banco em todas as leituras e alterações.
- O navegador nunca receberá o texto real de um campo sem autorização.
- URLs diretas, requisições de API e manipulação da interface não contornarão as regras.
- Jogadores não poderão alterar papel, ramo, grupo, concessão, status da conta, visibilidade nem conteúdo oficial de dossiê.
- O Administrador será revalidado no servidor antes de qualquer ação administrativa.
- O diretório de jogadores usará uma consulta restrita que expõe somente nome, idade, facecard e ramo.
- Listagens, buscas e contagens respeitarão as mesmas regras e não revelarão a existência ou metadados de conteúdos secretos sem autorização.

## 6. Modelo de dados proposto

- `profiles` — nome de exibição e estado da conta.
- `user_roles` — vínculo entre usuário e papel Jogador/Administrador.
- `military_branches` — dois ramos jogáveis e referências narrativas à Guarnição.
- `secret_groups` e `secret_group_members` — grupos narrativos e membros.
- `characters` — um por jogador, garantido por vínculo único; nome, idade, ramo, facecard e estado de arquivamento.
- `character_fields` — blocos flexíveis de identidade, biografia, equipamento, afiliações, desenvolvimento, habilidades e segredos.
- `npcs` — personagens não jogadores.
- `iconic_figures` — figuras de destaque, separadas dos NPCs e jogadores.
- `skills` e `character_skills` — nome, descrição, requisitos, efeitos narrativos, restrições e associação.
- `skill_trees`, `skill_tree_nodes` e `skill_tree_edges` — árvores, nós, posição e pré-requisitos, sem pontos ou valores de poder.
- `lore_entries` — conteúdo hierárquico do mundo.
- `classified_records` — documentos confidenciais independentes.
- `visibility_rules` e `access_grants` — regras reutilizáveis por ramo, grupo, usuário ou proprietário.
- `forum_boards`, `forum_threads`, `forum_posts` e `forum_post_revisions` — fórum, moderação e histórico apropriado.
- `media_assets` — facecards, retratos, mapas e documentos enviados.
- `audit_log` — eventos de segurança e administração.

Tabelas de conteúdo usarão estado de arquivamento. Não haverá colunas para dados, HP, dano, porcentagens ou escala numérica de poder.

## 7. Separação entre conteúdo comum e confidencial

- Consultas comuns selecionarão explicitamente apenas colunas seguras.
- Consultas autorizadas retornarão exclusivamente os campos aprovados pela função central de permissão.
- A interface poderá mostrar um bloco censurado, mas o texto protegido não estará no HTML, estado do cliente, cache ou resposta de rede.
- Busca e índices não incluirão conteúdo confidencial sem autorização.
- Informações do próprio personagem também obedecerão às regras escolhidas pelo Administrador; propriedade não equivale a acesso total automático.

## 8. Painel visual do Administrador

O painel será uma “sala de comando” do Arquivo Central, com formulários claros em pt-BR e uso completo em desktop e celular. A gestão normal não exigirá programação, SQL, banco ou edição de arquivos.

### Contas e jogadores

- Criar e enviar convites por e-mail.
- Ativar, suspender e remover contas.
- Vincular uma conta ao seu único personagem.
- Atribuir ramo militar.

### Dossiês e personagens

- Criar e editar dossiês oficiais.
- Adicionar, ordenar e remover campos.
- Definir e alterar a visibilidade de cada campo com os seis controles definidos acima.
- Enviar e substituir facecards, retratos e mídias.
- Arquivar, restaurar ou excluir permanentemente.
- Somente o Administrador edita conteúdo oficial; não haverá solicitação interna de alterações. Os jogadores pedirão mudanças informalmente pelo Discord.

### NPCs e Figuras Icônicas

- Seções e formulários separados para criar, editar, organizar, arquivar e restaurar cada tipo.

### Habilidades e árvores

- Criar, editar, arquivar e remover habilidades.
- Vincular habilidades a personagens.
- Criar e modificar árvores visualmente.
- Em cada nó: editar nome, descrição, requisitos, efeitos narrativos, restrições, visibilidade, pré-requisitos/conexões, posição e disponibilidade/estado.
- Adicionar, remover, arrastar, reposicionar e conectar nós sem programação.

### Lore, segredos e permissões

- Criar e organizar lore e worldbuilding com texto e mídias.
- Criar grupos secretos e adicionar/remover membros.
- Criar conteúdo confidencial, definir sua visibilidade e administrar concessões individuais.

### Fórum

- Criar quadros IC e OOC.
- Restringir quadros IC por ramo, grupo secreto, ambos ou concessão específica.
- Trancar, fixar, mover, editar, arquivar ou remover tópicos e publicações.
- O autor poderá editar ou remover sua própria publicação; versões e remoções preservarão histórico de moderação quando apropriado.
- O Administrador poderá moderar qualquer conteúdo.

### Arquivamento e exclusão

- **Arquivar** será a remoção normal e reversível.
- **Restaurar** devolverá o conteúdo ao estado ativo.
- **Excluir permanentemente** será uma ação separada, exigirá confirmação explícita e deliberada — preferencialmente digitando o nome do registro — e será registrada no histórico de auditoria.

### Pré-visualizar como usuário

- O Administrador poderá visualizar um dossiê ou registro confidencial pela perspectiva de um jogador específico ou de um contexto controlado: membro da Divisão de Reconhecimento, membro da Polícia Militar, membro de um grupo secreto ou jogador comum.
- A pré-visualização será somente visual e de diagnóstico; não permitirá editar como o usuário, assumir sua sessão nem contornar permissões.
- Ela executará a mesma função central de autorização e os mesmos caminhos de consulta usados pelo usuário real. Campos sem autorização não serão enviados pelo servidor à pré-visualização.
- O modo exibirá claramente qual pessoa ou contexto está sendo simulado e oferecerá uma saída imediata para retornar à visão administrativa.
- Testes automatizados compararão a resposta da pré-visualização com a resposta autorizada do contexto selecionado, evitando divergências futuras.

Somente implantação, backups, migrações e segredos de infraestrutura exigirão acesso técnico.

## 9. Registro de auditoria

O histórico registrará eventos relevantes para segurança, sem capturar interações triviais:

- Acesso do Administrador a conteúdo confidencial.
- Mudança de visibilidade ou permissões.
- Inclusão ou remoção em grupo secreto.
- Edição, arquivamento, restauração ou exclusão permanente de personagem e conteúdo sensível.
- Ativação, suspensão ou alteração de conta.
- Moderação relevante do fórum.

Cada evento armazenará autor, ação, alvo, data e um resumo seguro da mudança, sem duplicar desnecessariamente o conteúdo secreto.

## 10. Fórum e limites de escopo

O fórum será assíncrono e organizado em quadros, tópicos, anúncios e publicações. IC e OOC permanecem separados. Não haverá chat em tempo real, presença online, salas de cena, editor de turnos ou ferramentas para conduzir sessões narrativas. A interpretação, as conversas e as cenas reais continuarão em outra plataforma.

## 11. Sistema visual

Base compartilhada: ambiente escuro de arquivo, papel envelhecido, tinta, linhas e bordas duplas, selos, carimbos, dossiês, fibras, dobras e cantos retos. Sem painéis SaaS, gradientes modernos, vidro ou cartões flutuantes arredondados.

As três identidades usarão os mesmos componentes e gramática visual, diferenciadas por artefatos institucionais:

- **Arquivo Central** — papel sépia neutro, tinta preta, selos de registro em latão e formulários gerais.
- **Divisão de Reconhecimento** — papel desgastado em campo, detalhes verde oxidado, Asas da Liberdade, relatórios de expedição e mapas.
- **Polícia Militar** — papelaria oficial mais preservada, cera vermelho-real, unicórnio e grades burocráticas rigorosas.

São departamentos da mesma instituição, não temas independentes nem simples trocas de cor.

## 12. Desktop e mobile

- Ambas as experiências serão desenhadas e verificadas separadamente desde a primeira fase.
- Desktop: trilho lateral de arquivo e dossiê aberto em duas páginas quando houver espaço.
- Mobile: documentos em uma página, navegação inferior por divisórias, alvos de toque adequados e visualização vertical de árvores.
- Tabelas administrativas se transformarão em listas editoriais; formulários extensos serão divididos em etapas claras.
- Arrastar nós terá alternativa por controles de posição no mobile.
- Conteúdo não será apenas uma versão reduzida do desktop.

## 13. Tipografia e animação

- Serifada histórica para títulos, serifada altamente legível para textos longos, condensada em caixa alta para rótulos e carimbos e manuscrita apenas para assinaturas e notas.
- Todas as fontes terão suporte completo aos acentos do português.
- Transições físicas e sutis: dossiê abrindo, páginas deslizando, tinta surgindo, carimbo pousando, selo rompendo, tarja sendo removida após autorização e carta se desdobrando.
- No mobile, gestos de página serão deliberados e não interferirão na rolagem.
- Movimento lento, sem efeitos chamativos, com respeito à preferência de movimento reduzido.

## 14. Componentes reutilizáveis

- FolhaDocumento, PastaDossie, CarimboEstado, SeloCera, BlocoCensurado e DivisorTinta.
- AbasArquivo, CampoDossie, TabelaRegistro e CartãoFacecard.
- SeletorVisibilidade — controle administrativo comum para campo, ramo, grupo e usuário.
- EditorConteudo, ControleArquivamento, ConfirmaçãoExclusão e LinhaAuditoria.
- NóHabilidade e EditorArvore.
- CartaForum, EstadoModeração e HistóricoPublicação.
- BarreiraAcesso — fallback visual; a autorização real continuará no servidor e no banco.

## 15. Ordem de implementação

1. **Fundação visual:** textos pt-BR, tokens, fontes, texturas, componentes de documento e estruturas distintas para desktop/mobile.
2. **Três identidades:** aplicar Arquivo Central, Reconhecimento e Polícia Militar a um dossiê demonstrativo estático.
3. **Fundação segura e portátil:** banco, migrações, autenticação por convite, perfis, papéis, estados de conta e políticas centrais.
4. **Administração inicial:** painel, convites, contas, vínculo com personagem e componentes de visibilidade.
5. **Dossiês:** um personagem por jogador, diretório restrito, visualização própria, editor administrativo, mídias e arquivo/restauração.
6. **Segredos:** grupos, membros, concessões, conteúdo confidencial e testes de tentativa de acesso indevido.
7. **NPCs e Figuras Icônicas:** seções e editores separados.
8. **Habilidades:** catálogo e editor visual completo de árvores.
9. **Lore:** arquivo hierárquico e gestão administrativa.
10. **Fórum:** IC/OOC, restrições, autoria, histórico e moderação.
11. **Auditoria e busca:** registros de segurança, busca autorizada e exclusão permanente controlada.
12. **Polimento:** animações, revisão completa desktop/mobile, acessibilidade, desempenho e guia de implantação externa.

Cada fase termina com testes de acesso como Jogador e Administrador antes da próxima.

## 16. Redução de custo e retrabalho

- Fixar primeiro o modelo de visibilidade, os tokens e os componentes documentais.
- Reutilizar o mesmo SeletorVisibilidade e as mesmas políticas em todos os módulos.
- Entregar uma seção por fase, sem gerar o sistema inteiro de uma vez.
- Usar dados de exemplo realistas cedo para validar textos longos, sigilo e mobile.
- Testar acesso por URL, requisição direta e busca sempre que um novo tipo de conteúdo for criado.
- Adiar notificações, cronologia de sessões e outras conveniências até que o núcleo esteja estável.

## 17. Riscos e mitigação

- **Vazamento em listas ou busca:** consultas com colunas explícitas, políticas no banco e testes de adversário.
- **Ramo concedendo acesso excessivo:** ramo tratado apenas como uma condição possível, nunca autorização global.
- **Regras inconsistentes:** uma função central de permissão e um padrão único de políticas.
- **Painel administrativo complexo:** formulários previsíveis, ações em etapas e componentes reutilizados.
- **Identidades reduzidas a cores:** variar papelaria, selos, grades, documentos e movimento institucional.
- **Dependência de fornecedor:** SQL versionado, configuração por ambiente, armazenamento padrão e camada de dados isolada.
- **Árvore difícil no celular:** visualização vertical e controles alternativos ao arraste.
- **Texturas pesadas:** sobreposições leves, compressão e carregamento sob demanda.

## 18. Prioridades

Primeiro: fundação visual e responsiva, identidades, autenticação, papéis, painel administrativo inicial, dossiês, controle de visibilidade e segurança de banco.

Depois: NPCs, Figuras Icônicas, habilidades, árvores, lore, fórum, auditoria, busca, animações finais e implantação externa.

Fora do escopo: chat em tempo real, condução de cenas, automação de combate, solicitações internas de alteração de personagem e qualquer mecânica numérica de RPG.