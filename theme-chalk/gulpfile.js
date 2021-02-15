/*
 * @Description: 打包
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-06 16:12:24
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-12 22:45:53
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const sequence = require('gulp-sequence');

gulp.task('compile', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
})

gulp.task('copyfont', function () {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'));
})

gulp.task('default',sequence('compile', 'copyfont'));