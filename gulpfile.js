var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var nested = require('postcss-nested');
var short = require('postcss-short');
var assets = require('postcss-assets');
var cssnext = require('postcss-cssnext');

// browserSync server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});
// or
// gulp.task('browser-sync', function () {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });
// browserSync end

gulp.task('jade', function () {
    return gulp.src('./src/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function () {
    return gulp.src('./src/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
    var processors = [
        nested,
        short,
        autoprefixer({ browsers: ['last 2 version'] }),
        assets({
            loadPaths: ['./src/img/'],
            relativeTo: './src/'
        }),
        //cs snano(),
    ];
    return gulp.src('./src/*.css')
        .pipe(plumber())
        .pipe(concat('main.css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['serve'], function () {
    gulp.watch('./src/*.css', ['css']);
    gulp.watch('./src/*.jade', ['jade']);
    gulp.watch('./src/*.js', ['js']);
    gulp.watch("./dist/*.css").on('change', browserSync.reload);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
    gulp.watch("./dist/*.js").on('change', browserSync.reload);
});
