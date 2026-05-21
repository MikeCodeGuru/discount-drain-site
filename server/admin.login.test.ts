import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  const setCookies: string[] = [];
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: "" },
    } as TrpcContext["req"],
    res: {
      setHeader: (name: string, value: string | string[]) => {
        if (name === "Set-Cookie") {
          if (Array.isArray(value)) setCookies.push(...value);
          else setCookies.push(value);
        }
      },
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

describe("admin.login", () => {
  it("rejects wrong password", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.admin.login({ password: "wrong-password-12345" })
    ).rejects.toThrow();
  });

  it("accepts correct password from env or default", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);
    const password = process.env.ADMIN_PASSWORD || "DiscountDrain2024!";
    const result = await caller.admin.login({ password });
    expect(result).toMatchObject({ success: true });
  });
});
