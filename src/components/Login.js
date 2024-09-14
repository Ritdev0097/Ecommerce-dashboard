import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';

let Login = () => {
    async function submit(e) {

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let loginData = {username,password}
        
        if(username.value === "" || password === ""){
            alert("Please fill all the fields");
        } else {            
            e.preventDefault();

            localStorage.setItem("loginUser", JSON.stringify(loginData));
            localStorage.setItem("login", "true");
            navigate("/");        
        }

        let result = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(loginData)
        });

        result = await result.json();
        localStorage.setItem("user1",JSON.stringify(result));

    }

    let navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem("login");    
        if(login){
            navigate("/");
        }
    });
    return (
        <>
            <Header />
            <div className='container bg-primary-subtle p-4 mt-5'>
                <h2 className='mb-5'>Login</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='fs-5'>Username : </Form.Label>
                        <Form.Control type="text" id='username' placeholder="Enter username" className='w-50 m-auto text-center'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label className='fs-5'>Password : </Form.Label>
                        <Form.Control type="password" id='password' placeholder="Password" className='w-50 m-auto text-center' />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={submit} className='bg-success'>
                        Login
                    </Button>
                </Form>

                <p className='fs-5 mt-3'>or</p>
                <p className='mt-3'> Don't have an account? <a href="register">Register here</a> </p>
            </div>
        </>
    )
}

export default Login;