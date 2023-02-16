const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const minify = require("gulp-minify");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/script.js").on('change', gulp.parallel('scripts'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('libsjs', function() {
    return gulp.src(["src/js/**/*.js", "!src/js/script.js"])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/script.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(minify({
            noSource: true,
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});
gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*.+(eot|ttf|woff|woff2)")
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('icons', function() {
    return gulp.src("src/icons/**/*.+(svg|png)")
        .pipe(gulp.dest('dist/icons'));
});
gulp.task('images', function() {
    return gulp.src("src/img/*.+(png|jpg)")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest('dist/mailer'));
});
gulp.task('composer-files', function() {
    return gulp.src("src/composer.*")
        .pipe(gulp.dest('dist'));
});

gulp.task('styles-production', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('scripts-production', function() {
    return gulp.src("src/js/script.js")
        .pipe(babel())
        .pipe(minify({
            noSource: true,
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'libsjs', 'fonts', 'icons', 'images', 'mailer', 'composer-files'));