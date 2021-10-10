import React from 'react'
import {Link, Redirect } from 'react-router-dom'
import {Container, Col, Row, Table, Button} from 'react-bootstrap';
function ChooseRoom() {
    return (
        <Container className='choose_room_container'>
            いろいろなデータシェイプが後ろでフェイドアウト
            <Link to='make_room'>
            <button className='make_room'><span>新しくルームを作る。</span></button>
            </Link>
            <Link to='rooms'>
            <button className='use_room'><span>既存のルームを使う。</span></button>
            </Link>
        </Container>
    )
}

export default ChooseRoom
