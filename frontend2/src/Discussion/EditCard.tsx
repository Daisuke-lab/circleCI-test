import React, {useState, useRef, useContext} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import {Button} from 'react-bootstrap';
import {useStyles} from './EditGroup'
import {CardProps} from './InitialData'
import {UnaddedCardContext} from './Discussion'

interface Props {
    open: boolean,
    setOpen: any,
    card: CardProps

}




function EditCard(props:Props) {
    const classes = useStyles()
    const [content, setContent] = useState(props.card.content)
    const { initialCardData, initialCardDispatch, unaddedCardDispatch } = useContext(UnaddedCardContext)
    const onSubmit = (e:any) => {
        e.preventDefault()
        const newContent = e.target[1].value
        if (props.card.userId === 0) {
          initialCardDispatch({type: 'delete', payload: {sourceCard: props.card}})
          unaddedCardDispatch({type: 'add', payload: {sourceCard: props.card, newContent: newContent}})
        } else {
          unaddedCardDispatch({type: 'update', payload: {sourceCard: props.card, newContent: newContent}})
        }
        props.setOpen(false)

    }

    const onChange = (e:any) => {
        const changedContent = e.target.value
        setContent(changedContent)
    }

    const onDelete = () => {
      if (props.card.userId !== 0) {
        unaddedCardDispatch({type: 'delete', payload: {deletingId: props.card.id}})
        props.setOpen(false)
      }
    }
    return (
        <div>
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
          <div className={classes.paper}>
              <form onSubmit={onSubmit}>
                  <div className='group_editor_header'>
              <IconButton aria-label="settings" onClick={() => props.setOpen(false)}>
                    <CloseIcon />
                </IconButton>
                </div>
                <div className='group_editor_content'>
              <TextField
                className="group_editor_detail"
                label="詳細"
                multiline
                rows={4}
                defaultValue={content}
                onChange={onChange}
                variant="outlined"
                />
                <Button style={{margin: '5px'}} className='btn btn-danger' onClick={onDelete}>削除</Button>
                <Button style={{margin: '5px'}} type="submit">保存</Button>
                </div>
              </form>
          </div>
        </Fade>
      </Modal>
    </div>
    )
}

export default EditCard
