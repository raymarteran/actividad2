const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const UserModel = new userModel();

class UsersController {
    getUsers(req, res) {
        return new Promise((resolve, reject) => {
            try {
                const users = UserModel.getUsers();
                resolve(users);
            } catch (error) {
                reject(error);
            }
        })
    }

    getActividadesCategoriaUsuario(idUser, nameCategoria) {
        return new Promise((resolve, reject) => {
            let userId = idUser;
            userId = parseInt(userId);
            const actividades = UserModel.getActividadesCategoriaUsuario(userId, nameCategoria);
            if (!actividades) {
                reject({ status: 404, message: 'No se encontraron actividades de ese usuario para esa categoría' });
            } else {
                resolve(actividades);
            }
        })
    }

    postUser (body) {
        let newUser = body;
        let allUsers = UserModel.getUsers();
        newUser.id = allUsers.length + 1;

        return new Promise((resolve, reject) => {
                //validar que todos los campos esten completos
                if (!newUser.name || !newUser.lastName || !newUser.userName || !newUser.email || !newUser.password || !newUser.repassword) {
                    reject({ status: 400, error: 'Todos los campos son obligatorios' });
                    return;
                }
    
                //agregar permission con un valor por defecto
                newUser.permission = 'user';
    
                //validar que el email sea unico
                const emailExists = allUsers.some(user => user.email === newUser.email);
                if (emailExists) {
                    reject({ status: 400, error: 'El email ya existe' });
                    return;
                }
    
                //validar que passwords sean iguales
                if (newUser.password !== newUser.repassword) {
                    reject({ status: 400, error: 'Las contraseñas no coinciden' });
                    return;
                }
    
                //hacer que el password sea encriptado en bycript
                let pass = bcrypt.hashSync(newUser.password, 10);
                newUser.password = pass;
    
                //quitar repassword para no guardar en la base de datos
                delete newUser.repassword;
    
                // Guarda al Usuario
                UserModel.postUser(newUser)
                .then(() => {
                    const users = UserModel.getUsers();
                    resolve({ status: 201, message: 'Usuario creado correctamente', users });
                })
                .catch(error => {
                    console.log("entra en el catch error")
                    console.log(error)
                    reject({ status: 500, error: 'Error al crear el usuario' });
                });
        })
        .catch(error => {
            console.log("entra en el catch error de la promess")
            console.log(error)
        });
    };

    

    getLastActividadesRealizadas (idAr) {
        return new Promise((resolve, reject) => {
            try {
                let userId = idAr;
                //convertir userId en number
                userId = parseInt(userId)
                const result =UserModel.getLastActividadesRealizadas(userId)
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
        .catch(error => {
            console.log("entra en el catch error de la promess")
            console.log(error)
        });
    };
}

module.exports = UsersController;