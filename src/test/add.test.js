const add = (a, b) => a + b

// jest test function, call inside test files
test('should add two numbers', () => {
    const result = add (3, 4)
    expect(result).toBe(7)
})