# Web Quiz

Olá, esse foi um desafio para criar um sistema de questionários com base no seguinte diagrama:

![Alt text](assets/diagrama.png)

Para realizar o desafio, utilizei o NestJs com PostgreSQL para fazer a API e Nextjs no frontend.

## Documentação

### Rodando localmente

O ambiente de desenvolvimento utiliza o docker para subir as duas aplicações (API e frontend), o banco de dados e um admin para visualizar o banco em tempo real (adminer).

Além disso, os scripts de instalação de dependências também está inserido no script de build dos containeres, então, ao rodar o `docker compose up`, todas as dependencias já são pré-instaladas:

```
docker compose up -d
```

Frontend: `http://localhost:3001/`
API: `http://localhost:3000/`
Documentação da API: `http://localhost:3000/api`

Como utilizei a configuração [`synchronize: true`](https://github.com/MatheusT45/web-quiz/blob/1783d6c5dea897fbb449d1720c18a18956ba86ff/server/src/database/database.provider.ts#L15), não foi preciso gerar migrations para o banco de dados, assim que a API é montada, o banco é estruturado, é esperado que essa configuração seja alterada para o ambiente de produção e as migrations sejam geradas.

## Próximos passos

- Adicionar um WYSIWYG para os campos de descrição das perguntas e respostas;
- Adicionar autenticação (JWT);
- Server-side Pagination;
- Fixtures para popular a base de dados;
- Validações de CPF;
- Tratamento de erros da API;
- Integrar com o GCP;
- Implementar testes unitários.
