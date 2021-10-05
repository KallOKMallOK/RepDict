import React from 'react'
import { Redirect } from 'react-router-dom'

const Athorization = (WrappedComponent: typeof React.Component, auth: boolean) => {
  class WithAuthorization extends React.Component {
    render() {

      if (!auth) {
        return <Redirect to="/login" />
      }

      return <WrappedComponent {...this.props}/>
    }
  }
  return WithAuthorization
};

export default Athorization
