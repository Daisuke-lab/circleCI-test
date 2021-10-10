import React from 'react'
import {ColumnProps, TaskProps} from './InitialData'
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd'
import { useSpring, useSprings, animated } from '@react-spring/web'
import { useDrag, useGesture, useHover } from 'react-use-gesture'
import Task from './Task'
interface Props {
    key: string,
    column: ColumnProps,
    tasks: TaskProps[]

}

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
background-color: white;
min-width: 220px;

display: flex;
flex-direction: column`

const Title = styled.h3`
padding: 8px;
background-color: white`;
interface DroppableRootProps {
    isDraggingOver: boolean;
  }

  
const TaskList = styled.div<DroppableRootProps>`
padding: 8px;
flex-grow: 1;
min-height: 100px;
max-height: 400px;
background-color: ${(props:any) => props.isDraggingOver?"skyblue":"black"}`

function Column(props:Props) {
    const AnimatedContainer= animated(Container)
    const [task, api] = useSpring(() => (
        {x: 0, y: 0}))
    const bind = useDrag(({first, last, movement:[x,y], down})  => {
        console.log('bind called')
        api({x:x, y:y, immediate:down})
        }, {initial: () => [task.x.get(), task.y.get()]})
    return (
        <AnimatedContainer style={task}>
            <Title  {...bind()}>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <TaskList
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                    key={props.column.id}
                    >
                    {props.tasks.map((task, index) => 
                        <Task key={task.id} task={task} index ={index} columnId={props.column.id}/>)
                        }
                        {provided.placeholder}
                </TaskList>
                    )}
            </Droppable>
        </AnimatedContainer>
    )
}

export default Column
