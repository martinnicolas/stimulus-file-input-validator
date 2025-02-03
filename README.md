# Stimulus File Input Validator
[![npm version](https://badge.fury.io/js/stimulus-file-input-validator.svg?icon=si%3Anpm)](https://badge.fury.io/js/stimulus-file-input-validator)
[![npm total downloads](https://img.shields.io/npm/dt/stimulus-file-input-validator.svg)](https://www.npmjs.com/package/stimulus-file-input-validator)
[![Tests](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/tests.yml/badge.svg)](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/tests.yml) 
[![Coverage](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/coverage.yml/badge.svg)](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/coverage.yml) 
[![Lint](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/lint.yml/badge.svg)](https://github.com/martinnicolas/stimulus-file-input-validator/actions/workflows/lint.yml) 
[![Wercker](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

A Stimulus controller that allows you to run client side validations for files size and extension. This is an usefull aproachment for complement server side validations.

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
- Add an empty `<div></div>` with `data-file-input-validator-target="errorMessage"` target. Error messages will be loaded inside.
- Add a `<template></template>` with `data-file-input-validator-target="errorTemplate"` target and `ERROR_MESSAGE`. The template is going to be loaded into the error messages target div. This approach allows you to customize the design and keep the code clean.

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

You can customize error messages by setting `data-file-input-validator-max-file-exceeded-error-message-value` and `data-file-input-validator-invalid-extension-error-message-value`.

```html
  <form data-controller="file-input-validator"
    data-file-input-validator-max-file-size-value="20"
    data-file-input-validator-valid-extensions-value='["jpg", "png"]'
    data-file-input-validator-max-file-exceeded-error-message-value="Wrong file size"
    data-file-input-validator-invalid-extension-error-message-value="Invalid extension"
    >
```
If no custom error messages are set the controller will use the default values.

## Support for multiple files validations

You can use `multiple` html attribute to apply the validations values to multiple files.

```html
  <input type="file" multiple id="myfile" name="myfile" data-file-input-validator-target="fileInput" data-action="change->file-input-validator#validate">
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/martinnicolas/stimulus-file-input-validator.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).