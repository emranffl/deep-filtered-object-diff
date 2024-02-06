// // type NestedObject<T> = {
// //   [K in keyof T]: T[K] extends Array<infer U>
// //     ? U extends object
// //       ? Array<NestedObject<U>>
// //       : Array<T[K]>
// //     : T[K] extends object
// //       ? NestedObject<T[K]>
// //       : T[K]
// // }

// import { log } from "console"

// // function getMatchingValues<T extends object, U extends object>(
// //   obj1: T,
// //   obj2: U,
// //   depth = Infinity
// // ): NestedObject<U> {
// //   const result = {}
// //   const keys = Object.keys(obj1 as object) as Array<keyof T>

// //   keys.forEach((key) => {
// //     // console.log(Array.isArray(obj1[key]) && Array.isArray(obj2[key]), depth)

// //     if (
// //       Array.isArray(obj1[key]) &&
// //       // && Array.isArray(obj2[key])
// //       depth > 0
// //     ) {
// //       console.log(key)
// //       Object.assign(
// //         result,
// //         // result[key] =
// //         (obj1[key] as Array<any>).filter((val, index) => {
// //           console.log(val, depth)

// //           return depth > 1 && val && typeof val === "object"
// //             ? getMatchingValues(
// //                 val as T,
// //                 (obj2[key as unknown as keyof U] as Array<any>)[index],
// //                 depth - 1
// //               )
// //             : depth > 1 && val === (obj1[key] as Array<any>)[index]
// //         })
// //       )
// //     } else if (
// //       !Array.isArray(obj1[key]) &&
// //       // !Array.isArray(obj2[key]) &&
// //       typeof obj1[key] === "object" &&
// //       typeof obj2[key as unknown as keyof U] === "object" &&
// //       depth > 0
// //     ) {
// //       console.log(key)

// //       // result[key] =
// //       Object.assign(
// //         result,
// //         getMatchingValues(
// //           obj1[key] as T,
// //           obj2[key as unknown as keyof U] as U,
// //           depth - 1
// //         )
// //       )
// //     } else if (obj1[key] && depth - 1 >= 0) {
// //       console.log(key)

// //       // result[key] = obj1[key]
// //       Object.assign(result, { [key]: obj1[key] })
// //     }
// //   })

// //   return result as NestedObject<U>
// // }

// // const result = getMatchingValues(obj1, obj2, 1)

// // console.log(result)

// // type MatchingValues<T, U> = {
// //   [K in keyof T & keyof U]: T[K] extends Array<infer TItem>
// //     ? U[K] extends Array<infer UItem>
// //       ? Array<MatchingValues<TItem, UItem>>
// //       : never
// //     : T[K] extends object
// //       ? U[K] extends object
// //         ? MatchingValues<T[K], U[K]>
// //         : never
// //       : T[K] extends U[K]
// //         ? T[K]
// //         : never
// // }

// type MatchingValues<T, U, D extends number = typeof Infinity> = {
//   [K in keyof T & keyof U]: T[K] extends Array<infer TItem>
//     ? U[K] extends Array<infer UItem>
//       ? D extends 0
//         ? never
//         : Array<
//             MatchingValues<TItem, UItem, D extends 0 ? 0 : D extends 1 ? 0 : D>
//           >
//       : never
//     : T[K] extends object
//       ? U[K] extends object
//         ? D extends 0
//           ? never
//           : MatchingValues<T[K], U[K], D extends 0 ? 0 : D extends 1 ? 0 : D>
//         : never
//       : T[K] extends U[K]
//         ? T[K]
//         : never
// }

// function getMatchingValues<T, U, D extends number>(
//   obj1: T extends Record<keyof T, any> ? T : T extends Array<any> ? T : never,
//   obj2: U extends Record<keyof U, any> ? U : U extends Array<any> ? U : never,
//   // depth: D extends number ? D : typeof Infinity
//   depth = Infinity
// ) {
//   const result = Array.isArray(obj2)
//     ? ([] as Partial<Array<U>>)
//     : ({} as Partial<U>)
//   // const obj2Keys = Object.keys(obj2) as Array<keyof U>

