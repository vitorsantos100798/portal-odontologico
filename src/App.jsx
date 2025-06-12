import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agendamentos from './pages/Agendamentos';
import RedeCredenciada from './pages/RedeCredenciada';
import Historico from './pages/Historico';
import Financeiro from './pages/Financeiro';
import Dependentes from './pages/Dependentes';
import Reembolso from './pages/Reembolso';
import DadosCadastrais from './pages/DadosCadastrais';
import Ajuda from './pages/Ajuda';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="rede-credenciada" element={<RedeCredenciada />} />
            <Route path="historico" element={<Historico />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="dependentes" element={<Dependentes />} />
            <Route path="reembolso" element={<Reembolso />} />
            <Route path="dados-cadastrais" element={<DadosCadastrais />} />
            <Route path="ajuda" element={<Ajuda />} />
          </Route>

          {/* Rota catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

