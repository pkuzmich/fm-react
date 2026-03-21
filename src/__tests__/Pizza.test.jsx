import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

afterEach(cleanup);

test("Alt test renders on Pizza image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const description = "Super pizza";

  const screen = render(
    <Pizza name={name} image={src} description={description} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
  cleanup();
});

test("to have default image if none is provided", async () => {
  const screen = render(
    <Pizza name="Something else" description="Super cool pizza" />,
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
