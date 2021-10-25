<template>
  <div style="
  margin-left: 10%;
  margin-right: 10%;">
    <h1 style="color: orangered ">Error: can not find remote component</h1>
    <p>Failed to load remote component from <code>http://localhost:3072/remoteEntry.js</code>(by default config)</p>
    <p>The remote component can be created in the like this:</p>
    <br/>
    <p>1. Create a project containing remote component using <code>ori init remote</code>.</p>
    <p>Do not forget to toggle the <code>ModuleFederation</code> plugin and choose the <code>remote</code> option</p>
    <p>2. Install dependencies with <code>npm install</code> or <code>yarn</code></p>
    <p>3. Build the project with <code>npm run build</code></p>
    <p>4. Serve the project with <code>npm run serve</code></p>
    <br/>
    <p>See <code><a href="https://github.com/originjs/vite-plugin-federation">README.md</a></code> for more information.
    </p>
  </div>
</template>
