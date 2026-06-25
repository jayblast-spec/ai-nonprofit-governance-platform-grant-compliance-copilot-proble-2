const queue = [{"item":"Grant report due","owner":"Program Ops","status":"High risk"},{"item":"Conflict policy review","owner":"Board Secretary","status":"Review"},{"item":"Restricted fund evidence","owner":"Finance Lead","status":"Needs proof"}]
const metrics = [{"value":"12m","label":"from notes to ledger"},{"value":"4","label":"review lanes"},{"value":"100%","label":"owner assigned"},{"value":"0","label":"lost decisions"}]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      <header className="border-b border-white/10 bg-[#070b16]/95"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div className="flex items-center gap-4"><a href="/" className="text-sm font-black uppercase tracking-[0.24em]">Governance OS</a><a href="/" className="hidden text-[11px] font-black uppercase tracking-[0.16em] text-slate-300 transition hover:text-white sm:inline-flex">Back</a></div><a href="/app" className="rounded-full bg-cyan-300 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-950">New import</a></div></header>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Dashboard</p>
        <h1 className="mt-4 text-4xl font-black">Command center for decision-to-evidence workflow.</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">{metrics.map((metric) => <div key={metric.label} className="rounded-[8px] border border-white/12 bg-white/[0.06] p-5"><div className="text-3xl font-black">{metric.value}</div><p className="mt-2 text-sm text-slate-300">{metric.label}</p></div>)}</div>
        <div className="mt-6 rounded-[8px] border border-white/12 bg-white/[0.06] p-4">{queue.map((row) => <div key={row.item} className="grid gap-3 border-b border-white/10 px-2 py-4 last:border-0 md:grid-cols-[1fr_1fr_auto]"><strong>{row.item}</strong><span className="text-slate-300">{row.owner}</span><span className="w-fit rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-950">{row.status}</span></div>)}</div>
      </section>
    </main>
  )
}
