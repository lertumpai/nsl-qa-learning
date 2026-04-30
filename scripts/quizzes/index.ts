import { whatIsSoftwareTestingQuizzes } from "./beginner/01_what_is_software_testing";
import { softwareDevelopmentLifeCycleSdlcQuizzes } from "./beginner/02_software_development_life_cycle_sdlc";
import { softwareTestingLifeCycleStlcQuizzes } from "./beginner/03_software_testing_life_cycle_stlc";
import { typesOfTestingQuizzes } from "./beginner/04_types_of_testing";
import { writingYourFirstTestCaseQuizzes } from "./beginner/05_writing_your_first_test_case";
import { bugReportingFundamentalsQuizzes } from "./beginner/06_bug_reporting_fundamentals";
import { defectLifeCycleQuizzes } from "./beginner/07_defect_life_cycle";
import { testEnvironmentsAndConfigurationsQuizzes } from "./beginner/08_test_environments_and_configurations";
import { exploratoryTestingQuizzes } from "./beginner/09_exploratory_testing";
import { introductionToApiTestingQuizzes } from "./beginner/10_introduction_to_api_testing";
import { beginnerSupplementQuizzes } from "./beginner/supplement";
import { testPlanningAndTestStrategyQuizzes } from "./intermediate/01_test_planning_and_test_strategy";
import { requirementsAnalysisAndTraceabilityMatrixQuizzes } from "./intermediate/02_requirements_analysis_and_traceability_matrix";
import { equivalencePartitioningQuizzes } from "./intermediate/03_equivalence_partitioning";
import { boundaryValueAnalysisQuizzes } from "./intermediate/04_boundary_value_analysis";
import { decisionTableAndStateTransitionTestingQuizzes } from "./intermediate/05_decision_table_and_state_transition_testing";
import { smokeSanityAndRegressionTestingQuizzes } from "./intermediate/06_smoke_sanity_and_regression_testing";
import { jsLevel1FundamentalQuizzes } from "./intermediate/07_js_level_1_fundamental";
import { jsLevel2BasicSyntaxQuizzes } from "./intermediate/08_js_level_2_basic_syntax";
import { jsLevel3AdvancedQaUseCasesQuizzes } from "./intermediate/09_js_level_3_advanced_qa_use_cases";
import { apiTestingWithPostmanQuizzes } from "./intermediate/10_api_testing_with_postman";
import { sqlLevel1FundamentalQuizzes } from "./intermediate/11_sql_level_1_fundamental";
import { sqlLevel2BasicSyntaxQuizzes } from "./intermediate/12_sql_level_2_basic_syntax";
import { sqlLevel3AdvancedQaUseCasesQuizzes } from "./intermediate/13_sql_level_3_advanced_qa_use_cases";
import { performanceTestingConceptsQuizzes } from "./intermediate/14_performance_testing_concepts";
import { agileTestingAndScrumQuizzes } from "./intermediate/15_agile_testing_and_scrum";
import { testMetricsAndReportingQuizzes } from "./intermediate/16_test_metrics_and_reporting";
import { intermediateSupplementQuizzes } from "./intermediate/supplement";
import { testAutomationStrategyQuizzes } from "./advanced/01_test_automation_strategy";
import { seleniumWebdriverQuizzes } from "./advanced/02_selenium_webdriver";
import { cypressIoModernTestingQuizzes } from "./advanced/03_cypress_io_modern_testing";
import { playwrightForE2eTestingQuizzes } from "./advanced/04_playwright_for_e2e_testing";
import { apiAutomationAndContractTestingQuizzes } from "./advanced/05_api_automation_and_contract_testing";
import { ciCdPipelineIntegrationQuizzes } from "./advanced/06_ci_cd_pipeline_integration";
import { performanceTestingWithK6Quizzes } from "./advanced/07_performance_testing_with_k6";
import { securityTestingAndOwaspTop10Quizzes } from "./advanced/08_security_testing_and_owasp_top_10";
import { bddWithCucumberAndGherkinQuizzes } from "./advanced/09_bdd_with_cucumber_and_gherkin";
import { testDataManagementQuizzes } from "./advanced/10_test_data_management";
import { chaosEngineeringAndProductionTestingQuizzes } from "./advanced/11_chaos_engineering_and_production_testing";
import { qaLeadershipAndTestManagementQuizzes } from "./advanced/12_qa_leadership_and_test_management";
import { advancedSupplementQuizzes } from "./advanced/supplement";
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
  ...beginnerSupplementQuizzes,
  ...testPlanningAndTestStrategyQuizzes,
  ...requirementsAnalysisAndTraceabilityMatrixQuizzes,
  ...equivalencePartitioningQuizzes,
  ...boundaryValueAnalysisQuizzes,
  ...decisionTableAndStateTransitionTestingQuizzes,
  ...smokeSanityAndRegressionTestingQuizzes,
  ...jsLevel1FundamentalQuizzes,
  ...jsLevel2BasicSyntaxQuizzes,
  ...jsLevel3AdvancedQaUseCasesQuizzes,
  ...apiTestingWithPostmanQuizzes,
  ...sqlLevel1FundamentalQuizzes,
  ...sqlLevel2BasicSyntaxQuizzes,
  ...sqlLevel3AdvancedQaUseCasesQuizzes,
  ...performanceTestingConceptsQuizzes,
  ...agileTestingAndScrumQuizzes,
  ...testMetricsAndReportingQuizzes,
  ...intermediateSupplementQuizzes,
  ...testAutomationStrategyQuizzes,
  ...seleniumWebdriverQuizzes,
  ...cypressIoModernTestingQuizzes,
  ...playwrightForE2eTestingQuizzes,
  ...apiAutomationAndContractTestingQuizzes,
  ...ciCdPipelineIntegrationQuizzes,
  ...performanceTestingWithK6Quizzes,
  ...securityTestingAndOwaspTop10Quizzes,
  ...bddWithCucumberAndGherkinQuizzes,
  ...testDataManagementQuizzes,
  ...chaosEngineeringAndProductionTestingQuizzes,
  ...qaLeadershipAndTestManagementQuizzes,
  ...advancedSupplementQuizzes,
];
