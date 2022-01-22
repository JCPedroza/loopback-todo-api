import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todo} from './todo.model';

@model()
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Todo)
  todos: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
}

export type TodoListWithRelations = TodoList & TodoListRelations;
