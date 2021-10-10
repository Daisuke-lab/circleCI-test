import GroupData, {CardProps, GroupProps, initialCard, initialGroup} from './InitialData'
export const initialCardReducer:React.Reducer<CardProps[], any> = (state: CardProps[], action) => {
    if (state.length === 2) {
        const lastId = state[state.length - 1].id
        const plusState = Array(10).fill(0).map((_, index) => ({...initialCard, id: lastId + index + 1}))
        state = [...state, ...plusState]
    }
    switch (action.type) {
      case "delete":
          const changedCard = state.filter(card => card === action.payload.sourceCard);
          const index = state.indexOf(changedCard[0])
          state.splice(index, 1)
        return [...state];
      default:
          return state 
    }
  };
export const unaddedCardReducer:React.Reducer<CardProps[], any> = (state: CardProps[], action) => {
    switch (action.type) {

        case "add":
            const addingCard = action.payload.sourceCard
            addingCard.content = action.payload.newContent
            addingCard.userId = 1
            return [...state, addingCard]
        case "update":
            const changedCard = state.filter(card => card === action.payload.sourceCard);
            const index = state.indexOf(changedCard[0])
            changedCard[0].content = action.payload.newContent
            state.splice(index, 1, changedCard[0])
            return [...state];

        case "delete":
            const deletingCard = state.filter(card => card.id === action.payload.deletingId);
            const deletingIndex = state.indexOf(deletingCard[0])
            state.splice(deletingIndex, 1)
            return [...state];
        case "changeOrder":
            console.log('changeOrder is called')
            const orderChangedCard = state.filter((card:CardProps) => `unaddedCard-${card.id}` === action.payload.draggableId);
            state.splice(action.payload.source.index, 1)
            state.splice(action.payload.destination.index, 0, orderChangedCard[0])
            console.log('state',state)
            return [...state]

        case "addToContainer":
            state.splice(action.payload.destination.index, 0, action.payload.addingCard)
            return [...state]
        default:
            return state 
        }
  };

  export const addedCardReducer:React.Reducer<CardProps[], any> = (state: CardProps[], action) => {
    switch (action.type) {

        case "add":
            state.splice(action.payload.destination.index, 0, action.payload.addingCard)
            return [...state]
        case "update":
            const changedCard = state.filter(card => card === action.payload.sourceCard);
            const index = state.indexOf(changedCard[0])
            changedCard[0].content = action.payload.newContent
            state.splice(index, 1, changedCard[0])
            return [...state];

        case "delete":
            const deletingCard = state.filter(card => card.id === action.payload.deletingId);
            const deletingIndex = state.indexOf(deletingCard[0])
            state.splice(deletingIndex, 1)
            return [...state];
        case "changeOrder":
            const orderChangedCard = state.filter((card:CardProps) => `addedCard-${card.id}` === action.payload.draggableId);
            state.splice(action.payload.source.index, 1)
            state.splice(action.payload.destination.index, 0, orderChangedCard[0])
            return [...state]
        default:
            return state 
        }
  };


  export const initialGroupReducer:React.Reducer<GroupProps[], any> = (state: GroupProps[], action) => {
    if (state.length === 2) {
        const lastId = state[state.length - 1].id
        const plusState = Array(10).fill(0).map((_, index) => ({...initialGroup, id: lastId + index + 1}))
        state = [...state, ...plusState]
    }
    switch (action.type) {
        case "delete":
            const deletingIndex = state.indexOf(action.payload.id)
            state.splice(deletingIndex, 1)
            return [...state];
        default:
            return state 
        }
  };

  export const groupReducer:React.Reducer<GroupProps[], any> = (state: GroupProps[], action) => {
    switch (action.type) {

        case 'add':
            return [...state, action.payload.group]
        case "delete":
            const deletingGroup = state.filter(group => group === action.payload.group)[0];
            const deletingIndex = state.indexOf(deletingGroup)
            state.splice(deletingIndex, 1)
            return [...state];

        case "update":
            const changedGroup = state.filter(group => group === action.payload.sourceGroup)[0];
            const index = state.indexOf(changedGroup)
            changedGroup.detail = action.payload.newDetail
            changedGroup.title = action.payload.newTitle
            state.splice(index, 1, changedGroup)
            return [...state];
        default:
            return state 
        }
  };