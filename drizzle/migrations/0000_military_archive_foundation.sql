CREATE TYPE public.app_role AS ENUM ('jogador', 'administrador');
CREATE TYPE public.account_status AS ENUM ('convidado', 'ativo', 'suspenso');
CREATE TYPE public.playable_branch AS ENUM ('reconhecimento', 'policia_militar');
CREATE TYPE public.visibility_level AS ENUM ('publico', 'proprio_jogador', 'ramo', 'grupo_secreto', 'usuario_especifico', 'administrador');
CREATE TYPE public.content_status AS ENUM ('ativo', 'arquivado');
CREATE TYPE public.forum_area AS ENUM ('ic', 'ooc');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text NOT NULL,
  account_status public.account_status NOT NULL DEFAULT 'convidado',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL DEFAULT 'jogador',
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.secret_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.secret_groups TO authenticated;
GRANT ALL ON public.secret_groups TO service_role;
ALTER TABLE public.secret_groups ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.secret_group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.secret_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (group_id, user_id)
);
GRANT SELECT ON public.secret_group_members TO authenticated;
GRANT ALL ON public.secret_group_members TO service_role;
ALTER TABLE public.secret_group_members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_secret_group_member(_user_id uuid, _group_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.secret_group_members WHERE user_id = _user_id AND group_id = _group_id)
$$;
GRANT EXECUTE ON FUNCTION public.is_secret_group_member(uuid, uuid) TO authenticated;

CREATE TABLE public.characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid UNIQUE,
  name text NOT NULL,
  age integer CHECK (age IS NULL OR age > 0),
  branch public.playable_branch NOT NULL,
  facecard_path text,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.characters TO authenticated;
GRANT ALL ON public.characters TO service_role;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.user_branch(_user_id uuid)
RETURNS public.playable_branch LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT branch FROM public.characters WHERE owner_id = _user_id AND status = 'ativo' LIMIT 1
$$;
GRANT EXECUTE ON FUNCTION public.user_branch(uuid) TO authenticated;

CREATE TABLE public.character_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  label text NOT NULL,
  body text NOT NULL,
  field_order integer NOT NULL DEFAULT 0,
  visibility public.visibility_level NOT NULL DEFAULT 'proprio_jogador',
  allowed_branch public.playable_branch,
  allowed_group_id uuid REFERENCES public.secret_groups(id) ON DELETE SET NULL,
  allowed_user_id uuid,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.character_fields TO authenticated;
GRANT ALL ON public.character_fields TO service_role;
ALTER TABLE public.character_fields ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.can_view_character_field(_user_id uuid, _field_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.character_fields f
    JOIN public.characters c ON c.id = f.character_id
    WHERE f.id = _field_id AND f.status = 'ativo' AND (
      public.has_role(_user_id, 'administrador') OR
      f.visibility = 'publico' OR
      (f.visibility = 'proprio_jogador' AND c.owner_id = _user_id) OR
      (f.visibility = 'ramo' AND f.allowed_branch = public.user_branch(_user_id)) OR
      (f.visibility = 'grupo_secreto' AND f.allowed_group_id IS NOT NULL AND public.is_secret_group_member(_user_id, f.allowed_group_id)) OR
      (f.visibility = 'usuario_especifico' AND f.allowed_user_id = _user_id)
    )
  )
$$;
GRANT EXECUTE ON FUNCTION public.can_view_character_field(uuid, uuid) TO authenticated;

CREATE TABLE public.npcs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  figure_type text NOT NULL CHECK (figure_type IN ('npc', 'figura_iconica')),
  branch_label text,
  summary text,
  portrait_path text,
  visibility public.visibility_level NOT NULL DEFAULT 'publico',
  allowed_branch public.playable_branch,
  allowed_group_id uuid REFERENCES public.secret_groups(id) ON DELETE SET NULL,
  allowed_user_id uuid,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.npcs TO authenticated;
