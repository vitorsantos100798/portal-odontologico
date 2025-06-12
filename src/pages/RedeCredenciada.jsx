import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  MapPin, 
  Phone, 
  Star, 
  Search, 
  Filter,
  Navigation,
  Clock
} from 'lucide-react';
import { mockRedeCredenciada } from '../data/mockData';

const RedeCredenciada = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const especialidades = [...new Set(mockRedeCredenciada.map(item => item.especialidade))];
  const cidades = [...new Set(mockRedeCredenciada.map(item => item.endereco.split(' - ')[1]?.split(',')[0]))];

  const filteredCredenciados = useMemo(() => {
    return mockRedeCredenciada.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clinica.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.endereco.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEspecialidade = selectedEspecialidade === '' || 
        item.especialidade === selectedEspecialidade;
      
      const matchesCidade = selectedCidade === '' || 
        item.endereco.includes(selectedCidade);

      return matchesSearch && matchesEspecialidade && matchesCidade;
    });
  }, [searchTerm, selectedEspecialidade, selectedCidade]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedEspecialidade('');
    setSelectedCidade('');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const MapView = () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Simulação de mapa */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {filteredCredenciados.map((item, index) => (
          <div
            key={item.id}
            className="absolute bg-[#B7335D] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${30 + (index * 20) % 40}%`
            }}
            title={item.nome}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="text-center z-10 bg-white/90 p-4 rounded-lg">
        <MapPin className="h-8 w-8 text-[#B7335D] mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          Visualização simulada do mapa
        </p>
        <p className="text-xs text-gray-500">
          {filteredCredenciados.length} profissionais encontrados
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rede Credenciada</h1>
        <p className="text-gray-600">Encontre dentistas e clínicas próximas a você</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Buscar Profissionais</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar por nome, clínica ou endereço</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Digite sua busca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <Label htmlFor="especialidade">Especialidade</Label>
                <Select value={selectedEspecialidade} onValueChange={setSelectedEspecialidade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as especialidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as especialidades</SelectItem>
                    {especialidades.map((esp) => (
                      <SelectItem key={esp} value={esp}>
                        {esp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Select value={selectedCidade} onValueChange={setSelectedCidade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as cidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as cidades</SelectItem>
                    {cidades.map((cidade) => (
                      <SelectItem key={cidade} value={cidade}>
                        {cidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lista" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredCredenciados.length} profissionais encontrados
            </p>
          </div>

          {filteredCredenciados.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.nome}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                          {item.especialidade}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(item.avaliacao)}
                        <span className="text-sm text-gray-600 ml-2">
                          {item.avaliacao}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{item.clinica}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Navigation className="h-4 w-4" />
                        <span>{item.endereco}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{item.telefone}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Horários disponíveis: {item.horarios.slice(0, 3).join(', ')}
                        {item.horarios.length > 3 && '...'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 lg:ml-6">
                    <Button className="bg-[#B7335D] hover:bg-[#8B2347]">
                      Agendar Consulta
                    </Button>
                    <Button variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCredenciados.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum profissional encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros de busca para encontrar profissionais na sua região.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mapa" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredCredenciados.length} profissionais no mapa
            </p>
          </div>
          
          <MapView />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCredenciados.map((item, index) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-[#B7335D] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.nome}</h4>
                      <p className="text-xs text-gray-600 truncate">{item.clinica}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(item.avaliacao)}
                        <span className="text-xs text-gray-500">{item.avaliacao}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedeCredenciada;

