"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_CURRICULOS } from "@/data/mockCurriculos";
import { Curriculo } from "@/types/curriculo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, FileCheck, Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function DetalhesCurriculoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);

  // Simula o carregamento (Skeleton Screen) e busca no localStorage + mocks
  useEffect(() => {
    const timer = setTimeout(() => {
      const cadastrosSalvos = JSON.parse(localStorage.getItem("cv_cadastros") || "[]");
      const todosOsCurriculos = [...cadastrosSalvos, ...MOCK_CURRICULOS];

      const encontrado = todosOsCurriculos.find((c) => c.id === id);
      setCurriculo(encontrado || null);
      setLoading(false);
    }, 800); // 800ms de delay simulado para exibir o Skeleton

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-32" />
        <Card>
          <CardHeader className="flex flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <h2 className="text-2xl font-bold">Currículo não encontrado</h2>
        <p className="text-muted-foreground">O candidato solicitado não existe ou foi removido.</p>
        <Button asChild>
          <Link href="/curriculos/visualizar">Voltar para a Lista</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Botão de Voltar */}
      <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
        <Link href="/curriculos/visualizar" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar para listagem
        </Link>
      </Button>

      {/* Cartão de Perfil Principal */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 bg-muted shrink-0">
            <Image
              src={curriculo.foto}
              alt={curriculo.nome}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <CardTitle className="text-2xl font-extrabold">{curriculo.nome}</CardTitle>
              <Badge variant="secondary" className="w-fit text-sm font-medium">
                <Briefcase className="mr-1.5 h-3.5 w-3.5" /> {curriculo.cargo}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> {curriculo.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" /> {curriculo.telefone}
              </span>
              <span className="flex items-center gap-1">
                <FileCheck className="h-4 w-4" /> CPF: {curriculo.cpf}
              </span>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-8 pt-6">
          {/* Resumo Profissional */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">Resumo Profissional</h3>
            <p className="text-muted-foreground leading-relaxed">{curriculo.resumo}</p>
          </div>

          <Separator />

          {/* Experiência Profissional */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Experiência Profissional
            </h3>
            <div className="grid gap-4">
              {curriculo.experiencias?.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 bg-muted/20 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h4 className="font-semibold text-base">{exp.cargo} <span className="text-primary font-normal">@ {exp.empresa}</span></h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {exp.inicio} - {exp.fim}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Formação Acadêmica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" /> Formação Acadêmica
            </h3>
            <div className="grid gap-4">
              {curriculo.formacoes?.map((form, index) => (
                <div key={index} className="border rounded-lg p-4 bg-muted/20 space-y-1">
                  <h4 className="font-semibold text-base">{form.curso}</h4>
                  <p className="text-sm text-muted-foreground">{form.instituicao}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                    <Calendar className="h-3.5 w-3.5" /> Conclusão: {form.conclusao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}