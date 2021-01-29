import React, { Component } from 'react';

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from '../index';
import { addUserMessage } from '..';

export default class App extends Component {
  state={
    showLocation: false
  }
  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
    addLinkSnippet({ link: 'https://google.com', title: 'Google' });
    addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([{ label: 'Add Address', value: 'location' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' }]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    if(e.value === 'location') {
      return this.setState({ showLocation: true })
    }
    addResponseMessage('Selected ' + e.value);
    setQuickButtons([]);
  }

  handleSubmit = (msgText: string) => {
    if (msgText.length < 80) {
      addUserMessage("Uh oh, please write a bit more.");
      return false;
    }
    return true;
  }

  onFileUpload = (e) => {
    alert('File Uploaded')
  }

  onRestart = (e) => {
    alert('restart clicked')
  }

  onEdit = (e) => {
    alert('Edit clicked')
  }

  onLocationSubmit = (details) => {
    alert(JSON.stringify(details));
  }

  render() {
    // console.log(this.state.)
    return (
      <div>
        <button onClick={() => this.setState({showLocation: !this.state.showLocation})}>test</button>
        <Widget
          
          title="Bienvenido"
          subtitle="Asistente virtual"
          senderPlaceHolder="Escribe aquí ..."
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          imagePreview
          onRestart={this.onRestart}
          onEdit={this.onEdit}
          onFileUpload={this.onFileUpload}
          handleSubmit={this.handleSubmit}
          onLocationSubmit={this.onLocationSubmit}
          showMap={this.state.showLocation}
          onMapClose={() => this.setState({ showLocation: false})}
          defaultMapProps={{ 
            lat: 17.4362,
            lng: 78.4609,
            apiKey: 'AIzaSyCV1WQkeoaA_aYvMeVXxrZkcdaitiQ34CA',}}
        />
      </div>
    );
  }
}
