
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          Cloud Deploy Orchestrator &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
