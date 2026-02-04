import React from 'react'
import AuthenticatedHomeContentInterface from './LogicalHomeContent/AuthenticatedHomeContentInterface';
import NonAuthenticatedInterface from './LogicalHomeContent/NonAuthenticatedInterface';

const HomeContent = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);



  return (
    <div>
      {isAuthenticated ? (
        <AuthenticatedHomeContentInterface />
      ) : (
        <NonAuthenticatedInterface />
      )}
    </div>
  )
}

export default HomeContent
