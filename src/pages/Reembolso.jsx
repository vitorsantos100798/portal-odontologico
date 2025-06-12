import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  RefreshCw, 
  Plus, 
  Upload, 
  FileText, 
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download
} from 'lucide-react';
import { mockReembolsos } from '../data/mockData';

const Reembolso = () => {
  const [reembolsos, setReembolsos] = useState(mockReembolsos);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    procedimento: '',
    valor: '',
    data: '',
    dentista: '',
    clinica: '',
    observacoes: ''
  });
  const [anexos, setAnexos] = useState([]);

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
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'em_analise':
        return 'bg-blue-100 text-blue-800';
      case 'rejeitado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="h-4 w-4" />;
      case 'em_analise':
        return <Clock className="h-4 w-4" />;
      case 'rejeitado':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'aprovado':
        return 'APROVADO';
      case 'em_analise':
        return 'EM ANÁLISE';
      case 'rejeitado':
        return 'REJEITADO';
      default:
        return status.toUpperCase();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAnexos = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setAnexos(prev => [...prev, ...newAnexos]);
  };

  const removeAnexo = (id) => {
    setAnexos(prev => prev.filter(anexo => anexo.id !== id));
  };

  const resetForm = () => {
    setFormData({
      procedimento: '',
      valor: '',
      data: '',
      dentista: '',
      clinica: '',
      observacoes: ''
    });
    setAnexos([]);
  };

  const handleSubmit = () => {
    if (!formData.procedimento || !formData.valor || !formData.data || !formData.dentista) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (anexos.length === 0) {
      alert('Por favor, anexe pelo menos um documento');
      return;
    }

    const novoReembolso = {
      id: reembolsos.length + 1,
      data: formData.data,
      procedimento: formData.procedimento,
      valor: parseFloat(formData.valor),
      status: 'em_analise',
      valorSolicitado: parseFloat(formData.valor),
      dentista: formData.dentista,
      clinica: formData.clinica,
      observacoes: formData.observacoes,
      anexos: anexos
    };

    setReembolsos(prev => [novoReembolso, ...prev]);
    setShowForm(false);
    resetForm();
    alert('Solicitação de reembolso enviada com sucesso!');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solicitação de Reembolso</h1>
          <p className="text-gray-600">Solicite reembolso de procedimentos realizados fora da rede</p>
        </div>
        
        <Button 
          className="bg-[#B7335D] hover:bg-[#8B2347]"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Solicitação
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solicitado</CardTitle>
            <DollarSign className="h-4 w-4 text-[#B7335D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(reembolsos.reduce((sum, r) => sum + r.valor, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor total das solicitações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reembolsos.filter(r => r.status === 'em_analise').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando avaliação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reembolsos.filter(r => r.status === 'aprovado').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Reembolsos aprovados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Reembolsado</CardTitle>
            <RefreshCw className="h-4 w-4 text-[#00D1D1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(reembolsos
                .filter(r => r.status === 'aprovado')
                .reduce((sum, r) => sum + (r.valorReembolso || 0), 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total já reembolsado
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="historico" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="nova" disabled={!showForm}>Nova Solicitação</TabsTrigger>
        </TabsList>

        <TabsContent value="historico" className="space-y-4">
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Nova Solicitação de Reembolso</CardTitle>
                <CardDescription>
                  Preencha os dados do procedimento realizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="procedimento">Procedimento *</Label>
                    <Input
                      id="procedimento"
                      placeholder="Ex: Limpeza dental, Restauração..."
                      value={formData.procedimento}
                      onChange={(e) => handleInputChange('procedimento', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Pago *</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={formData.valor}
                      onChange={(e) => handleInputChange('valor', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data">Data do Procedimento *</Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => handleInputChange('data', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dentista">Dentista *</Label>
                    <Input
                      id="dentista"
                      placeholder="Nome do profissional"
                      value={formData.dentista}
                      onChange={(e) => handleInputChange('dentista', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinica">Clínica/Consultório</Label>
                    <Input
                      id="clinica"
                      placeholder="Nome da clínica"
                      value={formData.clinica}
                      onChange={(e) => handleInputChange('clinica', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Informações adicionais sobre o procedimento..."
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anexos">Anexos *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Clique para selecionar ou arraste os arquivos aqui
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Formatos aceitos: PDF, JPG, PNG (máx. 5MB cada)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      Selecionar Arquivos
                    </Button>
                  </div>

                  {anexos.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Arquivos selecionados:</p>
                      {anexos.map((anexo) => (
                        <div key={anexo.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{anexo.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(anexo.size)})</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeAnexo(anexo.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={handleSubmit}
                    className="bg-[#B7335D] hover:bg-[#8B2347]"
                  >
                    Enviar Solicitação
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {reembolsos.map((reembolso) => (
              <Card key={reembolso.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {reembolso.procedimento}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Solicitado em {formatDate(reembolso.data)}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(reembolso.status)} flex items-center space-x-1`}>
                          {getStatusIcon(reembolso.status)}
                          <span>{getStatusText(reembolso.status)}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Valor Solicitado</p>
                          <p className="font-semibold text-[#B7335D]">
                            {formatCurrency(reembolso.valorSolicitado || reembolso.valor)}
                          </p>
                        </div>
                        {reembolso.valorReembolso && (
                          <div>
                            <p className="text-gray-500">Valor Aprovado</p>
                            <p className="font-semibold text-green-600">
                              {formatCurrency(reembolso.valorReembolso)}
                            </p>
                          </div>
                        )}
                        {reembolso.dataReembolso && (
                          <div>
                            <p className="text-gray-500">Data do Reembolso</p>
                            <p className="font-medium">{formatDate(reembolso.dataReembolso)}</p>
                          </div>
                        )}
                      </div>

                      {reembolso.motivoRejeicao && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Motivo da rejeição:</strong> {reembolso.motivoRejeicao}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 lg:ml-6">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      {reembolso.status === 'aprovado' && (
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
          </div>

          {reembolsos.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma solicitação encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Você ainda não possui solicitações de reembolso. Clique no botão acima para fazer sua primeira solicitação.
                </p>
                <Button 
                  className="bg-[#B7335D] hover:bg-[#8B2347]"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Solicitação
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reembolso;

