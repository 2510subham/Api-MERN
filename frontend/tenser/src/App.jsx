import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchData, updateData } from './utils/fetchData';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name: '',
    gender: '',
    email: '',
    status: ''
  });
  useEffect(() => {
    async function getData() {
      const datas = await fetchData('getUser');
      setData(datas.response);

    }
    getData();
  }, [])

  function onEdit(item) {
    setSelectedItem(item);
    setOpen(true);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelectedItem({
      ...selectedItem,
      [name]: value,
    });
  };
  const updatedData = async (e) => {
    e.preventDefault();
    await updateData(`updateUser`, `${selectedItem.id}`, selectedItem)
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <>
      <h1 style={{ textAlign: "center" }}>Api Data</h1>

      {open &&
        <div
          className="modal show"
          style={{ height: "30%", width: "30%", margin: "auto", display: 'block', background: 'rgba(0,0,0,0.3)', padding: '10px', zIndex: '1000' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title> <h1 style={{ textAlign: "center" }}>Edit</h1> </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ marginBottom: "10px", textAlign: "center" }}>
              Name:- <input type="text" name='name' value={selectedItem.name} onChange={handleChange} />
              <br /><br />
              Gender-<input type="text" name="gender" value={selectedItem.gender} onChange={handleChange} />
              <br />
              <br />
              Email:-<input type="email" name="email" value={selectedItem.email} onChange={handleChange} />
              <br />
              <br />
              Active:-<input type="text" name="status" value={selectedItem.status} onChange={handleChange} />
              <br />
            </Modal.Body>

            <Modal.Footer style={{ textAlign: "center" }}>
              <Button variant="secondary" style={{ marginRight: "10px", borderRadius: "10px" }} onClick={() => (setOpen(false))}>Close</Button>
              <Button variant="primary" style={{ borderRadius: "10px" }} onClick={updatedData} >Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      }
      <Table striped bordered hover variant="dark" style={{ textAlign: "center" }}>
        <thead >
          <tr style={{ margin: "20px", padding: "20px" }}>
            <th style={{ margin: "20px", padding: "20px" }}>Name</th>
            <th style={{ margin: "20px", padding: "20px" }}>Gender</th>
            <th style={{ margin: "20px", padding: "20px" }}>Email</th>
            <th style={{ margin: "20px", padding: "20px" }}>Active</th>
            <th style={{ margin: "20px", padding: "20px" }}>Edit</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {
            data?.length > 0 && data?.map((item) => (
              <tr key={item.id}>
                <td style={{ margin: "10px", padding: "10px" }}>{item.name}</td>
                <td style={{ margin: "10px", padding: "10px" }}>{item.gender}</td>
                <td style={{ margin: "10px", padding: "10px" }}>{item.email}</td>
                <td style={{ margin: "10px", padding: "10px" }}>{item.status}</td>
                <td style={{ margin: "10px", padding: "10px" }}><Button variant="primary" type='primary' onClick={() => onEdit(item)}>Edit</Button>{' '}</td>
              </tr>
            ))
          }
        </tbody>

      </Table>


    </>
  )
}

export default App
