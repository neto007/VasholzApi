# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Adonis Heroku
Enviar seus arquivos para o Git.
Configurar o o Deploy apartir do repositorio, ou enviar ao proprio Heroku atravez da CLI da propria plataforma.
Com o projeto no já pronto para deploy vamos configurar as Variaveis de ambientes.
 ** 1 pegar todas as variaveis do arquivo `.env` colocar em *Reveal Config Vars*  localizado na Aba Settings
  devemos incluir mais uma variavel  `ENV_SILENT = True` responsavel por inutilizar os dados de `.env`
Vamos tambem instalar o banco de dados em nosso projeto:
Atraves da CLI vamos rodar o seguinte comando:
:::: heroku run npm install pg --save ::::: 
depois o Adonis utiliza uma  migrations para versionar os banco de dados para sempre que houver altaracao no modelo de dados  devemos executar este comando.
:::: heroku run ENV_SILENT=true node ace migration:run --force ::::

