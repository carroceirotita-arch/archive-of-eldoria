REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_secret_group_member(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.user_branch(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_view_character_field(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_secret_group_member(uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.user_branch(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_view_character_field(uuid, uuid) TO authenticated, service_role;