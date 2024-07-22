<p align="center"><a href="https://laravel.com" target="_blank">
<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/34fb881f-ff40-4ae4-aac2-9e9978d7755e/dfo3hr6-4fff4301-5d26-4188-92b6-8cb209583109.png/v1/fill/w_1095,h_730,q_70,strp/lexther666_the_dark_batcave_of_batman_with_compute_by_infernalbatcave_dfo3hr6-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODU0IiwicGF0aCI6IlwvZlwvMzRmYjg4MWYtZmY0MC00YWU0LWFhYzItOWU5OTc4ZDc3NTVlXC9kZm8zaHI2LTRmZmY0MzAxLTVkMjYtNDE4OC05MmI2LThjYjIwOTU4MzEwOS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vzFNkjJrAWsy3tm4uTnBJnmOIS7wss7_x4VXBnA1jfk" width="400"></a></p>
<h1 align="center">🦇BATCAVERNA API🦇</h1>

<div>
    <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
    <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
    <img src="https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/PrimeVue-4CAF50?style=for-the-badge&logo=primevue&logoColor=white" />

</div>

## O sistema usado pelo Batman e pela Liga da Justiça em suas missões!

Gerencie seus heróis em missão de maneira organizada, Acompanhe seus squads em frentes de batalha.<br>
<img src="./endpoints/create hero.png" style="width: 40%">
<img src="./endpoints/heroes.png" style="width: 40%">
<br>
O projeto ainda está em desenvolvimento, então se sinta a vontade para criar uma issue reportar um bug, um fork ou pull
request.

## API

Desenvolvido em Laravel 7. Será necessárip clonar o [repositório](https://github.com/lcAlberto/batcaverna-api) para
testar

## Setup

### Configure o `.env`

```bash
# bash
cp env.example .env
```

```bash
# .env
NUXT_PUBLIC_API_BASE= 'url-da-api'
NUXT_PUBLIC_API_SECRET='key-gerada-pela-api'
```

### Instalar as dependências

```bash
# npm
npm install
```

## Rodando o servidor

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Em produção

Para o deploy

```bash
# npm
npm run build
```

## Importando Endpoints no Insomnia

Para importar a coleção de endpoints no Insomnia, siga os passos abaixo:

1. A colection de endpoints se encontra na raiz do projeto, em `endpoints/Insomnia_endpoints_doc.json`.
2. No Insomnia, clique em `Import/Export` (ícone no canto superior direito).
3. Selecione `Import Data` e, em seguida, `From File`.
4. Escolha o arquivo `endpoints/Insomnia_endpoints_doc.json` na raiz do projeto.

<img src="./endpoints/insomni-print.png">

Após a importação, você verá todos os endpoints disponíveis para teste.

# Planos em desenvolvimento

- Criei um board no [Trelo](https://trello.com/) com as features pendentes e as features que estou trabalhando para que
  o projeto sempre evolua. Ele pode ser
  encontrado [aqui](https://trello.com/invite/b/6695fa4f12ec2d55297e363f/ATTIbd3b5c47858fa18b0145622348c9cee9F514C36F/batcaverna-api).
- Criar testes unitários
- Aplicar técnicas de padrões de projetos

## License

The Laravel framework is open-sourced software licensed under the [GPL](LICENSE.md).

Veja mais sobre deploy na documentação oficial do
nuxt [deployment documentation](https://nuxt.com/docs/getting-started/deployment).
