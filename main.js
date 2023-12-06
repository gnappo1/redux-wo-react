import './style.css'
import {legacy_createStore as createStore} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import * as actionCreators from './actions/budget'
//! Main Elements of Redux
  //* Store (dispatch, getState, replaceReducer, subscribe)
  //* Reducer(s)
  //* Actions

const initialState = {
  budget: 0
}
//* Let's create the store
const rootReducer = (previousState=initialState, action ) => {
  switch (action.type){
    case "add":
      return {
        ...previousState,
        budget: previousState.budget + action.payload
      }
    case "subtract":
      return {
        ...previousState,
        budget: previousState.budget - action.payload
      }
    case "power":
      return {
        ...previousState,
        budget: previousState.budget ** action.payload
      }
    default:
      return previousState
    }
}

const store = createStore(rootReducer, composeWithDevTools());
console.log("🚀 ~ file: main.js:18 ~ rootReducer budget:", store.getState())

//! DOM Nodes
const budget = document.getElementById("budget")
const form = document.getElementById("form")
const quantity = document.getElementById("quantity")
const actionDropdown = document.getElementById("action-dropdown")
//! Helpers
const validateForm = () => !quantity.value || !actionDropdown.value
const validateNumber = (value, action) => {
  let num = parseInt(value)
  if (num < 0 || typeof num != "number") {
    if (action == "add") {
      num = 0
    } else if (action == "subtract") {
      num = 0
    } else {
      num = 1
    }
  }
  return num
}
//! Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (validateForm()) return
  store.dispatch({
    type: actionDropdown.value,
    payload: validateNumber(quantity.value, actionDropdown.value)
  })
  e.target.reset()
})

// Attach the listener to the store
// const unsubscribe = store.subscribe(() => {
//   budget.innerText = `Total Budget: $${store.getState().budget}`
// })
//! Execute
budget.innerText = `Total Budget: $${store.getState().budget}`

