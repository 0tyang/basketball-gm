These are various third-party libraries used in Basketball GM. They are all
standard, except jQuery UI is a custom download including only "sortable"
support as the rest isn't used.

I'm using bootstrap-dropdown.js 2.0.2 because 2.1.0+ interferes with Davis.js
handling normal links in the play menu. See
https://github.com/olivernn/davis.js/issues/61

raphael.js has this very minor patch applied to make it play nice with
Require.js: https://github.com/robcolburn/raphael/commit/e81cbaa03898f4da6e705e7a9f6947cccb8e27e7