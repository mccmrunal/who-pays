import React, { useContext, useRef, useState } from 'react';
import { Button,Form,Alert } from 'react-bootstrap';
import { MyContext } from '../context';


const Stage1=()=> {

  const textInput = useRef();
  const context  = useContext(MyContext);
  const [error,setError] = useState([false,''])

  const handlerSubmit =(e)=>{
    e.preventDefault();
    const value = textInput.current.value;
    textInput.current.value='';
    const validate = validateInput(value);
    
    if(validate){
        setError([false,'']);
        context.addPlayer(value);
        
    }else{
      console.log('error')
    }

  }

   const validateInput=(value)=>{
      if(value === ''){
          setError([true,'sorry enter a name'])
          return false;
      }
      if(value.length <= 2){
        setError([true,'more than 2 character needed'])
          return false;

      } 
      return true;
   }
  return (
    
    <>
    <Form onSubmit={handlerSubmit} className="mt-4">
      <Form.Group>
        <Form.Control
        type="text"
        placeholder="ADD PLAYER NAME"
        name="player"
        ref={ textInput}
        />
      </Form.Group>

      <hr></hr>

        { error[0] ? <Alert variant="danger">
          {
            error[1]
          }
        </Alert>:null
       }

      <Button className="miami"
        variant="primary" type="submit">
          Add Player
      </Button>
      {
        context.state.players && context.state.players.length >0?
        <>
           <hr/>
           <div>
             <ul className="list-group">
               {
                 context.state.players.map((item,idx)=>(
                   <li key={idx} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                   >{item}
                   <span className="badge badge-danger " onClick={()=> context.remover(idx)}> X</span>
                   </li> 
                 ))
               }

             </ul>
             <div className="action_button" onClick=
             {
               ()=>context.next()
             }>
               NEXT
             </div>
           </div>
        </>
        
        :null
      }

    </Form>
    </>
      
  );
}

export default Stage1;
