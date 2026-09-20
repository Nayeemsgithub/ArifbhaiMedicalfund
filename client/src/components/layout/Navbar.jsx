import React, { useState } from 'react';
import { Lock, LogOut, Settings, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { user, isAdmin, logout, setIsAuthModalOpen } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Donate", href: "#donate" },
    { label: "Case Portfolio", href: "#patient-profile" },
    { label: "Funds Feed", href: "#donors" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Brand Text */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg tracking-tight text-black">
            Arif Ahmed Medical Fund
          </span>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-black text-white hidden sm:inline-flex">
            Live
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-bold text-black hover:bg-neutral-100 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <a href="#admin-panel">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Settings}
                  className="text-xs"
                >
                  Admin Panel
                </Button>
              </a>
              <Button
                variant="outline"
                size="sm"
                icon={LogOut}
                onClick={logout}
                className="text-xs"
                title="Sign Out"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              icon={Lock}
              onClick={() => setIsAuthModalOpen(true)}
              className="text-xs font-extrabold"
            >
              Admin Login
            </Button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-black bg-white px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xs font-bold text-black hover:bg-neutral-100 py-1.5 px-2 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2 border-t border-neutral-200">
            {isAdmin ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full text-black"
              >
                Sign Out Admin (Asif)
              </Button>
            ) : (
              <Button
                variant="outline"
                size="md"
                icon={Lock}
                onClick={() => {
                  setMobileOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full justify-center"
              >
                Admin Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
