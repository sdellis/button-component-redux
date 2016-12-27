namespace IIIFComponents {

    export function selected(state = false, action) {
      switch (action.type) {
        case SELECT:
          return true
        case DESELECT:
          return false
        case TOGGLE:
          return !state
        default:
          return state
      }
    }

}
