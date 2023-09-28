import express, { Express } from 'express';
import cors from 'cors';
import usuariosRoutes from "./routes/usuarios";
import categoriasRoutes from './routes/categorias';
import beneficiariosRoutes from './routes/beneficiarios';
import cdsRoutes from './routes/cds';
import cidadesRoutes from './routes/cidades';
import itensRoutes from './routes/itens';
import movimentacoesRoutes from './routes/movimentacoes';
import cd_itensRoutes from './routes/cd_itens';

let server: Express = express();

server.use(cors());
server.use(express.json());

server.use(usuariosRoutes);
server.use(categoriasRoutes);
server.use(beneficiariosRoutes);
server.use(cdsRoutes);
server.use(cidadesRoutes);
server.use(itensRoutes);
server.use(movimentacoesRoutes);
server.use(cd_itensRoutes);

export default {
  start () {
    server.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  }
};
