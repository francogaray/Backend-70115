// Bcypt
// 1) Instalamos : npm i bcrypt
// 2) Importamos el módulo

import bcrypt from "bcrypt";

// Vamos a crear dos funciones
// a) createHash: Aplica el hash al password
// b) isValidPassword: compara el password proporcionado por la base de datos.

const createHash = async (password) => {
    await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};


// hashSync: Toma el password que le pasamos y aplica el proceso de hasheo a partir de un salt
// Un "salt" es un string random pque se hace para eul proceso se realice de forma impredecible
// (10) = generará un salt de 10 caracteres

// ESTE PROCESO ES IRREVERSIBLE

const isValidPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};


// Al comparar los password retorna un true o false segun corresponda


export {createHash, isValidPassword}