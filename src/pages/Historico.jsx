import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Calendar,
  MapPin,
  User,
  DollarSign,
  FileText,
  Download,
  Search,
  Filter,
} from "lucide-react";
import { mockHistoricoAtendimento } from "../data/mockData";

const Historico = () => {
  const [historico] = useState(mockHistoricoAtendimento);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredHistorico = historico.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.procedimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dentista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clinica.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "" || item.status === selectedStatus;

    // Filtro de período (últimos 30 dias, 3 meses, 6 meses, 1 ano)
    const matchesPeriodo =
      selectedPeriodo === "" ||
      (() => {
        const itemDate = new Date(item.data);
        const now = new Date();
        const diffTime = now - itemDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (selectedPeriodo) {
          case "30":
            return diffDays <= 30;
          case "90":
            return diffDays <= 90;
          case "180":
            return diffDays <= 180;
          case "365":
            return diffDays <= 365;
          default:
            return true;
        }
      })();

    return matchesSearch && matchesStatus && matchesPeriodo;
  });

  const totalGasto = filteredHistorico.reduce(
    (sum, item) => sum + item.valor,
    0
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPeriodo("");
    setSelectedStatus("");
  };

  const handleDownloadRelatorio = () => {
    // Simula download de relatório
    alert("Relatório sendo gerado... O download iniciará em breve.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Histórico de Atendimento
          </h1>
          <p className="text-gray-600">
            Visualize todos os seus procedimentos realizados
          </p>
        </div>

        <Button
          variant="outline"
          className="group hover:bg-[#BF9CFF] hover:text-white"
          onClick={handleDownloadRelatorio}
        >
          <Download className="h-4 w-4 mr-2 text-[#DB2777] group-hover:text-white" />
          Baixar Relatório
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Procedimentos
            </CardTitle>
            <FileText className="h-4 w-4 text-[#B7335D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredHistorico.length}</div>
            <p className="text-xs text-muted-foreground">
              No período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-[#BF9CFF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalGasto)}
            </div>
            <p className="text-xs text-muted-foreground">
              Soma dos procedimentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Último Atendimento
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {historico.length > 0 ? formatDate(historico[0].data) : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {historico.length > 0
                ? historico[0].procedimento
                : "Nenhum atendimento"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filtrar Histórico</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="group hover:bg-[#BF9CFF] hover:text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2 text-[#DB2777] group-hover:text-white" />
              Filtros
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">
                Buscar procedimento, dentista ou clínica
              </Label>
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
                <Label htmlFor="periodo">Período</Label>
                <Select
                  value={selectedPeriodo}
                  onValueChange={setSelectedPeriodo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os períodos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os períodos</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 3 meses</SelectItem>
                    <SelectItem value="180">Últimos 6 meses</SelectItem>
                    <SelectItem value="365">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista do Histórico */}
      <div className="space-y-4">
        {filteredHistorico.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.procedimento}
                      </h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#DB2777]">
                        {formatCurrency(item.valor)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(item.data)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{item.dentista}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{item.clinica}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:ml-6">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-[#BF9CFF] hover:text-white"
                  >
                    Ver Detalhes
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="group hover:bg-[#BF9CFF] hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-1 text-[#DB2777] group-hover:text-white" />
                    Comprovante
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistorico.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum atendimento encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Não foram encontrados atendimentos com os filtros selecionados.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Historico;
