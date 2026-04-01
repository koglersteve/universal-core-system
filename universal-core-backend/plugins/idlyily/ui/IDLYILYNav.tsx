import React, { useState } from 'react';
import TemplateGallery from './TemplateGallery';
import MemeEditor from './MemeEditor';
import MyCreations from './MyCreations';

export default function IDLYILYNav() {
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
      
      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 70 }}>
        {screen === 'gallery' && (
          <TemplateGallery onSelect={handleTemplateSelect} />
        )}

        {screen === 'editor' && selectedTemplate && (
          <MemeEditor template={selectedTemplate} onSaved={handleMemeSaved} />
        )}

        {screen === 'creations' && <MyCreations />}
      </div>

      {/* NAVIGATION BAR */}
      <div
        style={{
          height: 60,
          borderTop: '1px solid #f3c4d6',
          background: '#fde8f1',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <button
          onClick={() => setScreen('gallery')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            color: screen === 'gallery' ? '#d63384' : '#555',
            cursor: 'pointer'
          }}
        >
          Templates
        </button>

        <button
          onClick={() => selectedTemplate && setScreen('editor')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            color: screen === 'editor' ? '#d63384' : selectedTemplate ? '#555' : '#aaa',
            cursor: selectedTemplate ? 'pointer' : 'not-allowed'
          }}
        >
          Editor
        </button>

        <button
          onClick={() => setScreen('creations')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            color: screen === 'creations' ? '#d63384' : '#555',
            cursor: 'pointer'
          }}
        >
          My Creations
        </button>
      </div>
    </div>
  );
}
