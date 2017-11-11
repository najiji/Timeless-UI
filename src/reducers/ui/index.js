const initialState = {
  scale: 100,
  playPosition: 10000,
  editorOpen: true,
  selection: {},
  lastClick: { x: 0, y: 0 },
}

const getRangeKeys = (state, action) => {
  const keys = []
  for (let x = Math.min(state.lastClick.x, action.coordinates.x); x <= Math.max(state.lastClick.x, action.coordinates.x); x += 1) {
    for (let y = Math.min(state.lastClick.y, action.coordinates.y); y <= Math.max(state.lastClick.y, action.coordinates.y); y += 1) {
      keys.push(`${x}-${y}`)
    }
  }
  return keys
}

export default (state = initialState, action) => {
  switch (action.type) {
    // -------------------------------------------------------------------------------
    case 'ZOOM_OUT': {
      return {
        ...state,
        scale: Math.min(state.scale + 10, 200),
      }
    }
    // -------------------------------------------------------------------------------
    case 'ZOOM_IN': {
      return {
        ...state,
        scale: Math.max(state.scale - 10, 50),
      }
    }
    // -------------------------------------------------------------------------------
    case 'SET_PLAY_POSITION': {
      return {
        ...state,
        playPosition: action.payload,
      }
    }
    // -------------------------------------------------------------------------------
    case 'OPEN_EDITOR': {
      return {
        ...state,
        editorOpen: true,
      }
    }
    // -------------------------------------------------------------------------------
    case 'CLOSE_EDITOR': {
      return {
        ...state,
        editorOpen: false,
      }
    }
    // -------------------------------------------------------------------------------
    case 'RANGE_TO_SELECTION': {
      const selection = { ...state.selection }
      getRangeKeys(state, action).forEach(key => (selection[key] = true))
      return {
        ...state,
        lastClick: action.coordinates,
        selection,
      }
    }
    // -------------------------------------------------------------------------------
    case 'RANGE_SELECT': {
      const selection = {}
      getRangeKeys(state, action).forEach(key => (selection[key] = true))
      return {
        ...state,
        lastClick: action.coordinates,
        selection,
      }
    }
    // -------------------------------------------------------------------------------
    case 'TOGGLE_SINGLE_NO_RESET': {
      const key = `${action.coordinates.x}-${action.coordinates.y}`
      return {
        ...state,
        lastClick: action.coordinates,
        selection: { ...state.selection, [key]: !state.selection[key] },
      }
    }
    // -------------------------------------------------------------------------------
    case 'TOGGLE_SINGLE_RESET': {
      const key = `${action.coordinates.x}-${action.coordinates.y}`
      return {
        ...state,
        lastClick: action.coordinates,
        selection: { [key]: !state.selection[key] },
      }
    }

    default:
      return state
  }
}
