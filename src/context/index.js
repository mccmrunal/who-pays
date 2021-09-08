import React, { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyContext  =  React.createContext();

class MyProvider  extends Component{
    state={
        stage:1,
        players:[],
        result:'',

    }

    addPlayer = (playerName)=>{
           this.setState((prevState)=>
           ({
               players:[...prevState.players  ,playerName]
           }));
    }

    removePlayerHandler = (idx)=>{
        let newArray =  this.state.players;
        newArray.splice(idx,1);
         this.setState({players:newArray});
    }
    next=()=>{
        if(this.state.players.length >1)
            this.setState({
                ...this.state,   stage:2
            })
            else{
                toast.error("You need more than one player",{
                    position:toast.POSITION.TOP_LEFT,
                    autoClose:2000
                })
            }
    }
    render(){
        return (
            <>
            <MyContext.Provider value ={{
                state:this.state,
                addPlayer:this.addPlayer,
                remover:this.removePlayerHandler,
                next:this.next
            }}>
                {
                    this.props.children
                }
            </MyContext.Provider>
            <ToastContainer/>
            </>
        )
    }
}

export{
    MyContext,MyProvider
}