//   Object.keys(obj2).map((obj2Key, ind) => {
//     const OBJ1 = Object.hasOwn(obj1, obj2Key)
//       ? Object.values(obj1)[ind]
//       : undefined
//     const OBJ2 = Object.hasOwn(obj2, obj2Key)
//       ? Object.values(obj2)[ind]
//       : undefined

//     if (Array.isArray(OBJ1) && Array.isArray(OBJ2) && depth > 0) {
//       console.log(obj2Key)

//       result[obj2Key] = OBJ1.filter((val: any, index: number) => {
//         return depth > 1 && val && typeof val === "object"
//           ? getMatchingValues(val as any, OBJ2[index], depth - 1)
//           : depth > 1 && val === OBJ1[index]
//       })
//     } else if (
//       !Array.isArray(OBJ1) &&
//       typeof OBJ1 === "object" &&
//       typeof obj2[obj2Key] === "object" &&
//       depth > 0
//     ) {
//       console.log(obj2Key)

//       result[obj2Key] = getMatchingValues(OBJ1, OBJ2, depth - 1)
//     } else if (OBJ1 && depth - 1 >= 0) {
//       console.log(obj2Key)

//       result[obj2Key] = OBJ1
//     }
//   })

//   return result
// }

// const obj1 = {
//   a: "Hello",
//   b: [2],
//   c: true,
//   f: {
//     x: {
//       z: {
//         k: [
//           {
//             j: 1,
//             l: [1],
//           },
//           2,
//           3,
//         ],
//         m: {
//           n: [1, 2, 3],
//         },
//       },
//     },
//     y: [1],
//   },
// }

// const obj2 = {
//   b: 4,
//   c: false,
//   d: "World",
//   f: {
//     x: {
//       // z: [1, 2, 3],
//       z: {
//         k: [1, 2, 3],
//       },
//     },
//     y: [10],
//   },
// }

// const result = getMatchingValues(obj1, obj2, 3)

// console.log(result)

// type NestedObject<T> = {
//   [K in keyof T]: T[K] extends Array<infer U>
//     ? U extends object
//       ? Array<NestedObject<U>>
//       : Array<T[K]>
//     : T[K] extends object
//       ? NestedObject<T[K]>
//       : T[K]
// }

import { log } from "console"

// function getMatchingValues<T extends object, U extends object>(
//   obj1: T,
//   obj2: U,
//   depth = Infinity
// ): NestedObject<U> {
//   const result = {}
//   const keys = Object.keys(obj1 as object) as Array<keyof T>

//   keys.forEach((key) => {
//     // console.log(Array.isArray(obj1[key]) && Array.isArray(obj2[key]), depth)

//     if (
//       Array.isArray(obj1[key]) &&
//       // && Array.isArray(obj2[key])
//       depth > 0
//     ) {
//       console.log(key)
//       Object.assign(
//         result,
//         // result[key] =
//         (obj1[key] as Array<any>).filter((val, index) => {
//           console.log(val, depth)

//           return depth > 1 && val && typeof val === "object"
//             ? getMatchingValues(
//                 val as T,
//                 (obj2[key as unknown as keyof U] as Array<any>)[index],
//                 depth - 1
//               )
//             : depth > 1 && val === (obj1[key] as Array<any>)[index]
//         })
//       )
//     } else if (
//       !Array.isArray(obj1[key]) &&
//       // !Array.isArray(obj2[key]) &&
//       typeof obj1[key] === "object" &&
//       typeof obj2[key as unknown as keyof U] === "object" &&
//       depth > 0
//     ) {
//       console.log(key)

