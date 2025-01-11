# Watch Only

Este projeto é uma aplicação desenvolvida utilizando **Next.js** e **React** com o gerenciamento de estado feito por **Zustand**. O objetivo é monitorar informações relacionadas a criptoativos, como o par BTC/USDT, por meio de uma interface moderna e eficiente.

## Tecnologias Utilizadas

- **Next.js**: 15.1.2
- **React**: 19.0.0
- **React DOM**: 19.0.0
- **Zustand**: 5.0.2
- **Node.js**: 22.10.0

## Estrutura do Projeto

O projeto segue uma estrutura organizada em:

```plaintext
src/
├── app/
│   ├── cryptoWatch/
│   ├── login/
│   └── signup/
├── assets/
├── components/
├── data/
├── hooks/
├── lib/
├── types/
└── utils/
```

- **app/**: Contém páginas e funções principais, como `cryptoWatch`, `login` e `signup`.
- **components/**: Componentes reutilizáveis da interface.
- **data/**: Dados estáticos ou configurações.
- **hooks/**: Hooks personalizados.
- **lib/**: Bibliotecas auxiliares.
- **types/**: Definições de tipos TypeScript.
- **utils/**: Funções utilitárias.

## Como Executar o Projeto

### 1. Clone o Repositório

```bash
https://github.com/thauawerner/watchOnly.git
```

### 2. Instale as Dependências

Navegue até a pasta do projeto e execute o seguinte comando:

```bash
npm install
```

### 3. Execute o Projeto

Inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Como Gerar e Rodar o Container Docker

### 1. Certifique-se de que o Docker está Ativo

Verifique o status do Docker:

```bash
docker info
```

Caso o Docker não esteja ativo, inicie o daemon (Linux):

```bash
sudo systemctl start docker
```

### 2. Construa a Imagem Docker

Na raiz do projeto, execute:

```bash
docker build -t watch-only .
```

### 3. Execute o Container

Execute o seguinte comando para rodar o container:

```bash
docker run -p 3000:3000 watch-only
```

A aplicação estará acessível em [http://localhost:3000](http://localhost:3000).

---

## Contribuição

Sinta-se à vontade para abrir issues e enviar pull requests. Toda contribuição é bem-vinda!

---

## Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).
