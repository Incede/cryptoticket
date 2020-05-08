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
        this.onsubmitbuyticket = this.onsubmitbuyticket.bind(this);
        this.onsubmitsellticket = this.onsubmitsellticket.bind(this);
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

    // on click of Buy Ticket button send the POST request to the localhost:4000/ 
    // with the ticket id to buy in the smart contract 
    onsubmitbuyticket = () => {
        axios.post(endpoint + "/", {
            order: this.state.order 
        }).then(res => {
            this.setState({
                output : res.data
            });
        })
    };

    // on click of Sell Ticket button send the POST request to the localhost:4000/
    // with the ticket id to sell in the smart contract 
    onsubmitsellticket = () => {
        axios.post(endpoint + "/", {
            order: this.state.order
        }).then(res => {
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
                <label htmlFor="tokenid">tokenid</label>
                <input
                    type="tokenid"
                    className="ghost-input"
                    placeholder="set token id"
                    name="settokenid"
                    value={this.state.settokenid}
                    onChange={this.onChange}
                />

                <label htmlFor="saleprice">saleprice</label>
                <input
                    type="saleprice"
                    name="saleprice"
                    value={this.state.saleprice}
                    onChange={this.handleChange}
                />

                <button
                  type="button"
                  className="ghost-button"
                  onClick={this.onsubmitbuyticket}
                >
                  Buy Ticket
                </button>
              </div>
              <div>
              <button
                  type="button"
                  className="ghost-button"
                  onClick={this.onsubmitsellticket}
                >
                  Sell Ticket
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