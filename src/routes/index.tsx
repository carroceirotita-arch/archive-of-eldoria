import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Archive, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import archiveDesk from "@/assets/archive-desk.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Entrada — Arquivo Militar" },
    { name: "description", content: "Acesso privado ao Arquivo Militar do RPG." },
    { property: "og:title", content: "Entrada — Arquivo Militar" },
    { property: "og:description", content: "Acesso privado ao Arquivo Militar do RPG." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setMessage("Credenciais inválidas ou conta sem autorização."); return; }
    navigate({ to: "/arquivo" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <img
        src={archiveDesk}
        alt="Mesa antiga com um dossiê militar lacrado"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-background/30" />
      <section className="relative mx-auto grid min-h-screen max-w-6xl items-end px-4 py-6 sm:px-8 lg:grid-cols-[1fr_31rem] lg:items-center lg:gap-16 lg:py-12">
        <header className="hidden self-end pb-10 text-primary-foreground lg:block">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em]"><Archive className="size-4" /> Registro geral · acesso restrito</p>
          <h1 className="max-w-xl text-6xl font-semibold leading-[0.9]">Arquivo Militar Central</h1>
          <p className="mt-5 max-w-md border-l border-brass/70 pl-4 text-sm leading-6 text-primary-foreground/80">Dossiês, registros históricos e documentos classificados sob custódia administrativa.</p>
        </header>

        <div className="paper-texture dossier-enter archive-shadow relative mx-auto w-full max-w-md border border-ink/60 px-6 py-7 text-ink sm:px-10 sm:py-10 lg:mx-0">
          <div className="pointer-events-none absolute inset-2 border border-ink/25" />
          <div className="relative">
            <div className="mb-6 flex items-start justify-between border-b-2 border-ink/60 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Arquivo Central</p>
                <h1 className="mt-1 text-4xl font-bold leading-none lg:text-5xl">Registro de acesso</h1>
              </div>
              <div className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-seal text-seal"><ShieldCheck className="size-7" /></div>
            </div>

            <p className="mb-6 text-sm leading-6 text-ink/75">Apresente suas credenciais oficiais. O acesso é concedido somente a pessoas previamente convidadas.</p>

            <form onSubmit={signIn} className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-[0.14em]">Endereço de correio
                <span className="relative mt-1.5 block"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/55" /><Input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-none border-ink/40 bg-paper-deep/30 pl-10 text-ink placeholder:text-ink/45" placeholder="nome@exemplo.com" /></span>
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em]">Senha de acesso
                <span className="relative mt-1.5 block"><KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/55" /><Input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-none border-ink/40 bg-paper-deep/30 pl-10 text-ink" /></span>
              </label>
              {message && <p role="alert" className="border-l-2 border-seal pl-3 text-sm text-seal">{message}</p>}
              <Button type="submit" disabled={loading} className="h-12 w-full rounded-none border border-ink bg-ink font-semibold uppercase tracking-[0.13em] text-paper hover:bg-ink/90">
                <LockKeyhole /> {loading ? "Verificando..." : "Abrir o arquivo"}
              </Button>
            </form>

            <button type="button" onClick={() => navigate({ to: "/recuperar-senha" })} className="mt-4 w-full text-center text-xs underline underline-offset-4">Esqueci minha senha</button>
            <p className="mt-6 border-t border-ink/30 pt-4 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/60">Sem cadastro público · Convites emitidos pelo Administrador</p>
          </div>
        </div>
      </section>
    </main>
  );
}
