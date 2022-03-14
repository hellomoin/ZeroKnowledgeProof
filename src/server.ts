import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import { ProversController } from '@/controllers/provers.controller';
import { VerifiersController } from '@/controllers/verifiers.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([IndexController, UsersController, VerifiersController, ProversController]);
app.listen();
