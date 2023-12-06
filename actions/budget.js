export const actionCreator = (action, quantity) => (
    {
        type: action.value,
        payload: validateNumber(quantity.value, action.value)
    }
)