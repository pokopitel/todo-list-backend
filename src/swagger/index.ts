import { INestApplication } from '@nestjs/common';

import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { writeFileSync } from 'fs';

const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey, methodKey) =>
    `${controllerKey.replace(/Controller$/i, '')}_${methodKey}`,
};

const config = new DocumentBuilder()
  .setTitle('Todo list')
  .setDescription('The Todo list API description')
  .setVersion('0.1')
  .addBearerAuth()
  .build();

export const swaggerSetup = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  writeFileSync('./swagger-spec.json', JSON.stringify(document));
};
