export function reducer1Action() {
  return { type: 'reducer1_action1' }
}

export function reducer2Action() {
  return { type: 'reducer2_action1' }
}

export function thunkAction() {
  return (dispatch, getState) => {
    dispatch(reducer1Action())
    dispatch(reducer2Action())
  }
}

export function sagaAction() {
  return { type: 'sagaAction' }
}
