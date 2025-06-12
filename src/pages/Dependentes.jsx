import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { mockDependentes } from '../data/mockData';

const Dependentes = () => {
  const [dependentes, setDependentes] = useState(mockDependentes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDependente, setEditingDependente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    parentesco: '',
    idade: '',
    plano: ''
  });

  const parentescoOptions = [
    'Cônjuge',
    'Filho(a)',
    'Pai',
    'Mãe',
    'Irmão(ã)',
    'Avô(ó)',
    'Neto(a)',
    'Outro'
  ];

  const planoOptions = [
    'Uniodonto Infantil',
    'Uniodonto Básico',
    'Uniodonto Premium',
    'Uniodonto Família Plus'
  ];

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleInputChange = (field, value) => {
    if (field === 'cpf') {
      value = formatCPF(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cpf: '',
      parentesco: '',
      idade: '',
      plano: ''
    });
    setEditingDependente(null);
  };

  const handleSave = () => {
    if (!formData.nome || !formData.cpf || !formData.parentesco || !formData.idade || !formData.plano) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (editingDependente) {
      // Editar dependente existente
      setDependentes(prev => prev.map(dep => 
        dep.id === editingDependente.id 
          ? { ...dep, ...formData, idade: parseInt(formData.idade) }
          : dep
      ));
    } else {
      // Adicionar novo dependente
      const novoDependente = {
        id: dependentes.length + 1,
        ...formData,
        idade: parseInt(formData.idade)
      };
      setDependentes(prev => [...prev, novoDependente]);
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (dependente) => {
    setEditingDependente(dependente);
    setFormData({
      nome: dependente.nome,
      cpf: dependente.cpf,
      parentesco: dependente.parentesco,
      idade: dependente.idade.toString(),
      plano: dependente.plano
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja remover este dependente?')) {
      setDependentes(prev => prev.filter(dep => dep.id !== id));
    }
  };

  const getIdadeColor = (idade) => {
    if (idade < 12) return 'bg-blue-100 text-blue-800';
    if (idade < 18) return 'bg-green-100 text-green-800';
    if (idade < 60) return 'bg-gray-100 text-gray-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Dependentes</h1>
          <p className="text-gray-600">Adicione e gerencie seus dependentes</p>
        </div>
        
        <Dialog open={showAddModal} onOpenChange={(open) => {
          setShowAddModal(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#B7335D] hover:bg-[#8B2347]">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Dependente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingDependente ? 'Editar Dependente' : 'Adicionar Novo Dependente'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do dependente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  maxLength={14}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentesco">Parentesco</Label>
                  <Select value={formData.parentesco} onValueChange={(value) => handleInputChange('parentesco', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentescoOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    placeholder="0"
                    value={formData.idade}
                    onChange={(e) => handleInputChange('idade', e.target.value)}
                    min="0"
                    max="120"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plano">Plano</Label>
                <Select value={formData.plano} onValueChange={(value) => handleInputChange('plano', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {planoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={handleSave}
                  className="flex-1 bg-[#B7335D] hover:bg-[#8B2347]"
                >
                  {editingDependente ? 'Salvar Alterações' : 'Adicionar Dependente'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Dependentes</CardTitle>
            <Users className="h-4 w-4 text-[#B7335D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dependentes.length}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menores de Idade</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dependentes.filter(d => d.idade < 18).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Até 17 anos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dependentes.length}</div>
            <p className="text-xs text-muted-foreground">
              Coberturas ativas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Dependentes */}
      <div className="space-y-4">
        {dependentes.map((dependente) => (
          <Card key={dependente.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-[#B7335D] rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {dependente.nome}
                      </h3>
                      <p className="text-sm text-gray-600">{dependente.cpf}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Parentesco</p>
                      <p className="font-medium">{dependente.parentesco}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Idade</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{dependente.idade} anos</span>
                        <Badge className={getIdadeColor(dependente.idade)}>
                          {dependente.idade < 12 ? 'Infantil' : 
                           dependente.idade < 18 ? 'Adolescente' :
                           dependente.idade < 60 ? 'Adulto' : 'Idoso'}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Plano</p>
                      <p className="font-medium">{dependente.plano}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 lg:ml-6">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(dependente)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(dependente.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {dependentes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum dependente cadastrado
            </h3>
            <p className="text-gray-600 mb-4">
              Você ainda não possui dependentes cadastrados. Clique no botão acima para adicionar seu primeiro dependente.
            </p>
            <Button 
              className="bg-[#B7335D] hover:bg-[#8B2347]"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Dependente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dependentes;

