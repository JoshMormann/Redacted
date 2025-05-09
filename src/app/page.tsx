// src/app/page.tsx
import React from 'react';
import GameBoard from '../components/GameBoard'; // Adjust path if necessary

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-4">Redacted: Disclosure is Eminent</h1>
      <div className="w-full max-w-6xl">
        <GameBoard />
      </div>
    </main>
  );
}

