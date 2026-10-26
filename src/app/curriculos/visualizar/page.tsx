"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_CURRICULOS } from "@/data/mockCurriculos";
import { Curriculo } from "@/types/curriculo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ArrowLeft, Briefcase, Mail, Phone, Eye } from "lucide-react";

export default function VisualizarCurriculosPage() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    // Carrega do localStorage e junta com os mocks
    const salvos = JSON.parse(localStorage.getItem("cv_cadastros") || "[]");
    setCurriculos([...salvos, ...MOCK_CURRICULOS]);
  }, []);

  // Filtragem em tempo real por Nome ou Cargo
  const curriculosFiltrados = curriculos.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Cabeçalho e Botão Voltar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent -ml-2 mb-2">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Voltar para a Home
            </Link>
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Currículos Cadastrados</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie e pesquise pelos profissionais disponíveis no sistema.
          </p>
        </div>
        <Button asChild>
          <Link href="/curriculos/cadastrar">
            <Plus className="h-4 w-4 mr-2" /> Novo Currículo
          </Link>
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por nome ou cargo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grid de Cards ou Empty State */}
      {curriculosFiltrados.length === 0 ? (
        <div className="text-center py-16 space-y-3 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold">Nenhum currículo encontrado</h3>
          <p className="text-sm text-muted-foreground">Tente buscar por outro termo ou cadastre um novo perfil.</p>
          <Button asChild variant="outline" className="mt-2">
            <Link href="/curriculos/cadastrar">Cadastrar Agora</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculosFiltrados.map((curriculo) => (
            <Card key={curriculo.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border bg-muted shrink-0">
                  <Image src={curriculo.foto} alt={curriculo.nome} fill className="object-cover" />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <CardTitle className="text-lg truncate">{curriculo.nome}</CardTitle>
                  <Badge variant="secondary" className="text-xs truncate max-w-full">
                    <Briefvalue className="mr-1 h-3 w-3 shrink-0" /> {curriculo.cargo}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="line-clamp-2">{curriculo.resumo}</p>
                <div className="pt-2 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="h-3.5 w-3.5 shrink-0" /> {curriculo.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 shrink-0" /> {curriculo.telefone}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t bg-muted/10">
                <Button asChild variant="default" className="w-full" size="sm">
                  <Link href={`/curriculos/visualizar/${curriculo.id}`}>
                    <Eye className="h-4 w-4 mr-2" /> Ver Detalhes
                  </Link>
                </Button>
              </CardFooter>
            </CardCard>
          ))}
        </div>
      )}
    </div>
  );
}