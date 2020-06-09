import { Service } from "../core/service.decorator";
import { ConfigService } from "./config-service";

@Service()
export class GeneratorService {

    constructor(private configService: ConfigService) { }
}