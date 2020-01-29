# ESLint Config – Frontend

This linter config builds on top of our core ruleset, and is intended
for consumption in our legacy Ember app as well as new React development.

Our linter config is pretty AirBNB-centric with some layers on top. Rationale
for deviations or inclusions is documented on each rule. You can read more
about their reasoning for certain rules below:

* [Core JS rules](https://github.com/airbnb/javascript)
* [React rules](https://github.com/airbnb/javascript/tree/master/react)
* [React hook rules](https://reactjs.org/docs/hooks-rules.html)

Linter rules related to style and formatting are categorized as warnings, and
all other rules are considered errors like potential logic errors, performance
issues, etc.

Please notify a Frontend Infrastructure engineer if you think you found a valid
use case that is disallowed by the rule set. We would love to hear your
feedback.

## Regarding ESLint

This needs to be mentioned up front: do _not_ install ESLint or related plugins
globally. Installing globally will put you out-of-sync with the version our
projects use, and you will get different rule behavior as a result. This is an
extremely common recommendation online and even by ESLint itself when it fails
to find plugins. That means if you see something similar to the following
snippet, particularly the `-g` flag, ignore what it says:

```
npm install -g eslint
```

## Using ESLint

More than likely you are using a GUI editor like Sublime or an IDE like VSCode,
for that you can [see the wiki][wiki] for more information on how to integrate
ESLint into your editor.

You can also use the CLI directly if you're anywhere inside a project directory,
like in the example below:

```sh
npx eslint myFile.js
npx eslint --fix myFile.js
```

[wiki]: https://github.com/VoxsupInc/voxsupFrontend2/wiki/Code-Quality-Standards#your-coding-environment
