import { useState } from 'react';
import './App.css';

/** One SSE event block (content between blank lines). */
function parseSseBlock(block: string): { event: string; data: string } {
  let event = 'message'
  const dataLines: string[] = []
  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim()
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).replace(/^\s/, ''))
    }
  }

  return { event, data: dataLines.join('\n') }
}

function App() {
  const [output, setOutput] = useState('')
  const [streaming, setStreaming] = useState(false)

  const streamChat = async () => {
    setOutput('')
    setStreaming(true)
    try {
      const res = await fetch('http://localhost:8000/chats/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Explain about agentic ai in 10 words' },
          ],
        }),
      })

      if (!res.ok) {
        setOutput(`Request failed: ${res.status}`)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        setOutput('No response body')
        return
      }

      const decoder = new TextDecoder()
      let buffer = ''

      const flushBlocks = (raw: string) => {
        const normalized = raw.replace(/\r\n/g, '\n')
        const parts = normalized.split('\n\n')
        const complete = parts.slice(0, -1)
        const rest = parts[parts.length - 1] ?? ''
        for (const block of complete) {
          const trimmed = block.trim()
          if (!trimmed) continue
          const { event, data } = parseSseBlock(trimmed)
          if (event === 'error') {
            setOutput((prev) => prev + (prev ? '\n' : '') + `[error] ${data}`)
          } else if (data) {
            setOutput((prev) => prev + data)
          }
        }
        return rest
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        buffer = flushBlocks(buffer)
      }

      decoder.decode()
      if (buffer.trim()) {
        const { event, data } = parseSseBlock(buffer.trim())
        if (event === 'error') {
          setOutput((prev) => prev + (prev ? '\n' : '') + `[error] ${data}`)
        } else if (data) {
          setOutput((prev) => prev + data)
        }
      }
    } catch (e) {
      setOutput(e instanceof Error ? e.message : String(e))
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <button
        type="button"
        onClick={streamChat}
        disabled={streaming}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-50"
      >
        {streaming ? 'Streaming…' : 'Start'}
      </button>
      <article
        className="min-h-[120px] rounded-xl border border-[var(--border)] bg-[var(--code-bg)] p-4 break-words whitespace-pre-wrap text-[var(--text-h)]"
        aria-live="polite"
      >
        {output ||
          (streaming ? '…' : 'Click Start to stream a reply.')}
      </article>
    </div>
  )
}

export default App
