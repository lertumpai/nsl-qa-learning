import { whatIsSoftwareTestingQuizzes } from "./what_is_software_testing";
import { softwareDevelopmentLifeCycleSdlcQuizzes } from "./software_development_life_cycle_sdlc";
import { softwareTestingLifeCycleStlcQuizzes } from "./software_testing_life_cycle_stlc";
import { typesOfTestingQuizzes } from "./types_of_testing";
import { writingYourFirstTestCaseQuizzes } from "./writing_your_first_test_case";
import { bugReportingFundamentalsQuizzes } from "./bug_reporting_fundamentals";
import { defectLifeCycleQuizzes } from "./defect_life_cycle";
import { testEnvironmentsAndConfigurationsQuizzes } from "./test_environments_and_configurations";
import { exploratoryTestingQuizzes } from "./exploratory_testing";
import { introductionToApiTestingQuizzes } from "./introduction_to_api_testing";
import { testPlanningAndTestStrategyQuizzes } from "./test_planning_and_test_strategy";
import { requirementsAnalysisAndTraceabilityMatrixQuizzes } from "./requirements_analysis_and_traceability_matrix";
import { equivalencePartitioningQuizzes } from "./equivalence_partitioning";
import { boundaryValueAnalysisQuizzes } from "./boundary_value_analysis";
import { agileTestingAndScrumQuizzes } from "./agile_testing_and_scrum";
import { testAutomationStrategyQuizzes } from "./test_automation_strategy";
import { seleniumWebdriverQuizzes } from "./selenium_webdriver";
import { cypressIoModernTestingQuizzes } from "./cypress_io_modern_testing";
import { playwrightForE2eTestingQuizzes } from "./playwright_for_e2e_testing";
import { ciCdPipelineIntegrationQuizzes } from "./ci_cd_pipeline_integration";
import { performanceTestingWithK6Quizzes } from "./performance_testing_with_k6";
import { securityTestingAndOwaspTop10Quizzes } from "./security_testing_and_owasp_top_10";
import { bddWithCucumberAndGherkinQuizzes } from "./bdd_with_cucumber_and_gherkin";
import { qaLeadershipAndTestManagementQuizzes } from "./qa_leadership_and_test_management";
import { fullJavascriptForQaAutomationQuizzes } from "./full_javascript_for_qa_automation";
import type { QuizRow } from "../quiz-types";

export const quizzes: QuizRow[] = [
  ...whatIsSoftwareTestingQuizzes,
  ...softwareDevelopmentLifeCycleSdlcQuizzes,
  ...softwareTestingLifeCycleStlcQuizzes,
  ...typesOfTestingQuizzes,
  ...writingYourFirstTestCaseQuizzes,
  ...bugReportingFundamentalsQuizzes,
  ...defectLifeCycleQuizzes,
  ...testEnvironmentsAndConfigurationsQuizzes,
  ...exploratoryTestingQuizzes,
  ...introductionToApiTestingQuizzes,
  ...testPlanningAndTestStrategyQuizzes,
  ...requirementsAnalysisAndTraceabilityMatrixQuizzes,
  ...equivalencePartitioningQuizzes,
  ...boundaryValueAnalysisQuizzes,
  ...agileTestingAndScrumQuizzes,
  ...testAutomationStrategyQuizzes,
  ...seleniumWebdriverQuizzes,
  ...cypressIoModernTestingQuizzes,
  ...playwrightForE2eTestingQuizzes,
  ...ciCdPipelineIntegrationQuizzes,
  ...performanceTestingWithK6Quizzes,
  ...securityTestingAndOwaspTop10Quizzes,
  ...bddWithCucumberAndGherkinQuizzes,
  ...qaLeadershipAndTestManagementQuizzes,
  ...fullJavascriptForQaAutomationQuizzes,
];
