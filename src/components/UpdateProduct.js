import Header from './Header';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

let AddProduct = () => {

    const [validated, setValidated] = useState(false);
    let [udata, setUdata] = useState([]);
    let [productId, setProductId] = useState("");
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

    async function getData(){

        let prdctId = document.getElementById('prdctId').value;

        if (prdctId === "") {
            alert("Please Enter Product Id");
        } else {

            let result = await fetch(`http://localhost:3002/products/${productId}`);
            result = await result.json();
            setUdata(result);
            
            console.log(udata);
            
            setProductId(prdctId);
            setProductname(result.productname);
            setSeller(result.seller);
            setPrice(result.price);
            setState(result.state);
            setDescription(result.description);
        
        }
    }

    function updateProductData(){

        let updated_Data = {
            productname,
            seller,
            price,
            state,
            description
        }

        fetch(`http://localhost:3002/products/${productId}`,{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updated_Data)
        }).then((res) => res.json()).then((data) => {            
            alert("Data successfully updated.");
            window.location.reload();
        })
        
    }

    return (
        <>
            <Header />

            <h1 className='text-center m-3'>Update Product</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='bg-primary-subtle container p-5'>
                <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="prdctId" className="m-auto">
                        <Form.Label>Enter Product Id :</Form.Label>
                        <Form.Control
                            required
                            type="text" 
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="Product Id"
                            className='text-center'
                        />
                    </Form.Group>
                </Row>
                    <Button type="submit" as={Col} md="2" onClick={()=>getData()} className='mt-1 mb-3'>Search Product</Button>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Name Product :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={productname}
                            onChange={(e) => setProductname(e.target.value)}
                            placeholder="Product Name" 
                        />                        
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Sellet :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                            placeholder="Seller" 
                        />                        
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Price :</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"                        
                        />                        
                    </Form.Group>                    
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom03">
                        <Form.Label>Description :</Form.Label>
                        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />                        
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />                        
                    </Form.Group>                    
                </Row>                
                <Button type="submit" onClick={updateProductData} className='mt-5'>Update Product Details</Button>
            </Form>
        </>
    )
}

export default AddProduct;