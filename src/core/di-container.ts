import { Container } from 'inversify';
import { ConfigService } from '../services/config-service';
import { Validator } from '../services/validator-service';
import { MysqlService } from '../services/mysql-service';
import { ToolsService } from '../services/tools-service';

const DIContainer = new Container();

DIContainer.bind<ConfigService>(ConfigService).toSelf().inSingletonScope();
DIContainer.bind<MysqlService>(MysqlService).toSelf().inSingletonScope();
DIContainer.bind<ToolsService>(ToolsService).toSelf().inSingletonScope();
DIContainer.bind<Validator>(Validator).toSelf().inSingletonScope();

export default DIContainer;