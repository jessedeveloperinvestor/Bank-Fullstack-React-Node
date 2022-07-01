import { Users } from "../models/Users.js";
import * as bcrypt from 'bcrypt';
import awsIot from 'aws-iot-device-sdk';
import { Code, MongoClient } from "mongodb";
import {Authenticator} from "../automators/authenticator.js";
import {EnvironmentVariables} from "../../env.js";
import jwt from 'jwt-simple';
import { promisify } from 'util';

//USERS

export async function signup(req, res) {
  try {
    if (typeof(tokenadmin) == 'undefined') {
      global.tokenadmin = [];
    }
    if (typeof(tokenU) == 'undefined') {
      global.tokenU = [];
    }
    global.tokenadmin[0] = ["test"];
    global.tokenU[0] = ["test"];
    const { idAdmin, tokenuser, user_name, group_id, email, password, admin_id, cpf_cnpj } = req.body;
    global.tokenFromUrl = tokenuser;
    global.ok = false;
    global.n = 0;
    while (n < tokenadmin.length) {
      if (tokenadmin[n] == tokenuser) {
        ok = true;
      }
      n=n+1;
    }
    if (ok) {
      global.newUsers = await Users.create({
        user_name,
        group_id,
        email,
        password,
        admin_id,
        cpf_cnpj,
      });
      const saltOrRounds = 1;
      const passwordToHash = newUsers.password;
      global.hash = await bcrypt.hash(passwordToHash, saltOrRounds);
      const users = await Users.findByPk(newUsers.id);
      users.user_name = user_name;
      users.group_id = group_id;
      users.email = email;
      users.password = hash;
      users.admin_id = admin_id;
      users.cpf_cnpj = cpf_cnpj;
      await users.save();
      return res.json(newUsers);
    } else if (ok == false) {
      global.auth = false;
      global.v = 0;
      while (v < tokenU.length) {
        if (tokenU[v] == tokenFromUrl) {
          auth = true;
        }
        v=v+1;
      }
      if (auth) {
        const { idAdmin, tokenuser, user_name, group_id, email, password, admin_id, cpf_cnpj } = req.body;
        let id = idAdmin;
        const users = await Users.findOne({
          where: { id },
          attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
        });
        id = users.group_id;
        const groups = await Groups.findOne({
          where: { id },
          attributes: ["id", "group_name", "admin_id", "allow_read_sensors", "allow_read_sensors_basic", "allow_send_command", "allow_manage_groupsandusers", "allow_to_pay"],
        });
        global.permission_to_build_groups = groups.allow_manage_groupsandusers;
        if (permission_to_build_groups == true || permission_to_build_groups == "true") {
          global.newUsers = await Users.create({
            user_name,
            group_id,
            email,
            password,
            admin_id,
            cpf_cnpj,
          });
          const saltOrRounds = 1;
          const passwordToHash = newUsers.password;
          global.hash = await bcrypt.hash(passwordToHash, saltOrRounds);
          const users = await Users.findByPk(newUsers.id);
          users.user_name = user_name;
          users.group_id = group_id;
          users.email = email;
          users.password = hash;
          users.admin_id = admin_id;
          users.cpf_cnpj = cpf_cnpj;
          await users.save();
          return res.json(newUsers);
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getLogin(req, res) {
  try {
    if (typeof(tokenadmin) == 'undefined') {
      global.tokenadmin = [];
    }
    if (typeof(tokenU) == 'undefined') {
      global.tokenU = [];
    }
    global.tokenadmin[0] = ["test"];
    global.tokenU[0] = ["test"];
    const { email, password } = req.body;
    if (email.toString().length != 11) {
      if (email.toString().length != 14) { ///IF email != 11  AND IF email.length != 14=> email
        global.users = await Users.findOne({
          where: { email,},
          attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
        });
      };
    } else { ///email == 11 => CPF or CNPJ
      const cpf_cnpj = email;
      global.users = await Users.findOne({
        where: { cpf_cnpj,},
        attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
      });
    };
    const saltOrRounds = 1;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, users.password);
    const generateRandomString = (myLength) => {
      const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
      const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
      );
      global.tokenbuiltran = randomArray.join("");
      return tokenbuiltran;
    };
    generateRandomString(100);
    let authSecretenv = new EnvironmentVariables(true);
    let authSecret = authSecretenv.authSecret;
    const payload = {id: users.id};
    let tokenbuiltU = jwt.encode(payload, authSecret);
    tokenbuiltU = tokenbuiltU + tokenbuiltran;
    //const DadoUsuario = req.body || null;
    //const token = jwt.decode(DadoUsuario.token, authSecret)
    // if(new Date(token.exp * 1000) > new Date()) {
    //   let authenticated = true;
    // }
    let output = {};
    output["id"] = (users.id);
    output["token"] = (tokenbuiltU);
    if (isMatch == true) {
      tokenU[tokenU.length + 1] = tokenbuiltU;
      setInterval(myTimer, 1000*60*60);//1000 = 1second
      function myTimer() {
        let indextokenU = tokenU.indexOf(tokenbuiltU);
        tokenU.splice(indextokenU,1);
      }
      res.json(output);
    } else {
      res.json('Senha esta incorreta');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//GET POSTGRESQL DATA ONLY IF AUTHENTICATED AND AUTHORIZED

export async function loggedGetUser(req, res) {
  const { idAdminOrUser, tokenuser, idUser } = req.body;
  try {
    const auth = new Authenticator(idAdminOrUser, tokenuser);
    if (auth.customer == 'admin') {
      var id = idUser;
      const users = await Users.findOne({
        where: { id },
        attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
      });
      if (users.admin_id == idAdminOrUser) {
        res.json(users);
      } else {
        res.status(400).json('Administrador nao tem acesso a dados deste usuario, pois nao o criou');
      }
    } else if (auth.customer == 'user') {
      var id = idAdminOrUser;
      const users = await Users.findOne({
        where: { id },
        attributes: ["id", "user_name", "group_id", "email", "password", "admin_id", "cpf_cnpj"],
      });
      res.json(users);
    } else {
      res.status(400).json({
        message: 'Administrador ou Usuario nao logado ou nao autorizado para obter dados do Administrador',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}