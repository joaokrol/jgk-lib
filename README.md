# JGK - Dev Lib

Projeto da base dos desenlvimentos das jgk

# Pastas

## Esquema

src
├─ app/ # bootstrap da aplicação
│ ├─ providers/ # Providers (Antd, Query, Auth, Theme)
│ ├─ routes/ # Rotas e guards
│ ├─ navigation/ # Itens de menu, breadcrumbs, sidebars
│ ├─ pages/ # Páginas “shell” (layout + outlet)
│ └─ App.tsx
│
├─ assets/ # Imagens, svgs, fontes (de build)
│ ├─ images/
│ ├─ icons/
│ └─ fonts/
│
├─ components/ # Componentes compartilhados (agnósticos ao domínio)
│ ├─ form/ # Inputs reutilizáveis (wrappers de Antd)
│ ├─ layout/ # Headers, Footers, Grid/Containers
│ ├─ ui/ # Botões, Tags, EmptyState, Skeletons
│ └─ feedback/ # Alerts, Toasters, Modals genéricos
│
├─ features/ # Cada feature isolada
│ └─ products/
│ ├─ components/ # Componentes da feature
│ ├─ pages/ # Páginas da feature
│ ├─ hooks/ # Hooks da feature
│ ├─ services/ # Chamadas API da feature
│ ├─ schema.ts # Zod/Yup da feature
│ ├─ types.ts # Tipos da feature
│ └─ index.ts
│
├─ services/ # Infra e serviços cross-feature
│ ├─ api/ # http client (axios/fetch), interceptors
│ ├─ auth/ # auth cross (ex.: Firebase/Auth0)
│ ├─ storage/ # storage, upload
│ └─ telemetry/ # log, analytics, sentry
│
├─ store/ # Estado global (Redux/Zustand) e React Query
│ ├─ queries/ # chaves & hooks de query
│ ├─ slices/ # stores globais
│ └─ selectors/
│
├─ styles/ # (sugestão: plural) estilos globais & overrides
│ ├─ globals.css
│ ├─ antd-overrides.less # sobrescritas de componentes
│ └─ variables.less
│
├─ theme/ # tokens & temas (Antd v5)
│ ├─ tokens.ts # design tokens (cores, espaçamentos…)
│ ├─ antd.light.ts # map para themeConfig Antd (light)
│ └─ antd.dark.ts # idem (dark)
│
├─ utils/ # helpers puros (sem React)
│ ├─ dates.ts
│ ├─ formatters.ts
│ └─ guards.ts
│
├─ hooks/ # hooks compartilhados (não específicos de feature)
│ ├─ useDebounce.ts
│ └─ useDisclosure.ts
│
├─ config/ # chaves, env parsing, rotas estáticas, constantes
│ ├─ env.ts
│ └─ constants.ts
│
├─ types/ # tipos globais (se precisar)
│ └─ global.d.ts
│
└─ index.tsx

## app/

Função: bootstrap da aplicação.

### Entra

- providers/AntdProvider.tsx, ThemeProvider.tsx, AuthProvider.tsx, QueryClientProvider.tsx
- routes/\* (React Router v6, loaders, guards)
- páginas “shell” em pages/ (ex.: AppLayout, PublicLayout, PrivateLayout)

#### Exemplos

- app/providers/AntdProvider.tsx com <ConfigProvider theme={themeConfig}>
- app/routes/index.tsx definindo rotas e lazy imports

### Evite

- Colocar lógica de negócio aqui. Nada de chamar endpoints desta pasta.

## assets/

Função: arquivos estáticos que passam pelo bundler.

### Entra

- Imagens otimizadas, ícones SVG (se não forem React Components), fontes.

### Evite

- Vídeos pesados não otimizados;
- Qualquer coisa que deveria estar em public/ (assets copiados “as-is” pelo bundler).

## components/

Função: componentes reutilizáveis e agnósticos ao domínio.

