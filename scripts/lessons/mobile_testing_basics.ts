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

| Challenge | Description | Mitigation |
|-----------|-------------|-----------|
| **Device Fragmentation** | Thousands of device/OS combinations | Prioritize device matrix |
| **Network Conditions** | 3G/4G/5G/WiFi/Offline | Test on different network speeds |
| **Screen Sizes** | Multiple resolutions and densities | Test key breakpoints |
| **OS Versions** | iOS 16/17, Android 12/13/14 | Cover latest 2-3 versions |
| **Battery/Resource** | Background processes affect performance | Test with low battery |
| **Permissions** | Camera, location, notifications | Test grant and deny flows |

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

| | Real Device | Emulator/Simulator |
|--|-------------|-------------------|
| Accuracy | Exact behavior | Near-accurate |
| Camera/GPS | Real sensors | Simulated |
| Battery/Temp | Real conditions | Not available |
| Speed | Slower to set up | Fast |
| Cost | High | Free |

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

| Tool | Platform | Use Case |
|------|----------|---------|
| **Appium** | iOS + Android | Cross-platform automation |
| **XCTest** | iOS only | Native iOS automation |
| **Espresso** | Android only | Native Android automation |
| **BrowserStack** | Both | Real device cloud |
| **Firebase Test Lab** | Both | Google's device cloud |`,
};