GRANT ALL ON public.npcs TO service_role;
ALTER TABLE public.npcs ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  requirements text,
  narrative_effects text,
  restrictions text,
  visibility public.visibility_level NOT NULL DEFAULT 'publico',
  allowed_branch public.playable_branch,
  allowed_group_id uuid REFERENCES public.secret_groups(id) ON DELETE SET NULL,
  allowed_user_id uuid,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.skill_trees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status public.content_status NOT NULL DEFAULT 'ativo'
);
GRANT SELECT ON public.skill_trees TO authenticated;
GRANT ALL ON public.skill_trees TO service_role;
ALTER TABLE public.skill_trees ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.skill_tree_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id uuid NOT NULL REFERENCES public.skill_trees(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES public.skills(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  requirements text,
  narrative_effects text,
  restrictions text,
  availability text NOT NULL DEFAULT 'disponivel',
  visibility public.visibility_level NOT NULL DEFAULT 'publico',
  position_x numeric NOT NULL DEFAULT 0,
  position_y numeric NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'ativo'
);
GRANT SELECT ON public.skill_tree_nodes TO authenticated;
GRANT ALL ON public.skill_tree_nodes TO service_role;
ALTER TABLE public.skill_tree_nodes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.skill_tree_edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id uuid NOT NULL REFERENCES public.skill_trees(id) ON DELETE CASCADE,
  source_node_id uuid NOT NULL REFERENCES public.skill_tree_nodes(id) ON DELETE CASCADE,
  target_node_id uuid NOT NULL REFERENCES public.skill_tree_nodes(id) ON DELETE CASCADE,
  UNIQUE (source_node_id, target_node_id)
);
GRANT SELECT ON public.skill_tree_edges TO authenticated;
GRANT ALL ON public.skill_tree_edges TO service_role;
ALTER TABLE public.skill_tree_edges ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.lore_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES public.lore_entries(id) ON DELETE SET NULL,
  title text NOT NULL,
  body text NOT NULL,
  visibility public.visibility_level NOT NULL DEFAULT 'publico',
  allowed_branch public.playable_branch,
  allowed_group_id uuid REFERENCES public.secret_groups(id) ON DELETE SET NULL,
  allowed_user_id uuid,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lore_entries TO authenticated;
GRANT ALL ON public.lore_entries TO service_role;
ALTER TABLE public.lore_entries ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.classified_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  visibility public.visibility_level NOT NULL DEFAULT 'administrador',
  owner_id uuid,
  allowed_branch public.playable_branch,
  allowed_group_id uuid REFERENCES public.secret_groups(id) ON DELETE SET NULL,
  allowed_user_id uuid,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.classified_records TO authenticated;
