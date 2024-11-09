# Stimulus File Input Validator

[![Tests](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/tests.yml/badge.svg)](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/tests.yml) [![Coverage](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/coverage.yml/badge.svg)](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/coverage.yml) [![Wercker](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

A Stimulus controller that allows you to run client side validations for files size and extension. This is an usefull aproachment for complement server side validations or prevent server configuration.

## Installation

```bash
  yarn add stimulus-file-input-validator
```

## Register the controller in your application 

```javascript
  import { Application } from '@hotwired/stimulus'
  import FileInputValidator from 'stimulus-file-input-validator'

  const application = Application.start()
  application.register("file-input-validator", FileInputValidator)
```

## Usage

Define the following data:

- Add `data-controller="file-input-validator"` 
- Add `data-file-input-validator-max-file-size-value` to load max file size allowed value in MB. 
- Add `data-file-input-validator-valid-extensions-value` to load an array of allowed file extensions. 
- Add and empty `<div></div>` with `data-file-input-validator-target="errorMessage"` target. Error messages will be loaded inside.
- Add a `<template></template>` with `data-file-input-validator-target="errorTemplate"` target and `ERROR_MESSAGE`. The template is going to be used to load into the error messages target div, this usefull to customize the design and keep the code clean.

```html
  <form data-controller="file-input-validator"
    data-file-input-validator-max-file-size-value="20"
    data-file-input-validator-valid-extensions-value='["jpg", "png"]'>
    
    <label for="file-input" class="form-label">Load a file</label>

    <input type="file" data-file-input-validator-target="fileInput" data-action="change->file-input-validator#validate">

    <div class="form-text" data-file-input-validator-target="errorMessage"></div>

    <template data-file-input-validator-target="errorTemplate">
      <div class="alert alert-danger">
        ERROR_MESSAGE
      </div>
    </template>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
```

## Custom messages

You can customize the error messages by setting `data-file-input-validator-max-file-exceeded-error-message-value` and `data-file-input-validator-invalid-extension-error-message-value`.

```html
  <form data-controller="file-input-validator"
    data-file-input-validator-max-file-size-value="20"
    data-file-input-validator-valid-extensions-value='["jpg", "png"]'
    data-file-input-validator-max-file-exceeded-error-message-value="Wrong file size"
    data-file-input-validator-invalid-extension-error-message-value="Invalid extension"
    >
```
If no custom message are set the controller will use the default values.