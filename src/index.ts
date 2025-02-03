import { Controller } from "@hotwired/stimulus"

export default class FileInputValidator extends Controller {
  maxSizeExceededError: boolean
  invalidExtensionError: boolean
  filesValidationsList: Array<{}> // eslint-disable-line

  fileInputTarget: any // eslint-disable-line
  errorTemplateTarget: HTMLElement
  errorMessageTarget: HTMLElement

  maxFileSizeValue: number
  validExtensionsValue: Array<string>
  maxFileSizeExceededErrorMessageValue: string
  invalidExtensionErrorMessageValue: string

  static targets = ["fileInput", "errorTemplate", "errorMessage"]
  static values = { maxFileSize: Number, validExtensions: Array<string>, invalidExtensionErrorMessage: String, maxFileSizeExceededErrorMessage: String }

  hasInvalidExtensionErrorMessageValue: any // eslint-disable-line
  hasMaxFileSizeExceededErrorMessageValue: any // eslint-disable-line

  validate() {
    this.clean_validation_values()
    this.clean_error_messages()
    this.validate_files()
    this.format_and_show_error_messages()
  }

  clean_validation_values() {
    this.maxSizeExceededError = false
    this.invalidExtensionError = false
    this.filesValidationsList = []
  }

  clean_error_messages() {
    this.errorMessageTarget.innerHTML = ""
  }

  validate_files() {
    const files = Array.from(this.fileInputTarget.files)
    files.forEach((file) => {
      this.validate_file_size(file)
      this.validate_file_extension(file)
      this.save_file_validation(file)
    })
  }

  validate_file_size(file) {
    this.maxSizeExceededError = (file.size && this.maxFileSizeValue && this.file_size_in_mb(file) > this.maxFileSizeValue)
  }

  file_size_in_mb(file) {
    return file.size / 1048576
  }

  validate_file_extension(file) {
    const extensionName = file.name.split('.').pop()
    this.invalidExtensionError = !this.validExtensionsValue.includes(extensionName)
  }

  save_file_validation(file) {
    this.filesValidationsList.push({"file": file, "max_size_exceeded_error": this.maxSizeExceededError, "invalid_extension_error": this.invalidExtensionError})
  }

  format_and_show_error_messages() {
    if (this.invalid_file_input()){
      const errorMessages = this.set_error_messages()
      const content = this.format_error_messages(errorMessages)
      this.errorMessageTarget.innerHTML = content
    }
  }

  invalid_file_input() {
    const invalid_file = (element) => element.max_size_exceeded_error || element.invalid_extension_error
    return this.filesValidationsList.some(invalid_file)
  }

  set_error_messages() {
    const errorMessages: string[] = []

    if (this.max_size_exceeded_error()) {
      errorMessages.push(this.max_size_exceeded_error_message())
    }
    if (this.invalid_extension_error()) {
      errorMessages.push(this.invalid_extension_error_message())
    }

    return errorMessages
  }

  max_size_exceeded_error() {
    const max_size_exceeded_error = (element) => element.max_size_exceeded_error
    return this.filesValidationsList.some(max_size_exceeded_error)
  }

  invalid_extension_error() {
    const invalid_extension_error = (element) => element.invalid_extension_error
    return this.filesValidationsList.some(invalid_extension_error)
  }

  format_error_messages(errorMessages: string[]) {
    const errorMessagesList = errorMessages.map(errorMessage => `<li>${errorMessage}</li>`).join("")
    return this.errorTemplateTarget.innerHTML.replace(/ERROR_MESSAGE/g, `<ul>${errorMessagesList}</ul>`)
  }

  max_size_exceeded_error_message() {
    return this.hasMaxFileSizeExceededErrorMessageValue ? this.maxFileSizeExceededErrorMessageValue.toString() : this.default_max_size_exceeded_error_message()
  }

  default_max_size_exceeded_error_message() {
    return `Max file size exceeded: (${this.maxFileSizeValue.toString()}MB)`
  }

  invalid_extension_error_message() {
    return this.hasInvalidExtensionErrorMessageValue ? this.invalidExtensionErrorMessageValue.toString() : this.default_invalid_extension_error_message()
  }

  default_invalid_extension_error_message() {
    return `Invalid file extension, valid extensions are: ${this.validExtensionsValue.join(', ')}`
  }
}