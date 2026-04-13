const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDir = path.resolve(__dirname, '../../data');
const usersFile = path.join(dataDir, 'users.json');

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(usersFile);
  } catch (_error) {
    await fs.writeFile(usersFile, '[]', 'utf8');
  }
}

async function readUsers() {
  await ensureStore();
  const raw = await fs.readFile(usersFile, 'utf8');
  return JSON.parse(raw);
}

async function writeUsers(users) {
  await ensureStore();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

async function findUserById(userId) {
  const users = await readUsers();
  return users.find((user) => user.id === userId) || null;
}

async function createUser({ name, email, passwordHash }) {
  const users = await readUsers();
  const now = new Date().toISOString();
  const newUser = {
    id: uuidv4(),
    name,
    email,
    passwordHash,
    createdAt: now,
    updatedAt: now
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};
