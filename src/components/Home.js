// json-server --watch products.json --port 3002 (To run json server)

import { useState, useEffect } from "react";
import Header from './Header';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

let Home = () => {

    let [pdata, setPdata] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetchData();        
    })

    function fetchData(){
        fetch("http://localhost:3002/products").then(resp => resp.json()).then(data => {
            // console.log(data)
            setPdata(data);
        })
    }

    function DeleteData(id){

        let login = localStorage.getItem("login")

        if(login){

            let deleteCode = prompt("Enter delete code");

            if(deleteCode === "1234"){ 
                fetch(`http://localhost:3002/products/${id}`, {
                    method: "DELETE"
                }).then((res) => res.json()).then((data) => {
                    fetchData();
                })

                alert("Data successfully deleted.")
            } else {
                alert("Delete code is worng, Delete action failed.")
            }
            
        } else {
            navigate("/login");
        }
        
    }

    return (
        <div className="App">
            <Header />
            <h1 className="m-3">List of Products</h1>

            <Table striped bordered hover size="sm" className="container">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th>State</th>
                        <th>Description</th>
                        <th>Delete Item</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pdata.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.productname}</td>
                                    <td className="p-2">{item.price}</td>
                                    <td className="p-2">{item.seller}</td>
                                    <td className="p-2">{item.state}</td>
                                    <td className="p-2">{item.description}</td>
                                    <td><Button onClick={()=>DeleteData(item.id)} className="bg-danger text-white border border-0" style={{fontSize: "15px"}}>Delete</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Home;