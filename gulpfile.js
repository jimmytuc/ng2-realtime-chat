var gulp = require("gulp"),
    del = require("del"),
    tsc = require("gulp-typescript"),
    nodemon = require("gulp-nodemon"),
    tscConfig = require("./client/tsconfig.json");


gulp.task("clean", function (done) {

    del(["build"],done);
});

gulp.task("copy:libs", function () {

    return gulp.src([

            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/zone.js/dist/zone.js",
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/systemjs/dist/system.src.js",
            'node_modules/socket.io-client/socket.io.js',
            "client/systemjs.config.js"
        ])
        .pipe(gulp.dest('build/lib'))

});

gulp.task("copy:node_modules", function () {

    return gulp.src([
            "node_modules/rxjs/**/",
            "node_modules/angular2-in-memory-web-api/**/",
            "node_modules/@angular/**/",
            "node_modules/ng2-bs3-modal/**/"
        ], {base: "."})
        .pipe(gulp.dest("build/lib"))
});

gulp.task("copy:statics", function () {

    return gulp.src(["client/**/*.html", "server.js"])
        .pipe(gulp.dest("build"))
});

gulp.task("copy:server", function () {

    return gulp.src("server/**/*")
        .pipe(gulp.dest("build/server"))
});

gulp.task("copy:assets", function () {

    return gulp.src(["client/assets/**/*"])
        .pipe(gulp.dest("build/assets"))
});

gulp.task("compile", function () {

    return gulp.src("client/**/*ts")
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(gulp.dest("build"))
});

gulp.task('go', ["compile", "copy:libs", "copy:assets", "copy:server", "copy:statics", "copy:node_modules"], function () {
    nodemon({
        script: 'build/server.js'
        , ext: 'js'
        , env: {'NODE_ENV': 'development'}
    })
});


gulp.task("default", ["go"]);