import React, { useState } from 'react';
import TemplateGallery from './TemplateGallery';
import MemeEditor from './MemeEditor';
import MyCreations from './MyCreations';

export default function MemeMyCatNav() {
  const [screen, setScreen] = useState<'gallery' | 'editor' | 'creations'>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setScreen('editor');
  };

  const handleMemeSaved = () => {
    setScreen('creations');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 70 }}>
        {screen === 'gallery' && (
          <TemplateGallery onSelect={handleTemplateSelect} />
        )}

        {screen === 'editor' && selectedTemplate && (
          <MemeEditor template={selectedTemplate} onSaved={handleMemeSaved} />
        )}

        {screen === 'creations' && <MyCreations />}
      </div>

      <div
        style={{
          height: 60,
          borderTop: '1px solid #eee',
          background: '#faf5ff',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <button onClick={() => setScreen('gallery')}>Templates</button>
        <button onClick={() => selectedTemplate && setScreen('editor')}>Editor</button>
        <button onClick={() => setScreen('creations')}>My Creations</button>
      </div>
    </div>
  );
}
