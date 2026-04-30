import type { LessonRow } from "../lesson-types";

export const whatIsSoftwareTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "What is Software Testing?",
  description: "Understand the purpose and goals of software testing",
  step_order: 1,
  duration_min: 8,
  content: `## What is Software Testing?

Software testing is the process of **evaluating and verifying** that a software product or application does what it is supposed to do. The goal is to identify any gaps, errors, or missing requirements in contrast to the actual requirements.

### Why Testing Matters

Testing is not just about finding bugs — it's about ensuring **quality**. A high-quality product:

- Meets functional requirements
- Performs reliably under expected conditions
- Is secure and free from critical vulnerabilities
- Provides a good user experience

### Key Definitions

| Term | Definition |
|------|-----------|
| **Bug / Defect** | A flaw in the software that causes it to behave unexpectedly |
| **Error** | A human mistake that introduces a bug |
| **Failure** | Observable incorrect behavior in the running software |
| **Quality** | The degree to which software meets requirements and user expectations |

### The Cost of Bugs

The earlier a bug is found, the cheaper it is to fix:

- Found during **requirements**: 1x cost
- Found during **development**: 10x cost
- Found in **production**: 100x cost

This is the core reason QA engineers are involved early in the development lifecycle.

### Testing vs Debugging

**Testing** finds that a problem exists. **Debugging** identifies the exact cause and fixes it. These are separate activities often done by different people.

### What Good Testers Do

1. Understand requirements deeply
2. Think like the end user
3. Challenge assumptions
4. Communicate findings clearly
5. Advocate for quality throughout the project`,
};
