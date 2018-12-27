var sourcePath = {
    dist:'dist',
    rev:{
        src:'rev/*.json',
        emit:'rev'
    },
    html:{
        src:["*.html","src/module/**/*.html","src/components/**/*.html"],
        emit:'dist/**/*.html'
    },
    css:{
        src:["src/css/*.css","src/module/**/*.css","src/components/**/*.css"],
        emit:'css'
    },
    js:{
        src:["src/*.js","src/js/**/*.js","src/module/**/*.js","src/components/**/*.js"],
        emit:'js'
    },
    img:{
        src:'img/*.{png, jpg, gif, ico}',
        emit:'img'
    },
    lib:{
        src:'lib/**/*'
    },
    static:{
        src:'static/**/*'
    }
};

module.exports = sourcePath;
