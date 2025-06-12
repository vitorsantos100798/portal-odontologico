import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  CreditCard, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Copy
} from 'lucide-react';
import { mockFinanceiro } from '../data/mockData';

const Financeiro = () => {
  const [financeiro] = useState(mockFinanceiro);
  const [copiedCode, setCopiedCode] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pago':
        return <CheckCircle className="h-4 w-4" />;
      case 'pendente':
        return <Clock className="h-4 w-4" />;
      case 'vencido':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const isVencido = (vencimento) => {
    return new Date(vencimento) < new Date();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadBoleto = (faturaId) => {
    // Simula download do boleto
    alert(`Boleto da fatura ${faturaId} sendo gerado... O download iniciará em breve.`);
  };

  const handleVisualizarFatura = (faturaId) => {
    // Simula visualização da fatura
    alert(`Abrindo fatura ${faturaId} para visualização...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Área Financeira</h1>
        <p className="text-gray-600">Gerencie seus planos, faturas e pagamentos</p>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <CreditCard className="h-4 w-4 text-[#B7335D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financeiro.planos.length}</div>
            <p className="text-xs text-muted-foreground">
              Contratos vigentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-[#00D1D1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(financeiro.planos.reduce((sum, plano) => sum + plano.valor, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Total dos planos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financeiro.faturas.filter(f => f.status === 'pendente').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando pagamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financeiro.faturas.find(f => f.status === 'pendente') 
                ? formatDate(financeiro.faturas.find(f => f.status === 'pendente').vencimento).split('/')[0]
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Dias para vencimento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {financeiro.faturas.some(f => f.status === 'pendente' && isVencido(f.vencimento)) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Atenção!</strong> Você possui faturas vencidas. Regularize sua situação para evitar a suspensão dos serviços.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="faturas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faturas">Faturas</TabsTrigger>
          <TabsTrigger value="planos">Planos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="faturas" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Faturas</h3>
          </div>

          {financeiro.faturas.map((fatura) => (
            <Card key={fatura.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">{fatura.mes}</h4>
                        <p className="text-2xl font-bold text-[#B7335D]">
                          {formatCurrency(fatura.valor)}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(fatura.status)} flex items-center space-x-1`}>
                        {getStatusIcon(fatura.status)}
                        <span>{fatura.status.toUpperCase()}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Vencimento</p>
                        <p className="font-medium">{formatDate(fatura.vencimento)}</p>
                      </div>
                      {fatura.dataPagamento && (
                        <div>
                          <p className="text-gray-500">Data do Pagamento</p>
                          <p className="font-medium">{formatDate(fatura.dataPagamento)}</p>
                        </div>
                      )}
                    </div>

                    {fatura.codigoBarras && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Código de Barras</p>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <code className="text-xs flex-1 font-mono">
                            {fatura.codigoBarras}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(fatura.codigoBarras)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {copiedCode && (
                          <p className="text-xs text-green-600">Código copiado!</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 lg:ml-6">
                    <Button 
                      size="sm"
                      onClick={() => handleVisualizarFatura(fatura.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    {fatura.status === 'pendente' && (
                      <Button 
                        size="sm" 
                        className="bg-[#B7335D] hover:bg-[#8B2347]"
                        onClick={() => handleDownloadBoleto(fatura.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Baixar Boleto
                      </Button>
                    )}
                    {fatura.status === 'pago' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Comprovante
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="planos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Planos Contratados</h3>
          </div>

          {financeiro.planos.map((plano) => (
            <Card key={plano.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold">{plano.nome}</h4>
                      <Badge className={getStatusColor(plano.status)}>
                        {plano.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Valor Mensal</p>
                        <p className="text-xl font-bold text-[#B7335D]">
                          {formatCurrency(plano.valor)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Vencimento</p>
                        <p className="font-medium">Todo dia {plano.vencimento}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium capitalize">{plano.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 lg:ml-6">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      Alterar Plano
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Histórico de Pagamentos</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Histórico
            </Button>
          </div>

          {financeiro.faturas
            .filter(f => f.status === 'pago')
            .map((fatura) => (
              <Card key={fatura.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{fatura.mes}</h4>
                        <Badge className={getStatusColor(fatura.status)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          PAGO
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Valor Pago</p>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(fatura.valor)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Data do Pagamento</p>
                          <p className="font-medium">{formatDate(fatura.dataPagamento)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Vencimento</p>
                          <p className="font-medium">{formatDate(fatura.vencimento)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 lg:ml-6">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Comprovante
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {financeiro.faturas.filter(f => f.status === 'pago').length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pagamento encontrado
                </h3>
                <p className="text-gray-600">
                  Seu histórico de pagamentos aparecerá aqui após a quitação das faturas.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financeiro;

