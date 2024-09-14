import Header from './Header';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

let AddProduct = () => {

    const [validated, setValidated] = useState(false);
    let [productname, setProductname] = useState("");
    let [seller, setSeller] = useState("");
    let [price, setPrice] = useState("");
    let [state, setState] = useState("");
    let [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    function addproduct(e){
        e.preventDefault();
        
        let productname = document.getElementById('productname').value;
        let seller = document.getElementById('seller').value;
        let price = document.getElementById('price').value;
        let state = document.getElementById('state').value;
        let description = document.getElementById('description').value;
        
        let productData = {productname,seller,price,state,description};
        
        fetch("http://localhost:3002/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(productData)
        }).then((res) => res.json()).then((data) => {
            return 0;            
        })

        setProductname("");
        setSeller("");
        setPrice("");
        setState("");
        setDescription("");    
    }

    return (
        <>
            <Header />

            <h1 className='text-center m-3'>Add Product</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='bg-primary-subtle container p-5'>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="productname">
                        <Form.Label>Name Product :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={productname}
                            placeholder="Product Name" 
                            onChange={(e) => setProductname(e.target.value)}                                              
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="seller">
                        <Form.Label>Seller :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={seller}
                            placeholder="Seller Name" 
                            onChange={(e) => setSeller(e.target.value)}                 
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="price">
                        <Form.Label>Price :</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={price}
                            placeholder="Price" 
                            onChange={(e) => setPrice(e.target.value)}                  
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>                    
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="description">
                        <Form.Label>Description :</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={description}
                        placeholder="Description" 
                        onChange={(e) => setDescription(e.target.value)}
                        required 
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={state}
                        placeholder="State" 
                        onChange={(e) => setState(e.target.value)}
                        required 
                        />
                    </Form.Group>                    
                </Row>                
                <Button type="submit" onClick={addproduct} className='mt-5'>Add Product</Button>
            </Form>
        </>
    )
}

export default AddProduct;