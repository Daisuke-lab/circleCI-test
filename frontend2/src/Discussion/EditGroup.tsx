import React, {useState, useContext} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Form, Button, Col, Container } from 'react-bootstrap';
import {DragDropContext} from 'react-beautiful-dnd'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grouping from './Grouping'
import {GroupProps, CardProps} from './InitialData'
import {UnaddedCardContext} from './Discussion'
import {AddedCardContext} from './Group'
import AddedCardsContainer from './AddedCardsContainer'
import UnaddedCardsContainer from './UnaddedCardsContainer'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    addIdeaCard: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      justifyContent: 'space-around',
    },
  }),
);

interface Props {
    open: boolean,
    setOpen: any,
    group: GroupProps
}

export default function TransitionsModal(props:Props) {
  const classes = useStyles();
  const { initialCardData, initialCardDispatch, unaddedCardDispatch, unaddedCardData,
	groupData, groupDispatch, initialGroupData, initialGroupDispatch } = useContext(UnaddedCardContext)
  const {addedCardData, addedCardDispatch} = useContext(AddedCardContext)


  const onDragEnd = (result:any) => {
    const {destination, source, draggableId} = result
    if (!destination) {
        return;
    } else if (
        destination.drooppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    } else {
        if (destination.droppableId === source.droppableId) {
          if (source.droppableId.includes('unaddedCardsContainer')) {
            unaddedCardDispatch({type: 'changeOrder', payload: {source, destination, draggableId}}) 
          } else {
            addedCardDispatch({type: 'changeOrder', payload: {source, destination, draggableId}})
          }
        } else {
          const deletingId = parseInt(draggableId.split('-')[1])
          var addingCard:CardProps | undefined = undefined
          if (source.droppableId.includes('unaddedCardsContainer')) {
            addingCard = unaddedCardData.filter(card => card.id === deletingId)[0];
            unaddedCardDispatch({type: 'delete', payload: {deletingId: deletingId}})
            addedCardDispatch({type: 'add', payload: {source, destination, addingCard}})
          } else {
            addingCard = addedCardData.filter(card => card.id === deletingId)[0]
            addedCardDispatch({type: 'delete', payload: {deletingId: deletingId}}) 
            unaddedCardDispatch({type: 'addToContainer', payload: {source, destination, addingCard}})
          }
        }
    }
	}

	const onSubmit = (e:any) => {
		e.preventDefault()
    if (props.group.userId === 0 ) {
      var addingGroup =initialGroupData.filter(group => group.id === props.group.id)[0];
      addingGroup.userId = 1
      initialGroupDispatch({type: 'delete', payload: {id: addingGroup.id}}) 
      groupDispatch({type: 'add', payload: {group: addingGroup}}) 
    } else {
      const newTitle = e.target[0].value
      const newDetail = e.target[1].value
      groupDispatch({type: 'update', payload: {sourceGroup: props.group, newTitle, newDetail}})
    }
		props.setOpen(false)
	}

	const onDelete = () => {
		console.log(props.group)
		if (props.group.userId !== 0) {
			groupDispatch({type: 'delete', payload: {group: props.group}}) 	
		}
		props.setOpen(false)
	}


  return (
    <DragDropContext  onDragEnd={onDragEnd}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={() => props.setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
		<form className='group_editor' onSubmit={onSubmit}>
        <div className={classes.addIdeaCard}>
                <div className='left_side'>
                    <TextField id="standard-basic" label="Title"　defaultValue={props.group.title} />
					<TextField
							className="group_editor_detail"
							label="詳細"
							multiline
							rows={4}
							defaultValue={props.group.detail}
							variant="outlined"
							/>
                    <div className="ideacards_in_group">
						<Form.Label>グループ内カード</Form.Label>
						<AddedCardsContainer group={props.group}/>
                    </div>
                </div>

                <div className='right_side'>
                    <IconButton aria-label="settings" onClick={() => props.setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                        <div className="ideacards_in_scroll">
						<Form.Label>その他のカード</Form.Label>
                          <UnaddedCardsContainer group={props.group}/>
                        </div>
					<Button style={{margin: '5px'}} className='btn btn-danger' onClick={onDelete}>削除</Button>
                    <Button style={{margin: '5px'}} type='submit'>保存</Button>
                </div>
        </div>
		</form>
        </Fade>
      </Modal>
      </DragDropContext>
  );
}