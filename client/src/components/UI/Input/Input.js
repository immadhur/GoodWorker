import React, { Component } from 'react';
import style from './Input.module.css';

class Input extends Component {

    render() {
        let elementType = null;
        const input = this.props.elementType;
        switch (input) {
            case ('input'):
                elementType = <input {...this.props.elementConfig} onChange={this.props.changed}/>
                break;
            case ('textArea'):
                elementType = <textarea {...this.props.elementConfig} value={this.props.value} onChange={this.props.changed}/>
                break;
            case ('select'):
                elementType = <select value={this.props.value} onChange={this.props.changed}>
                    {this.props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
                break;
            default:
                elementType = <input {...this.props.elementConfig} value={this.props.value} onChange={this.props.changed}/>

        }
        return (
            <div className={style.Body}>
                <label>{this.props.label}</label>
                {elementType}
            </div>
        );
    }
}

export default Input;