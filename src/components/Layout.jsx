import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Home,
  Calendar,
  MapPin,
  FileText,
  CreditCard,
  Users,
  RefreshCw,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
    { icon: MapPin, label: "Rede Credenciada", path: "/rede-credenciada" },
    { icon: FileText, label: "Histórico", path: "/historico" },
    { icon: CreditCard, label: "Financeiro", path: "/financeiro" },
    { icon: Users, label: "Dependentes", path: "/dependentes" },
    { icon: RefreshCw, label: "Reembolso", path: "/reembolso" },
    { icon: Settings, label: "Dados Cadastrais", path: "/dados-cadastrais" },
    { icon: HelpCircle, label: "Ajuda", path: "/ajuda" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FFFFFF] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-[#B7335D] hover:bg-[#B7335D]/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <img
              src="https://www.uniodonto.coop.br/wp-content/uploads/2022/10/Uniodonto-originais-da-marca-rgb-Asset-3.png"
              alt="Logo da Uniodonto"
              style={{ width: "200px", height: "auto" }}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-500">{user?.nome}</p>
              <p className="text-xs opacity-90 text-gray-500">
                {user?.plano?.nome}
              </p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gray-200 [color:#B7335D] font-semibold">
                {user?.nome
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start space-x-3 ${
                      isActive
                        ? "bg-[#B7335D] text-white hover:bg-[#B7335D]/90"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </nav>

            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
