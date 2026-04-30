import type { QuizRow } from "../quiz-types";

export const playwrightForE2eTestingQuizzes: QuizRow[] = [
  {
    lesson_title: "Playwright for E2E Testing",
    question: "What makes Playwright unique compared to Cypress for cross-browser testing?",
    option_a: "Playwright only supports Chrome",
    option_b: "Playwright supports real Chromium, Firefox, AND WebKit (Safari)",
    option_c: "Playwright uses a different testing language",
    option_d: "Playwright doesn't support mobile testing",
    answer: "B",
    explanation: "Playwright supports all three major browser engines: Chromium (Chrome/Edge), Firefox, and WebKit (Safari) — real browsers, not just wrappers.",
  },
  {
    lesson_title: "Playwright for E2E Testing",
    question: "What is the Playwright Trace Viewer used for?",
    option_a: "Real-time test monitoring",
    option_b: "Debugging failed tests by viewing step-by-step screenshots and network activity",
    option_c: "Writing test code automatically",
    option_d: "Comparing screenshots pixel by pixel",
    answer: "B",
    explanation: "Trace Viewer shows a full execution trace of a test — every action with DOM snapshots, network requests, and console logs — making CI failures easy to debug.",
  },
  {
    lesson_title: "Playwright for E2E Testing",
    question: "What does 'npx playwright codegen' do?",
    option_a: "Generates a test report",
    option_b: "Records browser interactions and generates test code automatically",
    option_c: "Runs all tests in parallel",
    option_d: "Deploys the app to staging",
    answer: "B",
    explanation: "Codegen records your browser interactions (clicks, typing, navigation) and automatically generates Playwright test code — great for getting started quickly.",
  },
];
