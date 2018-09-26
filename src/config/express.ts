import 'reflect-metadata';
import * as express from 'express';
import { Container } from 'typedi';
import { BadRequestError, useContainer, useExpressServer } from 'routing-controllers';
import { validate, ValidationError } from 'class-validator';
import { ActionParameterHandler } from 'routing-controllers/ActionParameterHandler';
import { plainToClass } from 'class-transformer';
import * as bodyParser from 'body-parser';
import { HelloController } from 'helloController.ts';
import { UserController } from 'userController.ts';

export class ExpressConfig {
    app: express.Express;
    port: any;

    constructor() {
        useContainer(Container);

        this.app = express();

        this.fixClassTransformerCompatibilityIssue();

        this.fixClassValidatorCompatibilityIssue();

        this.setupBodyParser();

        this.setupControllers();

        this.port = process.env.PORT || 3000;
        this.app.set('port', this.port);
    }

    private fixClassTransformerCompatibilityIssue() {
        ActionParameterHandler.prototype['transformValue'] = function (value, paramMetadata) {
            if (paramMetadata.targetType &&
                paramMetadata.targetType !== Object &&
                !(value instanceof paramMetadata.targetType)) {
                const options = paramMetadata.classTransform || this.driver.plainToClassTransformOptions;
                value = plainToClass(paramMetadata.targetType, value, options);
            }
            return value;
        };
    }

    private fixClassValidatorCompatibilityIssue() {
        ActionParameterHandler.prototype['validateValue'] = function (this: any, value: any, paramMetadata: any) {
            const isValidationEnabled = (paramMetadata.validate instanceof Object || paramMetadata.validate === true)
                || (this.driver.enableValidation === true && paramMetadata.validate !== false);
            const shouldValidate = paramMetadata.targetType
                && (paramMetadata.targetType !== Object)
                && (value instanceof paramMetadata.targetType);

            if (isValidationEnabled && shouldValidate) {
                const options = paramMetadata.validate instanceof Object ? paramMetadata.validate : this.driver.validationOptions;
                return validate(value, options)
                    .then((validationErrors: ValidationError[]) => {
                        if (validationErrors.length > 0) {
                            const error: any = new BadRequestError(`Invalid ${paramMetadata.type}, check 'errors' property for more info.`);
                            error.errors = validationErrors;
                            error.paramName = paramMetadata.name;
                            throw error;
                        }
                        return value;
                    });
            }

            return value;
        };
    }

    setupBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    setupControllers() {
        useExpressServer(this.app, {
            routePrefix: '/api',
            controllers: [
                HelloController,
                UserController
            ],
            middlewares: [],
            defaultErrorHandler: true,
            classTransformer: false,
            validation: true,
            cors: true
        });
    }
}