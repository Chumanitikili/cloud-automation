
import React from 'react';
import { Button } from "@/components/ui/button";
import { GitBranchIcon, CloudIcon, GaugeIcon, Settings } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <CloudIcon className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">Cloud Deploy Orchestrator</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink 
            to="/"
            className={({isActive}) => cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent/20 hover:text-accent"
            )}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/deploy"
            className={({isActive}) => cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent/20 hover:text-accent"
            )}
          >
            Deploy
          </NavLink>
          <NavLink 
            to="/monitoring"
            className={({isActive}) => cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent/20 hover:text-accent"
            )}
          >
            Monitoring
          </NavLink>
          <NavLink 
            to="/settings"
            className={({isActive}) => cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent/20 hover:text-accent"
            )}
          >
            Settings
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden lg:flex gap-2">
            <GitBranchIcon className="h-4 w-4" />
            <span>main</span>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <GaugeIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
