import { wordSelectTurn } from "./turn"

test("wordSelectTurn.constructor", ()=> {
    expect(()=>{new wordSelectTurn([0, 0], [0, 1, 2])}).toThrow("repeated fixed 0")
    expect(()=>{new wordSelectTurn([1, 1], [0, 1, 2])}).toThrow("repeated fixed 1")
    expect(()=>{new wordSelectTurn([0, 1], [0, 0, 1])}).toThrow("repeated option 0")
    expect(()=>{new wordSelectTurn([0, 1], [0, 1, 0])}).toThrow("repeated option 0")
    expect(()=>{new wordSelectTurn([0, 1], [1, 0, 0])}).toThrow("repeated option 0")
    expect(()=>{new wordSelectTurn([0, -1], [0, 1, 2])}).toThrow("negative index -1")
    expect(()=>{new wordSelectTurn([0, 0.5], [0, 1, 2])}).toThrow("non integer index 0.5")
})

test("wordSelectTurn.explain", ()=> {
    expect(new wordSelectTurn([0, 1], [0, 1, 2]).explain()).toBe(`The fixed words randomly chosen for this round were "people,history" and the options randomly chosen for this round were "abandoned,able,absolute"`)
})