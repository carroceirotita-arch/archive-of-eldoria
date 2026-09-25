CREATE OR REPLACE FUNCTION public.is_active_account(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id AND account_status = 'ativo'
  )
$$;
REVOKE EXECUTE ON FUNCTION public.is_active_account(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_active_account(uuid) TO authenticated, service_role;

CREATE POLICY "Somente contas ativas" ON public.profiles AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.user_roles AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.secret_groups AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.secret_group_members AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.characters AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.character_fields AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.npcs AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.skills AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.skill_trees AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.skill_tree_nodes AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.skill_tree_edges AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.lore_entries AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.classified_records AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.forum_boards AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.forum_threads AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.forum_posts AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.forum_post_revisions AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));
CREATE POLICY "Somente contas ativas" ON public.audit_log AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_active_account(auth.uid())) WITH CHECK (public.is_active_account(auth.uid()));

REVOKE SELECT ON public.characters FROM authenticated;
GRANT SELECT (id, name, age, branch, facecard_path, status, created_at, updated_at) ON public.characters TO authenticated;