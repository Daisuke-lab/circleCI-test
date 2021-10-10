export interface TaskProps {
    id: string,
    content: string
}

export interface ColumnProps {
    id: string,
    title: string,
    taskIds: string[]
}
type TasksProps = Record<string, TaskProps>
type ColumnsProps = Record<string, ColumnProps>
interface Props {
    tasks: TasksProps,
    columns: ColumnsProps,
    columnOrder: string[]
}

export interface DroppableRootProps {
    isDraggingOver: boolean;
  }
const initialData:Props = {
    tasks: {
        "task-1": {id: "task-1", content: "this is task 1 content"},
        "task-2": {id: "task-2", content: "this is task 2 content"},
        "task-3": {id: "task-3", content: "this is task 3 content"},
        "task-4": {id: "task-4", content: "this is task 4 content"},
        "task-5": {id: "task-5", content: "this is task 5 content"},
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do",
            taskIds: ["task-1", 'task-2', "task-3", "task-4", "task-5"]
        },
        "column-2": {
            id: "column-2",
            title: "In Progress",
            taskIds: []
        },
        "column-3": {
            id: "column-3",
            title: "Done",
            taskIds: []
        },
        "all-columns": {
            id: "all-columns",
            title: "Default",
            taskIds: []
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}

export default initialData


export interface droppableSnapshotProps {
    isDraggingOver: boolean,
    draggingOverWith: string
}

export interface draggableSnapshotProps {
    isDragging: boolean,
    draggingOver: string
}