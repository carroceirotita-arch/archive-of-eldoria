import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Archive, BookOpenText, CircleUserRound, FileLock2, LogOut, Shield, Sparkles, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/arquivo")({
  head: () => ({ meta: [
    { title: "Arquivo Central — Arquivo Militar" },
    { name: "description", content: "Índice privado de dossiês e documentos militares." },
    { property: "og:title", content: "Arquivo Central — Arquivo Militar" },
    { property: "og:description", content: "Índice privado de dossiês e documentos militares." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ArchiveHome,
});

const sections = [
  { title: "Meu dossiê", note: "Registro pessoal autorizado", icon: CircleUserRound },
  { title: "Soldados", note: "Diretório dos dois ramos", icon: UsersRound },
  { title: "Lore e mundo", note: "História, lugares e organizações", icon: BookOpenText },
  { title: "Habilidades", note: "Registros e árvores narrativas", icon: Sparkles },
  { title: "Confidencial", note: "Documentos conforme sua autorização", icon: FileLock2 },
  { title: "Fórum", note: "Quadros IC e OOC da comunidade", icon: Archive },
];

function ArchiveHome() {
  const navigate = useNavigate();
  async function signOut() { await supabase.auth.signOut(); navigate({ to: "/", replace: true }); }
  return <main className="min-h-screen bg-background text-foreground"><header className="border-b border-brass/30 bg-background/95 px-4 py-4 sm:px-8"><div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div className="flex min-w-0 items-center gap-3"><Shield className="size-9 shrink-0 text-brass" /><div className="min-w-0"><p className="truncate text-xs uppercase tracking-[0.2em] text-brass">Registro Geral</p><h1 className="truncate text-2xl text-foreground">Arquivo Militar Central</h1></div></div><Button variant="ghost" size="icon" onClick={signOut} aria-label="Sair do arquivo" title="Sair"><LogOut /></Button></div></header><div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12"><section className="paper-texture archive-shadow border border-ink/50 p-5 text-ink sm:p-10"><div className="border-b-2 border-ink/60 pb-5"><p className="text-xs font-semibold uppercase tracking-[0.2em]">Índice autorizado</p><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Selecione um arquivo</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">Somente documentos liberados para suas credenciais aparecerão em cada seção.</p></div><div className="mt-6 grid gap-px border border-ink/35 bg-ink/35 sm:grid-cols-2 lg:grid-cols-3">{sections.map(({ title, note, icon: Icon }) => <div key={title} className="group bg-paper p-5 transition-colors hover:bg-paper-deep"><Icon className="size-6 text-seal" /><h3 className="mt-8 text-2xl font-bold">{title}</h3><p className="mt-1 text-sm text-ink/65">{note}</p><span className="mt-5 block text-xs font-semibold uppercase tracking-[0.14em]">Em preparação</span></div>)}</div><footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/35 pt-4 text-xs uppercase tracking-[0.12em] text-ink/55"><span>Arquivo Central · Uso restrito</span><Link to="/" className="underline">Capa do arquivo</Link></footer></section></div></main>;
}