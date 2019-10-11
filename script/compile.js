const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const babelConfig = require('../utils/babel.config.base');
const cwd = process.cwd();
const distDir = path.join(cwd, 'dist');
const libDir = path.join(cwd, 'lib');
const through2 = require('through2');
const merge2 = require('merge2');
const del = require('del');
const ts = require('gulp-typescript');
const getTsCompileConfig = require('../utils/ts.config.base')

gulp.task('clean', () => {
  return del([
    'dist/**/*',
  ])
});

gulp.task('compile-jsx', () => {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(through2.obj(function (chunk, enc, callback) {
      const content = chunk.contents.toString(enc);
      chunk.contents = Buffer.from(content
        .replace(/\.scss/g, '.css'));
      this.push(chunk)
      callback()
    }))
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig()))
    .pipe(gulp.dest(distDir))
});

gulp.task('compile-lib', () => {
  return gulp.src(['lib/**/*.jsx'])
    .pipe(babel(babelConfig()))
    .pipe(sourcemaps.write('../lib'))
    .pipe(gulp.dest(libDir))
});

gulp.task('compile-scss', () => {
  sass.compiler = require('node-sass');
  return gulp.src(['src/**/*.scss', '!src/styles/**'])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('../dist'))
    .pipe(gulp.dest(distDir));
});

gulp.task('compile-static', () => {
  return gulp.src(['src/**/*.@(png|gif|jpg|jpeg|svg|eot|svg|ttf|woff)'])
    .pipe(gulp.dest(distDir));
});

gulp.task('compile-tsx', () => {
  const tsProject = ts.createProject(getTsCompileConfig);
  const tsResult = gulp.src(['src/**/*.tsx','src/**/*.ts']).pipe(sourcemaps.init()).pipe(tsProject());
  delete babelConfig.cacheDirectory;

  const babelStream = tsResult.js.pipe(babel(babelConfig))
    .pipe(through2.obj(function through(file, encoding, next) {
      const content = file.contents.toString(encoding);
      file.contents = Buffer.from(content
        .replace(/\.scss/g, '.css'));
      this.push(file);
      next();
    }))
    .pipe(sourcemaps.write('../dist'))
    .pipe(gulp.dest(distDir))
  console.log
  return merge2([
    babelStream,
    tsResult.dts.pipe(gulp.dest(distDir))
  ])
});


exports['clean'] = gulp.series('clean');
exports['compile'] = gulp.series('clean', 'compile-lib', 'compile-jsx', 'compile-scss','compile-static','compile-tsx')

exports['compile:watch'] = function() {
  return gulp.watch(['src/**/*', 'lib/**/*.jsx'], gulp.series('clean', 'compile-lib', 'compile-jsx', 'compile-scss','compile-static','compile-tsx'))
}