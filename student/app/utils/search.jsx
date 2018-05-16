import React from 'react';
import { Input, Button } from 'antd';


const InputGroup = Input.Group;

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            focus: false,
            searchState: false,
            defaultValue: ''
        }
        this.lastKey = '',
            this.key = ''
    }

    //输入框文本变化时调用
    handleInputChange(e) {
        this.key = e.target.value;
        this.setState({
            defaultValue: e.target.value
        })
    }

    handleClose(){
        this.key='';
        this.onSearch('')
        this.setState({
            searchState:false,
            defaultValue:''
        })
    }

    onFocus(e) {
        this.setState({ focus: true })
    }
    onBlur(e) {
        this.setState({ focus: false })
        this.onSearch(this.key)
    }
    onPressEnter() {
        this.onSearch(this.key)
    }
    //展开搜索框
    hanldeStartSearch(){
        this.setState({searchState:true})
    }
    //执行搜索
    onSearch(value){
        if(this.props.onSearch&&value!=this.lastKey){
            this.props.onSearch(value)
            this.lastKey=value
        }
    }

    render(){
        const {style,placeholder,maxLength} = this.props;
        return(
            <div style={{marginTop:1}}>
            {this.state.searchState?<div>
                <InputGroup style={{width:'100%'}}>
                <Input
                {...this.props}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={this.handleInputChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                value={this.state.defaultValue}
                onBlur={this.onBlur.bind(this)}
                onPressEnter={this.onPressEnter.bind(this)}

                />
                <div className='ant-input-group-wrap'>
                    <Button icon='cross' onClick={this.handleClose.bind(this)}></Button>
                </div>
                </InputGroup>
            </div>:<div>
                <div><Button icon='search' onClick={this.hanldeStartSearch.bind(this)}>查询</Button></div>
            </div>}
            </div>
        )
    }
}