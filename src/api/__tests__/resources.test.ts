import { getResource } from "../resources";

jest.mock("../resources");

describe('SW api call mock test', () => {
  it('first starship name should be CR90 corvette', async () => {
    const starships = await getResource("starships");
    expect(starships[0].name).toBe("CR90 corvette");
  })
  it('should fetch 2 people', async () => {
    const people = await getResource("people");
    expect(people.length).toBe(2);
  })
  it('should reject promise', async () => {
    const error = getResource("error");
    await expect(error).rejects.toEqual({ "error": "wrong type" });
  })
})