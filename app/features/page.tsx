const cards = [{"title":"Motion source captured","body":"Designed as a real product module with state, owner, review status, source context, and export intent."},{"title":"Owner/date matrix","body":"Designed as a real product module with state, owner, review status, source context, and export intent."},{"title":"Policy impact label","body":"Designed as a real product module with state, owner, review status, source context, and export intent."},{"title":"Board packet export","body":"Designed as a real product module with state, owner, review status, source context, and export intent."}]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      <header className="border-b border-white/10 bg-[#070b16]/95"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div className="flex items-center gap-4"><a href="/" className="text-sm font-black uppercase tracking-[0.24em]">Governance OS</a><a href="/" className="hidden text-[11px] font-black uppercase tracking-[0.16em] text-slate-300 transition hover:text-white sm:inline-flex">Back</a></div><a href="/dashboard" className="rounded-full bg-cyan-300 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-950">View dashboard</a></div></header>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Features</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">A complete SaaS surface around one clear workflow.</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{cards.map((card) => <article key={card.title} className="rounded-[8px] border border-white/12 bg-white/[0.06] p-6"><h2 className="text-2xl font-black">{card.title}</h2><p className="mt-4 leading-7 text-slate-300">{card.body}</p></article>)}</div>
      </section>
    </main>
  )
}
