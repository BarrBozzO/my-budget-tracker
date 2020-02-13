const createPromiseMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.meta && action.meta.promise) {
    return new Promise((resolve, reject) => {
      action.meta = {
        ...action.meta,
        resolve,
        reject
      };
      next(action);
    });
  }

  return next(action);
};

export default createPromiseMiddleware;
