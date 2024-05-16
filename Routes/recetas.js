import express from 'express';
import path from 'path';
import { readJSONFile, writeJSONFile } from '../Utils/utils.js';

const router = express.Router();
const recetasPath = path.join('Data', 'recetas.json');
const ingredientesPath = path.join('Data', 'ingredientes.json');


router.post('/agregarRecetas', async (req, res) => {
    try {
        const { nombre, descripcion, ingredientes } = req.body;
        if (!nombre || !descripcion || !Array.isArray(ingredientes)) {
            return res.status(400).json({ message: 'Datos de receta incompletos' });
        }

        const recetas = await readJSONFile(recetasPath);
        const newId = recetas.length ? recetas[recetas.length - 1].id + 1 : 1;
        const newReceta = { id: newId, nombre, descripcion, ingredientes };

        recetas.push(newReceta);
        await writeJSONFile(recetasPath, recetas);

        res.status(201).json(newReceta);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar receta' });
    }
});


router.get('/infoRecetas', async (req, res) => {
    try {
        const recetas = await readJSONFile(recetasPath);
        const ingredientes = await readJSONFile(ingredientesPath);

        const recetasConIngredientes = recetas.map(receta => {
            const ingredientesDetalle = receta.ingredientes.map(ing => {
                const ingredienteInfo = ingredientes.find(i => i.id === ing.id);
                return {
                    id: ing.id,
                    nombre: ingredienteInfo ? ingredienteInfo.nombre : 'Desconocido',
                    cantidad: ing.cantidad
                };
            });
            return { ...receta, ingredientes: ingredientesDetalle };
        });

        res.status(200).json(recetasConIngredientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener recetas' });
    }
});


router.put('/actualizarRecetas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: 'Nombre es requerido' });
        }

        const recetas = await readJSONFile(recetasPath);
        const recetaIndex = recetas.findIndex(receta => receta.id == id);

        if (recetaIndex === -1) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        recetas[recetaIndex].nombre = nombre;
        await writeJSONFile(recetasPath, recetas);

        res.status(200).json(recetas[recetaIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar receta' });
    }
});

export default router;
