## angular-couch-potato
> Lazy-Load and Register Components in AngularJS Applications

For documentation, please see
<a href="http://laurelnaiad.github.io/angular-couch-potato/docs/" target="_blank">http://laurelnaiad.github.io/angular-couch-potato/docs/</a>.  The documentation is a first and incomplete draft.

To see the samples live, go to
<a href="http://laurelnaiad.github.io/angular-couch-potato/samples/" target="_blank">http://laurelnaiad.github.io/angular-couch-potato/samples/</a>

#### Installing Source/Running Samples Locally

See the README in the [sample apps](https://github.com/laurelnaiad/ng-couch-potato/tree/master/samples) for basic demonstrations.

#### History/Attribution

Couch Potato has its roots in [angular-require-lazyload](https://github.com/szhanginrhythm/angular-require-lazyload) but has grown into something that supports hierarchical dependencies and features ease-of-use and efficiency optimizations to make lazy loading vs. compiling into your app easy.

#### License

See the [LICENSE file](https://github.com/laurelnaiad/ng-couch-potato/blob/master/LICENSE).

#### Questions/Comments/Concerns

See the [Issues List](https://github.com/laurelnaiad/ng-couch-potato/issues).  Yes, couch-potato really is just small a page of code **before** minimization.  Short and sweet.  It's about the pattern...

### New Change for forfun(s)

use jQuery.js not require.js,and cache (if u lazy load a module include directive , will execute script many times ,finally some error show up , when I cache the script,so wont load again and wont execute a again)
and the api is nothing change!

### dependencies
jQuery  -> use $.ajax


async  -> use async.parallel




