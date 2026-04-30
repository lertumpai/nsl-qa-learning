import type { LessonRow } from "../../lesson-types";

export const seleniumWebdriverLesson: LessonRow = {
  level_slug: "advanced",
  title: "Selenium WebDriver",
  description: "Automate browsers with Selenium locators, waits, and Page Object Model",
  step_order: 2,
  duration_min: 22,
  content: `## Selenium WebDriver

Selenium WebDriver is the foundation of web automation and the most widely used browser automation framework in the industry. It provides a programming interface to control browsers by simulating real user actions — clicking, typing, navigating, and reading page content.

### Architecture

\`\`\`
[Test Code]
    ↓
[WebDriver API] ← Language bindings (Java, Python, JavaScript, C#)
    ↓
[Browser Driver] ← ChromeDriver, GeckoDriver (Firefox), SafariDriver
    ↓
[Browser] ← Chrome, Firefox, Edge, Safari
\`\`\`

Each language has official Selenium bindings. The browser driver translates WebDriver commands into browser-native commands. This architecture enables writing tests in any supported language against any supported browser.

### Locator Strategies (Priority Order)

Choosing stable locators is the most important skill in Selenium automation. Unstable locators are the #1 cause of test maintenance cost.

1. **ID (most stable)**: \`driver.findElement(By.id("login-btn"))\` — IDs should be unique on a page. They rarely change unless specifically targeted for removal by a developer.

2. **Name**: \`By.name("username")\` — Useful for form fields. Can be less reliable if names are shared across a form.

3. **CSS Selector**: \`By.cssSelector(".btn-primary")\` — Flexible and fast. Prefer attribute-based selectors over class-based ones. Classes change frequently with styling refactors.

4. **XPath**: \`By.xpath("//button[@data-testid='submit']")\` — Use only when CSS selector cannot reach the element. Absolute XPath (long paths starting from \`/html/body/div[3]/...\`) breaks whenever the page structure changes.

5. **Text**: \`By.linkText("Sign Up")\` — Brittle when text changes due to copy updates or localization.

**Best practice: Use \`data-testid\` attributes** — they signal "this element is used for testing" to developers and are not tied to styling, layout, or business logic:

\`\`\`html
<button data-testid="login-submit">Login</button>
\`\`\`
\`\`\`java
driver.findElement(By.cssSelector("[data-testid='login-submit']")).click();
\`\`\`

Coordinate with developers to add \`data-testid\` attributes to key elements. This is a QA-developer collaboration that pays off in years of stable automation.

### Waits — The Most Critical Concept

Selenium's most common failure mode is running an action before the page is ready. Modern web applications are asynchronous — elements appear, change, and disappear after JavaScript runs, API calls return, or animations complete.

**Never use \`Thread.sleep()\`** — it waits for a fixed time regardless of whether the page is ready, making tests both slow (waits too long when fast) and flaky (doesn't wait enough when slow).

#### Implicit Wait (avoid in most cases)
Applies globally to every findElement call — adds unnecessary delay to every interaction:
\`\`\`java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
// ALL findElement calls now wait up to 10 seconds
// This slows down tests when most elements are already present
\`\`\`

#### Explicit Wait (preferred)
Waits for a specific condition on a specific element:
\`\`\`java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for element to be visible (exists AND is visible)
WebElement result = wait.until(
  ExpectedConditions.visibilityOfElementLocated(By.id("result"))
);

// Wait for text to appear in an element
wait.until(ExpectedConditions.textToBePresentInElementLocated(
  By.id("status"), "Payment successful"
));

// Wait for element to be clickable (visible AND enabled)
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit"))).click();

// Wait for URL to change (after form submission or navigation)
wait.until(ExpectedConditions.urlContains("/dashboard"));
\`\`\`

#### Fluent Wait (most flexible)
Custom polling interval and ignored exceptions — use for elements that appear intermittently:
\`\`\`java
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
  .withTimeout(Duration.ofSeconds(30))
  .pollingEvery(Duration.ofSeconds(2))
  .ignoring(NoSuchElementException.class)
  .ignoring(StaleElementReferenceException.class);

WebElement element = fluentWait.until(
  driver -> driver.findElement(By.id("result"))
);
\`\`\`

### Common Interactions

\`\`\`java
// Click
driver.findElement(By.id("btn")).click();

// Type text
driver.findElement(By.id("email")).sendKeys("test@example.com");

// Clear field and type new value
WebElement field = driver.findElement(By.id("email"));
field.clear();
field.sendKeys("new@example.com");

// Select from dropdown by visible text
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("Thailand");

// Select from dropdown by value attribute
dropdown.selectByValue("TH");

// Get text content of an element
String errorMessage = driver.findElement(By.id("error")).getText();

// Get attribute value
String hrefValue = driver.findElement(By.id("link")).getAttribute("href");

// Check if element is displayed
boolean isVisible = driver.findElement(By.id("banner")).isDisplayed();

// Take screenshot on failure
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(screenshot, new File("screenshots/failure.png"));
\`\`\`

### Page Object Model in Selenium (Java)

\`\`\`java
// page-objects/LoginPage.java
public class LoginPage {
  private WebDriver driver;
  private By emailField = By.cssSelector("[data-testid='email']");
  private By passwordField = By.cssSelector("[data-testid='password']");
  private By submitButton = By.cssSelector("[data-testid='submit']");
  private By errorMessage = By.cssSelector("[data-testid='error']");

  public LoginPage(WebDriver driver) {
    this.driver = driver;
  }

  public void enterEmail(String email) {
    driver.findElement(emailField).sendKeys(email);
  }

  public void enterPassword(String password) {
    driver.findElement(passwordField).sendKeys(password);
  }

  public void clickLogin() {
    driver.findElement(submitButton).click();
  }

  public String getErrorMessage() {
    return driver.findElement(errorMessage).getText();
  }

  public void login(String email, String password) {
    enterEmail(email);
    enterPassword(password);
    clickLogin();
  }
}

// tests/LoginTest.java
public class LoginTest {
  WebDriver driver;
  LoginPage loginPage;

  @BeforeEach
  void setup() {
    driver = new ChromeDriver();
    driver.get("https://staging.myapp.com/login");
    loginPage = new LoginPage(driver);
  }

  @Test
  void invalidPasswordShowsError() {
    loginPage.login("user@example.com", "wrongpassword");
    assertEquals("Invalid email or password", loginPage.getErrorMessage());
  }

  @AfterEach
  void teardown() {
    driver.quit();
  }
}
\`\`\`

### Cross-Browser Testing

\`\`\`java
// Chrome
WebDriver driver = new ChromeDriver();

// Firefox
WebDriver driver = new FirefoxDriver();

// Edge
WebDriver driver = new EdgeDriver();

// Safari (Mac only, enable remote automation in Safari preferences)
WebDriver driver = new SafariDriver();
\`\`\`

Use **Selenium Grid** for parallel cross-browser execution on multiple machines:
\`\`\`java
// Remote WebDriver connecting to Selenium Grid
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setBrowserName("chrome");
WebDriver driver = new RemoteWebDriver(
  new URL("http://selenium-grid:4444/wd/hub"),
  capabilities
);
\`\`\`

Use **BrowserStack** or **Sauce Labs** for cloud-based cross-browser testing without managing your own grid infrastructure.

### Handling Dynamic Content

\`\`\`java
// Wait for loading spinner to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("spinner")));

// Wait for element count to change (e.g., after filtering results)
wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
  By.cssSelector(".product-card"), 0
));

// Handle StaleElementReferenceException
// Element reference becomes stale when the DOM is refreshed
try {
  element.click();
} catch (StaleElementReferenceException e) {
  // Re-find the element
  driver.findElement(By.id("btn")).click();
}
\`\`\`

### Selenium vs Modern Alternatives

Selenium remains the industry standard for cross-browser testing but has been joined by modern alternatives:

**Structured reference**

- **Selenium WebDriver**: Most browser support, multiple languages, grid for parallelism. Requires manual wait management. Best for enterprise, multi-language teams, and complex cross-browser needs.

- **Playwright**: Auto-waits for element readiness, built-in trace viewer, native TypeScript support, faster setup. Best for teams starting new automation in 2024+.

- **Cypress**: Runs in-browser with excellent debugging, automatic waiting, and network interception. Best for JavaScript/TypeScript teams focused on web apps.

### Real-World Use Cases

#### Case 1: Cross-browser checkout

QA uses Selenium Grid to verify checkout works in Chrome, Firefox, and Edge simultaneously. Browser-specific issues in form autofill and payment redirect behavior are caught before release.

#### Case 2: Explicit wait after form submission

After clicking Submit, the test uses \`ExpectedConditions.urlContains("/confirmation")\` instead of \`sleep(3000)\`. This passes in 500ms when the server is fast and waits up to 10 seconds when the server is slow — removing a class of flaky tests.

#### Case 3: Page Object stability

When the login form is redesigned and button selectors change, the fix is made in one \`LoginPage.java\` file. All 23 tests that use \`loginPage.login()\` automatically pick up the fix without any changes.

### How to Apply This in Real QA Work

Selenium drives real browsers through WebDriver. It is powerful for cross-browser UI checks, but reliable tests require stable locators, explicit waits, and careful test design.

#### Practical Workflow

- Use stable selectors such as IDs and \`data-testid\` attributes rather than brittle CSS class paths or absolute XPath expressions.
- Wait for meaningful conditions: element visible, enabled, text present, URL changed, or API result reflected in the UI.
- Keep test logic separate from page interaction code using Page Object Model so UI changes require minimal test maintenance.
- Limit Selenium to user journeys where browser behavior truly matters; use API tests for backend-heavy validation that doesn't require a browser.

#### Common Mistakes to Avoid

- Using \`Thread.sleep()\` instead of explicit waits — fixed-time waits make tests slower when fast and flaky when slow.
- Testing every validation rule through the browser when faster API or unit tests would work just as well.
- Writing brittle XPath locators that break when any parent element changes.
- Letting tests depend on each other's state — each test should start with a known clean state.

### Interview Questions

**Q: What is the difference between implicit wait and explicit wait in Selenium?**
Implicit wait applies globally and makes every \`findElement\` call wait up to the specified time for an element to appear. Explicit wait waits for a specific condition on a specific element — "wait for this element to be clickable" or "wait for this text to be present." Explicit waits are preferred because they are precise, predictable, and don't add unnecessary delay to elements that are already available.

**Q: Why should you avoid Thread.sleep() in Selenium tests?**
\`Thread.sleep()\` is a fixed-time pause that doesn't respond to actual application state. If the page loads in 200ms, the test still waits 3 seconds — wasting time. If the page takes 4 seconds due to a slow server, the test fails after 3 seconds — a false failure. Explicit waits fix both problems by waiting exactly as long as needed, up to a maximum timeout.

**Q: What is a StaleElementReferenceException and how do you handle it?**
It occurs when a reference to a DOM element becomes invalid — usually because the page was refreshed, navigated, or a JavaScript framework re-rendered the element. Handle it by re-finding the element after the DOM change, or by using explicit waits that detect element staleness and retry the lookup.

**Q: Why is the Page Object Model important for test maintainability?**
POM separates locators and interactions (the how) from test logic (the what). When a UI element changes, you update one page object class instead of every test that references that element. A login form referenced by 30 tests only needs one fix. Without POM, a single selector change requires updating 30 test files.

**Q: What locator strategy should you use and why?**
Prefer \`data-testid\` attributes added specifically for testing, or stable IDs. Avoid CSS class selectors (classes change with styling refactors), absolute XPath (breaks when page structure changes), and text-based selectors (breaks when copy changes or is localized). The goal is a locator that survives UI redesigns, language changes, and refactoring.

#### Practice Prompt

Refactor a brittle absolute XPath locator into a stable \`data-testid\` CSS selector, explain why it is more maintainable, and show how you would coordinate with developers to add the attribute.`,
};
