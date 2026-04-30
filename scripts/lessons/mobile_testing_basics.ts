import type { LessonRow } from "../lesson-types";

export const mobileTestingBasicsLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Mobile Testing Basics",
  description: "Test iOS and Android apps across devices, OS versions, and real conditions",
  step_order: 12,
  duration_min: 15,
  content: `## Mobile Testing Basics

Mobile testing has unique challenges that do not exist in web testing: device fragmentation, network variability, touch interactions, OS diversity, hardware sensors, and app lifecycle events. A feature that works perfectly on Chrome desktop can behave completely differently on an older Android phone running on a 3G network.

### Why Mobile Testing is Different

- **Device fragmentation**: Android alone has thousands of device/OS combinations from dozens of manufacturers. A layout that looks correct on a Samsung Galaxy S24 may overflow or break on an older Xiaomi or Motorola with a different screen resolution or Android skin.

- **Touch interaction model**: Mobile users tap, swipe, pinch, and long-press. These interactions have different target sizes, gesture recognition behavior, and scroll behavior than mouse clicks. A button that is too small to tap accurately is a real usability bug.

- **App lifecycle complexity**: Mobile apps can be interrupted at any time — a phone call, a push notification, a low-battery warning, or the user switching to another app. The app must save state and resume correctly after every interruption.

- **Network variability**: Mobile users frequently switch between WiFi, 4G/5G, and areas with poor connectivity. An app that crashes when the network drops during a transaction is a data integrity bug, not just a UX issue.

### Mobile Testing Challenges

**Structured reference**

- **Device Fragmentation**: Thousands of device/OS combinations exist in the wild. The solution is to build a prioritized device matrix based on your user analytics — test on the most popular devices, then expand coverage for edge cases.

- **Network Conditions**: Users experience 3G, 4G/5G, WiFi, and offline states throughout a session. Test network transitions, not just stable connections. Switching from WiFi to cellular mid-checkout is a common real-world scenario that often reveals bugs.

- **Screen Sizes and Densities**: Different pixel densities (mdpi, hdpi, xxhdpi) and aspect ratios (16:9, 20:9) affect layout rendering. A table that fits on a large phone may clip text or overlap elements on a small phone.

- **OS Versions**: iOS 16, 17, 18 and Android 12, 13, 14, 15 each introduce behavior changes, permission model changes, and API deprecations. Test on the current version AND at least one previous major version.

- **Battery and Resource Constraints**: The operating system may aggressively kill background processes on low-battery or low-memory devices. Test that the app resumes correctly after being killed in the background.

- **Permissions**: Camera, location, notifications, contacts, and microphone must be explicitly granted. Each permission has a "first request," "permanently denied," and "granted" state. All three states must be tested for features that use that permission.

### Device Matrix Strategy

You cannot test on every device. Build a prioritized matrix:

1. **Market share**: Use your analytics to find the most popular devices and OS versions in your user base. If 60% of users are on Android 14 and iPhone 15, start there.

2. **OS version coverage**: Test on the latest version AND the previous major version. A significant portion of users lag behind the current OS due to manufacturer delays or personal choice.

3. **Screen size variety**: Small (5–5.5 inch), medium (6–6.5 inch), and large (6.7+ inch or tablet) cover the range of rendering scenarios.

4. **Manufacturer diversity**: iOS behavior is consistent across Apple devices, but Android behavior varies significantly between Samsung (One UI), Pixel (stock Android), and Xiaomi (MIUI). Each manufacturer's skin can cause unique bugs.

Example device matrix for a global app:
\`\`\`
iOS:     iPhone 15 Pro (iOS 17), iPhone 12 (iOS 16)
Android: Samsung Galaxy S24 (Android 14)
         Google Pixel 7 (Android 13)
         Xiaomi Redmi 12 (Android 13) — budget device segment
Tablet:  iPad Air (iOS 17) — if app has tablet layout
\`\`\`

### Real Device vs Emulator/Simulator

**Structured reference**

- **Accuracy**: Real devices produce exact behavior including hardware-specific quirks, OS customization by the manufacturer, and real sensor behavior. Emulators produce near-accurate results but cannot fully replicate every hardware interaction.

- **Camera and GPS**: Real devices have working cameras and GPS hardware. Emulators simulate these but cannot test scenarios like "camera slow to initialize on an older device" or "GPS accuracy in a tunnel."

- **Battery and Temperature**: Real devices can be tested with low battery to verify behavior changes. Emulators do not simulate battery or thermal throttling, which can affect performance on real devices.

- **Test Speed and Cost**: Emulators start in seconds and are free. Real device testing requires physical devices or cloud services (BrowserStack, Sauce Labs, Firebase Test Lab) which have cost and setup time.

**Recommendation**: Use emulators/simulators for development-time testing and early CI runs. Use real devices for final validation of critical flows, hardware features (camera, GPS, biometrics), and performance verification.

### Mobile-Specific Test Cases

#### Gesture Testing

- **Tap**: Verify the tap target is large enough (minimum 44×44 points as per Apple guidelines). A button that is technically clickable but too small for an adult finger is an accessibility and UX bug.

- **Swipe**: Test left, right, up, and down swipes. Verify swipe directions match the user's expectation — swiping left to delete, swiping down to refresh. Accidental swipes should not trigger destructive actions without confirmation.

- **Pinch to Zoom**: On content that should zoom (images, maps), pinch zoom should be smooth and not cause layout breaks. On forms and dialogs, inadvertent zooming should be prevented.

- **Long Press**: Reveal context menus and secondary actions. Verify long press on text allows copy/paste, and long press on list items triggers expected actions.

#### Interruption Testing

- **Incoming phone call**: The app should pause, save state, and resume correctly after the call ends. Audio apps should pause immediately. Data entry should be preserved.

- **Push notifications**: Tapping a notification should deep-link to the correct content. The notification should appear even when the app is in the background or closed. Notification permissions (enabled/disabled) should be tested.

- **App backgrounded and returned**: After switching to another app and returning, the user should see the same state they left. Session timeouts should only occur after the defined inactivity period, not on every background-foreground cycle.

- **Screen rotation mid-flow**: Rotating the device during a form, checkout, or media playback should preserve all entered data. Layout should adapt correctly to landscape mode if supported.

#### Connectivity Testing

- **WiFi to cellular transition**: Switching network mid-request should either retry gracefully or inform the user — not silently fail and show stale data.

- **No connection**: The app should display a clear offline message and not crash. Any data that the user entered should be preserved so they can retry when connected.

- **Slow network (3G simulation)**: Slow networks reveal missing loading indicators, timeout handling, and image optimization issues. Test that every API call has appropriate loading states.

#### Installation and Upgrade Testing

- **Fresh install**: Default state, onboarding flow, permission requests, and initial data loading should all work correctly for a first-time user.

- **Upgrade from previous version**: Existing user data (settings, preferences, cached data, login session) should persist correctly after an upgrade. Database migrations should run without loss.

- **Uninstall and reinstall**: After uninstall, app data should be cleared (or preserved if stored in the cloud). After reinstall, the user should go through the fresh install flow.

### Mobile Testing Tools

**Structured reference**

- **Appium**: Cross-platform automation for both iOS and Android using a WebDriver-like API. Supports multiple programming languages (Java, Python, JavaScript). Best for teams who need one automation solution for both platforms.

- **XCTest / XCUITest**: Apple's native iOS testing framework built into Xcode. Provides the best reliability and feature access for iOS-only teams. Supports recording and code generation.

- **Espresso**: Google's native Android UI testing framework. Integrates tightly with the Android development environment and provides the fastest, most reliable Android automation.

- **BrowserStack**: Cloud-based real device testing platform. Provides access to hundreds of real iOS and Android devices without purchasing hardware. Essential for organizations that need broad device coverage.

- **Firebase Test Lab**: Google's cloud device testing service. Supports Espresso and Robo tests (automated crawling without writing test code). Integrates with Android CI pipelines.

### Accessibility Testing on Mobile

Mobile accessibility testing ensures the app is usable by people with disabilities:

- **VoiceOver (iOS) / TalkBack (Android)**: Screen readers read element labels aloud. Test that all interactive elements have meaningful labels, not just "Button" or "Image."

- **Dynamic text sizes**: Users can increase system font size. Test that the app layout adapts to larger text without truncation or overlap.

- **Color contrast**: Elements must have sufficient color contrast for users with low vision. Many manufacturers include accessibility analyzers in developer options.

- **Touch target sizes**: All interactive elements should meet the 44×44 point minimum size guideline for accurate touch interaction.

### Real-World Use Cases

#### Case 1: Permission denied flow

QA denies camera permission during profile photo upload on iOS. The app should display a helpful message explaining why the camera is needed, with a button that opens System Settings to allow the user to enable permission. The app must not crash, and the rest of the profile editing flow should still work.

#### Case 2: Network interruption during checkout

During a checkout flow, QA switches from WiFi to airplane mode right after tapping "Place Order." The app should detect the network failure, preserve the cart state, display a clear offline message, and allow the user to retry when connectivity is restored — without double-charging if the first request actually succeeded.

#### Case 3: Upgrade testing with data migration

QA installs version 2.5 of the app, creates a user account, adds items to a wishlist, and customizes preferences. After upgrading to version 3.0 (which changes the local database schema), QA verifies that the wishlist, preferences, and session are all preserved. Failed migrations that silently delete user data are a critical bug category.

### How to Apply This in Real QA Work

Mobile testing adds device, operating system, network, battery, permission, interruption, and app lifecycle risks. The same feature can behave differently across devices and contexts. A systematic approach with a prioritized device matrix, realistic test scenarios, and real device validation for critical flows is essential.

#### Practical Workflow

- Build a device matrix from analytics (most popular OS versions and devices in your user base), supported OS versions from your release notes, and high-risk hardware categories (budget Android, older iOS).
- Test core journeys across install, upgrade, permissions (grant and deny), backgrounding, rotation, connectivity changes, and push notifications.
- Use emulators for broad coverage during development and CI; use real devices for final confidence in hardware-specific behavior and performance.
- Pay special attention to offline handling, slow networks, battery saver mode, and app resume behavior — these are the scenarios most likely to produce bugs that passed all desktop and emulator tests.

#### Common Mistakes to Avoid

- Testing only on the latest flagship phone — many users are on budget devices with older OS versions and less RAM.
- Ignoring permission-denied flows — these are not edge cases; many users decline permissions when first asked.
- Forgetting upgrade testing — existing user data can break after a new release if the migration path was not tested.
- Testing only on WiFi in a development environment — real users experience varying network quality throughout the day.

### Interview Questions

**Q: What makes mobile testing different from web testing?**
Mobile testing introduces challenges unique to the platform: device and OS fragmentation (thousands of combinations), touch-based interaction requiring specific gesture testing, app lifecycle events (interruptions, backgrounding, rotation), hardware features (camera, GPS, biometrics), network variability, and permission models. The same feature must be tested across multiple contexts that don't exist in web testing.

**Q: What is a device matrix and how do you build one?**
A device matrix is a prioritized set of device and OS combinations used for testing. Build it using your analytics data (most popular devices and OS versions among your users), OS version coverage (latest + one previous major version), screen size variety (small, medium, large), and manufacturer diversity (Apple, Samsung, Pixel, budget Android). The goal is maximum coverage of real user conditions with a manageable device count.

**Q: What should you test when a user backgrounds and returns to the app?**
Test that all user-entered data is preserved, that the session is still valid (or correctly prompts for re-authentication after a timeout), that media resumes from the correct position, that no duplicate API calls were triggered, and that the UI reflects the current state (not stale data from before the background event).

**Q: How do you test a feature that requires camera permission?**
Test three states: (1) Permission granted — feature works correctly. (2) Permission denied — feature shows a helpful explanation and a way to open settings to grant permission. (3) Permission denied permanently (user selected "Never Ask Again") — app gracefully degrades, does not crash, and still provides a path to enable permission through settings.

**Q: When should you use a real device versus an emulator?**
Use emulators for development-time testing, CI pipelines, and broad coverage of different OS versions quickly and cheaply. Use real devices for final validation of hardware-dependent features (camera, GPS, biometrics, NFC), performance testing on real hardware, manufacturer-specific behavior, and critical pre-release testing where you need to be confident the app works in users' actual hands.

#### Practice Prompt

Create a small device matrix for a banking app with at least four devices, two OS versions per platform, and three network conditions to test.`,
};
