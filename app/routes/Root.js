import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from 'store';
import rootSaga from 'sagas';

export default class Root extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      store: configureStore(),
    }
  }

  componentDidMount() {
    this.state.store.runSaga(rootSaga)
  }

  render() {
    return (
      <Provider store={this.state.store}>
        {this.props.children}
      </Provider>
    );
  }
}
