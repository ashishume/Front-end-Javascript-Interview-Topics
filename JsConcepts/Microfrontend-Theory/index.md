## Key Concepts of Microfrontends:

- Independence: Each microfrontend is developed, deployed, and maintained independently.
- Composition: The application is composed of these micro-apps, often at runtime.
- Technology Agnostic: Different microfrontends can use different frameworks or libraries.
- Isolation: Microfrontends should be isolated in terms of runtime, styling, and state.

## When to Use Microfrontends:

- Large Teams: When multiple teams work on different parts of the frontend.
- Scalability: To scale development and deployment processes.
- Different Technology Stacks: When parts of the application require different technologies.
- Independent Deployments: When different parts of the application need to be deployed independently.

## Take an example of e-commerce website for different parts

# Architecture

- Container App
- Individual microfrontend

# Module Federation

- Module Federation is a feature introduced in Webpack 5 that allows the dynamic loading of remote modules, enabling the implementation of microfrontend architectures.

# Key Concepts of Module Federation (part of webpack 5)

- Host Application: The main application that consumes remote modules.
- Remote Application: The application exposing its modules to be consumed by other applications.
- Shared Modules: Common libraries or dependencies shared between host and remote applications to avoid duplication.

- Code example

## webpack.config.js

```
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};

```

## src/Button.tsx

```
import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = () => {
 return <MuiButton variant="contained">Remote Button</MuiButton>;
};

export default Button;

```

## src/index.tsx

```
import('./Button');
```

## Host Application Configuration (host-app)

### webpack.config.js

```
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:3002/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};

```

## src/App.tsx

```
import React from 'react';

const RemoteButton = React.lazy(() => import('remote/Button'));

const App = () => (
  <React.Suspense fallback="Loading Remote Button...">
    <div>
      <h1>Host Application</h1>
      <RemoteButton />
    </div>
  </React.Suspense>
);

export default App;

```

## src/index.tsx

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

```
