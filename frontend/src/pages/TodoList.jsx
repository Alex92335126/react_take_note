import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import Button from 'react-bootstrap/Button';


export default function Todo_list(props) {
    const [list, setList] = useState([])
    useEffect(()=> {
        // console.log(props.links)
        // console.log(props.word)
        setList(props.links)
    }, [props, list])

    const filteredLinks = list && list.filter(list => {
        return list.title.toLowerCase().includes(props.word.toLowerCase()) || list.URL_link.toLowerCase().includes(props.word.toLowerCase())
    });

    const deleteLink = async(id) => {
        console.log("clicked del", id)
        let res = await axios.delete(`http://localhost:8888/${id}`)
        if (res) {
            console.log("succes")
            props.reload()
        }
    }

    return (
        <>
            <div className="d-flex">
                        <div className="col-md-5">
                            <h3>Title</h3>
                        </div>
                        <div className="col-md-5">
                            <h3>Take Note</h3>
                        </div>
                        <div className="col-md-2">
                            <h3>Remove Note</h3>
                        </div>
                        
                    </div>
            {filteredLinks ? filteredLinks.map((item) => {
                return (
                    <div className="d-flex my-2" key={item.id}>
                        <div className="col-md-5">
                            {item.title} 
                        </div>
                        <div className="col-md-5">
                        <a href={item.URL_link.includes("https") ? item.URL_link : `https://${item.URL_link}`} target="_blank">{item.URL_link}</a>
                        </div>
                        <div className="col-md-2">
                            <Button variant="success" className="del_button" onClick={() => deleteLink(item.id)}>
                                Delete
                            </Button>
                        </div>
                        
                    </div>
                )
            }):null}
        </>
    )
}
