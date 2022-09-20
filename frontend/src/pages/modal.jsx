import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addTodoThunk } from '../redux/todoSlice';

export default function MyVerticallyCenteredModal(props) {
    // console.log("property", props); 
    const dispatch = useDispatch()
    const [linkInfo, setLinkInfo] = useState({
        content: '',
        // favLink: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLinkInfo(preVal => ({
            ...preVal,
            [name]: value
        }))
    }

    const handleClick = async() => {
      console.log("content", linkInfo.content)
      await dispatch(addTodoThunk(linkInfo))
      props.onHide()
    } 

    return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Enter Note</h4>
        <form>
            <label>Add Note</label>
            <input
                type='text'
                name="content"
                value={linkInfo.title}
                placeholder="Add Notes"
                onChange={(e) => handleChange(e)}
            />
            {/* <label>Take Note</label>
            <input
                type='text'
                name="favLink"
                value={linkInfo.favLink}
                placeholder="Input the link to save"
                onChange={(e) => handleChange(e)}
            /> */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClick}>Add Note</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}