import React from 'react';

const LogInComponent = () => {
  return (
    <div>
      <h1>Log in page</h1>
      <a href="https://hee-tis.auth.eu-west-2.amazoncognito.com/login?client_id=498jcvnkmvgq8ddl36p2nkprou&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/">
        Login
      </a>
    </div>
  );
};

export default LogInComponent;
