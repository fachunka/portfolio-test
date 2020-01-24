import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "./components/Button.js"
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

const { useState, useCallback, Fragment } = React
const random = num => Math.floor(Math.random() * num) + 1;
let time = Math.random();
let boxNum = 0
console.log(time * 1000)
const divStyle = {
  animationDelay: '-' + time * 1000 + 's',
}
document.body.style.backgroundColor = '#f2e090';


class Bg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#f2e090', '#dd7788', '#667799', '#7a9460', '#dd9977', '#665566', '#223333']
    };
  }

  changeBg() {
    const { colors } = this.state;
    const color = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'all 0.5s ease';


  }


  render() {

    return (
      <div>
        <button onClick={() => this.changeBg()}>X</button>
      </div>
    );
  }
}


class NewBall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      setCount: 0,
    };
  }


  changeBg() {
    let arr = [this.state.count, this.state.setCount];
    const num = Math.random() * 1000;
    console.log(num);
    this.state.count = this.state.count + 1;
    console.log(arr);
    Array(this.state.count).fill(<div className="box random-delay" style={divStyle}></div>)
  }


  render() {

    return (
      <div>
        <button onClick={() => this.changeBg()}>NewBall</button>
      </div>
    );
  }
}

class ColoredRect extends React.Component {

  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class Canvas extends React.Component {
  componentDidMount() {
    const ctx = this.canvas.getContext('2d')
    this.props.draw(this.canvas, ctx)
  }
  render() {
    const { width, height } = this.props

    return (
      <canvas
        ref={node => (this.canvas = node)}
        width={width}
        height={height}
      />
    )
  }
}

class Thingy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicList: []
    };
    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
  }
  addListItem(itemToAdd) {
    let currentList = this.state.dynamicList;
    currentList.push(itemToAdd);
    this.setState({ dynamicList: currentList });
  }
  removeListItem(itemToRemove) {
    let currentList = this.state.dynamicList;
    currentList.pop(itemToRemove, 1);
    this.setState({ dynamicList: currentList });
  }
  render() {
    return (
      <div className="component-wrapper">
        {/* <h1>Simple Dynamic List</h1> */}
        <DynamicList listItems={this.state.dynamicList} removeItem={this.removeListItem} />
        <InputBox addItem={this.addListItem} />
      </div>
    );
  }
}
let arr = [];
arr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 1000));
console.log(arr)
let rand = arr[Math.floor(Math.random() * arr.length)];
console.log(rand);


class DynamicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // width: "80px"
      addClass: false
    }
  }

  boxClick = (index) => {
    let hi = document.getElementById(index + "-box")
    console.log(hi, index);
  }
  toggle(index) {
    this.setState({ addClass: !this.state.addClass });

    document.getElementById("box-" + index).style.width = "200vw";
    document.getElementById("box-" + index).style.height = "200vw";
    document.getElementById("box-" + index).style.zIndex = "200";
    document.getElementById("info-" + index).style.opacity = "1";
    document.getElementById("info-" + index).style.visibility = "visible";
    console.log(index);
  }
  render() {
    let boxClass = ["box"];
    if (this.state.addClass) {
      boxClass.push('hi');
    }
    return (
      <ul>
        {
          Object.keys(this.props.listItems).map((index) => {
            return (
              // <div id={index + "-box"} className="box" style={{ animationDelay: '-' + index * 887 + 's', }} onClick={() => this.props.removeItem(index)} name={index}>{this.props.listItems[index]}></div>
              // <div id={index + "-box"} className="box" style={{ animationDelay: '-' + index * 887 + 's', width: this.state.width }} onClick={this.boxClick(index)} name={index}>{index}</div>
              <div id={"box-" + index} className={boxClass.join(' ')} style={{ animationDelay: '-' + index * 887 + 's', width: this.state.width }} onClick={this.toggle.bind(this, index)} name={index}>{index}</div>

            );
          })
        }
      </ul>
    );
  }
}

class InputBox extends React.Component {
  formSubmit(e) {
    e.preventDefault();
    // let itemToAdd = this.refs.item.value;
    // if (itemToAdd != '') {
    this.props.addItem('hi');
    console.log(this.props)
    // this.refs.item.value = '';
    // }
  }
  render() {
    return (
      <form ref="itemForm" onSubmit={e => this.formSubmit(e)}>
        {/* <p>Add items to the dynamic list</p> */}
        {/* <input type="text" id="item" ref="item" /><br /> */}
        <button type="submit" className="btn btn-primary">hi</button>
      </form>
    );
  }
}




// The added element component
// const AddedElement = () => <div><input placeholder='text box' /></div>






// const AddedElement = () => <div class="box" style={divStyle}></div>
const AddedElement = () => <div id={boxNum = boxNum + 1} className="box" style={{ animationDelay: '-' + Math.random() * 1000 + 's', }}></div>




// const AddedElement = () => <div class="box random-delay"></div>

function App() {

  const [count, setCount] = useState(0) // Name it however you wish
  // let num;

  function back() {
    document.getElementById("box-" + 0).style.width = "80px";
    document.getElementById("box-" + 0).style.height = "80px";
    document.getElementById("box-" + 0).style.zIndex = "1";
    document.getElementById("info-" + 0).style.opacity = "0";
    document.getElementById("info-" + 0).style.visibility = "hidden";
  }



  return (
    <div className="App">
      <header className="App-header">
        <div id="info-0">
          <div class="info-text">
            <h1>Nostrud exercitation</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>Laboris nisi ut aliquip</h3>
            <button onClick={back}>bye</button>
          </div>
        </div>
        {/* <Bg /> */}
        {/* <Button title="MyButton" /> */}
        {/* <Button title="Title2" /> */}
        {/* <Fragment>
          <button onClick={() => setCount(count + 1)}>Click me</button>
          <NewBall />
          {Array(count > 0 ? count - 1 : count).fill(<AddedElement />)}
          {Array(count > 0 ? count - 1 : count).fill(<AddedElement />)}
          {console.log(count)}
        </Fragment> */}
  
        <Thingy />

        {/* <Canvas
          width={200}
          height={200}
          draw={(canvas, ctx) => {
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            ctx.stroke();
          }}
        /> */}
        {/* <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <ColoredRect onClick={this.handleClick} />
          
        </Layer>
      </Stage> */}
        {/* <div className="box"></div> */}

      </header>
      {/* <body>
      </body> */}
    </div>

  );
}

export default App;
