import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

let Register = () => {

    let navigate = useNavigate();

    async function register(e) {
        e.preventDefault();

        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let password2 = document.getElementById('password2').value;
        let city = document.getElementById('city').value;
        let occupation = document.getElementById('occupation').value;

        if(
            email === '' || 
            username === '' || 
            password === '' || 
            password2 === '' || 
            city === ''            
        ) {
            alert('Please fill all the fields');
        } else {
            // alert('Successfully registered. Please login');
            navigate('/login');
        }

        let logindata = {email,username,password,city,occupation}

        let storeLoginData = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(logindata)
        });
        storeLoginData = await storeLoginData.json();
        localStorage.setItem("user",JSON.stringify(storeLoginData));

    }

    return (
        <>
        <Header />
        <div className='container bg-primary-subtle p-4 mt-5'>

            <h2 className='m-2'>Register</h2>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className='fs-5'>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" id='email' className='w-60 m-auto text-center' required/>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label className='fs-5'>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" id='username' className='w-60 m-auto text-center'/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label className='fs-5'>Password</Form.Label>
                    <Form.Control placeholder="Password" id='password' className='w-60 m-auto text-center'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='fs-5'>Confirm Password</Form.Label>
                </Form.Group>
                    <Form.Control placeholder="Confirm Password" id='password2' className='w-60 m-auto text-center'/>

                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label className='fs-5'>City</Form.Label>
                        <Form.Control placeholder="City" id='city' className='w-60 m-auto text-center'/>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label className='fs-5'>Ocucupation</Form.Label>
                        <Form.Select defaultValue="Choose..." id='occupation'>
                            <option value={"student"} >Student</option>
                            <option value={"teacher"} >Teacher</option>
                            <option value={"employed"} >Employed</option>
                            <option value={"other"} >Other</option>                            
                        </Form.Select>
                    </Form.Group>

                  
                </Row>
                <Button variant="danger" type="submit" className='mx-5'>
                    Reset
                </Button>
                <Button variant="success" type="submit" onClick={register} className='mx-5'>
                    Register
                </Button>
            </Form>
            
            <p className='fs-5 mt-3'>or</p>
            <p className='mt-3'>Already have an account? <a href="login">Login here</a> </p>

        </div>
        </>
    )
}

export default Register;