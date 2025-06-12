import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2 } from 'lucide-react';
import { mockConsultas, mockRedeCredenciada } from '../data/mockData';

const Agendamentos = () => {
  const [consultas, setConsultas] = useState(mockConsultas);
  const [showAgendamento, setShowAgendamento] = useState(false);
  const [selectedDentista, setSelectedDentista] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendada':
        return 'bg-blue-100 text-blue-800';
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNovoAgendamento = () => {
    if (!selectedDentista || !selectedData || !selectedHorario || !tipoConsulta) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const dentista = mockRedeCredenciada.find(d => d.id === parseInt(selectedDentista));
    const novaConsulta = {
      id: consultas.length + 1,
      data: selectedData,
      horario: selectedHorario,
      dentista: dentista.nome,
      especialidade: dentista.especialidade,
      clinica: dentista.clinica,
      status: 'agendada',
      tipo: tipoConsulta
    };

    setConsultas([...consultas, novaConsulta]);
    setShowAgendamento(false);
    setSelectedDentista('');
    setSelectedData('');
    setSelectedHorario('');
    setTipoConsulta('');
  };

  const handleCancelarConsulta = (id) => {
    setConsultas(consultas.map(consulta => 
      consulta.id === id 
        ? { ...consulta, status: 'cancelada' }
        : consulta
    ));
  };

  const getHorariosDisponiveis = () => {
    if (!selectedDentista) return [];
    const dentista = mockRedeCredenciada.find(d => d.id === parseInt(selectedDentista));
    return dentista ? dentista.horarios : [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerencie suas consultas odontológicas</p>
        </div>
        
        <Dialog open={showAgendamento} onOpenChange={setShowAgendamento}>
          <DialogTrigger asChild>
            <Button className="bg-[#B7335D] hover:bg-[#8B2347]">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agendar Nova Consulta</DialogTitle>
              <DialogDescription>
                Preencha os dados para agendar sua consulta
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dentista">Profissional</Label>
                <Select value={selectedDentista} onValueChange={setSelectedDentista}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRedeCredenciada.map((dentista) => (
                      <SelectItem key={dentista.id} value={dentista.id.toString()}>
                        {dentista.nome} - {dentista.especialidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={selectedData}
                  onChange={(e) => setSelectedData(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario">Horário</Label>
                <Select value={selectedHorario} onValueChange={setSelectedHorario}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {getHorariosDisponiveis().map((horario) => (
                      <SelectItem key={horario} value={horario}>
                        {horario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Consulta</Label>
                <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consulta de Rotina">Consulta de Rotina</SelectItem>
                    <SelectItem value="Limpeza">Limpeza</SelectItem>
                    <SelectItem value="Avaliação">Avaliação</SelectItem>
                    <SelectItem value="Emergência">Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={handleNovoAgendamento}
                  className="flex-1 bg-[#B7335D] hover:bg-[#8B2347]"
                >
                  Agendar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAgendamento(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Consultas */}
      <div className="space-y-4">
        {consultas.map((consulta) => (
          <Card key={consulta.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-[#B7335D]" />
                      <span className="font-medium">{formatDate(consulta.data)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#B7335D]" />
                      <span>{consulta.horario}</span>
                    </div>
                    <Badge className={getStatusColor(consulta.status)}>
                      {consulta.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{consulta.dentista}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{consulta.especialidade}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{consulta.clinica}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Tipo: {consulta.tipo}
                  </div>
                </div>

                {consulta.status === 'agendada' && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Reagendar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleCancelarConsulta(consulta.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {consultas.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma consulta agendada
            </h3>
            <p className="text-gray-600 mb-4">
              Você ainda não possui consultas agendadas. Clique no botão acima para agendar sua primeira consulta.
            </p>
            <Button 
              className="bg-[#B7335D] hover:bg-[#8B2347]"
              onClick={() => setShowAgendamento(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agendar Consulta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Agendamentos;

