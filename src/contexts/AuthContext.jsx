import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula verificação de token/sessão
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (cpf, senha) => {
    setIsLoading(true);
    
    // Simula chamada de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação simples para demonstração
        if (cpf === '123.456.789-00' && senha === '123456') {
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          setIsLoading(false);
          resolve({ success: true });
        } else {
          setIsLoading(false);
          reject({ error: 'CPF ou senha inválidos' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const resetPassword = async (cpf) => {
    // Simula envio de email de recuperação
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Email de recuperação enviado com sucesso!' });
      }, 1000);
    });
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    resetPassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

