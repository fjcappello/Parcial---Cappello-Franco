import express from 'express';
import path from 'path';
import { readJSONFile, writeJSONFile } from '../Utils/utils.js';

const router = express.Router();
const __dirname = path.resolve();
const ingredientesPath = path.join(__dirname, 'Data', 'ingredientes.json');
 
// ENDPOINT POST PARA AGREGAR INGREDIENTES : http://localhost:3000/api/agregarIngredientes 
router.post('/agregarIngredientes', async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: 'Nombre es requerido' });
        }

        const ingredientes = await readJSONFile(ingredientesPath);
        const newId = ingredientes.length ? ingredientes[ingredientes.length - 1].id + 1 : 1;
        const newIngrediente = { id: newId, nombre };

        ingredientes.push(newIngrediente);
        await writeJSONFile(ingredientesPath, ingredientes);

        res.status(201).json(newIngrediente);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar ingrediente' });
    }
});

// ENDPOINT GET PARA OBTENER INFORMACIÓN DE LOS INGREDIENTES : http://localhost:3000/api/infoIngredientes

router.get('/infoIngredientes', async (req, res) => {
    try {
        const ingredientes = await readJSONFile(ingredientesPath);
        res.status(200).json(ingredientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ingredientes' });
    }
});

export default router;
