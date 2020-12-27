#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { serve } = require('./serve');
const { client } = require('./client');

yargs(hideBin(process.argv))
  .command('serve [port]', 'start server', () => {}, serve())
  .command('client [host]', 'connect to server', () => {}, client())
  .option('port', {
    description: 'port',
    default: 3232
  })
  .option('host', {
    description: 'host',
    default: 'localhost'
  })
  .argv;

