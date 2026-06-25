'use client'
import { useState } from 'react'
import Link from 'next/link'

const QUEUE_ITEMS = [{ id: 1, label: "Motion source captured", status: "Ready" }, { id: 2, label: "Owner/date matrix", status: "In review" }, { id: 3, label: "Policy impact label", status: "Needs action" }]

export default function AppPage() {
  const [title, setTitle] = useState("Grant report due")
  const [notes, setNotes] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate() {
    if (!title.trim()) return
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Create a structured record for: ' + title + (notes ? '. Context: ' + notes : '') }),
      })
      const data = await res.json()
      setOutput(data.output || data.result || 'Record generated successfully.')
    } catch (_e) {
      setError('Failed to generate. Check your GROQ_API_KEY in Vercel environment variables.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#070b16', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: '#22d3ee', textDecoration: 'none', fontWeight: 900, fontSize: 14, letterSpacing: '0.1em' }}>GOVERNANCE OS</Link>
        <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 12 }}>Home</Link>
          <Link href="/pricing" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 12 }}>Pricing</Link>
        </nav>
      </header>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 20, alignItems: 'start' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 24 }}>
          <p style={{ color: '#22d3ee', fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 16px' }}>New Record</p>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter record title..."
            style={{ width: '100%', boxSizing: 'border-box', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', padding: '10px 14px', fontSize: 14, outline: 'none', marginBottom: 16 }}
          />
          <label style={{ display: 'block', color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Notes or context</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste relevant notes, document text, or context..."
            rows={5}
            style={{ width: '100%', boxSizing: 'border-box', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', resize: 'vertical', marginBottom: 20 }}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !title.trim()}
            style={{ width: '100%', minHeight: 46, background: loading || !title.trim() ? 'rgba(34,211,238,0.2)' : '#22d3ee', color: '#000', borderRadius: 8, border: 'none', fontWeight: 900, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading || !title.trim() ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Generating...' : 'Generate Record'}
          </button>
          {error && <p style={{ color: '#f87171', fontSize: 12, marginTop: 12 }}>{error}</p>}
          {output && (
            <div style={{ marginTop: 20, background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 8, padding: 16 }}>
              <p style={{ color: '#22d3ee', fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 10px' }}>AI Output</p>
              <p style={{ color: '#e2e8f0', fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{output}</p>
            </div>
          )}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 16, marginBottom: 20 }}>
            <div>
              <p style={{ color: '#22d3ee', fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>Review Queue</p>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 22, margin: 0 }}>Decision-to-evidence workflow</h2>
            </div>
            <span style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', borderRadius: 20, padding: '6px 14px', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Active</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QUEUE_ITEMS.map((item) => (
              <div key={item.id} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14, margin: '0 0 4px' }}>{item.label}</p>
                  <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>Record #{item.id}</p>
                </div>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', borderRadius: 6, padding: '4px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item.status}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 8, padding: 16 }}>
            <p style={{ color: '#22d3ee', fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 8px' }}>Tip</p>
            <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6, margin: 0 }}>Enter a title above and click Generate Record to create an AI-powered record using Governance OS.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
