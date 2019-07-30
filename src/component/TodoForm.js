import React, { Component } from 'react';

class TodoForm extends Component{
    state = {
        todo : '',
        expired : '',
    }
    handleTodoChange = (e) => {
        this.setState({
            todo : e.target.value
        })
    }
    handleExpiredChange = (e) => {
        this.setState({
            expired : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault(); // To prevent page reloading
        if(this.state.todo === "" || this.state.expired === ""){
            alert('입력하세요');
        }
        else{
            var date = new Date(this.state.expired).getTime();
            var today = new Date().getTime()-(24*60*60*1000);
            if(today > date){
                alert('선택한 날짜가 오늘보다 이전입니다.');
            }
            else{
                this.props.onCreate(this.state);
            }
        }
        // 상태 초기화
        this.setState({
            todo : '',
            expired : '',
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="ml-2 mt-3 text-md">Todo</div>
                <input
                    value={this.state.todo}
                    onChange={this.handleTodoChange}
                    name="todo"
                    className="form-control col-md-3 ml-1 mt-1"
                    type="text"
                />
                <div className="ml-1 mt-2">Expiration Date</div>
                <div>
                    <input
                        type="date"
                        value={this.state.expired}
                        onChange={this.handleExpiredChange}
                        name="expired"
                        className="form-control col-md-3 ml-1 mt-1"
                    />
                    < button type="submit" className="btn btn-outline-info col-md-3 ml-1 mt-3">추가</ button>
                </div>
            </form>
        );
    }
}

export default TodoForm;