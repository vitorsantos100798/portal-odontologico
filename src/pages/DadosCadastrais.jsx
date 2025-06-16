import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DadosCadastrais = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    telefone: user?.telefone || ''
  });

  const [endereco, setEndereco] = useState({
    cep: user?.endereco?.cep || '',
    rua: user?.endereco?.rua || '',
    bairro: user?.endereco?.bairro || '',
    cidade: user?.endereco?.cidade || '',
    estado: user?.endereco?.estado || ''
  });

  const [senhas, setSenhas] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleDadosPessoaisChange = (field, value) => {
    if (field === 'telefone') {
      value = formatPhone(value);
    }
    setDadosPessoais(prev => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field, value) => {
    if (field === 'cep') {
      value = formatCEP(value);
      // Simula busca de CEP
      if (value.length === 9) {
        setTimeout(() => {
          setEndereco(prev => ({
            ...prev,
            cep: value,
            rua: 'Rua das Flores, 123',
            bairro: 'Centro',
            cidade: 'Campinas',
            estado: 'SP'
          }));
        }, 500);
      }
    } else {
      setEndereco(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSenhasChange = (field, value) => {
    setSenhas(prev => ({ ...prev, [field]: value }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSaveDadosPessoais = async () => {
    setIsLoading(true);
    
    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({
        nome: dadosPessoais.nome,
        email: dadosPessoais.email,
        telefone: dadosPessoais.telefone
      });
      
      showMessage('success', 'Dados pessoais atualizados com sucesso!');
    } catch (error) {
      showMessage('error', 'Erro ao atualizar dados pessoais');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEndereco = async () => {
    setIsLoading(true);
    
    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({ endereco });
      
      showMessage('success', 'Endereço atualizado com sucesso!');
    } catch (error) {
      showMessage('error', 'Erro ao atualizar endereço');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSenha = async () => {
    if (!senhas.senhaAtual || !senhas.novaSenha || !senhas.confirmarSenha) {
      showMessage('error', 'Preencha todos os campos de senha');
      return;
    }

    if (senhas.novaSenha !== senhas.confirmarSenha) {
      showMessage('error', 'Nova senha e confirmação não coincidem');
      return;
    }

    if (senhas.novaSenha.length < 6) {
      showMessage('error', 'Nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSenhas({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
      
      showMessage('success', 'Senha alterada com sucesso!');
    } catch (error) {
      showMessage('error', 'Erro ao alterar senha');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Dados Cadastrais</h1>
        <p className="text-gray-600">Mantenha suas informações sempre atualizadas</p>
      </div>

      {/* Mensagens */}
      {message.text && (
        <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {message.type === 'success' ? 
            <CheckCircle className="h-4 w-4 text-green-600" /> : 
            <AlertCircle className="h-4 w-4 text-red-600" />
          }
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pessoais" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="endereco">Endereço</TabsTrigger>
          <TabsTrigger value="senha">Alterar Senha</TabsTrigger>
        </TabsList>

        <TabsContent value="pessoais">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[#B7335D]" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <CardDescription>
                Atualize seus dados pessoais de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={dadosPessoais.nome}
                    onChange={(e) => handleDadosPessoaisChange('nome', e.target.value)}
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={user?.cpf || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">CPF não pode ser alterado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={dadosPessoais.email}
                      onChange={(e) => handleDadosPessoaisChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="telefone"
                      value={dadosPessoais.telefone}
                      onChange={(e) => handleDadosPessoaisChange('telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="pl-10"
                      maxLength={15}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSaveDadosPessoais}
                  disabled={isLoading}
                  className="bg-[#B7335D] hover:bg-[#8B2347]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endereco">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-[#B7335D]" />
                <span>Endereço</span>
              </CardTitle>
              <CardDescription>
                Mantenha seu endereço atualizado para correspondências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={endereco.cep}
                    onChange={(e) => handleEnderecoChange('cep', e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="rua">Rua/Avenida</Label>
                  <Input
                    id="rua"
                    value={endereco.rua}
                    onChange={(e) => handleEnderecoChange('rua', e.target.value)}
                    placeholder="Rua, número e complemento"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    value={endereco.bairro}
                    onChange={(e) => handleEnderecoChange('bairro', e.target.value)}
                    placeholder="Nome do bairro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={endereco.cidade}
                    onChange={(e) => handleEnderecoChange('cidade', e.target.value)}
                    placeholder="Nome da cidade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={endereco.estado}
                    onChange={(e) => handleEnderecoChange('estado', e.target.value)}
                    placeholder="UF"
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSaveEndereco}
                  disabled={isLoading}
                  className="bg-[#B7335D] hover:bg-[#8B2347]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Salvando...' : 'Salvar Endereço'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="senha">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-[#B7335D]" />
                <span>Alterar Senha</span>
              </CardTitle>
              <CardDescription>
                Mantenha sua conta segura alterando sua senha regularmente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <Input
                    id="senhaAtual"
                    type="password"
                    value={senhas.senhaAtual}
                    onChange={(e) => handleSenhasChange('senhaAtual', e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input
                    id="novaSenha"
                    type="password"
                    value={senhas.novaSenha}
                    onChange={(e) => handleSenhasChange('novaSenha', e.target.value)}
                    placeholder="Digite a nova senha"
                  />
                  <p className="text-xs text-gray-500">
                    A senha deve ter pelo menos 6 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={senhas.confirmarSenha}
                    onChange={(e) => handleSenhasChange('confirmarSenha', e.target.value)}
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleChangeSenha}
                  disabled={isLoading}
                  className="bg-[#B7335D] hover:bg-[#8B2347]"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isLoading ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DadosCadastrais;

