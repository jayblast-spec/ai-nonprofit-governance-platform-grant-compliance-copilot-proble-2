type Input = Record<string, unknown>;

export function runProductEngine(input: Input) {
  const raw = String(input.input || input.idea || input.resume || input.location || input.job_description || '').trim();
  const words = raw.toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g) || [];
  const unique = Array.from(new Set(words)).slice(0, 12);
  return {
    title: 'AI Nonprofit Governance Platform result',
    summary: 'Generated a structured result for: ' + raw.slice(0, 160),
    score: Math.min(96, Math.max(42, unique.length * 7)),
    insights: unique.slice(0, 5).map((word) => 'Important signal detected: ' + word),
    actions: ['Review the generated output', 'Save the result in a project workspace', 'Upgrade to export and continue working', 'Run one more pass with more context'],
    upgrade_prompt: 'Subscribe to save, export, and continue'
  };
}
