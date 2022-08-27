import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link, HashRouter, useParams, useRoutes } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>This is Home Component</h1>
    </div>
  )
}

const DocsSection = () => {
  return (
    <div>
      <h1>This is Docs Section: From Dynamic Route</h1>
    </div>
  )
}

const DocsLayout = () => {
  return (
    <div>
      <h1>THis is docs layout</h1>
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/docs">
          <Route index={true} element={<DocsLayout />} />
          <Route path=":section" element={<DocsSection />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}