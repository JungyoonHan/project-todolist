import React, {Component} from 'react';

class TodoInfo extends Component{
    static defaultProps = {
        info : {
            todo : 'todo',
            expired : '',
            id : 0,
        }
    }
    state = {
        editing : false,
        todo : '',
        expired : '',
    }
    shouldComponentUpdate(nextProps, nextState){
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info){
            return false;
        }
        return true;
    }
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }
    handleToggleEdit = () => {
        const {editing} = this.state;
        this.setState({editing : !editing});
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
    componentDidUpdate(prevProps, prevState){
        const {info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing){
            this.setState({
                todo: info.todo,
                expired: info.expired,
            })
        }
        if(prevState.editing && !this.state.editing){
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
                    onUpdate(info.id, {
                        todo: this.state.todo,
                        expired: this.state.expired,
                    });
                }
            }
        }
    }
    render() {
        const {editing} = this.state;
        // edit mode
        if(editing){
            return(
                <div className="card">
                    <div className="form-group card-body">
                        <div className="col-sm-3">
                            <input
                                type="text"
                                value={this.state.todo}
                                name="todo"
                                onChange={this.handleTodoChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-sm-3 mt-2">
                            <input
                                type="date"
                                value={this.state.expired}
                                name="expired"
                                onChange={this.handleExpiredChange}
                                className="form-control"
                            />
                        </div>
                        <div className="row mt-2 ml-3">
                            <button onClick={this.handleToggleEdit} className="btn btn-outline-primary btn-sm">적용</button>
                            <button onClick={this.handleRemove} className="btn btn-outline-danger btn-sm ml-1">삭제</button>
                        </div>
                    </div>
                </div>
            );
        }
        // general mode
        const {todo, expired} = this.props.info;
        return (
            <div className="card mt-1">
                <div className="ml-1 card-body" >
                    <div className="form-inline">
                        <input type="checkbox"/>
                        <div className="ml-1">{todo}</div>
                    </div>
                    <div>{expired}</div>
                    <div className="row mt-1">
                        <button onClick={this.handleToggleEdit} className="btn btn-outline-primary btn-sm ml-3">수정</button>
                        <button onClick={this.handleRemove} className="btn btn-outline-danger btn-sm ml-1">삭제</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default TodoInfo;