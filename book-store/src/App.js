import React from 'react';
import logo from './logo.svg';
import './App.css';

const url = "https://api.thecatapi.com/v1/images/search?limit=10";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "OFF",
      cats: []
    };
    console.log('Constructor');
  }

  componentDidMount() {
    console.log('Mount');
    fetch('http://localhost:3000/cats')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      this.setState({ cats: data });
    })
    .catch(error => {
      console.error("Error fetching cats:", error.message);
    });

    // this.fetchUrl();
  }

  componentDidUpdate() {
    console.log('Updated')
  }

  fetchUrl() {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ cats: data });
        console.log("Fetched cats:", data);
      })
      .catch(error => {
        console.error("Error fetching cats:", error);
      });
  }

  handleRefresh() {
    this.fetchUrl();
  }

  handleClick() {
    this.setState({
      status: this.state.status === "OFF" ? "ON" : "OFF"
    });
  }

  render() {
    console.log("Rendering buttons");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.status}</p>
          <button
            className="App-link"
            onClick={this.handleClick.bind(this)}
          >
            Change
          </button>
          <button
            className="App-link"
            onClick={this.handleRefresh.bind(this)}
          >
            Refresh
          </button>
          {this.state.cats.map((cat, index) => (
            <img
              key={index}
              src={cat.url}
              alt="cat"
              style={{ width: "200px", height: "200px" }}
            />
          ))}
        </header>
      </div>
    );
  }
}
  

export default App;

