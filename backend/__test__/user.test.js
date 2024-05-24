import { signIn, signUp, getUser } from "../actions/user.js";
import prisma from "../prisma/prisma.js";

jest.mock("../prisma/prisma.js", () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe("signIn function", () => {
  it("should return the user if username exists", async () => {
    const mockUser = { id: 1, username: "testUser", name: "Test User" };

    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await signIn("testUser");

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "testUser" },
    });
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if username does not exist", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(signIn("unknownUser")).rejects.toThrow(
      "no user associate at this username"
    );
  });
});
describe("signUp function", () => {
  it("should create a new user", async () => {
    const newUser = { username: "newUser", name: "New User" };
    const mockUser = { id: 1, ...newUser };

    prisma.user.create.mockResolvedValue(mockUser);

    const result = await signUp("newUser", "New User");

    expect(prisma.user.create).toHaveBeenCalledWith({ data: newUser });
    expect(result).toEqual(mockUser);
  });
});

describe("getUser function", () => {
  it("should return the user with associated data if username exists", async () => {
    const mockUser = {
      id: 1,
      username: "testUser",
      name: "Test User",
      approved: [],
      quotes: [{ id: 1, text: "quote", like: [], dislike: [] }],
    };

    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await getUser("testUser");

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "testUser" },
      include: {
        approved: true,
        quotes: { include: { like: true, dislike: true } },
      },
    });
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if username does not exist", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(getUser("unknownUser")).rejects.toThrow("An error occurred");
  });
});
