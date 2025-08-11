const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: "seu_usuario",
  host: "localhost",
  database: "seu_banco",
  password: "sua_senha",
  port: 5432
});

const SECRET = "minha_chave_secreta"; 

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    next();
  });
}

app.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, senhaHash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }
    const usuario = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Login bem-sucedido", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getProdutos(tabela) {
  const result = await pool.query(`SELECT * FROM ${tabela} ORDER BY id`);
  return result.rows;
}

app.get("/linha_ameixas", autenticarToken, async (req, res) => {
  try {
    res.json(await getProdutos("linha_ameixas"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/linha_memories", autenticarToken, async (req, res) => {
  try {
    res.json(await getProdutos("linha_memories"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/linha_infantil", autenticarToken, async (req, res) => {
  try {
    res.json(await getProdutos("linha_infantil"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/linha_potes", autenticarToken, async (req, res) => {
  try {
    res.json(await getProdutos("linha_potes"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));