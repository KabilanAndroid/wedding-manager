const { pool } = require('../../db');

const modelNameValidation = (name)=>{
    return typeof name === 'string' && name.trim().length > 0;
}
const modelAddCategories = async({name, description, status, image})=>{
 
    const [result] = await pool.query("INSERT INTO categories (name,description,image_url,status) VALUES (?,?,?,?)",[
     name.trim(), description ?? null, image ?? null, status ?? 'active']
    );
    return result.insertId;
}


module.exports = { modelNameValidation,modelAddCategories };


