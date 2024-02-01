// import { log } from "console"
// import { deepObjectKeyAlternator } from "../index"

// describe("deepObjectKeyAlternator", () => {
//   it("should handle renaming keys in a simple object", () => {
//     const inputObject = {
//       foo: "bar",
//       baz: {
//         qux: "quux",
//       },
//     }

//     const keyMapping = {
//       foo: "boo",
//       qux: "que",
//     }

//     const expectedOutput = {
//       boo: "bar",
//       baz: {
//         que: "quux",
//       },
//     }

//     const result = deepObjectKeyAlternator(inputObject, keyMapping)

//     log(expectedOutput, result)

//     expect(result).toEqual(expectedOutput)
//   })
// })