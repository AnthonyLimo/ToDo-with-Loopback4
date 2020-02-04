import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ToDoList,
  Todo,
} from '../models';
import {ToDoListRepository} from '../repositories';

export class ToDoListTodoController {
  constructor(
    @repository(ToDoListRepository) protected toDoListRepository: ToDoListRepository,
  ) { }

  @get('/to-do-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'Array of Todo\'s belonging to ToDoList',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Todo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return this.toDoListRepository.todos(id).find(filter);
  }

  @post('/to-do-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'ToDoList model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ToDoList.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodoInToDoList',
            exclude: ['id'],
            optional: ['toDoListId']
          }),
        },
      },
    }) todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.toDoListRepository.todos(id).create(todo);
  }

  @patch('/to-do-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'ToDoList.Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Partial<Todo>,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.toDoListRepository.todos(id).patch(todo, where);
  }

  @del('/to-do-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'ToDoList.Todo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.toDoListRepository.todos(id).delete(where);
  }
}
