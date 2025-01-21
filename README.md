# CRUD de Todo com Ionic, Angular, Node.js e Tailwind CSS

## Visão Geral

Este projeto é um CRUD simples de Todo, permitindo que você adicione, liste, atualize e exclua tarefas. A aplicação foi construída utilizando Ionic com Angular para o front-end e Node.js para o back-end. Para agilizar o desenvolvimento de estilos, foi utilizado o Tailwind CSS.

### Tecnologias Utilizadas

- **Frontend**: Ionic, Angular, Tailwind CSS
- **Backend**: Node.js
- **Banco de Dados**: PostgreSQL.
- **Java SDK**: 21

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

1. **Node.js** - Recomenda-se usar a versão correta do Node.js, que pode ser gerenciada pelo `nvm` (Node Version Manager).
2. **npm** - Usamos o npm para gerenciar as dependências.
3. **Ionic CLI** - Para gerenciar a aplicação Ionic e a criação do APK.

### Usando o `nvm` para garantir a versão correta do Node.js

Caso ainda não tenha o `nvm` instalado, siga as instruções de instalação [aqui](https://github.com/nvm-sh/nvm).

Para instalar a versão correta do Node.js para este projeto, execute os seguintes comandos:

```bash
nvm use
```

Isso irá garantir que a versão do Node.js utilizada seja compatível com a aplicação.

## Como rodar a aplicação
### Passo 1: Instale as dependências
Primeiro, instale todas as dependências do projeto com o npm:

```bash
npm install
```

### Passo 2: Inicie o servidor de desenvolvimento
Após a instalação, inicie o servidor local para rodar a aplicação:

```bash
npm start
```
O aplicativo será executado localmente, e você pode acessá-lo no seu navegador.


## Como rodar a aplicação
Se você precisar gerar um APK para Android, siga os passos abaixo:

### Instale a CLI do Ionic, caso ainda não tenha:
```bash
npm install -g @ionic/cli
```

### Gere o APK
```bash
ionic build
```

### Adicione a plataforma Android:
```bash
ionic capacitor add android

```

### Copie o código da aplicação para o Android:
```bash
ionic capacitor copy android
```

### Acesse a pasta do Android:
```bash
cd android
```

### Gere o APK de Debug:
```bash
./gradlew assembleDebug
```

### Acesse a pasta de saída do APK:
```bash
cd app/build/outputs/apk/debug/
```
Seu APK estará disponível nesta pasta.


## Agradecimentos
Agradecemos pela oportunidade de trabalhar neste projeto. Esperamos que este CRUD de Todo seja útil para suas necessidades. Caso tenha dúvidas ou sugestões, sinta-se à vontade para entrar em contato!

Nota: Este projeto foi desenvolvido com o Java SDK 21 para garantir a compatibilidade com as dependências Android.

Link do repositório backend: https://github.com/viniciusidacruz/challenge-ionic-api