GRANT ALL ON public.classified_records TO service_role;
ALTER TABLE public.classified_records ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.forum_boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  area public.forum_area NOT NULL,
  allowed_branch public.playable_branch,
  allowed_group_id uuid REFERENCES public.secret_groups(id) ON DELETE SET NULL,
  status public.content_status NOT NULL DEFAULT 'ativo'
);
GRANT SELECT ON public.forum_boards TO authenticated;
GRANT ALL ON public.forum_boards TO service_role;
ALTER TABLE public.forum_boards ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.forum_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid NOT NULL REFERENCES public.forum_boards(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  title text NOT NULL,
  pinned boolean NOT NULL DEFAULT false,
  locked boolean NOT NULL DEFAULT false,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.forum_threads TO authenticated;
GRANT ALL ON public.forum_threads TO service_role;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  body text NOT NULL,
  status public.content_status NOT NULL DEFAULT 'ativo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.forum_posts TO authenticated;
GRANT ALL ON public.forum_posts TO service_role;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.forum_post_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  editor_id uuid NOT NULL,
  previous_body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.forum_post_revisions TO authenticated;
GRANT ALL ON public.forum_post_revisions TO service_role;
ALTER TABLE public.forum_post_revisions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  summary text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfis ativos visiveis" ON public.profiles FOR SELECT TO authenticated USING (account_status = 'ativo' OR id = auth.uid() OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Usuario le seu papel" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Admin gerencia grupos" ON public.secret_groups FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Membro ou admin ve grupo" ON public.secret_groups FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'administrador') OR public.is_secret_group_member(auth.uid(), id));
CREATE POLICY "Membro ve proprio vinculo" ON public.secret_group_members FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Admin gerencia membros" ON public.secret_group_members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Diretorio de soldados" ON public.characters FOR SELECT TO authenticated USING (status = 'ativo' OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Admin gerencia personagens" ON public.characters FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Campos por autorizacao" ON public.character_fields FOR SELECT TO authenticated USING (public.can_view_character_field(auth.uid(), id));
CREATE POLICY "Admin gerencia campos" ON public.character_fields FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Admin gerencia npcs" ON public.npcs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Conteudo publico de figuras" ON public.npcs FOR SELECT TO authenticated USING (status = 'ativo' AND visibility = 'publico');
CREATE POLICY "Admin gerencia habilidades" ON public.skills FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Habilidades publicas" ON public.skills FOR SELECT TO authenticated USING (status = 'ativo' AND visibility = 'publico');
CREATE POLICY "Admin gerencia arvores" ON public.skill_trees FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Arvores ativas" ON public.skill_trees FOR SELECT TO authenticated USING (status = 'ativo');
CREATE POLICY "Admin gerencia nos" ON public.skill_tree_nodes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Nos publicos" ON public.skill_tree_nodes FOR SELECT TO authenticated USING (status = 'ativo' AND visibility = 'publico');
CREATE POLICY "Admin gerencia conexoes" ON public.skill_tree_edges FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Conexoes visiveis" ON public.skill_tree_edges FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.skill_trees t WHERE t.id = tree_id AND t.status = 'ativo'));
CREATE POLICY "Admin gerencia lore" ON public.lore_entries FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Lore publica" ON public.lore_entries FOR SELECT TO authenticated USING (status = 'ativo' AND visibility = 'publico');
CREATE POLICY "Admin gerencia classificados" ON public.classified_records FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Classificados autorizados" ON public.classified_records FOR SELECT TO authenticated USING (status = 'ativo' AND (visibility = 'publico' OR (visibility = 'proprio_jogador' AND owner_id = auth.uid()) OR (visibility = 'ramo' AND allowed_branch = public.user_branch(auth.uid())) OR (visibility = 'grupo_secreto' AND allowed_group_id IS NOT NULL AND public.is_secret_group_member(auth.uid(), allowed_group_id)) OR (visibility = 'usuario_especifico' AND allowed_user_id = auth.uid()) OR public.has_role(auth.uid(), 'administrador')));
CREATE POLICY "Quadros permitidos" ON public.forum_boards FOR SELECT TO authenticated USING (status = 'ativo' AND (allowed_branch IS NULL OR allowed_branch = public.user_branch(auth.uid())) AND (allowed_group_id IS NULL OR public.is_secret_group_member(auth.uid(), allowed_group_id)) OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Admin gerencia quadros" ON public.forum_boards FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'administrador')) WITH CHECK (public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Topicos de quadros permitidos" ON public.forum_threads FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.forum_boards b WHERE b.id = board_id));
CREATE POLICY "Autores criam topicos" ON public.forum_threads FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid() AND EXISTS (SELECT 1 FROM public.forum_boards b WHERE b.id = board_id));
CREATE POLICY "Autor ou admin edita topico" ON public.forum_threads FOR UPDATE TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'administrador')) WITH CHECK (author_id = auth.uid() OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Posts de topicos permitidos" ON public.forum_posts FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.forum_threads t WHERE t.id = thread_id));
CREATE POLICY "Autores criam posts" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid() AND EXISTS (SELECT 1 FROM public.forum_threads t WHERE t.id = thread_id AND NOT t.locked));
CREATE POLICY "Autor ou admin edita post" ON public.forum_posts FOR UPDATE TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'administrador')) WITH CHECK (author_id = auth.uid() OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Revisoes proprias ou admin" ON public.forum_post_revisions FOR SELECT TO authenticated USING (editor_id = auth.uid() OR public.has_role(auth.uid(), 'administrador'));
CREATE POLICY "Admin ve auditoria" ON public.audit_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'administrador'));

CREATE INDEX character_fields_character_idx ON public.character_fields(character_id, field_order);
CREATE INDEX group_members_user_idx ON public.secret_group_members(user_id, group_id);
CREATE INDEX classified_visibility_idx ON public.classified_records(visibility, status);
CREATE INDEX forum_threads_board_idx ON public.forum_threads(board_id, created_at DESC);
CREATE INDEX forum_posts_thread_idx ON public.forum_posts(thread_id, created_at);
CREATE INDEX audit_log_created_idx ON public.audit_log(created_at DESC);