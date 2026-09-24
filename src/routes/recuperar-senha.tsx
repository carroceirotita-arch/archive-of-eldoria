import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({ meta: [
    { title: "Recuperar acesso — Arquivo Militar" },
    { name: "description", content: "Recupere com segurança o acesso ao Arquivo Militar." },
    { property: "og:title", content: "Recuperar acesso — Arquivo Militar" },
    { property: "og:description", content: "Recupere com segurança o acesso ao Arquivo Militar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Recovery,
});

function Recovery() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/redefinir-senha` });
    setMessage("Se a conta estiver ativa, as instruções foram enviadas por e-mail.");
  }
  return <main className="grid min-h-screen place-items-center bg-background p-4"><section className="paper-texture archive-shadow w-full max-w-md border border-ink/50 p-8 text-ink"><p className="text-xs uppercase tracking-[0.2em]">Arquivo Central</p><h1 className="mt-2 text-4xl font-bold">Recuperar acesso</h1><p className="mt-3 text-sm leading-6 text-ink/70">Informe o e-mail vinculado ao seu convite.</p><form onSubmit={submit} className="mt-6 space-y-4"><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-none border-ink/40" placeholder="nome@exemplo.com" /><Button className="h-11 w-full rounded-none bg-ink text-paper hover:bg-ink/90"><Mail /> Enviar instruções</Button></form>{message && <p className="mt-4 text-sm">{message}</p>}<Link to="/" className="mt-6 block text-center text-sm underline">Voltar à entrada</Link></section></main>;
}