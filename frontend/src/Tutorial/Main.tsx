import { AnyTypeAnnotation } from '@babel/types'
import React, {useState} from 'react'
import styled from 'styled-components';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import initialData from './InitialData'
import Column from './Column'
import Task from './Task'
import { ContactSupportOutlined } from '@material-ui/icons';
interface DroppableRootProps {
    isDraggingOver: boolean;
  }
const Container = styled.div`
display: flex;
`

function Main() {
    const [components, setComponents] = useState(initialData)

    const changeOrder = ({column, source, destination, draggableId}:any) => {
        const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...column,
                taskIds: newTaskIds
            }

            setComponents({
                ...components,
                columns: {
                    ...components.columns,
                    [newColumn.id]: newColumn
                }
                
            })
    }

    const changeColumn = ({startColumn, endColumn, source, destination, draggableId}:any) => {
        const startTaskIds = Array.from(startColumn.taskIds)
                startTaskIds.splice(source.index, 1)
                const newStartColumn = {
                    ...startColumn,
                    taskIds: startTaskIds
                }

                const endTaskIds = Array.from(endColumn.taskIds)
                endTaskIds.splice(destination.index, 0, draggableId)
                const newEndColumn = {
                    ...endColumn,
                    taskIds: endTaskIds
                }


                setComponents({
                    ...components,
                    columns: {
                        ...components.columns,
                        [newStartColumn.id]: newStartColumn,
                        [newEndColumn.id]: newEndColumn
                    }
                })
    }


    const onDragEnd = (result:any) => {
        const {destination, source, draggableId} = result
        console.log('source::', source)
        console.log('destination::', destination)

        if (!destination) {
            return;
        } else if (
            destination.drooppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        } else {
            const startColumn = components.columns[source.droppableId]
            const endColumn = components.columns[destination.droppableId]

            if (startColumn === endColumn) {
                changeOrder({column:startColumn, source, destination, draggableId})
            } else {
                changeColumn({startColumn, endColumn, source, destination, draggableId})
            }
        }
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
            {components.columnOrder.map((columnId:string) => {
                const column = components.columns[columnId]
                const tasks = column.taskIds.map((taskId:string) => components.tasks[taskId])
                return (
                    <Column key={column.id} column={column} tasks={tasks} />
                    )
                }
                )
            }
            </Container>
        </DragDropContext>
    )
}

export default Main
