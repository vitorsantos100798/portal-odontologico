import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { 
  HelpCircle, 
  Plus, 
  Search, 
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockFAQ, mockChamados } from '../data/mockData';

const Ajuda = () => {
  const [faq] = useState(mockFAQ);
  const [chamados, setChamados] = useState(mockChamados);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNovoChamado, setShowNovoChamado] = useState(false);
  const [formChamado, setFormChamado] = useState({
    assunto: '',
    categoria: '',
    prioridade: '',
    descricao: ''
  });

  const categorias = [
    'Agendamento',
    'Financeiro',
    'Rede Credenciada',
    'Reembolso',
    'Dados Cadastrais',
    'Técnico',
    'Outros'
  ];

  const prioridades = [
    { value: 'baixa', label: 'Baixa', color: 'bg-green-100 text-green-800' },
    { value: 'media', label: 'Média', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'alta', label: 'Alta', color: 'bg-red-100 text-red-800' }
  ];

  const filteredFAQ = faq.filter(item =>
    searchTerm === '' ||
    item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.resposta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'aberto':
        return 'bg-blue-100 text-blue-800';
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolvido':
        return 'bg-green-100 text-green-800';
      case 'fechado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aberto':
        return <AlertCircle className="h-4 w-4" />;
      case 'em_andamento':
        return <Clock className="h-4 w-4" />;
      case 'resolvido':
        return <CheckCircle className="h-4 w-4" />;
      case 'fechado':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'aberto':
        return 'ABERTO';
      case 'em_andamento':
        return 'EM ANDAMENTO';
      case 'resolvido':
        return 'RESOLVIDO';
      case 'fechado':
        return 'FECHADO';
      default:
        return status.toUpperCase();
    }
  };

  const getPrioridadeColor = (prioridade) => {
    const prio = prioridades.find(p => p.value === prioridade);
    return prio ? prio.color : 'bg-gray-100 text-gray-800';
  };

  const handleFormChange = (field, value) => {
    setFormChamado(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormChamado({
      assunto: '',
      categoria: '',
      prioridade: '',
      descricao: ''
    });
  };

  const handleSubmitChamado = () => {
    if (!formChamado.assunto || !formChamado.categoria || !formChamado.prioridade || !formChamado.descricao) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const novoChamado = {
      id: chamados.length + 1,
      data: new Date().toISOString().split('T')[0],
      assunto: formChamado.assunto,
      categoria: formChamado.categoria,
      status: 'aberto',
      prioridade: formChamado.prioridade,
      descricao: formChamado.descricao
    };

    setChamados(prev => [novoChamado, ...prev]);
    setShowNovoChamado(false);
    resetForm();
    alert('Chamado criado com sucesso! Você receberá atualizações por email.');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Central de Ajuda</h1>
        <p className="text-gray-600">Encontre respostas ou entre em contato conosco</p>
      </div>

      {/* Contatos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-[#B7335D] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Telefone</h3>
            <p className="text-sm text-gray-600 mb-2">(19) 3000-0000</p>
            <p className="text-xs text-gray-500">Seg a Sex: 8h às 18h</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-[#B7335D] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">E-mail</h3>
            <p className="text-sm text-gray-600 mb-2">suporte@uniodonto.com.br</p>
            <p className="text-xs text-gray-500">Resposta em até 24h</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-[#B7335D] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Chat Online</h3>
            <p className="text-sm text-gray-600 mb-2">Atendimento imediato</p>
            <p className="text-xs text-gray-500">Seg a Sex: 8h às 18h</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="chamados">Meus Chamados</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* Busca FAQ */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar nas perguntas frequentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="text-left">
                      {item.pergunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.resposta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQ.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma pergunta encontrada
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tente usar termos diferentes ou entre em contato conosco.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                  >
                    Limpar Busca
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Não encontrou resposta */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Não encontrou a resposta?</h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe está pronta para ajudar você
              </p>
              <Dialog open={showNovoChamado} onOpenChange={setShowNovoChamado}>
                <DialogTrigger asChild>
                  <Button className="bg-[#B7335D] hover:bg-[#8B2347]">
                    <Plus className="h-4 w-4 mr-2" />
                    Abrir Chamado
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Novo Chamado de Suporte</DialogTitle>
                    <DialogDescription>
                      Descreva sua dúvida ou problema e nossa equipe entrará em contato
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="assunto">Assunto</Label>
                      <Input
                        id="assunto"
                        placeholder="Resumo do seu problema"
                        value={formChamado.assunto}
                        onChange={(e) => handleFormChange('assunto', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="categoria">Categoria</Label>
                        <Select value={formChamado.categoria} onValueChange={(value) => handleFormChange('categoria', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorias.map((categoria) => (
                              <SelectItem key={categoria} value={categoria}>
                                {categoria}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="prioridade">Prioridade</Label>
                        <Select value={formChamado.prioridade} onValueChange={(value) => handleFormChange('prioridade', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {prioridades.map((prioridade) => (
                              <SelectItem key={prioridade.value} value={prioridade.value}>
                                {prioridade.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva detalhadamente seu problema ou dúvida..."
                        value={formChamado.descricao}
                        onChange={(e) => handleFormChange('descricao', e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button 
                        onClick={handleSubmitChamado}
                        className="flex-1 bg-[#B7335D] hover:bg-[#8B2347]"
                      >
                        Enviar Chamado
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowNovoChamado(false);
                          resetForm();
                        }}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chamados" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Meus Chamados</h3>
            <Button 
              className="bg-[#B7335D] hover:bg-[#8B2347]"
              onClick={() => setShowNovoChamado(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Chamado
            </Button>
          </div>

          {chamados.map((chamado) => (
            <Card key={chamado.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {chamado.assunto}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Chamado #{chamado.id} • Aberto em {formatDate(chamado.data)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={`${getStatusColor(chamado.status)} flex items-center space-x-1`}>
                          {getStatusIcon(chamado.status)}
                          <span>{getStatusText(chamado.status)}</span>
                        </Badge>
                        <Badge className={getPrioridadeColor(chamado.prioridade)}>
                          {chamado.prioridade.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p><strong>Categoria:</strong> {chamado.categoria}</p>
                      <p className="mt-2">{chamado.descricao}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 lg:ml-6">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    {chamado.status === 'resolvido' && (
                      <Button size="sm" variant="outline">
                        Avaliar Atendimento
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {chamados.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum chamado encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Você ainda não possui chamados de suporte. Clique no botão acima para abrir seu primeiro chamado.
                </p>
                <Button 
                  className="bg-[#B7335D] hover:bg-[#8B2347]"
                  onClick={() => setShowNovoChamado(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Abrir Chamado
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Ajuda;

