var gulp = require('gulp'),
    sass = require('gulp-sass'),
    htmlincluder = require('gulp-htmlincluder'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    path = require("path");
 
var paths = {
  templates: './templates/',
  sass: 'css/source/'
};
 
gulp.task('htmlIncluder', function() {
    gulp.src(path.join(paths.templates, '*.html'))
        .pipe(htmlincluder())
        .pipe(gulp.dest('./static'))
        .pipe(notify({ message: 'HTML files dropped' }));
});

 
//  Sass: compile sass to css task - uses Libsass
//===========================================
gulp.task('sass', function() {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'CSS files dropped!' }));
});
 
//  Connect: sever task
//===========================================
gulp.task('connect', function () {
    connect.server({
        port: 1337,
        root: './static'
    });
});
 
//  Watch and Livereload using Libsass
//===========================================
gulp.task('watch', function() {

    //Watch task for sass
    gulp.watch(path.join(paths.sass, '**/*.scss'), ['sass']);
 
    // watch task for gulp-includes
    gulp.watch(path.join(paths.templates, '**/*.html'), ['htmlIncluder']);
 
});
 
//  Default Gulp Task
//===========================================
gulp.task('default', ['htmlIncluder', 'sass', 'connect', 'watch'], function() {
 
});