//       // result[key] =
//       Object.assign(
//         result,
//         getMatchingValues(
//           obj1[key] as T,
//           obj2[key as unknown as keyof U] as U,
//           depth - 1
//         )
//       )
//     } else if (obj1[key] && depth - 1 >= 0) {
//       console.log(key)

//       // result[key] = obj1[key]
//       Object.assign(result, { [key]: obj1[key] })
//     }
//   })

//   return result as NestedObject<U>
// }

const obj1 = {
  a: "Hello",
  b: [2],
  c: true,
  f: {
    x: {
      z: {
        k: [
          {
            j: 1,
            l: [1],
          },
          2,
          3,
        ],
        m: {
          n: [1, 2, 3],
        },
      },
    },
    y: [1],
  },
}

const obj2 = {
  b: 4,
  c: false,
  d: "World",
  f: {
    x: {
      // z: [1, 2, 3],
      z: {
        k: [1, 2, 3],
      },
    },
    y: [10],
  },
}

// const result = getMatchingValues(obj1, obj2, 1)

// console.log(result)

// type MatchingValues<T, U> = {
//   [K in keyof T & keyof U]: T[K] extends Array<infer TItem>
//     ? U[K] extends Array<infer UItem>
//       ? Array<MatchingValues<TItem, UItem>>
//       : never
//     : T[K] extends object
//       ? U[K] extends object
//         ? MatchingValues<T[K], U[K]>
//         : never
//       : T[K] extends U[K]
//         ? T[K]
//         : never
// }

type MatchingValues<T, U, D extends number = typeof Infinity> = {
  [K in keyof T & keyof U]: T[K] extends Array<infer TItem>
    ? U[K] extends Array<infer UItem>
      ? D extends 0
        ? never
        : Array<
            MatchingValues<TItem, UItem, D extends 0 ? 0 : D extends 1 ? 0 : D>
          >
      : never
    : T[K] extends object
      ? U[K] extends object
        ? D extends 0
          ? never
          : MatchingValues<T[K], U[K], D extends 0 ? 0 : D extends 1 ? 0 : D>
        : never
      : T[K] extends U[K]
        ? T[K]
        : never
}

function getMatchingValues<T, U, D extends number>(
  obj1: T extends Record<keyof T, any> ? T : Array<T>,
  obj2: U extends Record<keyof U, any> ? U : Array<U>,
  // depth: D extends number ? D : typeof Infinity
  depth = Infinity
) {
  const result = Array.isArray(obj2)
    ? []
    : ({} as Partial<Record<keyof U, any>>)
  const obj2Keys = Object.keys(obj2) as Array<keyof U>

  (Array.isArray(obj2)?obj2:obj2Keys).map((obj2Key, ind) => {
    const OBJ1 = Object.hasOwn(obj1, obj2Key)
      ? Object.values(obj1)[ind]
      : undefined
    if (
      typeof obj2Key === "string" &&
      Object.keys(obj1).includes(obj2Key) &&
      Array.isArray(OBJ1) &&
      Array.isArray(obj2[obj2Key]) &&
      depth > 0
    ) {
      console.log(obj2Key)

      result[obj2Key] = OBJ1.filter((val: any, index: number) => {
        return depth > 1 && val && typeof val === "object"
          ? getMatchingValues(val as any, obj2[obj2Key][index], depth - 1)
          : depth > 1 && val === OBJ1[index]
      }) as any
    } else if (
      !Array.isArray(OBJ1) &&
      typeof OBJ1 === "object" &&
      typeof obj2[obj2Key] === "object" &&
      depth > 0
    ) {
      console.log(obj2Key)

      result[obj2Key] = getMatchingValues(OBJ1, obj2[obj2Key], depth - 1) as any
    } else if (OBJ1 && depth - 1 >= 0) {
      console.log(obj2Key)

      result[obj2Key] = OBJ1
    }
  })

  return result
}

const result = getMatchingValues(obj1, obj2, 3)

console.log(result)
