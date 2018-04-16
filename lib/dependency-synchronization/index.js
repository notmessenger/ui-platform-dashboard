#!/usr/bin/env node

const DependencySynchronization = require('./dependency-synchronization')


// allNodes / foundationNodes

const sync = new DependencySynchronization()
//const sync = new DependencySynchronization(false)


// dependencies / devDependencies


sync.generateMatrix().then((files) => {
  console.log(files)
})


