import React, {useState} from 'react'
import Tree from './Tree'
import Process from './Process'
import Opposite from './Opposite'
function Connection() {
    const [nums, setNums] = useState(3)
    return (
        <div>
            <Tree nums={nums}/>
            <Process/>
        </div>
    )
}

export default Connection
