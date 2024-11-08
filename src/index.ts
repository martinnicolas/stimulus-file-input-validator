import { Controller } from "@hotwired/stimulus"

export default class FileInputValidator extends Controller {
  maxSizeExceededError: boolean
  invalidExtensionError: boolean

  fileInputTarget: any
  errorTemplateTarget: HTMLElement
  errorMessageTarget: HTMLElement

  maxFileSizeValue: Number
  validExtensionsValue: Array<String>
  maxFileExceededErrorMessageValue: String
  invalidExtensionErrorMessageValue: String

  static targets = ["fileInput", "errorTemplate", "errorMessage"]
  static values = { maxFileSize: Number, validExtensions: Array<String>, invalidExtensionErrorMessage: String, maxFileExceededErrorMessage: String }
  
  hasInvalidExtensionErrorMessageValue: any
  hasMaxFileExceededErrorMessageValue: any

  connect() {
    this.clean_validation_values()
  }

  clean_validation_values() {
    this.maxSizeExceededError = false
    this.invalidExtensionError = false
  }

  validate() {
    this.clean_error_messages()
    const files = Array.from(this.fileInputTarget.files);
    files.forEach((file) => {
      this.validate_file_size(file)
      this.validate_file_extension(file)
    })

    if (this.invalid_file_input()){
      let error_messages = this.set_error_messages()
      this.format_and_show_error_messages(error_messages)
    }
  }

  clean_error_messages() {
    this.errorMessageTarget.innerHTML = ""
  }

  validate_file_size(file: any) {
    this.maxSizeExceededError = (file.size && this.maxFileSizeValue && this.file_size_in_mb(file) > this.maxFileSizeValue)
  }

  file_size_in_mb(file: any) {
    return new Number(file.size / 1048576);
  }

  validate_file_extension(file: any) {
    let extensionName = file.name.split('.').pop();
    this.invalidExtensionError = !this.validExtensionsValue.includes(extensionName)
  }

  set_error_messages() {
    let errorMessages: string[] = [];

    if (this.maxSizeExceededError) {
      errorMessages.push(this.max_size_exceeded_error_message());
    };
    if (this.invalidExtensionError) {
      errorMessages.push(this.invalid_extension_error_message());
    };

    return errorMessages;
  }  

  invalid_file_input() {
    return (this.maxSizeExceededError || this.invalidExtensionError)
  }

  format_and_show_error_messages(errorMessages: any) {
    let listElements = errorMessages.map(errorMessage => `<li>${errorMessage}</li>`).join("");
    const content: string = this.errorTemplateTarget.innerHTML.replace(/ERROR_MESSAGE/g, `<ul>${listElements}</ul>`)
    this.errorMessageTarget.innerHTML = content
  }

  max_size_exceeded_error_message() {
    return this.hasMaxFileExceededErrorMessageValue ? this.maxFileExceededErrorMessageValue.toString() : this.default_max_size_exceeded_error_message();
  }

  default_max_size_exceeded_error_message() {
    return `Max file size exceeded: (${this.maxFileSizeValue.toString()}MB)`;
  }

  invalid_extension_error_message() {
    return this.hasInvalidExtensionErrorMessageValue ? this.invalidExtensionErrorMessageValue.toString() : this.default_invalid_extension_error_message();
  }

  default_invalid_extension_error_message() {
    return `Invalid file extension, valid extensions are: ${this.validExtensionsValue.join(', ')}`;
  }  
}