import React, {Component} from 'react';
import TodoForm from './component/TodoForm';
import TodoInfoList from './component/TodoInfoList';

function Sorting(arr){
  arr.sort((a,b) => {
    return new Date(a.expired).getTime() - new Date(b.expired).getTime();
  }).sort();
}

function Clock(props){
  return(
    <p className="ml-1">Today : {props.date.getFullYear()}년 {props.date.getMonth()+1}월 {props.date.getDate()}일</p>
  );
}

class App extends Component{
  id = 0
  state = {
    information: [
    ]
  }
  // Add
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information : information.concat({id : this.id++, ...data})
    })
  }
  // Remove
  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information : information.filter(info => info.id !== id)
    })
  }
  // Update
  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => id === info.id ? { ...info, ...data} : info
      )
    })
  }
  render(){
    const {information} = this.state;
    Sorting(information);
    return(
      <div>
        <Clock date={new Date()}/>
        <TodoForm onCreate={this.handleCreate}/>
        <hr/>
        <TodoInfoList
          data={information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}/>
      </div>
    );
  }
}

export default App;
