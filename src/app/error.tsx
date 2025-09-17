"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e3e7ed 100%)',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem',
          maxWidth: 400,
          textAlign: 'center',
        }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: '1rem' }}>
            <circle cx="32" cy="32" r="32" fill="#FEE2E2"/>
            <path d="M32 18v18" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="32" cy="44" r="2.5" fill="#DC2626"/>
          </svg>
          <h1 style={{ color: '#DC2626', fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.5rem' }}>¡Ups! Algo salió mal</h1>

          <button
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
              transition: 'background 0.2s',
            }}
            onClick={() => reset()}
          >
            Recargar página
          </button>
        </div>
      </body>
    </html>
  );
}
