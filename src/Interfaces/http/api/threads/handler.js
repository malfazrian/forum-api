const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const GetThreadByIdUseCase = require("../../../../Applications/use_case/GetThreadByIdUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id } = request.auth.credentials;
    const { title, body } = request.payload;
    const payload = {
      title: title,
      body: body,
      owner: id,
    };
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(payload);

    const response = h.response({
      status: "success",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const getThreadByIdUseCase = this._container.getInstance(
      GetThreadByIdUseCase.name
    );
    const thread = await getThreadByIdUseCase.execute(request.params);

    const response = h
      .response({
        status: "success",
        data: {
          thread,
        },
      })
      .code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
