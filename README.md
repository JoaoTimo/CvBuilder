O Sistema de Gestão de Currículos ou CVBuilder

É uma aplicação que utiliza Next.js para a realização de cadastro e visualização de curículos profissionais, priorizando UX para fins de boas práticas em desenvolvimento.

# Tecnologias Utilizadas
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS & shadcn/ui
- **Formulários e Validação:** React Hook Form & Yup
- **Feedback e Notificações:** Sonner (Toast)
- **Ícones:** Lucide React

# Funcionalidades Implementadas
1. **Landing Page:** Apresentação da plataforma e atalhos rápidos de navegação.
2. **Listagem de Currículos:**
   - Visualização em cards responsivos.
   - Pesquisa dinamicamente filtrada por **Nome** ou **Cargo**.
   - Tratamento de estado vazio (*Empty State*).
3. **Detalhes do Currículo:**
   - Rota dinâmica (`/curriculos/visualizar/[id]`).
   - Simulação de carregamento visual (*Skeleton Screen*).
4. **Formulário de Cadastro:**
   - Validação completa dos campos obrigatórios via Yup.
   - Máscaras de formatação em tempo real para CPF e Telefone.
   - Inclusão/remoção dinâmica de Experiências Profissionais e Formações (*Field Arrays*).
   - Persistência dos dados cadastrados via `localStorage`.