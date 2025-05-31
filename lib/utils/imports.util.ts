/* eslint-disable @typescript-eslint/no-var-requires */
import type { plainToClass as _plainToClass } from 'class-transformer';
import type { validateSync as _validateSync } from 'class-validator';

// Resolve class-validator, class-transformer from root node_modules to avoid decorator metadata conflicts
let classValidatorModule: { validateSync: typeof _validateSync };
try {
  const classValidatorModulePath = require.resolve('class-validator', {
    paths: ['../..', '.'],
  });
  classValidatorModule = require(classValidatorModulePath);
} catch (e) {
  /* istanbul ignore next */
  classValidatorModule = require('class-validator');
}
export const { validateSync } = classValidatorModule;

let classTransformerModule: { plainToClass: typeof _plainToClass };
try {
  const classTransformerModulePath = require.resolve('class-transformer', {
    paths: ['../..', '.'],
  });
  classTransformerModule = require(classTransformerModulePath);
} catch (e) {
  /* istanbul ignore next */
  classTransformerModule = require('class-transformer');
}
export const { plainToClass } = classTransformerModule;
