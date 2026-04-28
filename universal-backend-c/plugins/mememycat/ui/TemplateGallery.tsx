import React, { useEffect, useState } from 'react';

export default function TemplateGallery({ onSelect }: { onSelect: (t: any) => void }) {
  const [templates, setTemplates] = useState<{ static: any[]; animated: any[] }>({
    static: [],
    animated: []
  });

  useEffect(() => {
    fetch('/mememycat/templates')
      .then(res => res.json())
      .then(setTemplates);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Cat Templates</h2>

      <h3>Static</h3>
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

      <h3 style={{ marginTop: 20 }}>Animated</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {templates.animated.map(t => (
          <div
            key={t.file}
            style={{
              width: 120,
              height: 120,
              borderRadius: 8,
              border: '1px dashed #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 12
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
