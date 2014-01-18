module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            build: {
                src: 'progressor.js',
                dest: 'progressor.min.js'
            }
        },
        
        watch: {
            scripts: {
                files: ['progressor.js'],
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