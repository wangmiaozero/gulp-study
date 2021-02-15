/*
 * @Description: 
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-15 13:46:54
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-15 17:59:59
 */
const gulp = require('gulp');
// const gulpConcat = require('gulp-concat');// 合并
// const gulpUglify = require('gulp-uglify');// 压缩
// const gulpRename = require('gulp-rename');//重命名
// const gulpLess = require('gulp-less');// less 转换 css
// const gulpCleanCss = require('gulp-clean-css');// css 压缩
// const gulpHtmlMin = require('gulp-htmlmin');// html 压缩
// const gulpLiveReload = require('gulp-livereload');//自动编译插件
// const gulpConnect = require('gulp-connect');// 热更新html
const open = require('open');
const gulpLoadPlugins = require('gulp-load-plugins');// 综合插件
let  plugins = gulpLoadPlugins();
// gulp 3 写法

// 定义一个任务 第一个参数 name 第二参数 function 执行的需求
// 合并js
gulp.task('concatJs',()=>{
    // 两个js 合并
   return gulp.src('src/js/*.js')
    .pipe(plugins.concat('all.js'))//合并完了 取个名字 然后放到这个js中
    .pipe(gulp.dest('./dist/js/'))// 输出路径
    .pipe(plugins.uglify())//压缩代码
    .pipe(plugins.rename({
        suffix:'.min'//重命名
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(plugins.livereload())
    .pipe(plugins.connect.reload());
})

// less 转换 css 任务
gulp.task('less',()=>{
    return gulp.src('src/less/*.less')
    .pipe(plugins.less())//转换css
    .pipe(gulp.dest('./src/css/'))// 输出路径
    .pipe(plugins.livereload())
    .pipe(plugins.connect.reload());
})

// 所有css文件合并压缩
// 等待less 执行完毕后 再执行cssConcat任务
// gulp.task('cssConcat',['less'],()=>{})
gulp.task('cssConcat',()=>{
    return gulp.src('src/css/*.css')
    .pipe(plugins.concat('all.css'))// 合并css
    .pipe(gulp.dest('./dist/css/'))// 输出路径
    .pipe(plugins.cleanCss())// 压缩css
    .pipe(plugins.rename({
        // 重命名
        suffix:'.min'
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(plugins.livereload())
    .pipe(plugins.connect.reload());
})

gulp.task('html',()=>{
    return gulp.src('src/*.html')
    .pipe(plugins.htmlmin({
        collapseWhitespace:true// 合并空格
    }))// 压缩html
    .pipe(gulp.dest('./dist/'))
    .pipe(plugins.livereload())
    .pipe(plugins.connect.reload());
})

// 自动 监听任务 实现热更新 改动代码会重新打包编译
gulp.task('wacht',()=>{
    plugins.livereload.listen();// 倾听
    gulp.watch('src/js/*.js',['concatJs'])// 监听
    gulp.watch('src/less/*.less',['less'])// 监听
    gulp.watch('src/css/*.css',['cssConcat'])// 监听
    gulp.watch('src/*.html',['html'])// 监听
})
// 热更新html 浏览器自动刷新
gulp.task('connect',()=>{
    let port = '2333';
    plugins.connect.server({
        root:'dist',
        port:port,
        livereload:true
    });
    // open.apply(`http://localhost:${port}`)
})

// 定义一个默认任务
gulp.task('default',['concatJs','less','cssConcat','html','wacht','connect'])