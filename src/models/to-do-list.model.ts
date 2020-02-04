import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todo} from './todo.model';

@model()
export class ToDoList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Todo)
  todos: Todo[];

  constructor(data?: Partial<ToDoList>) {
    super(data);
  }
}

export interface ToDoListRelations {
  // describe navigational properties here
}

export type ToDoListWithRelations = ToDoList & ToDoListRelations;
