import React, { useState } from 'react';
import { Lock, AlertCircle, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function AdminLoginModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, authError, setAuthError, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleFillDemo = () => {
    setUsername('Asif');
    setPassword('ASif_Ahmed');
    setAuthError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm rounded-2xl bg-white border border-black p-6 shadow-2xl space-y-4">
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setAuthError(null);
          }}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black text-sm"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black">Admin Sign In</h3>
            <p className="text-xs text-neutral-500">Edit dashboard info, ledger & upload docs</p>
          </div>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-neutral-100 border border-black flex items-start gap-2 text-black text-xs font-bold">
            <AlertCircle className="h-4 w-4 text-black shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Username *"
            required
            placeholder="Asif"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Password *"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            className="w-full text-xs font-bold uppercase tracking-wider mt-1"
          >
            Sign In
          </Button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="pt-2 border-t border-neutral-200">
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs text-black font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="h-3 w-3 text-black" /> Auto-fill (Asif / ASif_Ahmed)
          </button>
        </div>
      </div>
    </div>
  );
}