### Entra

- Componentes reutilizáveis e “agnósticos” ao domínio: wrappers de Antd com sua identidade (ex.: AppButton, AppTable, FormField, PageHeader, ContentCard).
- form/: campos controlados (SelectField, NumberField, DateRangeField) já integrados com Antd Form/React Hook Form (se usar).
- layout/: AppLayout, Sidebar, Topbar, GridContainer.
- ui/: Button, Badge, Tag, EmptyState, Skeleton.
- feedback/: Toast, ModalBase, ResultState.

### Evite

- Qualquer coisa com regras de negócio (isso pertence a features/\*).
- models/ aqui não: tipos/“models” vão em features/\*/types.ts (domínio) ou types/ (globais).

## features/

Função: módulos de negócio isolados. Cada pasta = um domínio.

### Entra

- A vida real do app. Cada subpasta é um domínio: users, orders, products…
- Dentro, tudo que for específico daquela feature: components, pages, hooks, services, schema.ts (Zod/Yup), types.ts.

#### Exemplos

features/products/
├─ pages/
│ └─ ProductsList.tsx
├─ components/
│ └─ ProductTable.tsx
├─ hooks/
│ └─ useProductColumns.ts
├─ services/
│ └─ products.api.ts
├─ schema.ts // Zod para validação de produto
├─ types.ts // Product, ProductFilters...

### Evite

- Importar diretamente de outra feature (prefira subir algo compartilhável para components/, utils/ ou criar uma camada entities/ se ficar complexo).
- Criar index.ts que reexporta tudo indiscriminadamente (limite os barrels).

## services/

Função: infra cross-feature.

### Entra

- Tudo que é infra cross-feature: api/http.ts (axios + interceptors + retry), auth (Firebase/Auth0), storage, telemetry (Sentry/GA).

#### Exemplos

- services/api/http.ts exporta api (axios) já com baseURL, headers, interceptors de auth/erro.
- services/auth/session.ts (login/logout/refresh).

### Evite

- Hooks de React (coloque em hooks/);
- Regras de negócio (de novo: features/\*).

## store/

Função: estado global e convenções de dados remotos.

### Entra

- Estado global mínimo (Zustand/Redux).
- Integração React Query: queries/ com chaves, helpers, talvez hooks compositores (desde que agnósticos).

### Evite

- Side effects complexos em reducers;
- Misturar query cache (servidor) com estado de UI (cliente) sem critério.

## styles/

Função: estilos globais e overrides.

### Entra

- globals.css, reset/normalization, antd-overrides.less (customizações pontuais), variables.less.

### Evite

- Estilizar componente específico de feature aqui (isso vai no escopo da feature, ou como CSS Module junto do componente).

## theme/

Função: tokens e configuração de tema (Antd v5).

### Entra

- Tokens de design (paleta, tipografia, radius, spacing) e o mapeamento para o AntD v5 (themeConfig).
- Suporte a light/dark e alta densidade se precisar.

#### Exemplos

// theme/tokens.ts
export const tokens = {
colorPrimary: '#143833',
colorSecondary: '#07ACBF',
radiusLg: 12,
};

// theme/antd.light.ts
import { tokens } from './tokens';
export const antdLight = {
token: {
colorPrimary: tokens.colorPrimary,
borderRadius: tokens.radiusLg,
},
};

### Evite

- Jogar overrides gigantes no ConfigProvider inline; mantenha tudo versionado aqui.

## utils

### Entra

- Funções puras e sem React: datas, formatadores, parsers, number/currency, guards.

### Evite

- Acessar DOM, window, ou estados (quebra a pureza/reutilização).

## hooks/

Função: hooks compartilhados (não-específicos de feature).

### Entra

- Hooks compartilhados entre features (ex.: useDebounce, useDisclosure, usePagination, useAntdTableQuery).

### Evite

