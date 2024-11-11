import { Button} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { signoutSuccess } from "../redux/userSlice";
import axios from "../service/axios"

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/user/signout',{
    headers: { 'Content-Type': 'application/json' },
    });
    dispatch(signoutSuccess());
    console.log(res);
    navigate('/');
  };

  return (
    <Button gradientDuoTone="purpleToPink" type="submit" onClick={handleSubmit}>
        Sign In
    </Button>
  );
}