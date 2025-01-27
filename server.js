import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';


const prisma = new PrismaClient()


const app = express();

// Configuração do middleware CORS
app.use(
  cors({
    origin: "https://dapper-cobbler-9c5346.netlify.app", // Permite todas as origens. Em produção, substitua "*" pelo domínio permitido, por exemplo: "http://127.0.0.1:5500"
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
); 


app.use(express.json());

// Rota para criar um novo cliente..

app.use(express.json());
app.post('/clients', async (req, res) => {
  const { sexo, address, product, value } = req.body;

  // Converter o valor para um número antes de salvar no banco
  const valueNumber = parseFloat(value); // Isso vai transformar a string "20" em 20

  if (isNaN(valueNumber)) {
    return res.status(400).json({ error: "O valor fornecido não é um número válido" });
  }

  await prisma.client_db.create({
    data: {
      sexo,
      address,
      product,
      value: valueNumber, // Usando o valor convertido
    }
  });

  res.status(201).json(req.body);
});

app.get('/clients', async (req, res) => {
  const users = await prisma.client_db.findMany()
  res.status(200).json(users)
})

app.put('/clients/:id', async (req, res) => {
  const { email, name, age } = req.body;
  await prisma.client_db.update({
      where: {
          id: req.params.id 
      },

      data: {
          email, name, age
      }
  })
  res.status(200).json(req.body)
})

app.delete('/clients/:id', async (req, res) => {
  await prisma.client_db.delete({
      where: {
          id: req.params.id
      },

  })
  res.status(200).json({ message: 'Usuario deletado com sicesso' })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta  ${port}`);
});
