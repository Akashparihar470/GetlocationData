import axios from "axios";



export const REGISTER_REQ = "REGISTER_REQ";
export const REGISTER_SUC = "REGISTER_SUC";
export const REGISTER_FAL = "REGISTER_FAL";

export const LOGIN_REQ = "LOGIN_REQ";
export const LOGIN_SUC = "LOGIN_SUC";
export const LOGIN_FAL = "LOGIN_FAL";


export const SENDGETLOC_REQ = "SENDGETLOC_REQ";
export const SENDGETLOC_SUC = "SENDGETLOC_SUC";
export const SENDGETLOC_FAL = "SENDGETLOC_FAL";


const registerRequest = () =>{
  return{
    type: REGISTER_REQ
  }
}

const registerSuccess = (payload) =>{
    return{
      type: REGISTER_SUC,
      payload
    }
  }

  const registerFaluire = (payload) =>{
    return{
      type: REGISTER_FAL,
      payload
    }
  }


  const loginRequest = () =>{
    return{
      type: LOGIN_REQ
    }
  }
  
  const loginSuccess = (payload) =>{
      return{
        type: LOGIN_SUC,
        payload
      }
    }
  
    const loginFaluire = (payload) =>{
      return{
        type: LOGIN_FAL,
        payload
      }
    }

    const sendgetlocationRequest = () =>{
      return{
        type: SENDGETLOC_REQ
      }
    }
    
    const sendgetlocationsuccess = (payload) =>{
        return{
          type: SENDGETLOC_SUC,
          payload
        }
      }
    
      const sendgetlocationfailure = (payload) =>{
        return{
          type: SENDGETLOC_FAL,
          payload
        }
      }



  export const Register=(user)=>{
    return(dispatch)=>{
        dispatch(registerRequest());
        axios.post(`http://localhost:5500/user/register`,user).then(res=>dispatch(registerSuccess(res.data)))
        .catch(err=>dispatch(registerFaluire(err)))
    }
}


export const Login=(user)=>{
  return(dispatch)=>{
      dispatch(loginRequest());
      axios.post(`http://localhost:5500/user/login`,user).then(res=>dispatch(loginSuccess(res.data)))
      .catch(err=>dispatch(loginFaluire(err)))
  }
}


export const sendgetlocation=(user,id)=>{
  return(dispatch)=>{
      dispatch(sendgetlocationRequest());
      axios.put(`http://localhost:5500/user/findcustomer/${id}`,user).then(res=>dispatch(sendgetlocationsuccess(res.data)))
      .catch(err=>dispatch(sendgetlocationsuccess(err)))
  }
}