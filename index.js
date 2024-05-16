import express from 'express';
import bodyParser from 'body-parser';
import ingredientesRoutes from './Routes/ingredientes.js';
import recetasRoutes from './Routes/recetas.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', ingredientesRoutes);
app.use('/api', recetasRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
