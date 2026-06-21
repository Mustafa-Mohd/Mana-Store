import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, Square, Loader } from 'lucide-react';

// ==========================================
// VAPI PUBLIC KEY
// ==========================================
const vapi = new Vapi('95c94025-a4c7-400f-be41-52c4540176b8');

const VapiButton = () => {
  const [callStatus, setCallStatus] = useState('inactive'); // 'inactive' | 'loading' | 'active'

  useEffect(() => {
    vapi.on('call-start', () => setCallStatus('active'));
    vapi.on('call-end', () => setCallStatus('inactive'));
    vapi.on('error', (e) => {
      console.error(e);
      setCallStatus('inactive');
    });
    
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const toggleCall = () => {
    if (callStatus === 'inactive') {
      setCallStatus('loading');
      // ==========================================
      // VAPI ASSISTANT ID
      // ==========================================
      vapi.start('dc53052e-ba2f-4395-8f42-ceeeac4c7b15');
    } else {
      vapi.stop();
    }
  };

  return (
    <button 
      onClick={toggleCall}
      style={{
        position: 'fixed',
        top: '100px',
        right: '40px',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        backgroundColor: callStatus === 'active' ? '#ff3b30' : '#007aff',
        color: 'white',
        border: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'all 0.3s ease',
        transform: callStatus === 'active' ? 'scale(1.1)' : 'scale(1)'
      }}
      title="Talk to AI Assistant"
    >
      {callStatus === 'active' && <Square size={30} fill="currentColor" />}
      {callStatus === 'loading' && <Loader size={30} className="spinner" />}
      {callStatus === 'inactive' && <Mic size={30} />}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </button>
  );
};

export default VapiButton;
