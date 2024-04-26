export interface Message {
  type: MessageType;
  payload?: any;
}
export interface GetDetailsResponse {
  repoName: string;
  repoOwner: string;
  repo: Repo;
  issues: GroupedIssue[];
}
export interface DetailsMessage extends Message {
  type: MessageType.GET_DETAILS;
  payload: {
    repoName: string;
    repoOwner: string;
  };
}
export interface NavigateMessage extends Message {
  type: MessageType.NAVIGATE;
  payload: {
    repoName: string;
    repoOwner: string;
  };
}
export interface GetDetailsResponseMessage extends Message {
  type: MessageType.GET_DETAILS_RESPONSE;
  payload: GetDetailsResponse | undefined;
}
export interface NotLoggedInMessage extends Message {
  type: MessageType.NOT_LOGGED_IN;
}

export enum MessageType {
  GET_DETAILS = 'GET_DETAILS',
  GET_DETAILS_RESPONSE = "GET_DETAILS_RESPONSE",
  NAVIGATE = 'NAVIGATE',
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
}
export interface Repo extends ListIntegrationRepo {
  group_id: number;
}
export interface ListIntegrationRepo {
  active: number; // boolean-ish
  domain_name: any | null; // TODO
  externally_archived: number; // boolean-ish
  has_faulty_lockfile: number; // boolean-ish
  has_missing_lockfile: number; // boolean-ish
  id: number;
  ignored_issues: number;
  internet_exposed: any | null; // TODO
  issue_high_severity_sum: any | null; // TODO
  last_scanned_at: number; // timestamp
  max_issue_severity: number;
  open_issues: number;
  repo_path: string;
  programming_languages: string[];
  scm_org_base_url: string;
  scm_repo_description: string;
  scm_repo_name: string;
  scm_repo_owner_name: string;
  scm_repo_uid: string;
  scm_repo_url: string;
  scm_type: string;
  sensitivity: any | null; // TODO
}
export interface ListIntegrationReposResponse {
  integration_repos: Repo[];
}

export interface Group {
  avatar: string;
  date_created: number; // timestamp
  id: number;
  name: string;
  scm_org_id: string;
  scm_type: string;
  user_id: number;
}
export interface ListAllAccessibleGroupsResponse {
  accessible_groups: Group[];
}

export interface AikidoScoreReason {
  rule: string;
  rule_title: string;
  rule_info: string;
}
export interface Issue {
  id: number,
  type: string,
  status: string,
  enhanced_status: string,
  timestamp: number,
  cloud_id: number,
  domain_id: number,
  attack_surface: string,
  aikido_priority: number,
  initial_priority: number,
  aikido_score_reasons: AikidoScoreReason[],
  ignored_reason: string,
  description: string,
  first_detected_at: number,
  introduced_at: number,
  rule_id: string,
  commit: string,
  file: string,
  file_breakable: string,
  matched_line: string,
  redacted_secret: string,
  author: string,
  entropy: number,
  start_line: number,
  end_line: number,
  start_column: number,
  end_column: number,
  ignore_reasons: any[], // TODO
  closed_timestamp: number,
  ignored_at: number | null,
  user_severity_adjusted: number,
  user_severity_adjustment: any | null, // TODO
  sla_remediate_by_date: number,
  scm_repo_name: string,
  scm_repo_id: number,
  scm_repo_owner_name: string,
  repo_name: string,
  repo_id: number,
  repo_owner_name: string,
}
export interface GroupedIssue {
  id: number,
  package_name: string,
  timestamp: number,
  closed_timestamp: number,
  initial_priority: number,
  status: string,
  type: string,
  task_id: any | null, // TODO
  tasks: any[], // TODO
  issues: Issue[],
  aikido_priority: number,
  time_to_fix: number,
  enhanced_status: string,
}
export interface ListGroupedIssuesResponse {
  fuzzy_search_used: boolean;
  grouped_issues: GroupedIssue[];
}
