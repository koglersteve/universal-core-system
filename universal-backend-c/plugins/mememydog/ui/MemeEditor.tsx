import React, { useState } from 'react';

export default function MemeEditor({ template, onSaved }: any) {
  const [title, setTitle] = useState('');

  const saveMeme = async () => {
    const res = await fetch('/mememydog/memes', {
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
      <h2>Create Dog Meme</h2>

      <img src={template.path} width={320} style={{ borderRadius: 12 }} />

      <input
        type="text"
        placeholder="Add meme text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ padding: 8, width: 320, marginTop: 12 }}
      />

      <button onClick={saveMeme} style={{ marginTop: 20 }}>
        Save Meme
      </button>
    </div>
  );
}
