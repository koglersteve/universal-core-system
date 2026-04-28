import React, { useState } from 'react';

interface TemplateItem {
  type: 'static' | 'animated';
  file: string;
  path: string;
}

export default function MemeEditor({ template, onSaved }: { template: TemplateItem; onSaved: () => void }) {
  const [title, setTitle] = useState('');

  const saveMeme = async () => {
    const res = await fetch('/hoa-meme/memes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: template.path,
        template: template.file,
        title
      })
    });

    if (res.ok) onSaved();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Meme Editor</h2>

      <div style={{ marginBottom: 20 }}>
        {template.type === 'static' ? (
          <img src={template.path} width={300} />
        ) : (
          <div style={{ width: 300, height: 300, background: '#ddd' }}>
            <p>{template.file}</p>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Optional title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ padding: 8, width: 300 }}
      />

      <br />

      <button onClick={saveMeme} style={{ marginTop: 20, padding: '10px 20px' }}>
        Save Meme
      </button>
    </div>
  );
}

