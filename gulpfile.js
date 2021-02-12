/*
 * @Description: 测试
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-11 23:56:47
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-12 00:23:09
 */
// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
//   }
  
//   exports.default = defaultTask

// 创建任务（task）

// const { series } = require('gulp');

// // `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// // 它仍然可以被用在 `series()` 组合中。
// function clean(cb) {
//   // body omitted
//   cb();
// }

// // `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// // 它也仍然可以被用在 `series()` 组合中。
// function build(cb) {
//   // body omitted
//   cb();
// }

// exports.build = build;
// exports.default = series(clean, build);

// 组合任务

// Gulp 提供了两个强大的组合方法： series() 和 parallel()，允许将多个独立的任务组合为一个更大的操作。这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。series() 和 parallel() 可以互相嵌套至任意深度。

// 如果需要让任务（task）按顺序执行，请使用 series() 方法。

// const { series } = require('gulp');

// function transpile(cb) {
//   // body omitted
//   cb();
// }

// function bundle(cb) {
//   // body omitted
//   cb();
// }

// exports.build = series(transpile, bundle);

// 对于希望以最大并发来运行的任务（tasks），可以使用 parallel() 方法将它们组合起来。

// const { parallel } = require('gulp');

// function javascript(cb) {
//   // body omitted
//   cb();
// }

// function css(cb) {
//   // body omitted
//   cb();
// }

// exports.build = parallel(javascript, css);


// 当 series() 或 parallel() 被调用时，任务（tasks）被立即组合在一起。这就允许在组合中进行改变，而不需要在单个任务（task）中进行条件判断。

// const { series } = require('gulp');

// function minify(cb) {
//   // body omitted
//   cb();
// }


// function transpile(cb) {
//   // body omitted
//   cb();
// }

// function livereload(cb) {
//   // body omitted
//   cb();
// }

// if (process.env.NODE_ENV === 'production') {
//   console.log('production')
//   exports.build = series(transpile, minify);
// } else {
//   exports.build = series(transpile, livereload);
// }

// series() 和 parallel() 可以被嵌套到任意深度。

// const { series, parallel } = require('gulp');

// function clean(cb) {
//   // body omitted
//   cb();
// }

// function cssTranspile(cb) {
//   // body omitted
//   cb();
// }

// function cssMinify(cb) {
//   // body omitted
//   cb();
// }

// function jsTranspile(cb) {
//   // body omitted
//   cb();
// }

// function jsBundle(cb) {
//   // body omitted
//   cb();
// }

// function jsMinify(cb) {
//   // body omitted
//   cb();
// }

// function publish(cb) {
//   // body omitted
//   cb();
// }

// exports.build = series(
//   clean,
//   parallel(
//     cssTranspile,
//     series(jsTranspile, jsBundle)
//   ),
//   parallel(cssMinify, jsMinify),
//   publish
// );

// 当一个组合操作执行时，这个组合中的每一个任务每次被调用时都会被执行。例如，在两个不同的任务（task）之间调用的 clean 任务（task）将被执行两次，并且将导致不可预期的结果。因此，最好重构组合中的 clean 任务（task）。

// 如果你有如下代码：

// This is INCORRECT
// const { series, parallel } = require('gulp');

// const clean = function(cb) {
//   // body omitted
//   cb();
// };

// const css = series(clean, function(cb) {
//   // body omitted
//   cb();
// });

// const javascript = series(clean, function(cb) {
//   // body omitted
//   cb();
// });

// exports.build = parallel(css, javascript);

// 重构为：

const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, parallel(css, javascript));