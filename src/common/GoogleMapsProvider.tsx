'use client'

import React from 'react'

import { APIProvider } from '@vis.gl/react-google-maps'

interface GoogleMapsProviderProps {
  children: React.ReactNode
}

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined in environment variables')

    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          color: 'red',
          border: '2px dashed #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          margin: '20px 0'
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#d63031' }}>Google Maps API Key Missing</h3>
        <p style={{ margin: '0 0 10px 0' }}>Please add your Google Maps API key to your environment variables:</p>
        <code
          style={{
            display: 'block',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
            margin: '10px 0',
            color: '#333'
          }}
        >
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here
        </code>
        <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
          Create a .env.local file in your project root with the above variable.
        </p>
      </div>
    )
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>
}

export default GoogleMapsProvider
