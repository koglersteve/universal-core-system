import React, { useEffect, useState } from 'react';

export default function TemplateGallery({ onSelect }: { onSelect: (t: any) => void }) {
  const [templates, setTemplates] = useState<{ static: any[] }>({ static: [] });

  useEffect(() => {
    fetch('/mememydog/templates')
      .then(res => res.json())
      .then(setTemplates);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dog Templates</h2>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {templates.static.map(t => (
          <img
            key={t.file}
            src={t.path}
            alt={t.file}
            width={120}
            style={{ cursor: 'pointer', borderRadius: 8 }}
            onClick={() => onSelect(t)}
          />
        ))}
      </div>
    </div>
  );
}
