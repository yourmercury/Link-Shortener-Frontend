import React, { Component } from 'react';
import './App.css';
import InputComponent from "./components/input";
import Table from "./components/table";
import Navbar from "./components/nav";
import MainContextProvider from './contexts/main.context';
import Footer from './components/footer';
import "./components/mediaQuery.css";

class App extends Component {
  render() {
    return (
      <MainContextProvider>
        <div className="App">
          <header>
            <Navbar />
          </header>

          <main>
            <InputComponent />
            <Table />
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </MainContextProvider>
    );
  }
}

export default App;
