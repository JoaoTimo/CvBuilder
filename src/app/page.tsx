import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sistema de Gestão de Currículos
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Centralize, cadastre e gerencie perfis profissionais de forma rápida, moderna e intuitiva utilizando Next.js e Tailwind CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Card para Visualizar Listagem */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Visualizar Currículos
            </CardTitle>
            <CardDescription>
              Explore todos os currículos cadastrados, filtre por nome ou cargo e acesse detalhes completos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/curriculos/visualizar">Ir para Listagem</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Card para Cadastrar Novo */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-primary" /> Cadastrar Novo Currículo
            </CardTitle>
            <CardDescription>
              Adicione um novo candidato preenchendo o formulário com validações avançadas, experiências e formações.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/curriculos/cadastrar">Cadastrar Currículo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}