- Hooks que tocam em regras de negócio (deixe-os dentro da feature).

## config/

Função: configuração de ambiente e constantes globais.

### Entra

- Parsing de ENV com validação (Zod), constantes, rotas “estáticas”.

### Evite

- Lógica ou side effects (mantenha declarativo).

## types/

Função: tipos globais (não de domínio).

### Entra

- Tipos globais (ex.: Paginated<T>, ApiError).
- global.d.ts para módulos sem types.

### Evite

- Tipos de domínio (melhor em features/\*/types.ts).

## Convenções que evitam dor de cabeça

### Nomes & organização

- Componentes: PascalCase. hooks: camelCase iniciando com use. arquivos TS utilitários: kebab-case ou camelCase — seja consistente.
- 1 arquivo = 1 responsabilidade. Nada de “multi-export” confuso dentro de um mesmo arquivo gigante.
- CSS Modules perto do componente, quando específicos (Component.module.less).

### Barrels (index.ts)

- Use barrels pontuais para reexportar 2–5 coisas relacionadas.
- Evite barrels globais que reexportam o projeto inteiro (piora tree-shaking e cria ciclos).

### Aliases (exemplo)

tsconfig.json
{
"compilerOptions": {
"baseUrl": "src",
"paths": {
"@app/_": ["app/_"],
"@assets/_": ["assets/_"],
"@components/_": ["components/_"],
"@features/_": ["features/_"],
"@services/_": ["services/_"],
"@store/_": ["store/_"],
"@styles/_": ["styles/_"],
"@theme/_": ["theme/_"],
"@utils/_": ["utils/_"],
"@hooks/_": ["hooks/_"],
"@config/_": ["config/_"],
"@types/_": ["types/_"]
}
}

Ajuste no bundler (Vite/Webpack) para reconhecer os aliases.

### Ant Design (boas práticas)

- Centralize toda configuração de tema no theme/ + app/providers/AntdProvider.tsx.
- Crie wrappers para Inputs/Selects em components/form/ com validações e padrões (tamanho, allowClear, status, máscaras).
- Para tabelas, mantenha colunas como funções puras em cada feature (ex.: useProductColumns) e padronize pagination, rowKey, empty.

### Validação & Formulários

- Use Zod em features/\*/schema.ts (e compartilhe tipos via z.infer).
- Padronize Form.Item (feedback, hasFeedback, validateTrigger), para não repetir config em todas as páginas.

### React Query & Estado Global

- Query/Mutation por feature; chaves centralizadas em store/queries/\*.
- Estado global só quando realmente global (ex.: usuário, tema, permissões). O resto é local/feature.

### Importante sobre models/

- Não coloque models dentro de components/.
- - Se for domínio: features/\*/types.ts.
- - Se for genérico: types/.

## O que explicitamente evitar

- Misturar domínio e UI na mesma pasta.
- Deep nesting (mais de 4 níveis vira labirinto).
- “Commons” gigantes (tudo vai parar lá).
- Pasta helpers nebulosa — prefira utils/ bem nomeado.
- CSS global para resolver problema local (vaza estilo e vira dívida).
- Ciclos de import (barrels agressivos causam isso).

## Regras de ouro (rápidas)

- UI genérica → components/ | Domínio → features/.
- Infra → services/ | Global mínimo → store/.
- Funções puras → utils/ | Tema → theme/ | Estilos globais → styles/.
- Hooks genéricos → hooks/ | ENV/constantes → config/.

## Dica final: checklist de cada nova feature

1. features/foo/types.ts (tipos)
2. features/foo/schema.ts (Zod)
3. features/foo/services/foo.api.ts (endpoints)
4. features/foo/hooks/useFooQuery.ts (React Query)
5. features/foo/components/\* (tabela, formulário, filtros)
6. features/foo/pages/FooList.tsx / FooForm.tsx
7. app/routes/_ e app/navigation/_ (rotas + menu)
