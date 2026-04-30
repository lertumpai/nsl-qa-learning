import { whatIsSoftwareTestingLesson } from "./beginner/01_what_is_software_testing";
import { softwareDevelopmentLifeCycleSdlcLesson } from "./beginner/02_software_development_life_cycle_sdlc";
import { softwareTestingLifeCycleStlcLesson } from "./beginner/03_software_testing_life_cycle_stlc";
import { typesOfTestingLesson } from "./beginner/04_types_of_testing";
import { writingYourFirstTestCaseLesson } from "./beginner/05_writing_your_first_test_case";
import { bugReportingFundamentalsLesson } from "./beginner/06_bug_reporting_fundamentals";
import { defectLifeCycleLesson } from "./beginner/07_defect_life_cycle";
import { testEnvironmentsAndConfigurationsLesson } from "./beginner/08_test_environments_and_configurations";
import { exploratoryTestingLesson } from "./beginner/09_exploratory_testing";
import { introductionToApiTestingLesson } from "./beginner/10_introduction_to_api_testing";
import { testPlanningAndTestStrategyLesson } from "./intermediate/01_test_planning_and_test_strategy";
import { requirementsAnalysisAndTraceabilityMatrixLesson } from "./intermediate/02_requirements_analysis_and_traceability_matrix";
import { equivalencePartitioningLesson } from "./intermediate/03_equivalence_partitioning";
import { boundaryValueAnalysisLesson } from "./intermediate/04_boundary_value_analysis";
import { decisionTableAndStateTransitionTestingLesson } from "./intermediate/05_decision_table_and_state_transition_testing";
import { smokeSanityAndRegressionTestingLesson } from "./intermediate/06_smoke_sanity_and_regression_testing";
import { fullJavascriptForQaAutomationLesson } from "./intermediate/07_full_javascript_for_qa_automation";
import { apiTestingWithPostmanLesson } from "./intermediate/08_api_testing_with_postman";
import { sqlLevel1FundamentalLesson } from "./intermediate/09_sql_level_1_fundamental";
import { sqlLevel2BasicSyntaxLesson } from "./intermediate/10_sql_level_2_basic_syntax";
import { sqlLevel3AdvancedQaUseCasesLesson } from "./intermediate/11_sql_level_3_advanced_qa_use_cases";
import { performanceTestingConceptsLesson } from "./intermediate/12_performance_testing_concepts";
import { agileTestingAndScrumLesson } from "./intermediate/13_agile_testing_and_scrum";
import { testMetricsAndReportingLesson } from "./intermediate/14_test_metrics_and_reporting";
import { mobileTestingBasicsLesson } from "./intermediate/15_mobile_testing_basics";
import { testAutomationStrategyLesson } from "./advanced/01_test_automation_strategy";
import { seleniumWebdriverLesson } from "./advanced/02_selenium_webdriver";
import { cypressIoModernTestingLesson } from "./advanced/03_cypress_io_modern_testing";
import { playwrightForE2eTestingLesson } from "./advanced/04_playwright_for_e2e_testing";
import { apiAutomationAndContractTestingLesson } from "./advanced/05_api_automation_and_contract_testing";
import { ciCdPipelineIntegrationLesson } from "./advanced/06_ci_cd_pipeline_integration";
import { performanceTestingWithK6Lesson } from "./advanced/07_performance_testing_with_k6";
import { securityTestingAndOwaspTop10Lesson } from "./advanced/08_security_testing_and_owasp_top_10";
import { bddWithCucumberAndGherkinLesson } from "./advanced/09_bdd_with_cucumber_and_gherkin";
import { testDataManagementLesson } from "./advanced/10_test_data_management";
import { chaosEngineeringAndProductionTestingLesson } from "./advanced/11_chaos_engineering_and_production_testing";
import { qaLeadershipAndTestManagementLesson } from "./advanced/12_qa_leadership_and_test_management";
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
  fullJavascriptForQaAutomationLesson,
  apiTestingWithPostmanLesson,
  sqlLevel1FundamentalLesson,
  sqlLevel2BasicSyntaxLesson,
  sqlLevel3AdvancedQaUseCasesLesson,
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
];
