import React, { Component } from "react";
import axios from "axios";

let endpoint = "http://localhost:4000";

class Order extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            order : "",
            output : []
        };
        this.onChange = this.onChange.bind(this);
        this.onsubmitsetmsg = this.onsubmitsetmsg.bind(this);
        this.onsubmitgetmsg = this.onsubmitgetmsg.bind(this);
        this.onsubmitcompile = this.onsubmitcompile.bind(this);
        this.onsubmitdeploy = this.onsubmitdeploy.bind(this);
    }

    // on change of input, set the value to the order state
    onChange(event) {
        this.setState({order: event.target.value });
    };

    // on click on Compile button send the POST request to the localhost:4000/compile
    // to compile the contract 
    onsubmitcompile = () => {
        axios.post(endpoint + "/compile").then(res => {
            this.setState({
                output : res.data
            });
        })
    };

    // on click on Deploy button send the POST request to the localhost:4000/deploy
    // to deploy the contract
    onsubmitdeploy = () => {
        axios.post(endpoint + "/deploy").then(res => {
            this.setState({
                output : res.data
            });
        })
    };

    // on click of Set Order button send the POST request to the localhost:4000/ 
    // with the order to set in the smart contract 
    onsubmitsetmsg = () => {
        axios.post(endpoint + "/", {
            order: this.state.order 
        }).then(res => {
            this.setState({
                output : res.data
            });
        })
    };

    // on click of Get Order button send the GET request to the localhost:4000/
    // to fetch the order from the smart contract 
    onsubmitgetmsg = () => {
        axios.get(endpoint + "/").then(res => {
            this.setState({
                output: res.data
            });
        });
    };

    render() {
        return(
    <div className="container">
      <fieldset>
          <form>
              <div>
                <input
                    type="name"
                    className="ghost-input"
                    placeholder="set order"
                    name="setOrder"
                    value={this.state.setOrder}
                    onChange={this.onChange}
                />
                <button
                  type="button"
                  className="ghost-button"
                  onClick={this.onsubmitsetmsg}
                >
                  Set Order
                </button>
              </div>
              <div>
              <button
                  type="button"
                  className="ghost-button"
                  onClick={this.onsubmitgetmsg}
                >
                  Get Order
                </button>
              </div>
              <div>
              <button
                  type="button"
                  className="ghost-button"
                  onClick={this.onsubmitcompile}
                >
                  Compile Contract
                </button>
              </div>
              <div>
              <button
                  type="button"
                  className="ghost-button"
                  onClick={this.onsubmitdeploy}
                >
                  Deploy Contract
                </button>
              </div>
          </form>
      </fieldset>
      <div>
          {this.state.output}
        </div>  
    </div>
        );
    }
}

export default Order;