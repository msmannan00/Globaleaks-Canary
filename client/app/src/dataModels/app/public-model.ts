export interface Root {
    node: Node
    questionnaires: Questionnaire[]
    submission_statuses: Status[]
    receivers: any[]
    contexts: Context[]
}

export interface Node {
    adminonly: boolean
    custom_support_url: string
    default_language: string
    default_questionnaire: string
    description: string
    disable_privacy_badge: boolean
    disable_submissions: boolean
    enable_custom_privacy_badge: boolean
    enable_scoring_system: boolean
    enable_signup: boolean
    hostname: string
    https_whistleblower: boolean
    maximum_filesize: number
    mode: string
    name: string
    onionservice: string
    rootdomain: string
    show_contexts_in_alphabetical_order: boolean
    signup_tos1_enable: boolean
    signup_tos2_enable: boolean
    simplified_login: boolean
    subdomain: string
    wizard_done: boolean
    contexts_clarification: string
    custom_privacy_badge_text: string
    disclaimer_text: string
    footer: string
    header_title_homepage: string
    presentation: string
    signup_tos1_checkbox_label: string
    signup_tos1_text: string
    signup_tos1_title: string
    signup_tos2_checkbox_label: string
    signup_tos2_text: string
    signup_tos2_title: string
    whistleblowing_button: string
    whistleblowing_question: string
    root_tenant: boolean
    languages_enabled: number[]
    languages_supported: LanguagesSupported[]
    script: boolean
    css: any
    favicon: any
    logo: any
}

export interface LanguagesSupported {
    code: string
    name: string
    native: string
}

export interface Questionnaire {
    id: string
    editable: boolean
    name: string
    steps: Step[]
}

export interface Step {
    id: string
    questionnaire_id: string
    order: number
    triggered_by_score: number
    triggered_by_options: any[]
    children: Children[]
    label: string
    description: string
}

export interface Children {
    id: string
    instance: string
    editable: boolean
    type: string
    template_id: string
    template_override_id: string
    step_id: string
    fieldgroup_id: string
    multi_entry: boolean
    required: boolean
    preview: boolean
    attrs: Attrs
    x: number
    y: number
    width: number
    triggered_by_score: number
    triggered_by_options: TriggeredByOption[]
    options: Option[]
    children: any[]
    label: string
    description: string
    hint: string
    placeholder: string
}

export interface Attrs {
    input_validation?: InputValidation
    max_len?: MaxLen
    min_len?: MinLen
    regexp?: Regexp
    display_alphabetically?: DisplayAlphabetically
}

export interface InputValidation {
    name: string
    type: string
    value: string
}

export interface MaxLen {
    name: string
    type: string
    value: string
}

export interface MinLen {
    name: string
    type: string
    value: string
}

export interface Regexp {
    name: string
    type: string
    value: string
}

export interface DisplayAlphabetically {
    name: string
    type: string
    value: boolean
}

export interface TriggeredByOption {
    field: string
    option: string
    sufficient: boolean
}

export interface Option {
    id: string
    order: number
    block_submission: boolean
    score_points: number
    score_type: string
    trigger_receiver: any[]
    hint1: string
    hint2: string
    label: string
}

export interface Status {
    id: string
    order: number
    substatuses: any[]
    label: string
}

export interface Error {
  message: string,
  code: number,
  arguments: []
}

export interface Context {
    id: string
    hidden: boolean
    order: number
    tip_timetolive: number
    select_all_receivers: boolean
    maximum_selectable_receivers: number
    show_recipients_details: boolean
    allow_recipients_selection: boolean
    enable_comments: boolean
    enable_messages: boolean
    enable_two_way_comments: boolean
    enable_two_way_messages: boolean
    enable_attachments: boolean
    score_threshold_medium: number
    score_threshold_high: number
    show_receivers_in_alphabetical_order: boolean
    show_steps_navigation_interface: boolean
    questionnaire_id: string
    additional_questionnaire_id: string
    receivers: any[]
    picture: boolean
    name: string
    description: string
}
