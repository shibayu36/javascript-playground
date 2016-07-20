var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

gulp.task('compile-css', function () {
    return gulp.src(['src/css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
            cascade: false
        }))
        .pipe(gulp.dest('static/css'));
});

gulp.task('compile-css-with-less', function () {
    return gulp.src(['src/less/*.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
            cascade: false
        }))
        .pipe(gulp.dest('static/css'));
});
