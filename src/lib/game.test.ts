import { randomTurn } from "./game"

test("randomTurn.constructor", ()=> {
    expect(()=>{new randomTurn([0, 0], [0, 1, 2])}).toThrow("repeated fixed 0")
    expect(()=>{new randomTurn([1, 1], [0, 1, 2])}).toThrow("repeated fixed 1")
    expect(()=>{new randomTurn([0, 1], [0, 0, 1])}).toThrow("repeated option 0")
    expect(()=>{new randomTurn([0, 1], [0, 1, 0])}).toThrow("repeated option 0")
    expect(()=>{new randomTurn([0, 1], [1, 0, 0])}).toThrow("repeated option 0")
    expect(()=>{new randomTurn([0, -1], [0, 1, 2])}).toThrow("negative index -1")
    expect(()=>{new randomTurn([0, 0.5], [0, 1, 2])}).toThrow("non integer index 0.5")
})