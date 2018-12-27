var gulp = require('gulp');//gulp主组件
var htmlmin = require('gulp-htmlmin');//html压缩组件
var jshint = require('gulp-jshint');//js语法检查
var concat = require('gulp-concat');//多个文件合并为一个
var minifyCss = require('gulp-clean-css');//压缩CSS为一行；
var uglify = require('gulp-uglify');//js文件压缩
var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换
var clean = require('gulp-clean');//清除文件插件，参考：https://github.com/teambition/gulp-clean
//es6转es5
var babel = require('gulp-babel');
var rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    sourcemaps = require('gulp-sourcemaps'), //出错后，查看源代码
    pump = require('pump'),
    gulpSequence = require('gulp-sequence');
//server
var browserSync = require('browser-sync');


const sourcePath = require("./path.config");

/**
 * server
 * */
gulp.task('server', [],function () {
    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
/**
 * 监听JS/css文件变改，即时调用任务执行JS增量打包
 */
gulp.task('watch', [], function(cb) {
    gulp.watch(sourcePath.js.src, change_file);  //js注入浏览器
    gulp.watch(sourcePath.css.src, change_file); //css注入浏览器
    gulp.watch(sourcePath.html.src, change_file); //html注入浏览器

});
function change_file(file){
    return gulp.src(file.path)
        .pipe(browserSync.stream())
}
/**
 * 清理目标目录
 */
gulp.task('clean:dist', function(cb) {
    pump([
        gulp.src(sourcePath.dist),
        clean()
    ], cb)
});
/**
 * 清理目标目录
 */
gulp.task('clean:rev', function(cb) {
    pump([
        gulp.src(sourcePath.rev.emit),
        clean()
    ], cb)
});
//复制文件夹
gulp.task('copy:lib', function () {
    pump([
        gulp.src(sourcePath.lib.src,{base:"."}),
        gulp.dest(sourcePath.dist)
    ])
});
gulp.task('copy:static', function () {
    pump([
        gulp.src(sourcePath.static.src,{base:"."}),
        gulp.dest(sourcePath.dist)
    ]);
});

/**
 * 执行JS压缩
 */
gulp.task('minify:js', [], function (cb) {
    pump([
        // 获取原目录下所有的js文件
        gulp.src(sourcePath.js.src,{base: '.'}),
        jshint(),
        // 每次打包时，只打包内容发生改变的文件
        // `changed` 任务需要提前知道目标目录位置
        // 才能找出哪些文件是被修改过的
        // changed(sourcePath.dist, {extension: '.js'}),
        // 只有被更改过的文件才会通过这里
        babel({
            presets: ['env']
        }),
        //js流实时推送至浏览器
        // browserSync.stream(),
        // 生成sourcemap，需要配合后面的sourcemaps.write()
        // sourcemaps.init(),
        // 执行JS压缩
        /**
         * toplevel — 混淆在最高作用域中声明的变量名（默认disabled）
         eval - 混淆在eval 或 with作用域出现的变量名（默认disabled）
         * */
        uglify({
            mangle: {
                toplevel: 0, //这个是简单混淆 就是变量变成单个字母
                // except: ["exports", "module", "require", "define"],
                // screw_ie8: false
            } ,
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            // compress: { screw_ie8: false },
            // preserveComments: 'all' //保留所有注释
            // output: { screw_ie8: false }
        }),
        //生成MD字符串加到文件名后。不同于后缀
        rev(),
        // 生成sourcemap
        // sourcemaps.write(),
        // 输出至目标目录
        gulp.dest(sourcePath.dist),
        //生成一个rev-manifest.json
        rev.manifest('rev-js-manifest.json'),
        gulp.dest(sourcePath.rev.emit)
    ], cb);
});

/**
 * 执行css压缩
 */
gulp.task('minify:css', function (cb) {
    pump([
        // 获取原目录下所有的js文件
        gulp.src(sourcePath.css.src,{base: '.'}),
        // 每次打包时，只打包内容发生改变的文件
        changed(sourcePath.dist, {extension: '.css'}),
        // 生成sourcemap，需要配合后面的sourcemaps.write()
        // sourcemaps.init(),
        // 执行JS压缩
        minifyCss(),
        //生成MD字符串加到文件名后。不同于后缀
        rev(),
        // 生成sourcemap
        // sourcemaps.write(),
        // 输出至目标目录
        gulp.dest(sourcePath.dist),
        //生成一个rev-manifest.json
        rev.manifest('rev-css-manifest.json'),
        gulp.dest(sourcePath.rev.emit)
    ], cb);
});

/**
 * 执行html压缩
 */
gulp.task('minify:html', [], function(cb) {
    pump([
        // 获取原目录下所有的html文件
        gulp.src(sourcePath.html.src,{base:"."} ),
        // 每次打包时，只打包内容发生改变的文件
        changed(sourcePath.dist, { extension:'.html' }),
        // 执行html压缩
        htmlmin({
            removeComments: true,               // 清除HTML注释
            collapseWhitespace: true,           // 压缩空格
            collapseBooleanAttributes: true,    // 省略布尔属性的值 <input checked="true"/> => <input checked>
            removeEmptyAttributes: true,        // 删除所有空格作属性值 <input id=""> => <input>
            removeScriptTypeAttributes: true,   // 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
            minifyJS: true,                     // 压缩页面JS
            minifyCSS: true                     // 压缩页面CSS
        }),
        // 输出至目标目录
        gulp.dest(sourcePath.dist)
    ], cb);
});


//使用rev替换成md5文件名，这里包括html和css的资源文件也一起
gulp.task('rev', function () {
    //html，针对js,css,img
    //处理dist下边的html
    pump([
        gulp.src([sourcePath.rev.src, sourcePath.html.emit]),
        revCollector({replaceReved: true}),
        // 输出至目标目录
        gulp.dest(sourcePath.dist)
    ])
});




//缺省默认任务，输出的js和css文件都带参数
/*执行顺序：
* 1、清除编译输出目录build的全部文件
* 2、复制第三方组件依赖到build文件夹
* 3、使用带md5对js文件进行压缩打包一个文件，命名根据gulp-rev插件md5之后的命名进行命名，如build-asdf123.min.js，并输出到build/js文件夹
* 4、使用带md5对cs文件进行压缩打包一个文件，命名根据gulp-rev插件md5之后的命名进行命名，如build-asd323.min.css，并输出到build/cs文件夹
* 5、（可选）使用带md5对img文件夹的全部文件进行重命名，命名根据gulp-rev插件md5之后的命名进行命名，如common-asdf123.jpg，并输出到build/img文件夹；如果这部不操作，下面第10步将不执行。
* 6、将build目录下的全部html页面进行压缩处理，采用gulp-minhtml插进
* 7、由于项目上使用了模块开发，然后每个页面上都会引入common.js文件，而合并后的js文件为build.min.js，所以使用gulp-replace插进对html页面进行替换，并将html文件输出到build目录上
* 8、再次在build目录上，将html进行common.css文件替换成build.min.css
* 9、使用gulp-rev-collectorc插件对刚才生成带参数的js和css文件在html页面上进行替换，如build.min.js替换成build-asdf123.min.js。还是输出到build目录。
* 10、（可选）使用gulp-rev-collectorc插件对刚才生成带参数的img文件在css文件上进行替换，如common.jpg替换成common-asdf12.jpg。输出到目录
* */
gulp.task('build', function (cb) {
    gulpSequence('clean:dist', 'clean:rev','copy:lib', 'copy:static', 'minify:js', 'minify:css', 'minify:html', 'rev')(cb);
});
gulp.task('dev', function (cb) {

    gulpSequence('server', 'watch')(cb);
});
