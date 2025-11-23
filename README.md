# 📍 Excursões da Moda: Logística Inteligente para o Polo de Confecções

**Excursões da Moda** é um projeto desenvolvido para a disciplina de Programação Para Dispositivos Móveis em Android (Ciências da Computação). Ele atua como uma **solução de logística e localização** projetada para eliminar o caos na área de recebimento e despacho de mercadorias por meio de excursões no polo de confecções.

## 🎯 A Problemática Resolvida

Com mais de **500 excursões** se reunindo semanalmente, a área de entrega sofre com a **confusão de localização** (vaga, setor e tipo de excursão), prolongando o tempo de espera e elevando o risco de erros de despacho. Nosso aplicativo oferece uma interface clara para resolver essa desorganização.

## ✨ Fluxo e Funcionalidades do Aplicativo

O sistema opera em duas telas principais, focadas em eficiência e acesso rápido à informação:

### 1. HomeScreen (Visão Geral e Busca)

A tela principal atua como um painel de controle logístico, exibindo instantaneamente os dados necessários para o despacho correto:

* **Listagem Completa:** Exibe todas as excursões registradas com seus detalhes cruciais: **Nome da Excursão**, **Vaga Designada**, **Setor** e **Tipo de Veículo**.
* **Barra de Pesquisa Inteligente:** Permite a localização rápida de qualquer excursão através da busca por qualquer um dos campos listados (nome, vaga, setor, tipo).
* **Filtros de Organização:** Ao interagir com a barra de pesquisa, o usuário pode aplicar filtros específicos por **Setor**, otimizando a busca em áreas densas do pátio.

### 2. AddExcursionScreen (CRUD: Criação e Edição de Dados)

Esta tela é o ponto de interação para gerenciar o inventário de excursões e garantir que as informações estejam sempre atualizadas:

* **Criação Rápida:** Acessada pelo ícone de **`+`** na HomeScreen. Permite o **registro de uma nova excursão** no sistema com todas as informações logísticas necessárias (Nome, Vaga, Setor, Tipo).
* **Edição (Atualização):** Acessada ao **tocar em uma excursão** na lista. Permite que o usuário edite qualquer informação existente, garantindo a correção imediata em caso de mudança de vaga ou erro de registro.

---

## 📱 Demonstração

*(Sugestão: Inclua capturas de tela, especialmente da HomeScreen mostrando a lista e a barra de pesquisa, e da AddExcursionScreen mostrando os campos de input.)*

![Captura de tela da HomeScreen](https://drive.google.com/file/d/11t8a6L8LEyD54QcqaeeXDPuP_6tv_4m5/view?usp=drive_link)
*Exemplo: Acesso imediato aos dados de localização e ferramentas de busca.*

![Captura de tela da HomeScreen](https://drive.google.com/file/d/1gYSlCv2YkbVRjVIJ0l1Zk39HE8hKo7a2/view?usp=drive_link)
*Exemplo: Acesso imediato aos dados de localização e ferramentas de busca.*

![Captura de tela da AddExcursionScreen](https://drive.google.com/file/d/1rrn1_-5NaMxJBkzbZb17-MaQIseNAid4/view?usp=drive_link)
*Exemplo: Tela de registro de nova excursão ou edição de dados existentes.*

## 🛠️ Tecnologias Utilizadas

* **[React Native](https://reactnative.dev/)**: Framework para construção de interfaces de usuário nativas.
* **[Expo](https://expo.dev/)**: Plataforma e conjunto de ferramentas para desenvolvimento de apps React Native, facilitando o build e a distribuição.
* **[Node.js](https://nodejs.org/en/)**: Ambiente de tempo de execução JavaScript.
* **(Outras bibliotecas/APIs que você usa, ex: React Navigation, NativeBase/Tamagui, Axios, etc.)**

## 🚀 Como Executar o Projeto Localmente

Siga estas instruções para configurar e rodar o "Excursões da Moda" em sua máquina de desenvolvimento.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org/en/download/) (versão LTS recomendada)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (gerenciador de pacotes do Node.js)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
    ```bash
    npm install -g expo-cli
    ```
* [Git](https://git-scm.com/downloads)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/excursoes-da-moda.git](https://github.com/SEU_USUARIO/excursoes-da-moda.git)
    cd excursoes-da-moda
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install (se você preferir yarn)
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npx expo start
    ```
    Isso abrirá o Metro Bundler. Você pode escanear o código QR com o aplicativo Expo Go (disponível na App Store/Google Play) ou rodar em um emulador/simulador.

## 📦 Builds de Produção e Distribuição

Este projeto utiliza **EAS Build** para compilar e distribuir os aplicativos para Android e iOS.

### Gerar um APK (Android) para Testes Internos

Para gerar um arquivo `.apk` para testes (distribuição interna), certifique-se de que seu `eas.json` esteja configurado com `buildType: "apk"` no perfil `preview`:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```
## 🤝 Contribuição e Licença

* **Contexto Acadêmico 🎓**
    Desenvolvido por **[GydeonTheGuardian]** como projeto final para a disciplina de **Programação Para Dispositivos Móveis em Android** no curso de **Ciências da Computação**.

* **Contribuição**
    Contribuições para refinar a arquitetura ou expandir a solução são muito apreciadas! Sinta-se à vontade para abrir *issues* ou enviar *pull requests*.

* **Licença**
    Este projeto está licenciado sob a **Licença MIT**.

---

Feito com ❤️ por **[GydeonTheGuardian e Toda Equipe WALFF]**
