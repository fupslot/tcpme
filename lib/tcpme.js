#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { serve } = require('./serve');
const { client } = require('./client');

yargs(hideBin(process.argv))
  .command('serve [port]', 'start server', (yargs) => {
    // yargs.positional('port', {
    //   default: 3232
    // });
  }, serve())
  .command('client [host]', 'connect to server', (yargs) => {
    yargs
      .positional('host', { default: 'localhost' })
  }, client())
  .option('port', {
    description: 'port',
    default: 3232
  })
  .argv;

