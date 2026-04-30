import { whatIsSoftwareTestingLesson } from "./beginner/what_is_software_testing";
import { softwareDevelopmentLifeCycleSdlcLesson } from "./beginner/software_development_life_cycle_sdlc";
import { softwareTestingLifeCycleStlcLesson } from "./beginner/software_testing_life_cycle_stlc";
import { typesOfTestingLesson } from "./beginner/types_of_testing";
import { writingYourFirstTestCaseLesson } from "./beginner/writing_your_first_test_case";
import { bugReportingFundamentalsLesson } from "./beginner/bug_reporting_fundamentals";
import { defectLifeCycleLesson } from "./beginner/defect_life_cycle";
import { testEnvironmentsAndConfigurationsLesson } from "./beginner/test_environments_and_configurations";
import { exploratoryTestingLesson } from "./beginner/exploratory_testing";
import { introductionToApiTestingLesson } from "./beginner/introduction_to_api_testing";
import { testPlanningAndTestStrategyLesson } from "./intermediate/test_planning_and_test_strategy";
import { requirementsAnalysisAndTraceabilityMatrixLesson } from "./intermediate/requirements_analysis_and_traceability_matrix";
import { equivalencePartitioningLesson } from "./intermediate/equivalence_partitioning";
import { boundaryValueAnalysisLesson } from "./intermediate/boundary_value_analysis";
import { decisionTableAndStateTransitionTestingLesson } from "./intermediate/decision_table_and_state_transition_testing";
import { smokeSanityAndRegressionTestingLesson } from "./intermediate/smoke_sanity_and_regression_testing";
import { apiTestingWithPostmanLesson } from "./intermediate/api_testing_with_postman";
import { databaseTestingLesson } from "./intermediate/database_testing";
import { performanceTestingConceptsLesson } from "./intermediate/performance_testing_concepts";
import { agileTestingAndScrumLesson } from "./intermediate/agile_testing_and_scrum";
import { testMetricsAndReportingLesson } from "./intermediate/test_metrics_and_reporting";
import { mobileTestingBasicsLesson } from "./intermediate/mobile_testing_basics";
import { testAutomationStrategyLesson } from "./advanced/test_automation_strategy";
import { seleniumWebdriverLesson } from "./advanced/selenium_webdriver";
import { cypressIoModernTestingLesson } from "./advanced/cypress_io_modern_testing";
import { playwrightForE2eTestingLesson } from "./advanced/playwright_for_e2e_testing";
import { apiAutomationAndContractTestingLesson } from "./advanced/api_automation_and_contract_testing";
import { ciCdPipelineIntegrationLesson } from "./advanced/ci_cd_pipeline_integration";
import { performanceTestingWithK6Lesson } from "./advanced/performance_testing_with_k6";
import { securityTestingAndOwaspTop10Lesson } from "./advanced/security_testing_and_owasp_top_10";
import { bddWithCucumberAndGherkinLesson } from "./advanced/bdd_with_cucumber_and_gherkin";
import { testDataManagementLesson } from "./advanced/test_data_management";
import { chaosEngineeringAndProductionTestingLesson } from "./advanced/chaos_engineering_and_production_testing";
import { qaLeadershipAndTestManagementLesson } from "./advanced/qa_leadership_and_test_management";
import { fullJavascriptForQaAutomationLesson } from "./intermediate/full_javascript_for_qa_automation";
import type { LessonRow } from "../lesson-types";

export const lessons: LessonRow[] = [
  whatIsSoftwareTestingLesson,
  softwareDevelopmentLifeCycleSdlcLesson,
  softwareTestingLifeCycleStlcLesson,
  typesOfTestingLesson,
  writingYourFirstTestCaseLesson,
  bugReportingFundamentalsLesson,
  defectLifeCycleLesson,
  testEnvironmentsAndConfigurationsLesson,
  exploratoryTestingLesson,
  introductionToApiTestingLesson,
  testPlanningAndTestStrategyLesson,
  requirementsAnalysisAndTraceabilityMatrixLesson,
  equivalencePartitioningLesson,
  boundaryValueAnalysisLesson,
  decisionTableAndStateTransitionTestingLesson,
  smokeSanityAndRegressionTestingLesson,
  apiTestingWithPostmanLesson,
  databaseTestingLesson,
  performanceTestingConceptsLesson,
  agileTestingAndScrumLesson,
  testMetricsAndReportingLesson,
  mobileTestingBasicsLesson,
  testAutomationStrategyLesson,
  seleniumWebdriverLesson,
  cypressIoModernTestingLesson,
  playwrightForE2eTestingLesson,
  apiAutomationAndContractTestingLesson,
  ciCdPipelineIntegrationLesson,
  performanceTestingWithK6Lesson,
  securityTestingAndOwaspTop10Lesson,
  bddWithCucumberAndGherkinLesson,
  testDataManagementLesson,
  chaosEngineeringAndProductionTestingLesson,
  qaLeadershipAndTestManagementLesson,
  fullJavascriptForQaAutomationLesson,
];
