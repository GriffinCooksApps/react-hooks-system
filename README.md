# react-hooks-system

> Small light weight flux system using react hooks

[![NPM](https://img.shields.io/npm/v/react-hooks-system.svg)](https://www.npmjs.com/package/react-hooks-system) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-typescript-brightgreen.svg)](https://typescript.com)

## Install

```bash
npm install --save react-hooks-system
```

## Usage

```tsx
import React from 'react';
import HookFluxSystem from 'react-hook-system';

HookFluxSystem(reducerMap, );

export const App = () =>{
    return ( 
    <HookFluxSystem.Provider onReady={ready}>
        <RemainingApplication/>
    </HookFluxSystem.Provider>);

}




```
