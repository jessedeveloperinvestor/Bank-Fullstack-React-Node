import { Users } from "../models/Users.js";

export async function createUsers(req, res) {
  try {
    const { id, user_name, group_id, email, password, admin_id, cpf_cnpj } = req.body;
    const newUsers = await Users.create({
      id,
      user_name,
      group_id,
      email,
      password,
      admin_id,
      cpf_cnpj,
    });
    res.json(newUsers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUsersAll(req, res) {
  try {
    const users = await Users.findAll({
      attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
      order: [["id", "DESC"]],
    });
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateUsers(req, res) {
  const { id } = req.params;
  try {
    const users = await Users.findOne({
      attributes: ["user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj", "id"],
      where: { id },
    });

    users.set(req.body);

    await users.save();

    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteUsers(req, res) {
  const { id } = req.params;
  try {
    await Users.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUsers(req, res) {
  const { id } = req.params;
  try {
    const users = await Users.findOne({
      where: { id },
      attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
    });
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}