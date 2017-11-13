"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var browserSync = require('browser-sync').create();
var run = require("run-sequence");
var del = require("del");
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
          sort: true
      })
    ]))
    .pipe(gulp.dest("css"))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("images", function() {
    return gulp.src("build/images/**/*.{png,jpg,gif}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
    ]))
      .pipe(gulp.dest("build/images"));
});

gulp.task('scripts', function (cb) {
  pump([
        gulp.src('build/js/**/*.js'),
        uglify(),
        gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task("symbols", function() {
    return gulp.src("build/images/icons/*.svg")
      .pipe(svgmin())
      .pipe(svgstore({
        inlineSvg: true
    }))
      .pipe(rename("symbols.svg"))
      .pipe(gulp.dest("build/images"));
});

gulp.task("watch", function() {
    browserSync.init({
        server: ".",
		notify: false,
		open: true
    });

  gulp.watch("less/**/*.{css,less}", ["style"]);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch('css/*.css').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
});


gulp.task("copy", function() {
    return gulp.src([
        "fonts/**",
        "images/**",
        "js/**",
        "css/**",
        "*.html"
    ], {
        base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
    return del("build");
});

gulp.task("build", function(fn) {
    run(
      "clean",
      "copy",
	    "scripts",
      "images",
      "symbols",
      fn
    );
});




