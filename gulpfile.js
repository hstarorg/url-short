require('shelljs/global');
const gulp = require('gulp4');
const developServer = require('gulp-develop-server');
const newer = require('gulp-newer');
const notifier = require('node-notifier');

const notify = message => {
  notifier.notify({
    title: 'URL-SHORT Notify!',
    message
  });
};
const distFolder = 'dist';

gulp.task('clean', done => {
  rm('-rf', distFolder);
  done();
});

gulp.task('clean.routes', done => {
  rm('-rf', `${distFolder}/routes`);
  done();
});

gulp.task('copy', () => {
  return gulp.src([
    'src/**/*',
    'package.json'
  ])
    .pipe(newer(distFolder))
    .pipe(gulp.dest(distFolder));
});

gulp.task('serve', done => {
  developServer.listen({ path: 'dist/index.js' }, err => {
    err && console.error(err);
    notify('Server started, begin watching...');
    done();
  });
});

gulp.task('restart', done => {
  developServer.restart(err => {
    err && console.error(err);
    notify('Restart successfully.');
    done();
  });
});

gulp.task('watch', done => {
  gulp.watch([
    'src/**/*'
  ], { debounceDelay: 2000 }, gulp.series('clean.routes', 'copy', 'restart'));
  done();
});

gulp.task('dev', gulp.series(
  'clean',
  'copy',
  gulp.parallel('serve', 'watch')
));

gulp.task('installDeps', done => {
  cd('dist');
  exec('npm i --production');
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'installDeps'
));
