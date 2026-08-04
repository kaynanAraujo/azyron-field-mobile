# Azyron Field

Aplicativo mobile para gestão de ordens de serviço e atendimentos em campo.

## Status

> Projeto em desenvolvimento.

## Funcionalidades atuais

- Login demonstrativo.
- Dashboard responsivo.
- Indicadores e gráfico semanal.
- Relatórios demonstrativos.
- Lista de ordens de serviço.
- Detalhes da ordem.
- Início e preenchimento do atendimento.
- Laudo técnico.
- Materiais utilizados.
- Foto antes e depois do serviço.
- Assinatura do cliente.
- Validação antes da finalização.

## Tecnologias

- React Native.
- Expo (SDK 54).
- TypeScript.
- Expo Router.
- Expo Image Picker.
- React Native Signature Canvas.
- React Native WebView.

## Estrutura do projeto

```text
.
├── app/
│   ├── atendimento/       # Preenchimento do atendimento
│   ├── ordem/             # Detalhes das ordens de serviço
│   ├── dashboard.tsx
│   ├── login.tsx
│   ├── ordens.tsx
│   └── relatorios.tsx
├── assets/
│   └── images/            # Imagens e ícones da aplicação
├── components/
│   ├── dashboard/         # Componentes do dashboard
│   └── reports/           # Componentes dos relatórios
├── constants/             # Tema e constantes visuais
├── data/                  # Dados demonstrativos
├── types/                 # Tipos TypeScript
├── utils/                 # Funções utilitárias
├── app.json               # Configuração do Expo
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configuração do TypeScript
```

## Instalação e execução

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Em seguida, inicie o Expo:

```bash
npx expo start
```

## Dados e integração

Os dados atuais são demonstrativos e utilizados para apresentar os fluxos da aplicação. A integração com o Supabase será realizada posteriormente.

## Screenshots

Os caminhos abaixo são provisórios. As imagens serão adicionadas ao projeto em uma etapa futura.

### Dashboard

![Dashboard do Azyron Field](docs/screenshots/dashboard.png)

### Ordens de serviço

![Lista de ordens de serviço](docs/screenshots/orders.png)

### Atendimento

![Preenchimento do atendimento](docs/screenshots/service.png)

### Assinatura

![Assinatura do cliente](docs/screenshots/signature.png)

## Próximas etapas

- Autenticação real.
- Banco de dados.
- Upload de fotos.
- Armazenamento da assinatura.
- Relatórios reais.
- Geração de PDF.
- APK Android.

## Autor

Kaynan Araujo
