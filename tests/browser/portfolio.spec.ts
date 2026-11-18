import { test, expect } from "@playwright/test";
import { experimentCategories } from "../../components/experiments/catalog";
import { mkdir } from "node:fs/promises";
test("preserves the first screen and replaces the project selection", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I'm Alejandro Agredo",
  );
  const height = await page
    .locator(".first-screen")
    .evaluate((element) => element.getBoundingClientRect().height);
  expect(Math.abs(height - page.viewportSize()!.height)).toBeLessThan(2);
  for (const title of [
    "Daya Muneton",
    "Experiencia Yatum",
    "Empanadas Herencia",
    "WorkoutSync",
  ])
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  for (const title of [
    "Apollo Chat",
    "Inventory Management",
    "Age Of Emotions",
    "Jiyaki",
  ])
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /inspect preview/i }),
  ).toHaveCount(0);
  expect(
    await page
      .locator(".contact-footer")
      .evaluate((element) => getComputedStyle(element).clipPath),
  ).toContain("50% 48px");
  await mkdir("artifacts/qa", { recursive: true });
  await page.screenshot({
    path: "artifacts/qa/" + info.project.name + "-intro.png",
  });
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator(".device-pair").first().locator("img")).toHaveCount(
    2,
  );
  await expect
    .poll(() =>
      page
        .locator(".device-pair")
        .first()
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page.screenshot({
    path: "artifacts/qa/" + info.project.name + "-projects.png",
  });
  const laptop = await page.locator(".laptop-mockup").first().boundingBox();
  const phone = await page.locator(".phone-mockup").first().boundingBox();
  for (const capture of await page.locator(".laptop-display .desktop-capture").all()) {
    await capture.scrollIntoViewIfNeeded();
    const screen = await capture.boundingBox();
    expect(screen!.width / screen!.height).toBeCloseTo(1250 / 712, 2);
    const image = capture.locator("img");
    await expect.poll(() => image.evaluate(element => {
      const image = element as HTMLImageElement;
      return image.complete && image.naturalWidth > 0;
    })).toBe(true);
    const ratio = await image.evaluate(element => {
      const image = element as HTMLImageElement;
      return image.naturalWidth / image.naturalHeight;
    });
    expect(ratio).toBeCloseTo(1265 / 712, 2);
    const box = await image.boundingBox();
    expect(box!.width).toBeGreaterThan(screen!.width);
    expect(box!.height).toBeCloseTo(screen!.height, 0);
    await expect(capture).toHaveCSS("overflow", "hidden");
  }
  expect(phone!.x).toBeLessThan(laptop!.x + laptop!.width);
  expect(phone!.y).toBeGreaterThan(laptop!.y);
  expect(phone!.y + phone!.height).toBeGreaterThan(laptop!.y + laptop!.height);
});
test("desktop and phone images open a focused modal and restore keyboard focus", async ({
  page,
}, info) => {
  await page.goto("/#projects");
  const laptop = page.getByRole("button", {
    name: "Open Daya Muneton desktop image",
    exact: true,
  });
  await laptop.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText(
    "Daya Muneton · Desktop",
  );
  await expect(
    dialog.getByRole("button", { name: "Close image" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close image" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(laptop).toBeFocused();
  await page
    .getByRole("button", { name: "Open Daya Muneton phone image", exact: true })
    .click();
  await expect(dialog.getByRole("heading")).toHaveText("Daya Muneton · Phone");
  await dialog.getByRole("img").click();
  await expect(dialog).toBeVisible();
  await page.screenshot({
    path: "artifacts/qa/" + info.project.name + "-image-modal.png",
  });
  await dialog.getByRole("button", { name: "Close image" }).click();
  await expect(dialog).not.toBeVisible();
  expect(
    await page.locator("body").evaluate((element) => element.style.overflow),
  ).toBe("");
});
test("all original experiments autoplay inline without playback buttons", async ({
  page,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "Run the full archive once; phone covers autoplay separately.",
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".experiment-stage iframe")).toHaveCount(0);
  await page.getByRole("link", { name: "Experiments", exact: true }).click();
  for (const category of experimentCategories) {
    await page.getByRole("tab", { name: new RegExp(category.title) }).click();
    for (const experiment of category.experiments) {
      await page
        .getByRole("button", { name: experiment.title, exact: true })
        .click();
      await expect(page.locator(".experiment-player")).toHaveAttribute("data-playback", "playing");
      await expect(page.locator(".experiment-stage iframe")).toHaveCount(1);
      await expect(page.locator(".experiment-stage iframe")).toHaveAttribute(
        "src",
        "/experiments/runtime/" + experiment.id + ".html",
      );
      await expect(
        page.frameLocator(".experiment-stage iframe").locator("canvas"),
      ).toBeVisible();
      await expect(page.locator(".experiment-player figcaption")).toHaveText(experiment.title);
      const stage = await page.locator(".experiment-stage").boundingBox();
      const caption = await page.locator("figcaption").boundingBox();
      expect(caption!.y).toBeGreaterThanOrEqual(stage!.y + stage!.height - 1);
      if (["boids", "gravity", "cylinder"].includes(experiment.id)) {
        await expect(page.locator(".experiment-stage iframe")).toHaveCSS("background-color", "rgb(255, 255, 255)");
        await page.locator(".experiment-player").screenshot({ path: "artifacts/qa/desktop-" + experiment.id + ".png" });
      }
    }
  }
  await expect(page.locator(".player-controls, .player-start, .player-header, .experiment-description")).toHaveCount(0);
  await expect(page.locator(".experiment-player figcaption")).toHaveText("visualize relationship");
  await expect(page.getByText("Playing here", { exact: true })).toHaveCount(0);
  await expect(
    page.locator('#experiments').getByRole("button", { name: /^(Play|Pause|Reset) / }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("tabs preserve keyboard navigation, reduced motion and automatic playback", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#experiments");
  const first = page.getByRole("tab", { name: /Motion & physics/ });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: /Graphics & geometry/ }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "tesseract", exact: true }).click();
  await expect(page.locator(".experiment-player")).toHaveAttribute("data-playback", "reduced");
  await expect(page.locator(".experiment-stage iframe")).toHaveCount(0);
  await expect(page.locator(".experiment-poster")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".experiment-player")).toHaveAttribute("data-playback", "playing");
  const canvas = page
    .frameLocator(".experiment-stage iframe")
    .locator("canvas");
  const initial = await canvas.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await expect
    .poll(() =>
      canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL()),
    )
    .not.toBe(initial);
  await page.screenshot({
    path: "artifacts/qa/" + info.project.name + "-experiments.png",
  });
  await page.locator(".intro").scrollIntoViewIfNeeded();
  await expect(page.locator(".experiment-player")).toHaveAttribute("data-playback", "paused");
  await expect
    .poll(async () => {
      const before = await canvas.evaluate((element) =>
        (element as HTMLCanvasElement).toDataURL(),
      );
      await new Promise((resolve) => setTimeout(resolve, 150));
      return (
        before ===
        (await canvas.evaluate((element) =>
          (element as HTMLCanvasElement).toDataURL(),
        ))
      );
    })
    .toBe(true);
  await page.getByRole("link", { name: "Experiments", exact: true }).click();
  await expect(page.locator(".experiment-player")).toHaveAttribute("data-playback", "playing");
  const resumed = await canvas.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await expect
    .poll(() =>
      canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL()),
    )
    .not.toBe(resumed);
});
test("professional icons and tech logos keep real destinations and hover shine", async ({
  page,
}) => {
  await page.goto("/");
  const github = page
    .locator(".intro .contact-links")
    .getByRole("link", { name: "GitHub profile" });
  await expect(github).toHaveAttribute(
    "href",
    "https://github.com/agredo-alejo",
  );
  await github.hover();
  expect(
    await github.evaluate((element) => getComputedStyle(element).filter),
  ).toContain("drop-shadow");
  const react = page.getByRole("link", {
    name: "React official website",
    exact: true,
  });
  await expect(react).toHaveAttribute("href", "https://react.dev/");
  await expect(react).toHaveAttribute("target", "_blank");
  await expect(react).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator(".skill-link")).toHaveCount(14);
  await expect(page.getByRole("button", { name: /background animation/i })).toHaveCount(0);
  await expect(page.getByText("(786) 496-3019", { exact: true })).toHaveCount(0);
  await expect(
    page.locator(".contact-footer .contact-links .ui-icon"),
  ).toHaveCount(5);
  await expect(
    page.locator(".contact-footer").getByRole("link", { name: "Call Alejandro", exact: true }),
  ).toHaveAttribute("href", "tel:+17864963019");
  const resume = page.locator(".intro").getByRole("link", { name: "Open résumé PDF" });
  await expect(resume).toHaveAttribute("target", "_blank");
  await expect(resume).toHaveAttribute("rel", "noopener noreferrer");
  const resumePath = await resume.getAttribute("href");
  expect(resumePath).toBeTruthy();
  await expect(page.locator(".contact-footer").getByRole("link", { name: "Open résumé PDF" })).toHaveAttribute("href", resumePath!);
  const pdf = await page.request.get(resumePath!);
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  const bytes = await pdf.body();
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  // Older direct links should deliver the same current document.
  const previousAddress = await page.request.get("/resume-alejandro-agredo.pdf");
  expect((await previousAddress.body()).equals(bytes)).toBe(true);
});
test("contact sends through local SMTP and shows success only after acceptance", async ({
  page,
  request,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "Avoid repeating mail sends and rate-limit consumption.",
  );
  await page.goto("/#contact");
  await page
    .getByLabel("Name", { exact: true })
    .fill("Synthetic Portfolio Test");
  await page.getByLabel("Email", { exact: true }).fill("sender@example.test");
  await page
    .getByLabel("Message", { exact: true })
    .fill("A synthetic message for the local SMTP verification.");
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    page
      .getByRole("form", { name: "Send Alejandro a message" })
      .getByRole("status"),
  ).toContainText("Your message has been sent");
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue("");
  const response = await request.get("http://127.0.0.1:3151/messages");
  const messages = await response.json();
  expect(messages).toHaveLength(1);
  expect(messages[0].to[0].address).toBe("agredoalejo@gmail.com");
  expect(messages[0].content).toContain("Reply-To: sender@example.test");
});
test("failed delivery preserves the message and provides a direct email link", async ({
  page,
  request,
}, info) => {
  test.skip(
    info.project.name !== "phone",
    "Exercise recovery on the phone layout.",
  );
  await request.post("http://127.0.0.1:3151/fail-next");
  await page.goto("/#contact");
  await page.getByLabel("Name", { exact: true }).fill("Synthetic Error Test");
  await page.getByLabel("Email", { exact: true }).fill("sender@example.test");
  const message = "Keep this message when the mail server is unavailable.";
  await page.getByLabel("Message", { exact: true }).fill(message);
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    page
      .getByRole("form", { name: "Send Alejandro a message" })
      .getByRole("alert"),
  ).toContainText("temporarily unavailable");
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue(
    message,
  );
  await expect(
    page.getByRole("link", { name: "Email me directly" }),
  ).toHaveAttribute("href", "mailto:agredoalejo@gmail.com");
});
test("small phone layout has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Experiments", exact: true }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
