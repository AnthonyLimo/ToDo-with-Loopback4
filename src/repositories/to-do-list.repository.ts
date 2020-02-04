import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository'
import {ToDoList, ToDoListRelations, Todo} from '../models'
import {DbDataSource} from '../datasources'
import {inject, Getter} from '@loopback/core'
import {TodoRepository} from './todo.repository';

export class ToDoListRepository extends DefaultCrudRepository<
  ToDoList,
  typeof ToDoList.prototype.id,
  ToDoListRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof ToDoList.prototype.id>;

  constructor (@inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,) {
    super(ToDoList, dataSource)
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }

  public findByTitle (title: string) {
    return this.findOne({where: {title}})
  }
}
