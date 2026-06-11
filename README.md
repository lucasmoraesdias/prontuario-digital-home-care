# Prontuário Eletrônico Home Care

Sistema simples em HTML5, CSS e JavaScript para organização de registros de atendimento domiciliar a idosos.

## Objetivo

Este projeto foi criado como evidência de atividade extensionista da disciplina Sistemas de Informação e Sociedade.

A proposta é substituir gradualmente registros em papel por um modelo digital simples, mais organizado e de fácil consulta.

## Páginas do sistema

- `index.html`: página de login
- `cadastro.html`: página de cadastro de usuário
- `app.html`: página principal do prontuário eletrônico

## Funcionalidades

- Cadastro de usuário
- Login
- Controle de sessão simples
- Cadastro de paciente
- Registro de data do atendimento
- Registro de contato familiar
- Registro de sinais vitais
- Registro de medicações
- Registro da evolução do atendimento
- Campo para observações gerais
- Edição de registros
- Exclusão de registros
- Armazenamento local no navegador
- Exportação dos dados em arquivo JSON
- Logo personalizada da profissional

## Como usar

1. Baixe ou clone o projeto.
2. Abra o arquivo `index.html` no navegador.
3. Clique em `Criar usuário`.
4. Faça o cadastro.
5. Entre com e-mail e senha.
6. Use a tela principal para registrar os atendimentos.

## Observação importante

Este sistema é acadêmico e demonstrativo.

Os usuários, senhas e prontuários são salvos apenas no navegador, usando `localStorage` e `sessionStorage`.

Para uso profissional real, seria necessário implantar autenticação segura, criptografia, banco de dados protegido, controle de permissões e conformidade com a LGPD.
