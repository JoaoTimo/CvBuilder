"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus, ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";

// Esquema de Validação com Yup
const schema = yup.object({
  nome: yup.string().required("O nome completo é obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: yup.string().required("O e-mail é obrigatório").email("Digite um e-mail válido"),
  telefone: yup.string().required("O telefone é obrigatório"),
  cpf: yup.string().required("O CPF é obrigatório"),
  cargo: yup.string().required("O cargo pretendido é obrigatório"),
  resumo: yup.string().required("O resumo profissional é obrigatório").min(10, "O resumo deve ter pelo menos 10 caracteres"),
  foto: yup.string().required("A foto (URL) é obrigatória"),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("Empresa obrigatória"),
      cargo: yup.string().required("Cargo obrigatório"),
      inicio: yup.string().required("Início obrigatório"),
      fim: yup.string().required("Fim obrigatório"),
      descricao: yup.string().required("Descrição obrigatória"),
    })
  ),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required("Instituição obrigatória"),
      curso: yup.string().required("Curso obrigatório"),
      conclusao: yup.string().required("Conclusão obrigatória"),
    })
  ),
});

type FormData = yup.InferType<typeof schema>;

export default function CadastrarCurriculoPage() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "", conclusao: "" }],
      foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: "experiencias",
  });

  const { fields: formFields, append: appendForm, remove: removeForm } = useFieldArray({
    control,
    name: "formacoes",
  });

  // Máscaras simples
  const applyCpfMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const applyPhoneMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const onSubmit = (data: FormData) => {
    try {
      const cadastrosSalvos = JSON.parse(localStorage.getItem("cv_cadastros") || "[]");
      const novoCurriculo = { id: Date.now().toString(), ...data };
      localStorage.setItem("cv_cadastros", JSON.stringify([novoCurriculo, ...cadastrosSalvos]));

      toast.success("Currículo cadastrado com sucesso!");
      router.push("/curriculos/visualizar");
    } catch {
      toast.error("Erro ao cadastrar currículo. Verifique os campos.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
        <Link href="/curriculos/visualizar" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar para listagem
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Cadastrar Novo Currículo</h1>
        <p className="text-muted-foreground text-sm">
          Preencha os campos abaixo para adicionar um novo profissional ao sistema.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, (err) => {
        const primeiroErro = Object.values(err)[0]?.message;
        toast.error(typeof primeiroErro === 'string' ? primeiroErro : "Preencha todos os campos obrigatórios.");
      })} className="space-y-8">
        
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Dados básicos de identificação do candidato.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Ex: Maria Oliveira" {...register("nome")} />
              {errors.nome && <span className="text-xs text-destructive">{errors.nome.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="exemplo@email.com" {...register("email")} />
              {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(11) 99999-9999"
                {...register("telefone")}
                onChange={(e) => {
                  e.target.value = applyPhoneMask(e.target.value);
                  register("telefone").onChange(e);
                }}
              />
              {errors.telefone && <span className="text-xs text-destructive">{errors.telefone.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                {...register("cpf")}
                onChange={(e) => {
                  e.target.value = applyCpfMask(e.target.value);
                  register("cpf").onChange(e);
                }}
              />
              {errors.cpf && <span className="text-xs text-destructive">{errors.cpf.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo Pretendido</Label>
              <Input id="cargo" placeholder="Ex: Desenvolvedor Frontend" {...register("cargo")} />
              {errors.cargo && <span className="text-xs text-destructive">{errors.cargo.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto">Foto (URL)</Label>
              <div className="flex gap-2">
                <Input id="foto" {...register("foto")} />
                <Button type="button" variant="outline" onClick={() => setValue("foto", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80")}>
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {errors.foto && <span className="text-xs text-destructive">{errors.foto.message}</span>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="resumo">Resumo Profissional</Label>
              <Textarea id="resumo" placeholder="Breve resumo..." rows={3} {...register("resumo")} />
              {errors.resumo && <span className="text-xs text-destructive">{errors.resumo.message}</span>}
            </div>
          </CardContent>
        </Card>

        {/* Experiências */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Experiência Profissional</CardTitle>
              <CardDescription>Adicione experiências anteriores.</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {expFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-4 bg-muted/20 relative">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">Experiência #{index + 1}</h4>
                  {expFields.length > 1 && (
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeExp(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Empresa</Label>
                    <Input placeholder="Empresa" {...register(`experiencias.${index}.empresa`)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Cargo</Label>
                    <Input placeholder="Cargo" {...register(`experiencias.${index}.cargo`)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Início</Label>
                    <Input placeholder="2022-01" {...register(`experiencias.${index}.inicio`)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Fim</Label>
                    <Input placeholder="Presente" {...register(`experiencias.${index}.fim`)} />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label>Descrição</Label>
                    <Textarea placeholder="Atividades..." {...register(`experiencias.${index}.descricao`)} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Formações */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Formação Acadêmica</CardTitle>
              <CardDescription>Adicione diplomas ou cursos.</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendForm({ instituicao: "", curso: "", conclusao: "" })}
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-4 bg-muted/25 relative">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">Formação #{index + 1}</h4>
                  {formFields.length > 1 && (
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeForm(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Instituição</Label>
                    <Input placeholder="Instituição" {...register(`formacoes.${index}.instituicao`)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Curso</Label>
                    <Input placeholder="Curso" {...register(`formacoes.${index}.curso`)} />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label>Conclusão</Label>
                    <Input placeholder="2023" {...register(`formacoes.${index}.conclusao`)} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Salvando..." : "Salvar Currículo"}
        </Button>
      </form>
    </div>
  );
}