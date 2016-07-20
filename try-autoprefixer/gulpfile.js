var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('compile-css', function () {
    return gulp.src(['src/css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest('static/css'));
});
