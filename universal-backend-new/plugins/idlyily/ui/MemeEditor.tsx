import React, { useEffect, useState } from 'react';

interface TemplateItem {
  type: 'static' | 'animated';
  file: string;
  path: string;
}

interface Prompt {
  id?: number;
  text: string;
}

export default function MemeEditor({
  template,
  onSaved
}: {
  template: TemplateItem;
  onSaved: () => void;
}) {
  const [couplesMode, setCouplesMode] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [defaults, setDefaults] = useState<string[]>([]);
  const [custom, setCustom] = useState<Prompt[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('/idlyily/prompts')
      .then(res => res.json())
      .then(data => {
        setDefaults(data.defaults || []);
        setCustom(data.custom || []);
      });
  }, []);

  const applyPrompt = (text: string) => {
    setPromptText(text);
  };

  const saveCustomPrompt = async () => {
    if (!promptText.trim()) return;
    const res = await fetch('/idlyily/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: promptText })
    });
    if (res.ok) {
      const created = await res.json();
      setCustom(prev => [created, ...prev]);
    }
  };

  const saveMeme = async () => {
    const caption = `I don’t like you… ${promptText}… BUT I LOVE YOU.`;

    const res = await fetch('/idlyily/memes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: template.path,
        template: template.file,
        title: title || caption,
        couples: couplesMode
      })
    });

    if (res.ok) onSaved();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>IDLYILY Meme Editor</h2>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={couplesMode}
          onChange={e => setCouplesMode(e.target.checked)}
        />
        Couples Mode
      </label>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        {template.type === 'static' ? (
          <img src={template.path} width={320} style={{ borderRadius: 12 }} />
        ) : (
          <div style={{ width: 320, height: 320, background: '#fbe4ef', borderRadius: 12 }}>
            <p style={{ padding: 16 }}>{template.file}</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>I don’t like you…</strong>
        <br />
        <input
          type="text"
          placeholder="when you don’t vacuum, don’t do the dishes, fart then walk away..."
          value={promptText}
          onChange={e => setPromptText(e.target.value)}
          style={{ padding: 8, width: 360, marginTop: 4 }}
        />
        <br />
        <strong>…BUT I LOVE YOU.</strong>
      </div>

      <button onClick={saveCustomPrompt} style={{ marginBottom: 16 }}>
        Save as My Prompt
      </button>

      <div style={{ marginBottom: 16 }}>
        <h3>Quick Prompts</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {defaults.map(p => (
            <button key={p} onClick={() => applyPrompt(p)} style={{ padding: '4px 8px' }}>
              {p}
            </button>
          ))}
          {custom.map(p => (
            <button key={p.id} onClick={() => applyPrompt(p.text)} style={{ padding: '4px 8px' }}>
              {p.text}
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Optional title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ padding: 8, width: 360 }}
      />

      <br />

      <button onClick={saveMeme} style={{ marginTop: 20, padding: '10px 20px' }}>
        Save Meme
      </button>
    </div>
  );
}

