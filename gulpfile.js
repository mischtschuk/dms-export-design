"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
// const del = require("del");
// const eslint = require("gulp-eslint");
const gulp = require("gulp");
// const imagemin = require("gulp-imagemin");
// const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
// const webpack = require("webpack");
// const webpackconfig = require("./webpack.config.js");
// const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "app"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Optimize Images
// function images() {
//     return gulp
//         .src("app/img/**/*")
//         .pipe(newer("./_site/assets/img"))
//         .pipe(
//             imagemin([
//                 imagemin.gifsicle({ interlaced: true }),
//                 imagemin.jpegtran({ progressive: true }),
//                 imagemin.optipng({ optimizationLevel: 5 }),
//                 imagemin.svgo({
//                     plugins: [
//                         {
//                             removeViewBox: false,
//                             collapseGroups: true
//                         }
//                     ]
//                 })
//             ])
//         )
//         .pipe(gulp.dest("./_site/assets/img"));
// }

// CSS task
function css() {
    return gulp
        .src("app/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("app/css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("app/css"))
        .pipe(browsersync.stream());
}

// Lint scripts
// function scriptsLint() {
//     return gulp
//         .src(["./assets/js/**/*", "./gulpfile.js"])
//         .pipe(plumber())
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// }

// Transpile, concatenate and minify scripts
// function scripts() {
//     return (
//         gulp
//             .src(["./assets/js/**/*"])
//             .pipe(plumber())
//             .pipe(webpackstream(webpackconfig, webpack))
//             // folder only, filename is specified in webpack config
//             .pipe(gulp.dest("./_site/assets/js/"))
//             .pipe(browsersync.stream())
//     );
// }

// Jekyll
// function jekyll() {
//     return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
// }

// Watch files
function watchFiles() {
    gulp.watch("app/scss/**/*.scss", css);

    gulp.watch("app/*.html", browserSyncReload);
}

// define complex tasks
// const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(gulp.parallel(css));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
// exports.images = images;
exports.css = css;
// exports.js = js;
// exports.jekyll = jekyll;
// exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;