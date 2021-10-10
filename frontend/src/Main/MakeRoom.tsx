import React, {useState} from 'react'
import { Form, Button, Col, Container } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import {Link, Redirect } from 'react-router-dom'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
interface MemberProp {
    key: number,
    name: string
}

interface MembersProp extends Array<MemberProp>{}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
      border: '3px solid #fdb827',
      borderRadius: '20px',
      minHeight: '50px'
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);
function MakeRoom() {
    const classes = useStyles();
    const [members, setMembers] = useState([
        { key: 0, name: 'Angular' },
        { key: 1, name: 'jQuery' },
        { key: 2, name: 'Polymer' },
        { key: 3, name: 'React' },
        { key: 4, name: 'Vue.js' },
      ])
    const [choosenMembers, setChoosenMembers] = useState<any[]>([])
    const deleteMember = (chipToDelete:MemberProp) => () => {
        setChoosenMembers((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };

    const addMember = (e:any) => {
        console.log(e.target.value)
        const choosenKey = parseInt(e.target.value)
        const newMember = members.filter(member => member.key === choosenKey);
        if (!choosenMembers.includes(newMember[0])) {
            setChoosenMembers([...choosenMembers, ...newMember])
        }
    }
    console.log(choosenMembers)
    return (
        <Container>
        <Form>
            <Form.Row>
                <Form.Group  as={Col}>
                    <Form.Label>*ルームの名前</Form.Label>
                    <Form.Control type="text" placeholder="ルームの名前を決めてください" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>メンバーを追加</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." onChange={addMember}>
                        <option>Choose...</option>
                        {members.map(member => (
                            <option value={member.key}>{member.name}</option>
                        ))}
                    </Form.Control>
                    
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group  as={Col}  controlId="exampleForm.ControlTextarea1">
                    <Form.Label>*ルームの目的</Form.Label>
                    <Form.Control type="text"　 as="textarea" placeholder="ルームの目的を決めてください" />
                </Form.Group>
                <Col>
                    <label>メンバー</label>
                    <div className={classes.root}>
                        {choosenMembers.map((chip:MemberProp) => (
                            <li>
                            <Chip
                            icon={<FaceIcon />}
                            label={chip.name}
                            onDelete={deleteMember(chip)}
                            color="primary"
                            variant="outlined"
                            className={classes.chip}
                        />
                        </li>
                        ))}
                    </div>
                    </Col>
            </Form.Row>
            <Form.Row>
            <Form.Group>
                <Form.Label>ルームのアイコン(optional)</Form.Label>
                <Form.File id="exampleFormControlFile1" name="ルームのアイコン(optional)" />
            </Form.Group>
            </Form.Row>
            <Link to='discussion'>
            <Button variant="primary" type="submit" style={{}}>
                作成
            </Button>
            </Link>
        </Form>
        </Container>
    )
}

export default MakeRoom
