import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");

  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpf(formatted);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(cpf, senha);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.error || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecovery = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRecoveryMessage("");

    try {
      const result = await resetPassword(recoveryEmail);
      setRecoveryMessage(result.message);
      setRecoveryEmail("");
    } catch (err) {
      setRecoveryMessage("Erro ao enviar email de recuperação");
    } finally {
      setIsLoading(false);
    }
  };

  if (showRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B7335D] to-[#8B2347] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#B7335D]">
              Recuperar Senha
            </CardTitle>
            <CardDescription>
              Digite seu CPF para receber as instruções por email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRecovery} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recovery-cpf">CPF</Label>
                <Input
                  id="recovery-cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(formatCPF(e.target.value))}
                  required
                />
              </div>

              {recoveryMessage && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {recoveryMessage}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-[#B7335D] hover:bg-[#8B2347]"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Enviar Instruções
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowRecovery(false)}
                >
                  Voltar ao Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Painel da esquerda com imagem, overlay e texto */}
      <div className="hidden lg:block relative">
        <img
          src="https://iclinicodonto.com.br/images-t/cat-a/h1.webp"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BF9CFF]/90 to-[#BF9CFF]/60 z-10" />

        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            Olá, seja bem-vindo ao Portal do Beneficiário Uniodonto Paulista
          </h1>
          <p className="mt-4 text-lg text-white drop-shadow-md max-w-md">
            Acompanhe suas informações com agilidade, segurança e transparência.
          </p>
        </div>
      </div>

      {/* Formulário de login */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md z-20">
          <div className="flex justify-center mt-4">
            <img
              src="https://dentista.dev.uniodontopaulista.com.br/assets/logo-vertical-BxwgX50x.png"
              alt="Logo da Uniodonto"
              style={{ width: "250px", height: "auto" }}
            />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-1.5xl font-bold text-[#B7335D]">
              Portal do Beneficiário
            </CardTitle>
            <CardDescription>
              Faça login para acessar seus dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCPFChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-[#BF9CFF] hover:bg-[#8B2347]"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Entrar
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="w-full text-[#B7335D] hover:text-[#8B2347]"
                  onClick={() => setShowRecovery(true)}
                >
                  Esqueci minha senha
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-white-50 rounded-lg">
              <p className="text-sm text-white-600 text-center mb-2">
                
              </p>
              <p className="text-xs text-gray-500 text-center">
                
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
