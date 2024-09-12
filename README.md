# Benup - Desafio Técnico

## Bem-vindo ao Teste da Benup!

Este teste é simples e direto. Siga os passos abaixo para configurar e rodar o projeto. Boa sorte!

### Instruções para rodar o projeto

1. Clone o repositório.

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Para rodar o projeto em modo de desenvolvimento, use o seguinte comando:

   ```bash
   npm run dev
   ```

4. Para executar os testes, utilize:

   ```bash
   npm run test
   ```

## Tecnologias utilizadas

- **TypeScript**: O projeto foi desenvolvido utilizando TypeScript para uma tipagem estática e maior robustez no código.
- **MongoDB In-Memory**: Usamos uma instância do MongoDB em memória para facilitar o desenvolvimento e os testes locais.
- **VITest**: Para a suíte de testes, estamos usando o VITest, uma ferramenta de testes leve e rápida.

## Endpoints

### POST /credentials

Criação de credenciais de usuário. O corpo da requisição deve conter um objeto JSON com as propriedades `username` e `password`.

#### Exemplo de requisição:

```json
{
  "username": "testuser",
  "password": "testpass"
}
```

#### Exemplo de resposta:

```json
{
  "status": "success"
}
```

- **Status de resposta:** 201 Created

## Testes de Integração

Os testes de integração estão configurados com MongoDB In-Memory e podem ser executados com o comando:

```bash
npm run test
```

Exemplo de teste:

```typescript
it('should create credentials and return status 201', async () => {
  const response = await app.request('/credentials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'testuser',
      password: 'testpass',
    }),
  });

  const body = await response.json();
  expect(response.status).toBe(201);
  expect(body).toEqual({ status: 'success' });

  const credentials = await mongo.db().collection('credentials').findOne({ username: 'testuser' });
  expect(credentials).toBeTruthy();
  expect(credentials?.username).toBe('testuser');
});
```

## Configuração de Banco de Dados

Este projeto usa o MongoDB In-Memory para facilitar o desenvolvimento. Não é necessária a instalação de um servidor MongoDB local.

---

Boa sorte no desafio! Estamos ansiosos para ver a sua solução.
