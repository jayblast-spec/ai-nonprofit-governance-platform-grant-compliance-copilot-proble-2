import { NextResponse } from 'next/server';
import { runProductEngine } from '@/lib/product-engine';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const input = String(body.input || body.idea || body.resume || body.location || body.job_description || '').trim();
  if (!input) return NextResponse.json({ error: 'input is required' }, { status: 400 });
  return NextResponse.json({ output: runProductEngine(body), spec: runProductEngine(body) });
}
