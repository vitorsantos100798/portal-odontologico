import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Calendar,
  CreditCard,
  FileText,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

// Componente de carrossel simples
const Carousel = () => {
  const images = [
    'https://www.uniodonto.coop.br/wp-content/uploads/2025/06/SITE-NAMORADOS.webp',
    'https://www.uniodonto.coop.br/wp-content/uploads/2025/06/Site-Doacao.webp',
    'https://www.uniodonto.coop.br/wp-content/uploads/2025/06/MA-Site.webp'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="w-full h-auto object-cover transition duration-500 ease-in-out"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#B7335D] font-bold px-3 py-1 rounded-full shadow"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#B7335D] font-bold px-3 py-1 rounded-full shadow"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Carrossel de banners */}
      <Carousel />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-[#B7335D] rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bem-vindo, {user?.nome}!
            </h1>
            <p className="text-gray-600">
              Aqui você pode gerenciar todos os seus dados e serviços odontológicos
            </p>
          </div>
        </div>
      </div>

      {/* Cards de Informações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status do Plano</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">{user?.plano?.tipo}</p>
              <p className="text-sm text-gray-600">{user?.plano?.nome}</p>
              <Badge className={getStatusColor(user?.plano?.status)}>
                {user?.plano?.status?.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
            <Calendar className="h-4 w-4 text-[#B7335D]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {formatDate(user?.proximaConsulta?.data)}
              </p>
              <p className="text-sm text-gray-600">
                {user?.proximaConsulta?.horario} - {user?.proximaConsulta?.dentista}
              </p>
              <p className="text-xs text-gray-500">
                {user?.proximaConsulta?.especialidade}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensalidade</CardTitle>
            <CreditCard className="h-4 w-4 text-[#00D1D1]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {formatCurrency(user?.plano?.valor)}
              </p>
              <p className="text-sm text-gray-600">
                Vencimento: {formatDate(user?.plano?.dataVencimento)}
              </p>
              <Badge className="bg-yellow-100 text-yellow-800">PENDENTE</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col space-y-2"
              onClick={() => navigate('/agendamentos')}
            >
              <Calendar className="h-6 w-6 text-[#B7335D]" />
              <span className="text-sm">Agendar Consulta</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col space-y-2"
              onClick={() => navigate('/rede-credenciada')}
            >
              <MapPin className="h-6 w-6 text-[#B7335D]" />
              <span className="text-sm">Buscar Dentista</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col space-y-2"
              onClick={() => navigate('/financeiro')}
            >
              <CreditCard className="h-6 w-6 text-[#B7335D]" />
              <span className="text-sm">Gerar Boleto</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col space-y-2"
              onClick={() => navigate('/reembolso')}
            >
              <FileText className="h-6 w-6 text-[#B7335D]" />
              <span className="text-sm">Solicitar Reembolso</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes da Próxima Consulta */}
      {user?.proximaConsulta && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#B7335D]" />
              <span>Detalhes da Próxima Consulta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Data e Horário</p>
                  <p className="text-lg">
                    {formatDate(user.proximaConsulta.data)} às {user.proximaConsulta.horario}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Profissional</p>
                  <p className="text-lg">{user.proximaConsulta.dentista}</p>
                  <p className="text-sm text-gray-600">{user.proximaConsulta.especialidade}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Local</p>
                  <p className="text-lg">{user.proximaConsulta.clinica}</p>
                  <p className="text-sm text-gray-600">{user.proximaConsulta.endereco}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-[#B7335D] hover:bg-[#8B2347]"
                    onClick={() => navigate('/agendamentos')}
                  >
                    Reagendar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/agendamentos')}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span>Avisos Importantes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Fatura em Aberto</p>
                <p className="text-sm text-yellow-700">
                  Sua fatura de dezembro vence em {formatDate(user?.plano?.dataVencimento)}.
                  Clique aqui para gerar a segunda via.
                </p>
                <Button
                  size="sm"
                  className="mt-2 bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => navigate('/financeiro')}
                >
                  Ver Fatura
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
