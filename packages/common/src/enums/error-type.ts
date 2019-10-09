export enum ErrorType {
  VALIDATION = 'error.type.validation', // error.validation.<validator>
  CONSTRAINT = 'error.type.constraint', // error.constraint.<unique|check>.<reason>
  LOCKED = 'error.type.locked', // error.locked.<reason>
  OTHER = 'error.type.other' // error.<system>.<reason>
}
