import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/hello')
export class HelloController {

    @Get()
    async hello() {
        return 'hello world';
    }

}