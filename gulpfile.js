'use sctrict';

var gulp 		= 		require('gulp'),
	gp			=		require('gulp-load-plugins')(),
	browserSync = 		require('browser-sync').create();

gulp.task('html', function(){
	return gulp.src('app/*.html')
	// .pipe(gp.pug({
	// 	pretty: true,
	// }))
	.pipe(gulp.dest('dist'))
	.on('end' , browserSync.reload);
});

gulp.task('serve', function(){
	browserSync.init({
		server:{
			baseDir: './dist'
		}
	});
});

gulp.task('sass', function(){
	return gulp.src('app/sass/*.sass')
	.pipe(gp.sourcemaps.init())
	.pipe(gp.sass({}))
	.pipe(gp.autoprefixer({
		browsers: ['last 10 versions']
	}))
	.on('error', gp.notify.onError({
		title: 'style'
	}))
	// .pipe(gp.csso())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest('dist/css/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});


gulp.task('scripts', function(){
	return gulp.src('app/js/**/common.js')
	.pipe(gulp.dest('dist/js/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch' , function(){
	gulp.watch('app/**/*.html', gulp.series('html'));
	gulp.watch('app/sass/**/*.sass', gulp.series('sass'))
	gulp.watch('app/js/**/*.js', gulp.series('scripts'));
});

gulp.task('default' , gulp.series(
	gulp.parallel('html' , 'sass' , 'scripts'),
	gulp.parallel('watch' , 'serve'))
);
