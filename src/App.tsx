import React from 'react';
import TrainerForm from './components/TrainerForm';
import LunaEdgeLogo from './assets/logos/LunaEdgeLogo.svg?react';
import GitHubLogo from './assets/logos/Octicons-mark-github.svg?react'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto flex justify-center">
          <LunaEdgeLogo className="w-48 h-auto" /> 
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <TrainerForm />
        </div>
      </main>

      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto flex flex-col items-center gap-2">
          <a
            href="https://github.com/zweroboy1/pokemon-form"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <GitHubLogo className="w-6 h-6" /> 
            <span>zweroboy1</span>
          </a>
          <p className="text-white text-sm">© 2025</p> 
        </div>
      </footer>
    </div>
  );
}

export default App;