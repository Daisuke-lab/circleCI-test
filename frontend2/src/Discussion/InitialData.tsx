export interface CardProps {
    id: number,
    userId: number,
    groupId: number,
    content: string
}

export interface ColumnProps {
    id: number,
    userId: number,
    cardIds: string[]
}
type cardsProps = Record<string, CardProps>
type ColumnsProps = Record<string, ColumnProps>
export interface GroupProps {
    ideaCards: CardProps[],
    id: number,
    userId: number,
    title: string,
    detail: string
}

export interface DroppableRootProps {
    isDraggingOver: boolean;
  }

const cards1:CardProps[] = [
    {
        id: 1,
        userId: 1,
        groupId: 1,
        content: 'idea card 1'
    },
    {
        id: 2,
        userId: 1,
        groupId: 1,
        content: 'idea card 2'
    },
]
const cards2:CardProps[] = [
    {
        id: 3,
        userId: 1,
        groupId: 2,
        content: 'idea card 3'
    },
    {
        id: 4,
        userId: 1,
        groupId: 2,
        content: 'idea card 4'
    },
]

const GroupData:GroupProps[] = [
    {
        id: 1,
        userId: 1,
        title: 'this is group title 1',
        detail: "this is group detail 1",
        ideaCards: cards1
    },
    {
        id: 2,
        userId: 1,
        title: 'this is group title 2',
        detail: "this is group detail 2",
        ideaCards: cards2
    }

]

export const initialGroup = {
    id: 0,
    userId: 0,
    title: 'this is group title',
    detail: 'this is group detail',
    ideaCards: []
}

export const initialCard = {
    id: 0,
    userId: 0,
    groupId: 0,
    content: 'this is card content'
}

export default GroupData



export interface droppableSnapshotProps {
    isDraggingOver: boolean,
    draggingOverWith: string
}

export interface draggableSnapshotProps {
    isDragging: boolean,
    draggingOver: string
}
