# StudentSucceed — Onboarding Redesign

An interactive onboarding prototype for a platform that helps international students at US universities explore jobs in non-technical and creative fields.

View the live prototype: https://studentscd.vercel.app/

## Project Context

The technical assessment describes onboarding challenges within a SaaS platform but leaves the product domain, users, and onboarding requirements open to interpretation.

To ground my response in a concrete use case, I adapted StudentSucceed, a project I worked on around the time of my interview. I used the assessment’s conversion, accessibility, and engineering challenges to guide improvements to its onboarding experience.

The assessment’s 42% abandonment rate is a supplied scenario, not a measured result from StudentSucceed.

## Users and Stakeholders

The primary users are international students seeking non-technical or creative opportunities in the United States. Their needs include communicating their experience, identifying relevant roles, and understanding how work eligibility affects their search.

For the assessment, I considered the responsibilities of the Product Manager, Engineering Lead, QA Lead, and VP of Product alongside users’ needs.

## Design Objective

Help users establish a useful starting point without overwhelming them with questions or requiring them to enter information they have already provided.

The experience prioritizes:

- One clear task on each screen.
- Concise explanations for required information.
- Optional imports and secondary profile details.
- Editable, pre-populated fields.
- Clear validation and error recovery.
- Consistent access to Help and Accessibility tools.

## Onboarding Flow

### 1. Sign in

Users enter the portal through Google or phone sign-in options.

### 2. Identify their starting point

Users select one or more areas where they need support, such as finding relevant companies, positioning their portfolio, or preparing for interviews.

### 3. Import their background

Users can upload a resume, explore the LinkedIn connection, or add a portfolio or other relevant link. They can also continue with manual entry.

### 4. Review their details

Information extracted from a resume pre-populates editable fields. A subtle background tint identifies resume-filled fields without adding repeated source labels.

Users review their name, field, university, and experience. Additional profile information remains collapsed until needed.

### 5. Set role preferences

Users select relevant roles or add their own, then specify opportunity types, preferred locations, and work preferences.

This supports people whose interests span several creative or non-technical disciplines.

### 6. Provide work eligibility information

Users indicate whether the international-student questions apply to them.

International students receive relevant visa, sponsorship, and conditional OPT questions. Other users skip those questions.

### 7. Add optional context

Users may provide additional information, such as languages spoken, or skip this step.

### 8. Review and continue

A final summary lets users check and edit their answers before entering the dashboard.

## Validation and Accessibility

The prototype includes page-level error summaries and field-level validation messages. Errors explain what needs attention, preserve existing answers, and help users move to the affected field.

Accessibility considerations include:

- Visible labels and keyboard focus states.
- Keyboard navigation and focus return from dialogs.
- Error messages associated with their fields.
- Text-size, contrast, spacing, and reduced-motion preferences.
- Consistent Help and Accessibility controls.

These features demonstrate the intended interactions. Formal screen-reader testing and a complete accessibility audit remain necessary before a production release.

## Benchmarking and Design Process

I reviewed approximately eight onboarding and preference flows across career and SaaS products using Mobbin.

The benchmarking informed how I approached question sequencing, selection patterns, profile imports, progress indicators, and optional information. I adapted these patterns to StudentSucceed’s audience rather than reproducing another product’s flow.

## Tools and AI Collaboration

I used Figma to refine the visual direction and Codex to help implement the interactive prototype in HTML, CSS, and JavaScript.

I directed and iterated on the content hierarchy, layouts, field alignment, interactions, and accessibility behavior. I also reused components from an open design system to explore form and validation states within the time available.

The initial prototype was developed within a two-hour timebox, followed by further refinements.

## Scope and Limitations

The assessment focuses on onboarding, so I prioritized that experience over developing a complete job-search dashboard. The dashboard provides a destination for the flow and illustrative content for exploring the next step.

This is an interactive design prototype:

- Google and phone authentication are simulated.
- LinkedIn and portfolio imports use sample data.
- Uploaded resumes support local text extraction.
- People, companies, and opportunities are illustrative.
- No job application or outreach message is sent.

The separate design response document explains prioritization, engineering constraints, proposed success metrics, cross-functional communication, and the implementation and validation plan.
