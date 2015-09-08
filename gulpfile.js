/**
 *Created by WebStorme.
 *User: Lennon
 *Date: 15/9/7
 *File: gulpfile
 */
/*global -$ */
'use strict';
//2015年9月7日 09:46
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('compile', function () {
    return gulp.src('*.js', {read: false})
        .pipe($.shell([
            'egret build -sourcemap'
        ], {
            templateData: {
                f: function (s) {
                    return s.replace(/$/, '.bak')
                }
            }
        }))
});

gulp.task('serve', ['compile'],function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: "./",
            index:"launcher/index.html"
        }
    });
    // watch for changes
    gulp.watch([
        'launcher/*.html',
        'launcher/**/*.js'
    ]).on('change', reload);

    gulp.watch(['src/**/*.ts','!src/skins*/**','src/*.js','src/**/*.exml'], ['compile']);
});

gulp.task('default', function () {
    gulp.start('serve');
});
