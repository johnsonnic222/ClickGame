import React, { Component } from 'react';
import GotCard from "./components/GotCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import characters from "./characters.json";
import './App.css';

function shuffleCharacters(array) {
  for (let i = array.length - 1; i > 0; i --) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
};

class App extends Component {
  state = {
    characters,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if(this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id)});
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore +1;
    this.setState ({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({topScore: newScore});
    }
    else if (newScore === 10) {
      this.setState({ rightWrong: "Ascend to the Iron Throne!"});
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "You lose, your a White Walker",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledCharacters = shuffleCharacters(characters);
    this.setState({characters: shuffledCharacters});
  };

render() {
  return (
    <Wrapper>
    <Nav
      title="Game of Thrones Memory Game"
      score={this.state.currentScore}
      topScore={this.state.topScore}
      rightWrong={this.state.rightWrong}
    />
  
    <Title>
    Click on an image to earn points, but don't click on any more than once!
    </Title>

    <Container>
      <Row>
        {this.state.characters.map(friend => (
          <Column size= "md-3">
          <GotCard
            key={characters.id}
            handleClick={this.handleClick}
            handleIncrement={this.handleIncrement}
            handleReset={this.handleReset}
            handleShuffle={this.handleShuffle}
            id={characters.id}
            image={characters.image}
          />
        </Column>
        ))}
      </Row>
    </Container>
  </Wrapper>
  ); 
}
}

export default App;
