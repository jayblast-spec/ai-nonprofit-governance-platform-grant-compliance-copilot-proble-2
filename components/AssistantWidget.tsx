'use client';

import { useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "hey! i'm the AI Nonprofit Governance Platform assistant \u2014 ask me anything about how this works \u2728" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const next: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);
    const response = await fetch('/api/assistant', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: next }) });
    const data = await response.json();
    setMessages([...next, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col rounded-xl border border-white/10 bg-[#0b0e16] shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3 text-sm font-bold text-white">AI Nonprofit Governance Platform assistant</div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((message, index) => (
              <p key={index} className={message.role === 'user' ? 'text-cyan-200' : 'text-slate-200'}>{message.content}</p>
            ))}
            {loading && <p className="text-slate-400">typing...</p>}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="ask something..." className="flex-1 rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none" />
            <button onClick={send} className="rounded-md bg-cyan-300 px-3 py-2 text-sm font-bold text-slate-950">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl">{open ? 'Close' : 'Ask AI'}</button>
    </div>
  );
}
