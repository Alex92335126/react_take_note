import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"

export default function MyVerticallyCenteredModal(props) {
    // console.log("property", props); 
    const [linkInfo, setLinkInfo] = useState({
        title: '',
        favLink: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLinkInfo(preVal => ({
            ...preVal,
            [name]: value
        }))
    }

    const handleClick = async() => {
      console.log("linkInfo", linkInfo)
      let res = await axios.post("http://localhost:8888/", {
        title: linkInfo.title,
        URL_link: linkInfo.favLink
      })
      if (res) {
        console.log("success")
        props.onHide()
        props.reload()
      }
      setLinkInfo({title: "", favLink: ""})
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
          Add Link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Enter the Note</h4>
        <form>
            <label>Title</label>
            <input
                type='text'
                name="title"
                value={linkInfo.title}
                placeholder="Input Link Title"
                onChange={(e) => handleChange(e)}
            />
            <label>Take Note</label>
            <input
                type='text'
                name="favLink"
                value={linkInfo.favLink}
                placeholder="Input the link to save"
                onChange={(e) => handleChange(e)}
            />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClick}>Add Note</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}