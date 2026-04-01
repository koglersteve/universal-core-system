import React, { useEffect, useState } from 'react';

interface TemplateItem {
  type: 'static' | 'animated';
  file: string;
  path: string;
}

export default function TemplateGallery({ onSelect }: { onSelect: (t: TemplateItem) => void }) {
  const [templates, setTemplates] = useState<{ static: TemplateItem[]; animated: TemplateItem[] }>({
    static: [],
    animated: []
  });

  useEffect(() => {
    fetch('/hoa-meme/templates')
      .then(res => res.json())
      .then(setTemplates);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Static Templates</h2>
      <div style={{ display: 'flex', gap: 12 }}>
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

      <h2 style={{ marginTop: 30 }}>Animated Templates</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        {templates.animated.map(t => (
          <div
            key={t.file}
            style={{
              width: 120,
              height: 120,
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: 8
            }}
            onClick={() => onSelect(t)}
          >
            {t.file}
          </div>
        ))}
      </div>
    </div>
  );
}
