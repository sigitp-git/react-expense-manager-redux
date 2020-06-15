const person = {
  name: 'Mici',
  age: 6,
  location: {
    city: 'Plano',
    temp: 68,
  },
}

// object dest is properties based
const { name, age, location } = person
const { city, temp } = person.location

console.log(name, age, city, temp)

const arr = ['a', 'b', 'c', 'd']
// array dest is position based
const [first, second, third, fourth] = arr

