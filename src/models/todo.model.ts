import {Entity, model, property} from '@loopback/repository'

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number

  @property({
    type: 'string',
    required: true,
  })
  title: string

  @property({
    type: 'string',
  })
  desc?: string

  @property({
    type: 'boolean',
  })
  isComplete?: boolean

  @property({
    type: 'string',
  })
  remindAddress?: string //address, city, zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string

  @property({
    type: 'number',
  })
  toDoListId?: number;

  constructor(data?: Partial<Todo>) {
    super(data)
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations
