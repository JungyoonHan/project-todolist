import React, {Component} from 'react';
import TodoInfo from './TodoInfo';

class TodoInfoList extends Component {
    static defaultProps = {
        data : [],
        onRemove : () => console.warn('onRemove not defined'),
        onUpdate : () => console.warn('onUpdate not defined')
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.data !== this.props.data;
    }
    render() {
        const {data, onRemove, onUpdate} = this.props;
        const list = data.map(info => (
            <TodoInfo
                key={info.id}
                info={info}
                onRemove={onRemove}
                onUpdate={onUpdate}/>
            ) 
        );
        return(
            <div>
                {list}
            </div>
        );
    }
}
export default TodoInfoList;