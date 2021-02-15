/*
 * @Description: 
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-15 13:46:54
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-15 13:46:54
 */
/*
 * @Description: 
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-14 21:51:13
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-15 13:42:41
 */
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');// 合并
const gulpUglify = require('gulp-uglify');// 压缩
const gulpRename = require('gulp-rename');//重命名
const gulpLess = require('gulp-less');// less 转换 css
const gulpCleanCss = require('gulp-clean-css');// css 压缩

// 定义一个任务 第一个参数 name 第二参数 function 执行的需求
// 合并js
gulp.task('concatJs',()=>{
    // 两个js 合并
   return gulp.src('src/js/*.js')
    .pipe(gulpConcat('all.js'))//合并完了 取个名字 然后放到这个js中
    .pipe(gulp.dest('./dist/js/'))// 输出路径
    .pipe(gulpUglify())//压缩代码
    .pipe(gulpRename({
        suffix:'.min'//重命名
    }))
    .pipe(gulp.dest('dist/js/'))
})

// less 转换 css 任务
gulp.task('less',()=>{
    return gulp.src('src/less/*.less')
    .pipe(gulpLess())//转换css
    .pipe(gulp.dest('./src/css/'))// 输出路径
})

// 所有css文件合并压缩
gulp.task('cssConcat',()=>{
    return gulp.src('src/css/*.css')
    .pipe(gulpConcat('all.css'))// 合并css
    .pipe(gulp.dest('./dist/css/'))// 输出路径
    .pipe(gulpCleanCss())// 压缩css
    .pipe(gulpRename({
        // 重命名
        suffix:'.min'
    }))
    .pipe(gulp.dest('./dist/css/'))
})


