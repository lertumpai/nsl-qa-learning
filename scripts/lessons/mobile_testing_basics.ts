import type { LessonRow } from "../lesson-types";

export const mobileTestingBasicsLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Mobile Testing Basics",
  description: "Test iOS and Android apps across devices and OS versions",
  step_order: 12,
  duration_min: 12,
  content: `## Mobile Testing Basics

Mobile testing has unique challenges compared to web testing: device fragmentation, network variability, touch interactions, and OS diversity.

### Mobile Testing Challenges


**Structured reference**

- **Device Fragmentation**
  - Description: Thousands of device/OS combinations
  - Mitigation: Prioritize device matrix
- **Network Conditions**
  - Description: 3G/4G/5G/WiFi/Offline
  - Mitigation: Test on different network speeds
- **Screen Sizes**
  - Description: Multiple resolutions and densities
  - Mitigation: Test key breakpoints
- **OS Versions**
  - Description: iOS 16/17, Android 12/13/14
  - Mitigation: Cover latest 2-3 versions
- **Battery/Resource**
  - Description: Background processes affect performance
  - Mitigation: Test with low battery
- **Permissions**
  - Description: Camera, location, notifications
  - Mitigation: Test grant and deny flows


### Device Matrix Strategy

You can't test on every device. Prioritize by:

1. **Market share** — test the most popular devices first
2. **OS version coverage** — latest + one previous major version
3. **Screen size variety** — small, medium, large
4. **Manufacturer diversity** — iOS, Samsung, Google, others

Example device matrix for a global app:
\`\`\`
iOS:     iPhone 15 Pro (iOS 17), iPhone 12 (iOS 16)
Android: Samsung Galaxy S24 (Android 14), Pixel 7 (Android 13), Xiaomi 11 (Android 12)
\`\`\`

### Real Device vs Emulator/Simulator


**Structured reference**

- **Accuracy**
  - Real Device: Exact behavior
  - Emulator/Simulator: Near-accurate
- **Camera/GPS**
  - Real Device: Real sensors
  - Emulator/Simulator: Simulated
- **Battery/Temp**
  - Real Device: Real conditions
  - Emulator/Simulator: Not available
- **Speed**
  - Real Device: Slower to set up
  - Emulator/Simulator: Fast
- **Cost**
  - Real Device: High
  - Emulator/Simulator: Free


**Recommendation**: Use emulators for development and early testing; real devices for final validation.

### Mobile-Specific Test Cases

#### Gestures
- Tap, double-tap, long press
- Swipe left/right/up/down
- Pinch to zoom
- Drag and drop

#### Interruptions
- Incoming phone call during app use
- Push notification received
- App moved to background and returned
- Screen rotation mid-flow

#### Connectivity
- Switch from WiFi to cellular
- Lose connection and regain it
- Low signal / airplane mode

#### Installation & Upgrade
- Fresh install behavior
- Upgrade from previous version (data migration)
- Uninstall and reinstall (data cleared)

### Mobile Testing Tools


**Structured reference**

- **Appium**
  - Platform: iOS + Android
  - Use Case: Cross-platform automation
- **XCTest**
  - Platform: iOS only
  - Use Case: Native iOS automation
- **Espresso**
  - Platform: Android only
  - Use Case: Native Android automation
- **BrowserStack**
  - Platform: Both
  - Use Case: Real device cloud
- **Firebase Test Lab**
  - Platform: Both
  - Use Case: Google's device cloud


### Real-World Use Cases

#### Case 1: Permission denied flow

QA denies camera permission during profile photo upload and verifies the app explains how to continue or enable permission later.

#### Case 2: Network interruption

During checkout, QA switches from WiFi to cellular and then offline to verify retry, save state, and user messaging.

#### Case 3: Upgrade testing

QA installs the old app version, creates data, upgrades to the new version, and verifies that settings and sessions are preserved.

### How to Apply This in Real QA Work

Mobile testing adds device, operating system, network, battery, permission, interruption, and app lifecycle risks. The same feature can behave differently across devices and contexts.

#### Practical Workflow

- Build a device matrix from analytics, customer base, supported OS versions, and high-risk devices.
- Test core journeys across install, upgrade, permissions, backgrounding, rotation, connectivity changes, and push notifications.
- Use emulators for early breadth and real devices for final confidence in hardware-specific behavior.
- Pay attention to offline handling, slow networks, battery saver mode, and app resume behavior.

#### Common Mistakes to Avoid

- Testing only on the newest high-end phone.
- Ignoring permission-denied flows for camera, location, contacts, and notifications.
- Forgetting upgrade testing, where existing user data can break after a new release.

#### Practice Prompt

Create a small device matrix for a banking app with at least four devices and two network conditions.`,
};
