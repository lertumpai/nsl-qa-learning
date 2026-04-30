import type { LessonRow } from "../lesson-types";

export const seleniumWebdriverLesson: LessonRow = {
  level_slug: "advanced",
  title: "Selenium WebDriver",
  description: "Automate browsers with Selenium locators, waits, and POM",
  step_order: 2,
  duration_min: 20,
  content: `## Selenium WebDriver

Selenium WebDriver is the foundation of web automation. It provides a programming interface to control browsers, simulating real user actions.

### Architecture

\`\`\`
[Test Code] → [WebDriver API] → [Browser Driver] → [Browser]
                      (ChromeDriver)    (Chrome)
\`\`\`

### Locator Strategies (Priority Order)

Use the most stable locator available:

1. **ID** (most stable): \`driver.findElement(By.id("login-btn"))\`
2. **Name**: \`By.name("username")\`
3. **CSS Selector**: \`By.cssSelector(".btn-primary")\`
4. **XPath**: \`By.xpath("//button[@data-testid='submit']")\` (use only when needed)
5. **Text**: \`By.linkText("Sign Up")\`

**Best practice**: Use \`data-testid\` attributes — they're stable and testing-specific:

\`\`\`html
<button data-testid="login-submit">Login</button>
\`\`\`
\`\`\`java
driver.findElement(By.cssSelector("[data-testid='login-submit']"))
\`\`\`

### Waits — The Most Important Concept

Never use \`Thread.sleep()\`. Use smart waits.

#### Implicit Wait (avoid)
Applies globally — slows down every interaction:
\`\`\`java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
\`\`\`

#### Explicit Wait (preferred)
Waits for a specific condition:
\`\`\`java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for element to be visible
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("result")));

// Wait for text to appear
wait.until(ExpectedConditions.textToBePresentInElementLocated(
  By.id("status"), "Success"
));

// Wait for element to be clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
\`\`\`

#### Fluent Wait (most flexible)
Custom polling with exceptions to ignore:
\`\`\`java
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
  .withTimeout(Duration.ofSeconds(30))
  .pollingEvery(Duration.ofSeconds(2))
  .ignoring(NoSuchElementException.class);
\`\`\`

### Common Interactions

\`\`\`java
// Click
driver.findElement(By.id("btn")).click();

// Type text
driver.findElement(By.id("email")).sendKeys("test@example.com");

// Clear and type
driver.findElement(By.id("email")).clear();
driver.findElement(By.id("email")).sendKeys("new@example.com");

// Select dropdown
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("Thailand");

// Get text
String message = driver.findElement(By.id("error")).getText();

// Take screenshot
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
\`\`\`

### Cross-Browser Testing

\`\`\`java
// Chrome
WebDriver driver = new ChromeDriver();

// Firefox
WebDriver driver = new FirefoxDriver();

// Safari (Mac only)
WebDriver driver = new SafariDriver();
\`\`\`

Use **Selenium Grid** or **BrowserStack** for parallel cross-browser execution.`,
};
