module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'otranscribe.js'  // This specific file
                ],
                dest: 'script.js',
            }
        },
        
        uglify: {
            build: {
                src: 'script.js',
                dest: 'script.js'
            }
        },
        
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'style.css': 'scss/base.scss'
                }
            } 
        },
        
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js', 'otranscribe.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }
        
        

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};