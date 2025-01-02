import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

// Lógica para garantir que a instância do Prisma seja reutilizada
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const app = express();

app.use(cors());
app.use(express.json());

// Rota para criar um novo cliente
app.post('/clients', async (req, res) => {
  try {
    const { sexo, address, product, value } = req.body;
    const client = await prisma.client_db.create({
      data: {
        sexo,
        address,
        product,
        value,
      },
    });
    res.status(201).json(client);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
});

// Rota para listar todos os clientes
app.get('/clients', async (req, res) => {
  try {
    const users = await prisma.client_db.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
});

// Rota para atualizar um cliente existente
app.put('/clients/:id', async (req, res) => {
  try {
    const { sexo, address, product, value } = req.body;
    const updatedClient = await prisma.client_db.update({
      where: { id: req.params.id },
      data: {
        sexo,
        address,
        product,
        value,
      },
    });
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
});

// Rota para deletar um cliente
app.delete('/clients/:id', async (req, res) => {
  try {
    await prisma.client_db.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
});

// Vercel requer exportação explícita da função para que ela seja tratada como serverless
export default app;
