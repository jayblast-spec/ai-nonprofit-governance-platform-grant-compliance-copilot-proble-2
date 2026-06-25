'use client'

const metrics = [{"value":"12m","label":"from notes to ledger"},{"value":"4","label":"review lanes"},{"value":"100%","label":"owner assigned"},{"value":"0","label":"lost decisions"}]
const queue = [{"item":"Grant report due","owner":"Program Ops","status":"High risk"},{"item":"Conflict policy review","owner":"Board Secretary","status":"Review"},{"item":"Restricted fund evidence","owner":"Finance Lead","status":"Needs proof"}]
const proof = ["Motion source captured","Owner/date matrix","Policy impact label","Board packet export"]
const trust = ["Workspace-scoped records","Human approval before save","Evidence citations on every output"]
const nav = ["Ledger","Evidence","Risk","Use cases","Pricing"]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#171717]">
      <header className="sticky top-0 z-40 border-b border-[#ddd5c7] bg-[#f7f4ed]/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-4"><a href="/" className="font-serif text-xl font-black tracking-[-0.01em]">Governance OS</a><a href="/" className="hidden text-[11px] font-black uppercase tracking-[0.16em] text-[#686054] sm:inline-flex">Back</a></div>
          <nav className="hidden items-center gap-7 text-[11px] font-black uppercase tracking-[0.16em] text-[#686054] md:flex">
            {nav.map((item) => <a key={item} href={item === 'Pricing' ? '/pricing' : item === 'Use cases' ? '/use-cases' : '#workflow'}>{item}</a>)}
          </nav>
          <a href="/app" className="rounded-full bg-[#182f2a] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white">Import a board packet</a>
        </div>
      </header>

      <section className="border-b border-[#ddd5c7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#8b5a20]">Decision-to-evidence workflow</p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-black leading-[0.96] tracking-[-0.01em] text-[#141414] md:text-6xl">give every board decision an owner, source, deadline, and audit trail.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#58534b]">Board decisions and grant obligations should not disappear into notes, PDFs, and inboxes after the meeting ends.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/app" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#182f2a] px-6 text-sm font-black uppercase tracking-[0.12em] text-white">Import a board packet</a>
              <a href="#workflow" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c8bdad] px-6 text-sm font-black uppercase tracking-[0.12em] text-[#182f2a]">Review sample ledger</a>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#d9cfbf] bg-[#fffaf1] p-4 shadow-[0_24px_70px_rgba(42,31,18,0.12)] lg:mt-8">
            <div className="rounded-[6px] border border-[#ded3c1] bg-white p-4">
              <div className="flex items-center justify-between border-b border-[#eee6da] pb-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b5a20]">Live workspace</p>
                  <h2 className="mt-1 font-serif text-2xl font-black">AI Nonprofit Governance Platform</h2>
                </div>
                <span className="rounded-full bg-[#e6f2ec] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#27604c]">In review</span>
              </div>
              <div className="mt-4 grid gap-3">
                {queue.map((row) => (
                  <div key={row.item} className="grid gap-3 rounded-[6px] border border-[#eee6da] bg-[#fbf8f1] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <p className="font-bold text-[#1d1d1d]">{row.item}</p>
                      <p className="mt-1 text-sm text-[#6d665b]">{row.owner}</p>
                    </div>
                    <span className="w-fit rounded-full bg-[#251f1a] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white">{row.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {metrics.map((metric) => <div key={metric.label} className="rounded-[6px] bg-[#182f2a] p-3 text-white"><div className="font-serif text-2xl font-black">{metric.value}</div><div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#c8ddd5]">{metric.label}</div></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b5a20]">Product proof</p>
          <h2 className="mt-4 font-serif text-4xl font-black leading-tight">A working surface, not a brochure.</h2>
          <p className="mt-4 text-base leading-8 text-[#625b51]">AI Nonprofit Governance Platform is designed around one repeatable workflow: capture the raw input, assign ownership, review the result, and keep the record useful after the first session.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {proof.map((item, index) => <div key={item} className="rounded-[8px] border border-[#d9cfbf] bg-white p-5"><span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8b5a20]">0{index + 1}</span><h3 className="mt-3 font-serif text-2xl font-black">{item}</h3><p className="mt-3 text-sm leading-7 text-[#625b51]">Clear owner, status, source context, and next action so the product feels operational from the first click.</p></div>)}
        </div>
      </section>

      <section className="border-y border-[#ddd5c7] bg-[#171717] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-3">
          {trust.map((item) => <div key={item}><p className="text-xs font-black uppercase tracking-[0.2em] text-[#d8b16d]">Trust layer</p><h3 className="mt-3 font-serif text-2xl font-black">{item}</h3><p className="mt-3 text-sm leading-7 text-[#d8d2c8]">Built for real work: visible review states, scoped records, and output that can be checked before it becomes a decision.</p></div>)}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b5a20]">Ready to test</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-black leading-tight">Start with one real input and leave with one usable record.</h2>
        </div>
        <a href="/app" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#182f2a] px-6 text-sm font-black uppercase tracking-[0.12em] text-white">Import a board packet</a>
      </section>
    </main>
  )
}
