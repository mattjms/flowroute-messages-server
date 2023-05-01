import { Model, Collection } from 'vue-mc-vue3/vue-mc'

class UserModel extends Model {
  defaults() {
    return {
      id: null,
      email: null,
      api_key: null,
      secret_key: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      email: String,
      api_key: String,
      secret_key: String,
    }
  }

  validation() {
    return {
      id: integer.and(min(1)).or(equal(null)),
      email: string.and(required),
      api_key: string.and(required),
      secret_key: string.and(required),
    }
  }

  routes() {
    return {
      fetch: '/user/{id}.json',
      save: '/user',
    }
  }
}

class UserStore extends Collection {
  constructor(models = [], options = {}, attributes = {}) {
    super(models, options, attributes);
    this['total'] = 0;
  }

  model() {
    return UserModel;
  }

  defaults() {
    return {
      orderBy: 'email',
    }
  }

  routes() {
    return {
      fetch: '/users.json',
    }
  }

  getTotal() {
    return this['total']
  }

  getModelsFromResponse(response) {
    this['total'] = response.getData().total;
    response.response.data = response.getData().results;
    return super.getModelsFromResponse(response);
  }
}

export { UserModel, UserStore }
