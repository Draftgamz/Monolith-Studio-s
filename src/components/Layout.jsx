import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PlayerBar from './PlayerBar';

function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
      <PlayerBar />
    </div>
  );
}

export default Layout;
