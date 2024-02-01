function getMatchingValues<T, U>(obj1: T, obj2: U, depth = Infinity) {
  const result: Partial<T> = {}

  Object.keys(obj2 as object).forEach((key) => {
    // console.log(Array.isArray(obj1[key]) && Array.isArray(obj2[key]), depth)

    if (
      Array.isArray(obj1[key]) &&
      // && Array.isArray(obj2[key])
      depth > 0
    ) {
      console.log(key)

      result[key] = obj1[key].filter((val, index) => {
        console.log(val, depth)

        return depth > 1 && val && typeof val === "object"
          ? getMatchingValues(val, obj2[key][index], depth - 1)
          : depth > 1 && val === obj1[key][index]
      })
    } else if (
      !Array.isArray(obj1[key]) &&
      // !Array.isArray(obj2[key]) &&
      typeof obj1[key] === "object" &&
      typeof obj2[key] === "object" &&
      depth > 0
    ) {
      console.log(key)

      result[key] = getMatchingValues(obj1[key] as T, obj2[key] as U, depth - 1)
    } else if (obj1[key] && depth - 1 >= 0) {
      console.log(key)

      result[key] = obj1[key]
    }
  })

  return result
}

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

const result = getMatchingValues(obj1, obj2, 5)

console.log(result)
