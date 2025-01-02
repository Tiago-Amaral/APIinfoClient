import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

// Lógica para usar uma conexão reutilizável no ambiente serverless
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

app.post('/clients', async (req, res) => {
  const { sexo, address, product, value } = req.body;
  await prisma.client_db.create({
    data: {
      sexo, address, product, value,
    },
  });
  res.status(201).json(req.body);
});

app.get('/clients', async (req, res) => {
  const users = await prisma.client_db.findMany();
  res.status(200).json(users);
});

app.put('/clients/:id', async (req, res) => {
  const { sexo, address, product, value } = req.body;
  await prisma.client_db.update({
    where: {
      id: req.params.id,
    },
    data: {
      sexo, address, product, value,
    },
  });
  res.status(200).json(req.body);
});

app.delete('/clients/:id', async (req, res) => {
  await prisma.client_db.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

// Exportando o app como função para o Vercel
export default app;
