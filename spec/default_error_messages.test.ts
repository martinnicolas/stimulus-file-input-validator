/**
 * @jest-environment jsdom
 */

import { Application } from "@hotwired/stimulus"
import FileInputValidator from "../src/index"
import { describe, beforeEach, test, expect } from '@jest/globals';

const startStimulus = () => {
  const application = Application.start()
  application.register("file-input-validator", FileInputValidator)
}

describe("fileInputValidator", () => {
  beforeEach(() => {
    startStimulus()

    document.body.innerHTML = `
      <form 
        data-controller="file-input-validator"
        data-file-input-validator-max-file-size-value="20"
        data-file-input-validator-valid-extensions-value='["jpg", "png"]'
        >
        <div>
          <label>Load a file to see validations</label>
        </div>

        <input type="file" id="myfile" name="myfile" data-file-input-validator-target="fileInput" data-action="change->file-input-validator#validate">
        <div data-file-input-validator-target="errorMessage"></div>

        <template data-file-input-validator-target="errorTemplate">
          ERROR_MESSAGE
        </template>

        <button type="button">Save</button>
      </form>
    `
  })

  test("should show error message for max file size exceeded", () => {
    const file = new File(["a".repeat(30 * 1024 * 1024)], "test.jpg", { type: "image/jpg" }); // 30MB

    const fileInput: HTMLElement = document.querySelector("[data-file-input-validator-target='fileInput']")!
    Object.defineProperty(fileInput, "files", { value: [file] });
    fileInput.dispatchEvent(new Event("change"));

    const errorMessage: HTMLElement = document.querySelector("[data-file-input-validator-target='errorMessage']")!;
    expect(errorMessage.innerHTML).toContain("Max file size exceeded: (20MB)");
  })

  test("should show error message for invalid extension file", () => {
    const file = new File(["content"], "test.txt", { type: "text/plain" });

    const fileInput: HTMLElement = document.querySelector("[data-file-input-validator-target='fileInput']")!
    Object.defineProperty(fileInput, "files", { value: [file] });
    fileInput.dispatchEvent(new Event("change"));

    const errorMessage: HTMLElement = document.querySelector("[data-file-input-validator-target='errorMessage']")!;
    expect(errorMessage.innerHTML).toContain("Invalid file extension, valid extensions are: jpg, png");
  })

  test("should show both error message if file exceed max file size and has an invalid extension", () => {
    const file = new File(["a".repeat(30 * 1024 * 1024)], "test.txt", { type: "text/plain" }); // 30MB

    const fileInput: HTMLElement = document.querySelector("[data-file-input-validator-target='fileInput']")!
    Object.defineProperty(fileInput, "files", { value: [file] });
    fileInput.dispatchEvent(new Event("change"));

    const errorMessage: HTMLElement = document.querySelector("[data-file-input-validator-target='errorMessage']")!;
    expect(errorMessage.innerHTML).toContain("Max file size exceeded: (20MB)");
    expect(errorMessage.innerHTML).toContain("Invalid file extension, valid extensions are: jpg, png");
  })

  test("should NOT show any error message if file not exceed max file size and has a valid extension", () => {
    const file = new File(["a".repeat(10 * 1024 * 1024)], "test.jpg", { type: "image/jpg" }); // 10MB

    const fileInput: HTMLElement = document.querySelector("[data-file-input-validator-target='fileInput']")!
    Object.defineProperty(fileInput, "files", { value: [file] });
    fileInput.dispatchEvent(new Event("change"));

    const errorMessage: HTMLElement = document.querySelector("[data-file-input-validator-target='errorMessage']")!;
    expect(errorMessage.innerHTML).toBe("");
  })
});