> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Good vs. Bad Instructions

> What works and what doesn't

<Note>Make sure to read [When to Use Devin](/essential-guidelines/when-to-use-devin) and [Instructing Devin Effectively](/essential-guidelines/instructing-devin-effectively) for more essential tips.</Note>

<CardGroup cols={1}>
  <Card title="Adding a New API Endpoint" icon="server">
    **Good Approach**

    <Check>
      "Create a new endpoint `/users/stats` that returns a JSON object with user count and average signup age. Use our existing users table in PostgreSQL. You can reference the `/orders/stats` endpoint in `statsController.js` for how we structure responses. Ensure the new endpoint is covered by the `StatsController.test.js` suite."
    </Check>

    **Why This Works:**

    * Clearly specifies the route and expected response format
    * References existing code as a template
    * Defines data source (users table)
    * Includes test coverage requirements

    <br />

    ***

    <br />

    **Bad Approach**

    <Warning>
      "Add a user stats endpoint."
    </Warning>

    **Why This Fails:**

    * Unspecific about what stats to include
    * No mention of data sources
    * No reference to existing patterns
    * Missing test requirements
  </Card>

  <Card title="Frontend Feature for Displaying Data" icon="window">
    **Good Approach**

    <Check>
      "In `UserProfileComponent`, add a dropdown that shows a list of user roles (admin, editor, viewer). Use the styling from `DropdownBase`. When a role is selected, call the existing API to set the user role. Validate by checking that the selection updates the user role in the DB. Refer to your Knowledge for how to test properly."
    </Check>

    **Why This Works:**

    * Names specific components
    * Lists exact roles to include
    * References existing styling component
    * Defines the user interaction flow
    * Includes validation steps

    <br />

    ***

    <br />

    **Bad Approach**

    <Warning>
      "Make the user profile page more user-friendly. Add some way for them to change roles and confirm it's working."
    </Warning>

    **Why This Fails:**

    * "User-friendly" is subjective
    * No specific UI components mentioned
    * Unclear user interaction flow
    * Vague validation criteria
  </Card>
</CardGroup>

## More Examples

### Good

<CardGroup cols={1}>
  <Card title="Writing Unit Tests" icon="vial">
    <Check>
      "Add Jest tests for the AuthService methods: login and logout. Ensure test coverage for these two functions is at least 80%. Use `UserService.test.js` as an example. After implementation, run `npm test -- --coverage` and verify the coverage report shows >80% for both functions. Also confirm that tests pass with both valid and invalid credentials, and that logout properly clears session data."
    </Check>

    **Why Good?** Clear success metric (80% coverage), references to guide Devin (`UserService.test.js`), and a well-defined scope with specific verification steps.
  </Card>

  <Card title="Migrating or Refactoring Existing Code" icon="code-branch">
    <Check>
      "Migrate `logger.js` from JavaScript to TypeScript. We already have a `tsconfig.json` and a `LoggerTest.test.js` suite for validation. Make sure it compiles without errors and make sure not to change the existing config! After migration, verify by: 1) running `tsc` to confirm no type errors, 2) running the test suite with `npm test LoggerTest.test.js` to ensure all tests pass, and 3) checking that all existing logger method calls throughout the codebase still work without type errors."
    </Check>

    **Why Good?** There's a clear template (`tsconfig.json`) and test suite for immediate feedback, plus specific compilation and validation steps.
  </Card>

  <Card title="Updating APIs or Database Queries" icon="database">
    <Check>
      "We're switching from pg to sequelize (read [https://sequelize.org/api/v6/identifiers](https://sequelize.org/api/v6/identifiers)). Please update the UserModel queries to use Sequelize methods. Refer to `OrderModel` for how we do it in this codebase. After implementation, verify by: 1) running `npm run test:integration UserModel.test.js` to check all integration tests pass, 2) confirming query performance hasn't degraded by checking execution time on a test dataset of 1000 users, and 3) validating that all CRUD operations still maintain data integrity by running `npm run test:e2e user-flows.test.js`."
    </Check>

    **Why Good?** Devin can mimic a known pattern and there are explicit references (`OrderModel.js`). Provides a link to docs so Devin knows to reference them, and includes specific performance and functionality verification steps with exact test commands.
  </Card>

  <Card title="Implementing a Feature from a Design" icon="paintbrush">
    <Check>
      "Implement the pricing page from this Figma file: [https://figma.com/file/abc123/Pricing-Page](https://figma.com/file/abc123/Pricing-Page). Focus on the 'Pricing Section' frame. Use our Tailwind config in tailwind.config.ts for colors and spacing. Reuse the existing Card and Button components from src/components/ui/. After implementing, spin up the dev server and take screenshots at desktop (1440px) and mobile (375px) widths. Do not open a PR until it matches the design."
    </Check>

    **Why Good?** Links the specific Figma file, names the exact frame, references the project's design system and existing components, and tells Devin to visually verify its work before opening a PR. With the [Figma MCP](/work-with-devin/mcp) connected, Devin can read design tokens directly from the file.
  </Card>

  <Card title="Investigating a Production Bug" icon="bug">
    <Check>
      "Users are reporting 500 errors on the checkout page. Use the Sentry MCP to pull the latest stack traces for the payments-api project. Check the database for any related data issues. Find the root cause, fix it, and add a regression test. Link the Sentry issue in the PR description."
    </Check>

    **Why Good?** Points Devin to the right tools ([MCP integrations](/work-with-devin/mcp)), gives a clear investigation path, and defines the expected deliverable (fix + regression test + PR).
  </Card>
</CardGroup>

### Bad

<CardGroup cols={1}>
  <Card title="Open-Ended Code Review" icon="magnifying-glass">
    <Warning>
      "Find issues with our codebase and fix them"
    </Warning>

    **Why Bad?** The request is too vague and open-ended. There are no success criteria and no way for Devin to know when it's done.

    **Instead:** Use [Devin Review](/work-with-devin/devin-review) for automated code review on specific PRs, or give Devin a targeted task like "Find and fix all uses of the deprecated `oldLogger` API in `src/services/`."
  </Card>

  <Card title="Purely Subjective Visual Requests" icon="palette">
    <Warning>
      "Make the landing page look better"
    </Warning>

    **Why Bad?** "Better" is subjective and Devin has no criteria to aim for. Devin can build functional UIs and implement designs from specs, but it can't make aesthetic judgment calls on its own.

    **Instead:** Provide a Figma design, a reference site, or specific changes: "Increase the hero section font size to 48px, add 32px padding, and use the `indigo-500` color from our Tailwind config."
  </Card>

  <Card title="Highly Complex, Vague Projects" icon="sitemap">
    <Warning>
      "Build a new microservices architecture for our app."
    </Warning>

    **Why Bad?** This is a very large and unstructured task. It requires many architectural decisions, trade-offs, and context that isn't in the prompt.

    **Instead, break it down:**

    1. Use [Ask Devin](/work-with-devin/ask-devin) to investigate your codebase and map dependencies
    2. Ask Devin to propose specific architectures with trade-offs
    3. Create separate sessions for implementing each service — run them in parallel with [managed Devins](/work-with-devin/advanced-capabilities#managed-devins)
  </Card>
</CardGroup>
