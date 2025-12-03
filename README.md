# Mini-Social

Miniaplicativo de Rede Social / Blog:
- Projeto Node.js com Mocha, Chai, Sinon e Chai-http
- Simulação de uma API de rede social usando JSONPlaceholder e My JSON Server.
- Demonstra testes unitários, de API e de integração.

Criação do Projeto:
1. mkdir mini-social && cd mini-social
2. npm init -y
3. npm install axios express body-parser
4. npm install --save-dev mocha chai chai-http sinon


Funcionamento do Projeto:
O projeto consome endpoints da API JSONPlaceholder.

Rotas principais:
- GET /health → status do servidor
- GET /users → lista de usuários
- POST /posts/fake → cria post simulado localmente

Tipos de Testes:
• Unitários: funções isoladas
• Integração: módulos e servidor Express
• API (HTTP): requisições reais via chai-http

Ferramentas de Teste:
• Mocha → framework de testes
• Chai → asserções (assert, expect, should)
• Sinon → stubs, spies e mocks
• Chai-http → requisições HTTP para rotas Express

Execução dos Testes:

Comando: npm test

O Mocha busca todos os arquivos *.test.js
Testes unitários: test/unit
Testes de integração: test/integration

Estilos de Asserções do Chai:

• assert.equal(a, b)
• expect(a).to.equal(b)
• a.should.equal(b)

Testes de Integração com chai-http:

Exemplo:
chai.request(app)
  .get('/health')
  .end((err, res) => {
    expect(res).to.have.status(200);
  });

Sinon substitui chamadas axios durante os testes.

Testes com Insomnia:

Execute npm start e teste manualmente:

GET http://localhost:3000/health
GET http://localhost:3000/users
POST http://localhost:3000/posts/fake

Exemplo JSON:
{ 'userId': 1, 'title': 'Teste', 'body': 'Conteúdo do post' }

Estrutura de Dados db.json:

{
  'users': [ { 'id': 1, 'name': 'Maria' }, { 'id': 2, 'name': 'João' } ],
  'posts': [ { 'id': 1, 'title': 'Olá Mundo' } ],
  'comments': [ { 'id': 1, 'body': 'Muito bom!' } ],
  'todos': [ { 'id': 1, 'title': 'Estudar Node.js', 'completed': false } ]
}
