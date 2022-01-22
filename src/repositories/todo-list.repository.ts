import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoList, TodoListRelations, TodoListImage} from '../models';
import {TodoRepository} from './todo.repository';
import {TodoListImageRepository} from './todo-list-image.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  public readonly image: HasManyRepositoryFactory<TodoListImage, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('TodoListImageRepository') protected todoListImageRepositoryGetter: Getter<TodoListImageRepository>,
  ) {
    super(TodoList, dataSource);
    this.image = this.createHasManyRepositoryFactoryFor('image', todoListImageRepositoryGetter,);
    this.registerInclusionResolver('image', this.image.inclusionResolver);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }

  public findByTitle(title: string) {
    return this.findOne({where: {title}});
  }
}
