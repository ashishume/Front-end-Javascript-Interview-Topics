import * as ActionTypes from "./actions";
export const addProducts = (task: string): any => {
  return (dispatch: any) => {
    dispatch({
      payload: task,
      type: ActionTypes.ADD_TASK,
    });
  };
};
