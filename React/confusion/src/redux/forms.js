import * as ActionTypes from "./ActionTypes";

export const Feedback = (
    state = {
      feedback: [],
    },
    action
  ) => {
    switch (action.type) {


      case ActionTypes.ADD_COMMENT:
        var feedback = action.payload;
        console.log("Feedback", feedback);
        return { ...state, feedback: state.feedback.concat(feedback) };

      default:
        return state;
    }
  };