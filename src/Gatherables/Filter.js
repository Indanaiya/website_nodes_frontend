import React from 'react';

export default class Filter extends React.Component{
  constructor({options,style}){
    super();
    console.log(style)
    this.state = {options, style};
  }

  render(){
    const {options} = this.state;
    const style = this.state.style ? this.state.style : {};
    const optionsComponents = options.map((option, index) => <div className={`grid-${index+1}`}>{option}</div>)
    return (
      <div className="grid" style={style}>
        {optionsComponents}
      </div>
    )
  }
}