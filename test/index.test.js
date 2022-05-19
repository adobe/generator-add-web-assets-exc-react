/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable jest/expect-expect */ // => use assert

const helpers = require('yeoman-test')
const path = require('path')

const excshell = require('../index')
const Generator = require('yeoman-generator')

const composeWith = jest.spyOn(Generator.prototype, 'composeWith')
beforeAll(() => {
  // mock implementations
  composeWith.mockReturnValue(undefined)
})
beforeEach(() => {
  composeWith.mockClear()
})
afterAll(() => {
  composeWith.mockRestore()
})

describe('prototype', () => {
  test('exports a yeoman generator', () => {
    expect(excshell.prototype).toBeInstanceOf(Generator)
  })
})

describe('run', () => {
  test('test basic ext generator', async () => {
    const options = { 'skip-prompt': true }
    await helpers.run(excshell)
      .withOptions(options)
    expect(composeWith).toHaveBeenCalledTimes(2)
    expect(composeWith).toHaveBeenCalledWith(expect.stringContaining(path.normalize('add-action/generic')), expect.any(Object))
    expect(composeWith).toHaveBeenCalledWith(expect.stringContaining(path.normalize('add-web-assets/exc-react')), expect.any(Object))
  })
})
