var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var webp = require("imagemin-webp");
var extReplace = require("gulp-ext-replace");

gulp.task("exportWebP", function() {
    let src = "src/img/**/*.*"; // Where your PNGs are coming from.
    let dest = "dist/img"; // Where your WebPs are going.

    return gulp.src(src)
        .pipe(imagemin([
            webp({
                quality: 85
            })
        ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(dest));
});