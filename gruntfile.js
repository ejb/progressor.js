module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            build: {
                src: 'mediaprogressbar.js',
                dest: 'mediaprogressbar.min.js'
            }
        },
        
        watch: {
            scripts: {
                files: ['mediaprogressbar.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify','watch']);

};