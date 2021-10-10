import React from 'react'
import {TaskProps, draggableSnapshotProps} from './InitialData'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components';
interface Props {
    key: string,
    task: TaskProps,
    index: number,
    columnId: string
}

const Container = styled.div``

const TaskContent = styled.div`
border 1px solid lightgrey;
padding: 8px;
margin-bottom: 8px;
border-radius: 2px;
display: flex;
height: ${(props:any) => props.columnId === "all-columns" ?'100px':''};
background-color: ${(props:any) => props.isDragging ?'lightgreen':'white'}`


const Handle = styled.div`
width: 20px;
height: 20px;
background-color: orange;
border-radius: 4px;
margin-right: 8px`




function Task(props:Props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided:any, snapshot:any) => (
                <TaskContent
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                columnId = {props.columnId}
                >
                <Handle/>
                {props.task.content}
            </TaskContent>
                )} 
        </Draggable>
    )
}

export default Task
