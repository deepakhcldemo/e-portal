import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Routes from './components/carousel/Routes'

const render = (Component) => {
  window.__DEBUG__ = true
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(Routes)

if (module.hot) {
  module.hot.accept('./components/carousel/Routes', () => {
    const newApp = require('./components/carousel/Routes')
    render(newApp.default)
  })
}
