import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({ meta: [
    { title: "Nova senha — Arquivo Militar" },
    { name: "description", content: "Defina uma nova senha para o Arquivo Militar." },
    { property: "og:title", content: "Nova senha — Arquivo Militar" },
    { property: "og:description", content: "Defina uma nova senha para o Arquivo Militar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); const { error } = await supabase.auth.updateUser({ password }); if (error) { setMessage("Não foi possível atualizar a senha. Solicite um novo link."); return; } navigate({ to: "/arquivo" }); }
  return <main className="grid min-h-screen place-items-center bg-background p-4"><section className="paper-texture archive-shadow w-full max-w-md border border-ink/50 p-8 text-ink"><p className="text-xs uppercase tracking-[0.2em]">Credencial recuperada</p><h1 className="mt-2 text-4xl font-bold">Definir nova senha</h1><form onSubmit={submit} className="mt-6 space-y-4"><Input required minLength={10} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-none border-ink/40" placeholder="Nova senha segura" /><Button className="h-11 w-full rounded-none bg-ink text-paper hover:bg-ink/90">Registrar nova senha</Button></form>{message && <p className="mt-4 text-sm text-seal">{message}</p>}</section></main>;
}